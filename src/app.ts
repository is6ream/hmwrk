import express from 'express'
import cors from 'cors'
import { videosRouter } from './videos/routes'
import { SETTINGS } from './settings'
import { version } from 'os'

export const app = express() // создать приложение
app.use(express.json()) // создание свойств-объектов body и query во всех реквестах
app.use(cors()) // разрешить любым фронтам делать запросы на наш бэк


app.get('/', (req, res) => {
    res.status(200).json({ version: "1.0" })
})
app.use('/hometask_01/api/videos/', videosRouter);


