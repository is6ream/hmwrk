// import {VideoDBType} from './video-db-type'

import { realpathSync } from "fs"

export type DBType = {
    videos: any[]
    // some: any[]
}

export const db: DBType = {
    videos: [
        {
            id: 0,
            title: "Sample Video",
            author: "John Doe",
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date().toISOString(),
            publicationDate: new Date().toISOString(),
            availableResolutions: ["P144"]
        }
    ]
    // some: []
}

//функция для быстрой очистки/заполнения базы данных для тестов
export const setDB = (dataset?: Partial<DBType>) => {
    if (!dataset) { //если в фукнцию ничего не передано - то очищаем базу данных
        db.videos = []
        // db.some = []
        return
    }

    //если что-то передано - то заменяем старые значения новыми
    db.videos = dataset.videos || db.videos
    // db.some = dataset.some || db.some
}