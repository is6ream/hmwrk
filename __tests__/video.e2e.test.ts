import { agent } from 'supertest';
import { dataset1, dataset2 } from './datasets';
import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { setDB } from '../src/db/db'
import { send } from 'process';
import { json } from 'stream/consumers';
import { RESOLUTIONS } from '../src/input-output-types/video-types';

describe('/videos', () => {
    beforeAll(async () => {
        setDB()
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

    it('should update video ID', async () => {
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
                author: "Jeff Bezos"
            })
            .expect(200)

        expect(updatingVideo.body.title).toEqual('good new title')
        expect(updatingVideo.body.author).toEqual('Jeff Bezos')
    })

})