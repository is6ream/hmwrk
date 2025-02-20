import { Request, Response } from "express";
import { RESOLUTIONS } from '../input-output-types/video-types';
export type ParamType = {
    id: string
}

export type BodyType = {
    id: number
    title: string
}

export type QueryType = {
    search?: string
}

export type OutputErrorsType = {
    errorsMessages: {
        message: string
        field: string
    }[]

}

export type OutputVideoType = {
    id: number
    title: string
    author: string
    canBeDownloaded: boolean
    minAgeRestriction: number | null
    createdAt: string
    publicationDate: string
    availableResolutions: RESOLUTIONS[]

}

export type inputVideoType = {
    title : string
    author: string
    availableResolutions: string[]
}

export type OutputType = void | OutputErrorsType | OutputVideoType

export const someController = ( //и для чего это нужно
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {
    //что здесь должно быть
}