import { DBType, setDB } from './../db/db';
import { Request, Response } from "express";
import { db } from "../db/db";
import { RESOLUTIONS, RESOLUTIONSstring } from "../input-output-types/video-types";
import { InputVideoType } from "../input-output-types/video-types";
import { OutputErrorsType } from "./some";
import { send } from 'process';
import { error } from 'console';
import { inputValidation } from './validation';
import { putInputValidation } from './validation';

export const videoControllers = {

    deleteAllVideosController: ((req: Request, res: Response) => {
        const videoId = +req.params.id;
        db.videos = [];
        res.status(204).send()
    }),

    getVideosController: ((req: Request, res: Response<any>) => {
        const videos = db.videos
        res
            .status(200)
            .json(videos)
    }),


    createVideoController: ((req: Request, res: Response) => {
        const errors = inputValidation(req.body)
        console.log("Ошибка валидации: ", errors)
        if (errors.errorsMessages.length) {
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
        console.log(newVideo)
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

    updateVideoController: ((req: Request, res: Response) => {
        const errors = putInputValidation(req.body)
        if (errors.errorsMessages.length) {
            res
                .status(400)
                .json(errors)

        }
        const videoId = +req.params.id;
        const findVideo = db.videos.find(v => v.id === videoId);

        if (!findVideo) {
            res
                .status(404)
                .json({ message: 'Видео не найдено!' })
        }
        findVideo.title = req.body.title || findVideo.title
        findVideo.author = req.body.author || findVideo.author
        findVideo.availableResolutions = req.body.availableResolutions || findVideo.availableResolutions
        findVideo.canBeDownloaded = req.body.canBeDownloaded ?? findVideo.canBeDownloaded
        findVideo.minAgeRestriction = req.body.minAgeRestriction ?? findVideo.minAgeRestriction
        findVideo.publicationDate = req.body.publicationDate || findVideo.publicationDate
        res.status(204).send()
    }), //остановился на том, что данные, которые передаются в title undefined

    deleteVideoController: ((req: Request, res: Response) => {
        const videoId: number = +req.params.id;
        const findVideo = db.videos.find(v => v.id === videoId)
        if (!findVideo) {
            res
                .status(404)
                .json({ message: 'Видео не найдено!' });
        }
        db.videos = db.videos.filter(v => v.id !== videoId)
        res.status(204).send()
    })
};



