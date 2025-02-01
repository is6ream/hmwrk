import { Request, Response } from 'express';
import { db } from '../db/db';


export const findVideoController = (req: Request, res: Response) => {
    const { id } = req.params;
    const video = db.videos.find((video) => video.id === id)
    res.status(200).json(video)
    return
}