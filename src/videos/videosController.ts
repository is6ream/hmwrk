
import {Router, Request, Response} from 'express'
import { db } from '../db/db'
import { createVideoController } from './createVideoController';
import { deleteVideoController } from './deleteVideoController';
import { getVideosController } from './getVideosController';
import { findVideoController } from './findVideoController';


export const videoRouter = Router()

videoRouter.get('/', getVideosController)
videoRouter.post('/', createVideoController)
videoRouter.get('/', findVideoController)
videoRouter.delete('/', deleteVideoController)