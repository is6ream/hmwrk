import { Router } from "express";
import { videoControllers } from "./videoControllers";


export const videosRouter = Router()

videosRouter.get('/videos', videoControllers.getVideosController)
videosRouter.post('/videos', videoControllers.createVideoController)
videosRouter.get('/videos/:id', videoControllers.findVideoController)
videosRouter.delete('/testing/all-data', videoControllers.deleteAllVideosController)
videosRouter.delete('/videos/:id', videoControllers.deleteVideoController)
videosRouter.put('/videos/:id', videoControllers.updateVideoController)





