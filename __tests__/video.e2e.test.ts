import { req } from './test-helpers'
// import {setDB} from '../src/db/db'
// import {dataset1} from './datasets'  
import { SETTINGS } from '../src/settings'
import { setDB } from '../src/db/db'

describe('/videos', () => {
    beforeAll(async () => { //очистка бд перед началом тестирования
        setDB()
    })

    it("should get empty array", async () => {
        // setDB() - очистка бд, если нужно

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200) //проверяем наличие эндпоинта

        console.log(res.body) //можно посмотреть ответ эндпоинта


    })
    it('should get not empty array', async () => {
        // setDB(dataset) заполнение базы данных начальными данными

        const res = await req
            .get(SETTINGS.PATH.VIDEOS)
            .expect(200)

        console.log(res.body)

        // expect(res.body.length).toBe(1) для сравнения примитивных значений
        // expect(res.body[0].toEqual(dataset.videos[0])) для сравнения массивов и объектов

    })

    it('should create', async () => {
        setDB()
        const newVideo: any /*inputVideoType*/ = {
            title: 't1',
            author: 'a1',
            availableResolutions: ['P144'/*Resolutions.P144*/],
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: '2022.02.01',
            publicationDate: '2002.02.02'
        }

        const res = await req
            .post(SETTINGS.PATH.VIDEOS)
            .send(newVideo)
            .expect(201)

        console.log(res.body)

        expect(res.body.availableResolution).toEqual(newVideo.availableResolution)
    })

    it('should find', async () => {

        setDB(dataset)
        const res = req
            .get(SETTINGS.PATH.VIDEOS + '/1')
            .expect(404)
    })
})