import {req} from './test-helpers'
// import {setDB} from '../src/db/db'
// import {dataset1} from './datasets'  
import {SETTINGS} from '../src/settings'
import { setDB } from '../src/db/db'

describe('/videos', () => {
    beforeAll(async() => { //очистка бд перед началом тестирования
        setDB()
    })

    it("should get empty array", async() => {
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

        console.log(res.body

        // expect(res.body.length).toBe(1) для сравнения примитивных значений
        // expect(res.body[0].toEqual(dataset.videos[0])) для сравнения массивов и объектов
        )
    })

    
})