import { title } from 'process';
import { db } from './../db/db';
import { NextFunction, Request, Response } from "express";
import { url } from 'inspector';
import { video1 } from '../../__test__/datasets';

type InputVideoType = {
    availableResolution: string[];
    // add other properties as needed
};

type OutputErrorsType = {
    errorsMessages: { message: string; field: string }[];
};

const Resolutions: { [key: string]: boolean } = {
    '1080p': true,
    '720p': true,
    // add other resolutions as needed
};

//ПОДКЛЮЧИ ГИТ


const inputValidation = (video: InputVideoType) => {
    const errors: OutputErrorsType = { //объект для сбора ошибок
        errorsMessages: []
    }

    if(!Array.isArray(video.availableResolution)
    || video.availableResolution.find(p => !Resolutions[p])
){
    errors.errorsMessages.push({
        message: 'error!!!!', field: 'availableResolution'
    })
}
return errors
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res: Response<any /*OutputVideoType*/ | OutputErrorsType>) => {
    const errors = inputValidation(req.body)
    if(errors.errorsMessages.length){
        res
        .status(400)
        .json(errors)
        return
    }

    const newVideo: any /*VideoDBType*/ = {
        ...req.body,
        id: Date.now() + Math.random(),
        //..
    }
    db.videos = [...db.videos, newVideo]

    res
    .status(201)
    .json(newVideo)
}


