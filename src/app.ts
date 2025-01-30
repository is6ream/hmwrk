import { db } from './db/db';
import express from 'express'
import cors from 'cors'
import { getVideosController } from './videos/getVideosController'
import { createVideoController } from './videos/createVideoController'
import { findVideoController } from './videos/findVideoController'
import { deleteVideoController } from './videos/deleteVideoController'
import { videosRouter } from './videos'


export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк
 
app.get('/', (req, res) => {
    // эндпоинт, который будет показывать на верселе какая версия бэкэнда сейчас залита
    res.status(200).json({version: '1.0'})
})

app.get('/videos', (req,res) => {
    const videos = db.videos
    res.status(200).json(videos)
})

app.use('/videos', videosRouter)

// app.get(SETTINGS.PATH.VIDEOS, getVideosController)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)


