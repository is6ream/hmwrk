import { get } from 'http';
import {Router, Request, Response} from 'express'
import { db } from '../db/db'
import { createVideoController } from './createVideoController'
import { getVideosController } from './getVideosController'

export const videoRouter = Router()

const videosController = {
    getVideosController: (req: Request, res: Response) => {
        const videos = db.videos

        res.status(200).json(videos)
    },
    createVideoController: (req: Request, res: Response) => createVideoController(req,res)
}

videoRouter.get('/', videosController.getVideosController)
videoRouter.post('/', videosController.createVideoController)