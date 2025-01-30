"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_helpers_1 = require("./test.helpers");
// import {setDB} from '../src/db/db'
// import {dataset1} from './datasets'
const settings_1 = require("../src/settings");
describe('/videos', () => {
    // beforeAll(async () => { // очистка базы данных перед началом тестирования
    //     setDB()
    // })
    it('should get empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        // setDB() // очистка базы данных если нужно
        const res = yield test_helpers_1.req
            .get(settings_1.SETTINGS.PATH.VIDEOS)
            .expect(200); // проверяем наличие эндпоинта
        console.log(res.body); // можно посмотреть ответ эндпоинта
        // expect(res.body.length).toBe(0) // проверяем ответ эндпоинта
    }));
    it('should get not empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        // setDB(dataset1) // заполнение базы данных начальными данными если нужно
        const res = yield test_helpers_1.req
            .get(settings_1.SETTINGS.PATH.VIDEOS)
            .expect(200);
        console.log(res.body);
        // expect(res.body.length).toBe(1)
        // expect(res.body[0]).toEqual(dataset1.videos[0])
    }));
});
