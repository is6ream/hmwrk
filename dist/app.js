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
const getVideosController_1 = require("./videos/getVideosController");
const video_types_1 = require("./input-output-types/video-types");
exports.app = (0, express_1.default)(); // создать приложение
exports.app.use(express_1.default.json()); // создание свойств-объектов body и query во всех реквестах
exports.app.use((0, cors_1.default)()); // разрешить любым фронтам делать запросы на наш бэк
exports.app.get('/hometask_01/api/videos/:id', (req, res) => {
    const videoId = Number(req.params.id);
    const findVideo = db_1.db.videos.find(video => video.id === videoId);
    if (!findVideo) {
        res.status(settings_1.STATUSES.NOT_FOUND_404).json({ message: 'Не найдено' });
    }
    res.json(findVideo);
});
exports.app.put('/hometask_01/api/videos/:id', (req, res) => {
    var _a;
    const videoId = Number(req.params.id);
    const findVideo = db_1.db.videos.find(video => video.id === videoId);
    if (findVideo) {
        findVideo.title = req.body.title || findVideo.title;
        findVideo.author = req.body.author || findVideo.author;
        findVideo.availableResolutions = req.body.availableResolutions || findVideo.availableResolutions;
        findVideo.canBeDownloaded = (_a = req.body.canBeDownloaded) !== null && _a !== void 0 ? _a : findVideo.canBeDownloaded;
        findVideo.minAgeRestriction = req.body.minAgeRestriction || findVideo.minAgeRestriction;
        res.status(settings_1.STATUSES.OK_200).json(findVideo);
        return;
    }
    res.status(settings_1.STATUSES.NOT_FOUND_404).json({ "message": "Видео не найдено" });
});
exports.app.delete('/hometask_01/api/videos/:id', (req, res) => {
    for (let i = 0; i < db_1.db.videos.length; i++) {
        if (db_1.db.videos[i].id === +req.params.id) {
            db_1.db.videos.splice(i, 1);
            res.status(settings_1.STATUSES.NO_CONTENT_204);
            return;
        }
    }
    res.status(settings_1.STATUSES.NOT_FOUND_404);
});
const inputValidation = (video) => {
    const errors = {
        errorMessages: []
    };
    if (!video.title || typeof video.title !== 'string' || video.title.trim().length === 0 || video.title.length > 40) {
        errors.errorMessages.push({ message: 'invalid title', field: 'title' });
    }
    if (!video.author || typeof video.author !== 'string' || video.author.trim().length === 0 || video.author.length > 20) {
        errors.errorMessages.push({ message: 'invalid author', field: 'author' });
    }
    if (!Array.isArray(video.availableResolutions) ||
        video.availableResolutions.find(p => !video_types_1.RESOLUTIONS[p])) {
        errors.errorMessages.push({ message: "invalid resolutions", field: "available resolution" });
    }
    return errors;
};
exports.app.post('/hometask_01/api/videos', (req, res) => {
    const errors = inputValidation(req.body);
    if (errors.errorMessages.length) {
        res
            .status(settings_1.STATUSES.BAD_REQUEST_400)
            .json(errors);
        return;
    }
    const date = new Date();
    const newVideo = Object.assign(Object.assign({}, req.body), { id: +Date.now() + Math.random(), title: req.body.title, author: req.body.author, availableResolutions: video_types_1.RESOLUTIONS, canBeDownloaded: false, minAgeRestriction: null, createdAt: date.toISOString(), publicationDate: new Date(date.setDate(date.getDate() + 1)) });
    db_1.db.videos = [...db_1.db.videos, newVideo];
    res.status(settings_1.STATUSES.CREATED_201).json(newVideo);
});
exports.app.get(settings_1.SETTINGS.PATH.VIDEOS, getVideosController_1.getVideosController);
