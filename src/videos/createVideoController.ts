import { title } from 'process';
import { Response, Request } from "express";
import { OutputErrorsType } from './some'
import { db } from "../db/db";
import { InputVideoType, Resolutions } from './some'
import { error } from "console";
import { video1 } from "../../__test__/datasets";


const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = { //объект для сбора ошибок
        errorMessage: []
    }

if(!video.title || typeof video.title !== "string" || video.title.trim().length < 1 || video.title.length > 40){
    errors.errorMessages.push({
        message: "Title must be a non-emty string with a maximum length of 40 characters",
        field: "title"
    })
}

    if (!Array.isArray(video1.availableResolution)
        ||
        video.availableResolution.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'error!!!', field: 'availableResolution'
        })
    }
    return errors
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<any /*OutputVideoType*/ | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) { //если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return
        //return res.status(400).json(errors)
    }

    //если все ок - добавляем видео
    const newVideo: any /*VideoDBType*/ = {
        ...req.body,
        id: Date.now() + Math.random()
        // ...
    }
    db.videos = [...db.videos, newVideo]
    res.status(201)
        .json(newVideo)
}


