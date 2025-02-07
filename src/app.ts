import { db } from './db/db';
import express from 'express'
import cors from 'cors'
import { SETTINGS, RESOLUTIONS, STATUSES } from './settings';
import { OutputVideoType, ParamType, BodyType, OutputErrorsType, inputVideoType } from './videos/some';
import { Request, Response } from 'express';
import { getVideosController } from './videos/getVideosController';



export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк



app.get('/hometask_01/api/videos', (req: Request, res: Response) => {
    const videos = db.videos
    res.status(STATUSES.OK_200).json(videos)
})

app.get('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    const videoId = Number(req.params.id);
    const findVideo = db.videos.find(video => video.id === videoId)

    if (!findVideo) {
        res.status(STATUSES.NOT_FOUND_404).json({ message: 'Не найдено' })
    } res.json(findVideo)
})


app.put('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    const videoId = Number(req.params.id);
    const findVideo = db.videos.find(video => video.id === videoId)
    if (findVideo) {
        findVideo.title = req.body.title || findVideo.title
        findVideo.author = req.body.author || findVideo.author
        findVideo.availableResolutions = req.body.availableResolutions || findVideo.availableResolutions
        findVideo.canBeDownloaded = req.body.canBeDownloaded ?? findVideo.canBeDownloaded
        findVideo.minAgeRestriction = req.body.minAgeRestriction || findVideo.minAgeRestriction
        res.status(STATUSES.OK_200).json(findVideo)
        return;
    }
    res.status(STATUSES.NOT_FOUND_404).json({ "message": "Видео не найдено" })
});

app.delete('/hometask_01/api/videos/:id', (req: Request, res: Response) => {
    for (let i = 0; i < db.videos.length; i++) {
        if (db.videos[i].id === +req.params.id) {
            db.videos.splice(i, 1)
            res.status(STATUSES.NO_CONTENT_204)
            return;
        }
    }
    res.status(STATUSES.NOT_FOUND_404)
});

const inputValidation = (video: inputVideoType) => {
    const errors: OutputErrorsType = {
        errorMessages: []
    }

    if (!video.title || typeof video.title !== 'string' || video.title.trim().length === 0 || video.title.length > 40) {
        errors.errorMessages.push({ message: 'invalid title', field: 'title' })
    }

    if (!video.author || typeof video.author !== 'string' || video.author.trim().length === 0 || video.author.length > 20) {
        errors.errorMessages.push({ message: 'invalid author', field: 'author' })
    }

    if (!Array.isArray(video.availableResolutions) ||
        video.availableResolutions.find(p => !RESOLUTIONS[p as keyof typeof RESOLUTIONS])) {
        errors.errorMessages.push({ message: "invalid resolutions", field: "available resolution" })
    }
    return errors
}


app.post('/hometask_01/api/videos', (req: Request, res: Response) => {
    const errors = inputValidation(req.body)
    if (errors.errorMessages.length) {
        res
            .status(STATUSES.BAD_REQUEST_400)
            .json(errors)
        return

    }
    const date = new Date()
    const newVideo = {
        ...req.body,
        id: +Date.now() + Math.random(),
        title: req.body.title,
        author: req.body.author,
        availableResolutions: RESOLUTIONS,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: new Date(date.setDate(date.getDate() + 1))
    }

    db.videos = [...db.videos, newVideo]

    res.status(STATUSES.CREATED_201).json(newVideo)
})


app.get(SETTINGS.PATH.VIDEOS, getVideosController)
