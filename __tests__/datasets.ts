import { RESOLUTIONS } from './../src/input-output-types/video-types';
// import {VideoDBType} from '../src/db/video-db-type'
// import {Resolutions} from '../src/input-output-types/video-types'
import { DBType } from '../src/db/db'
import { publicDecrypt } from 'crypto';

//готовые данные для переиспользования в тестах

export const video1: any /*VideoDBType*/ = {
    id: Date.now() + Math.random(),
    title: 'Champions league',
    author: 'UEFA',
    canBeDownloaded: false,
    minAgeRestriction: null,
    createdAt: new Date().toISOString(),
    publicationDate: new Date().toISOString(),
    availableResolutions: [RESOLUTIONS.P144],
}

export const video2: any = {
    id: Date.now() + Math.random(),
    title: 'My second  dataset',
    author: 'Danil',
    canBeDownloaded: true,
    minAgeRestriction: null,
    publicationDate: new Date().toISOString(),
    availableResolutions: [RESOLUTIONS.P2160]

}

export const dataset1: DBType = {
    videos: video1
}

export const dataset2: DBType = {
    videos: video2
}




// ...

//нужно разобраться почему не работает последний тест