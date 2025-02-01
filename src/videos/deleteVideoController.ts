import { Request, Response } from "express";
import { db } from "../db/db";

export const deleteVideoController = (req: Request, res: Response) => {
    const { id } = req.params; //получаем id видео из параметров пути
    const videoIndex = db.videos.findIndex((video) => video.id = id)

    db.videos.splice(videoIndex, 1)
    res.sendStatus(200).json({ message: "Video deleted successfully" })
    return;
}