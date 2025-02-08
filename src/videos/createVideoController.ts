import { Request, Response } from "express";
import { db } from "../db/db";
import { inputValidation } from "../app";
import { RESOLUTIONS } from "../input-output-types/video-types";

export const createVideoController = ((req: Request, res: Response) => {
    const errors = inputValidation(req.body)
    if (errors.errorMessages.length) {
        res
            .status(404)
            .json(errors)
        return
    }

    const date = new Date()
    const newVideo = {
        ...req.body,
        id: +Date.now() + Math.random(),
        title: req.body.title,
        author: req.body.author,
        availableResolutions: RESOLUTIONS,
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: date.toISOString(),
        publicationDate: new Date(date.setDate(date.getDate() + 1))
    }

    res.send(201).json(newVideo);
})

