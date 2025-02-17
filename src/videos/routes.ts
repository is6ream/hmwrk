import { Router } from "express";
import { videoControllers } from "./videoControllers";


export const videosRouter = Router()

videosRouter.get('/videos', videoControllers.getVideosController)
videosRouter.post('/videos', videoControllers.createVideoController)
videosRouter.get('/videos/:id', videoControllers.findVideoController)
videosRouter.delete('/testing/all-data', videoControllers.deleteVideosController)
videosRouter.delete('/videos/:id', videoControllers.deleteVideosController)
// videosRouter.delete('/', videoControllers.deleteVideosController)
videosRouter.put('/videos/:id', videoControllers.updateVideoController)





