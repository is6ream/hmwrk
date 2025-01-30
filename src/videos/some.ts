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

export type OutputType = void

export const someController = (
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {
    
}