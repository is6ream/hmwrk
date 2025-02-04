import { title } from 'process';
import { db } from './db/db';
import express from 'express'
import cors from 'cors'
import { SETTINGS, RESOLUTIONS, STATUSES } from './settings';
import { OutputVideoType, ParamType, BodyType } from './videos/some';
import { Request, Response } from 'express';


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
            res.send(STATUSES.NO_CONTENT_204)
            return;
        }
    }
    res.send(STATUSES.NOT_FOUND_404)
});

const inputValidation = (video: any) => {
    const errors = [] as { message: string, field: string}[];

    if (!video.title || typeof video.title !== 'string' || video.title.trim().length < 1 || video.title.legth > 40) {
        errors.push({ message: 'Title must be a non-empty string with max 40 characters', field: 'title' })
    }

    if (!video.author || typeof video.author !== 'string' || video.title.trim().length < 1 || video.title.length > 20) {
        errors.push({ message: 'Author must be a non empty string with max 20 charachters', field: 'author' })
    };

    const values = Object.values(RESOLUTIONS)
    if (!Array.isArray(video.availableResolution) ||
        video.availableResolution.some((res: any) => !values.includes(res))) {
        errors.push({ message: 'Invalid resolutions', field: 'available resolutions' })
    }
    return errors;
}

app.post('/hometask_01/api/videos', (req: Request, res: Response) => {
    const errors = inputValidation(req.body)
    if (errors.length) {
        res
            .status(STATUSES.BAD_REQUEST_400)
            .json(errors)
        return
    }
    const newVideo = {
        ...req.body,
        id: +Date.now() + Math.random(),
        title: req.body.title,
        author: req.body,
        availableResolutions: [],
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString()//здесь нужно доработать
    }

    db.videos = [...db.videos, newVideo]

    res.send(STATUSES.OK_200).json(newVideo)
})

