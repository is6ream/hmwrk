import { DBType, setDB } from './../db/db';
import { Request, Response } from "express";
import { db } from "../db/db";
import { RESOLUTIONS, RESOLUTIONSstring } from "../input-output-types/video-types";
import { InputVideoType } from "../input-output-types/video-types";
import { OutputErrorsType } from "./some";
import { send } from 'process';


const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = {
        errorMessages: []
    }
    if (!video.title || video.title.trim().length === 0 || typeof video.title !== 'string' || video.title.length > 40) {
        errors.errorMessages.push({ message: "invalid title", field: "title" })
    }
    if (!video.author || video.author.trim().length === 0 || typeof video.author !== 'string' || video.author.length > 20) {
        errors.errorMessages.push({ message: "invalid author", field: "author" })
    }
    if (!Array.isArray(video.availableResolutions) ||
        video.availableResolutions.find((p: RESOLUTIONSstring) => !RESOLUTIONS[p as keyof typeof RESOLUTIONS])) {
        errors.errorMessages.push({ message: "invalid resolutions", field: "resolutions" })
        console.log(errors)
    }
    return errors;

}

export const videoControllers = {
    getVideosController: ((req: Request, res: Response<any /*OutputVideoType*/>) => {
        const videos = db.videos

        res
            .status(200)
            .json(videos)
    }),


    createVideoController: ((req: Request, res: Response) => {
        const errors = inputValidation(req.body)
        if (errors.errorMessages.length) {
            res
                .status(400)
                .json(errors)
            return;
        }

        const date = new Date();
        const newVideo: any = {
            ...req.body,

            id: Date.now() + Math.random(),
            title: req.body.title,
            author: req.body.author,
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: date.toISOString(),
            publicationDate: new Date(date.setDate(date.getDate() + 1)).toISOString(),
            availableResolutions: ["P144"]
        }
        db.videos.push(newVideo)
        res.status(201).json(newVideo)
    }),


    findVideoController: ((req: Request, res: Response) => {
        const videoId = +req.params.id
        const findVideo = db.videos.find(video => video.id === videoId)

        if (!findVideo) {
            res.status(404)
                .json({ message: 'Не найдено' })
        }
        res.json(findVideo)
    }),

    deleteVideoController: ((req: Request, res: Response) => {
        let videoFound = false; //флаг, чтобы проверить нашли ли мы видео
        for (let i = 0; i < db.videos.length; i++) {
            if (db.videos[i].id === +req.params.id) {
                db.videos.splice(i, 1)
                res.status(204).send();
                videoFound = true
                break;
            }
        }

        if (!videoFound) {
            res.status(404).send({ message: 'Видео не найдено' })
        }
    }),



    updateVideoController: ((req: Request, res: Response) => {
        let videoId = db.videos.find(v => v.id === + req.params.id)
        if (videoId) {
            videoId.title = req.body.title,
                videoId.author = req.body.author,
                videoId.availableResolutions = req.body.availableResolutions,
                videoId.canBeDownloaded = req.body.canBeDownloaded,
                videoId.minAgeRestriction = req.body.minAgeRestriction,
                videoId.createdAt = req.body.createdAt,
                videoId.publicationDate = req.body.publicationDate
                
            res.send(videoId)
        } else {
            res.send(404)
        }
    })
};



