import { Router } from "express";
import { getVideosController } from "./getVideosController";
import { get } from "http";
import { createVideoController } from "./createVideoController";
import { findVideoController } from "./findVideoController";
import { deleteVideoController } from "./deleteVideoController";

export const videosRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/', findVideoController)
videosRouter.delete('/', deleteVideoController)