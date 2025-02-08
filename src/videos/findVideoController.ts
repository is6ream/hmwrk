import { db } from './../db/db';
import { Request, Response } from "express";


export const findVideoController = ((req: Request, res: Response) => {
    const videoId = req.params.id
    const findVideo = db.videos.find(video => video.id === videoId)

    if (!findVideo) {
        res.status(401)
            .json({ message: 'Не найдено' })
    } 
    res.json(findVideo)
})