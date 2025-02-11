import { Router } from "express";
import { videoControllers } from "./videoControllers";


export const videosRouter = Router()

videosRouter.get('/', videoControllers.getVideosController)
videosRouter.post('/', videoControllers.createVideoController)
videosRouter.get('/:id', videoControllers.findVideoController)
videosRouter.delete('/:id', videoControllers.deleteVideoController)
videosRouter.put('/:id', videoControllers.updateVideoController)





