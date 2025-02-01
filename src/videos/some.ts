import { error } from 'console';
import { title } from 'process';
import { Request, Response } from "express";

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
    errorCode: number
    errorMessage: string
}

export type OutputVideoType = {
    id: number
    title: string
    url: string
}

export type OutputType = void | OutputErrorsType | OutputVideoType 

export const someController = (
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {
//что здесь должно быть
}