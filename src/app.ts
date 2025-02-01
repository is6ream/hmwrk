import { db } from './db/db';
import express from 'express'
import cors from 'cors'
import { videoRouter } from './videos/videosController'
import { SETTINGS } from './settings';


export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк
 
app.use('/videos', videoRouter)

app.get(SETTINGS.PATH.VIDEOS, videoRouter)
app.get(SETTINGS.PATH.VIDEOS, videoRouter)
app.post(SETTINGS.PATH.VIDEOS, videoRouter)
app.delete(SETTINGS.PATH.VIDEOS, videoRouter)
// app.use(SETTINGS.PATH.VIDEOS, videosRouter)


