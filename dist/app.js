"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const db_1 = require("./db/db");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const settings_1 = require("./settings");
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
exports.app.get('/hometask_01/api/videos', (req, res) => {
    const videos = db_1.db.videos;
    res.status(200).json(videos);
});
exports.app.get('/hometask_01/api/videos/:id', (req, res) => {
    const videoId = Number(req.params.id);
    const findVideo = db_1.db.videos.find(video => video.id === videoId);
    if (!findVideo) {
        res.status(404).json({ message: 'Не найдено' });
    }
    res.json(findVideo);
});
exports.app.delete('/hometask_01/api/videos/:id', (req, res) => {
    for (let i = 0; i < db_1.db.videos.length; i++) {
        if (db_1.db.videos[i].id === +req.params.id) {
            db_1.db.videos.splice(i, 1);
            res.send(204);
            return;
        }
    }
    res.send(404);
});
const inputValidation = (video) => {
    const errors = [];
    if (!video.title || typeof video.title !== 'string' || video.title.trim().length < 1 || video.title.legth > 40) {
        errors.push({ message: 'Title must be a non-empty string with max 40 characters', field: 'title' });
    }
    if (!video.author || typeof video.author !== 'string' || video.title.trim().length < 1 || video.title.length > 20) {
        errors.push({ message: 'Author must be a non empty string with max 20 charachters', field: 'author' });
    }
    ;
    const values = Object.values(settings_1.RESOLUTIONS);
    if (!Array.isArray(video.availableResolution) ||
        video.availableResolution.some((res) => !values.includes(res))) {
        errors.push({ message: 'Invalid resolutions', field: 'available resolutions' });
    }
    return errors;
};
exports.app.post('/hometask_01/api/videos', (req, res) => {
    const newVideo = {
        id: Date.now() + Math.random(),
        title: req.body.title,
        author: req.body,
        availableResolutions: [],
        canBeDownloaded: false,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString() //здесь нужно доработать
    };
    db_1.db.videos.push(newVideo);
    res.send(201).json(newVideo);
});
