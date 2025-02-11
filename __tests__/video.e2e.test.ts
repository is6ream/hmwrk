import { dataset1 } from './datasets';
import { req } from './test-helpers'
import { SETTINGS } from '../src/settings'
import { setDB } from '../src/db/db'
import { send } from 'process';

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

    it('create one more video', async () => {
        setDB()

        const res = await req
            .post('/hometask_01/api/videos')
             .send(dataset1)//.set('Content-type', 'application/json')
            .expect(201)
    })

})