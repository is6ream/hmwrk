import { STATUSES } from './../src/settings';
import { agent } from 'supertest';
import { dataset1, dataset2 } from './datasets';
import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { setDB } from '../src/db/db'
import { send } from 'process';
import { json } from 'stream/consumers';
import { RESOLUTIONS } from '../src/input-output-types/video-types';
import { exec } from 'child_process';

describe('/videos', () => {
    beforeAll(async () => {
        setDB()
    })

    it('should delete all data in db', async () => {
        await req
            .delete('/hometask_01/api/testing/all-data')
            .expect(204)

        const res = await req.get('/hometask_01/api/videos')

        expect(res.status).toBe(200)
        expect(res.body).toEqual([]);
    })

    it('should get empty array', async () => {
        const res = await req
            .get('/hometask_01/api/videos')
            .expect(200) //проверка наличия эндпоинта

        console.log(res.body)
        // expect(res.body.lenght).toBe(0) //проверяем ответ эндпоинта
    })

    it('should get not emty array', async () => {
        setDB(dataset1) //заполнение бд начальными данными

        const res = await req
            .get('/hometask_01/api/videos')
            .expect(200)

        console.log(res.body)

        // expect(res.body.length).toBe(1)
        // expect(res.body[0].toEqual(dataset1.videos[0]))

    })

    it('should not create one more video', async () => {
        setDB()
        const res = await req
            .post('/hometask_01/api/videos')
            .send(dataset1)//.set('Content-type', 'application/json')
            .set('Content-Type', 'application/json')
            .expect(400)

    })

    it('should create one more video', async () => {
        setDB()
        const res = await req
            .post('/hometask_01/api/videos')
            .send(dataset1.videos)
            .set('Content-Type', 'application/json')
            // .set('Content-Type', 'application/json')
            .expect(201)
    })

    it('should update video by ID', async () => {
        setDB()

        const res = await req
            .post('/hometask_01/api/videos')
            .send(dataset2.videos)
            .expect(201)

        const videoId = res.body.id

        const updatingVideo = await req
            .put(`/hometask_01/api/videos/${videoId}`)
            .send({
                title: "good new title",
                author: "Jeff Bezos",
                availableResolutions: [
                    "P144"
                ],
                canBeDownloaded: true,
                minAgeRestriction: 18,
                publicationDate: new Date().toISOString()
            })
            .expect(204)

        expect(updatingVideo.body.title).toEqual('good new title')
        expect(updatingVideo.body.author).toEqual('Jeff Bezos')
        expect(updatingVideo.body.availableResolutions).toEqual(["P144"])
        expect(updatingVideo.body.canBeDownloaded).toEqual(true)
        expect(updatingVideo.body.minAgeRestriction).toEqual(18)
    })

    // it('should delete video by id', async () => {
    //     setDB()

    // тут нужно для начала создать данные, т.к из бд уже ранее были удалены все видео

    //     const videoToDelete = await req
    //         .post('/hometask_01/api/videos')
    //         .send(dataset1.videos)
    //         .expect(201)

    //     const videoId = videoToDelete.body.id
    //     const deleteVideo = await req
    //         .delete(`/hometask_01/api/videos/${videoId}`)
    //         .expect(204)

    //     const gettingAnEmptyArray = await req
    //         .get(`/hometask_01/api/videos/${videoId}`)
    //         .expect(404)
    // })

})

