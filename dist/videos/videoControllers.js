"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoControllers = void 0;
const db_1 = require("../db/db");
const video_types_1 = require("../input-output-types/video-types");
const inputValidation = (video) => {
    const errors = {
        errorMessages: []
    };
    if (!video.title || video.title.trim().length === 0 || typeof video.title !== 'string' || video.title.length > 40) {
        errors.errorMessages.push({ message: "invalid title", field: "title" });
    }
    if (!video.author || video.author.trim().length === 0 || typeof video.author !== 'string' || video.author.length > 20) {
        errors.errorMessages.push({ message: "invalid author", field: "author" });
    }
    if (!Array.isArray(video.availableResolutions) ||
        video.availableResolutions.find((p) => !video_types_1.RESOLUTIONS[p])) {
        errors.errorMessages.push({ message: "invalid resolutions", field: "resolutions" });
        console.log(errors);
    }
    return errors;
};
exports.videoControllers = {
    getVideosController: ((req, res) => {
        const videos = db_1.db.videos;
        res
            .status(200)
            .json(videos);
    }),
    findVideoController: ((req, res) => {
        const videoId = +req.params.id;
        const findVideo = db_1.db.videos.find(video => video.id === videoId);
        if (!findVideo) {
            res.status(404)
                .json({ message: 'Не найдено' });
        }
        res.json(findVideo);
    }),
    deleteVideoController: ((req, res) => {
        let videoFound = false; //флаг, чтобы проверить нашли ли мы видео
        for (let i = 0; i < db_1.db.videos.length; i++) {
            if (db_1.db.videos[i].id === +req.params.id) {
                db_1.db.videos.splice(i, 1);
                res.status(204).send();
                videoFound = true;
                break;
            }
        }
        if (!videoFound) {
            res.status(404).send({ message: 'Видео не найдено' });
        }
    }),
    createVideoController: ((req, res) => {
        const errors = inputValidation(req.body);
        if (errors.errorMessages.length) {
            res
                .status(400)
                .json(errors);
            return;
        }
        const date = new Date();
        const newVideo = Object.assign(Object.assign({}, req.body), { id: Date.now() + Math.random(), title: req.body.title, author: req.body.author, canBeDownloaded: false, minAgeRestriction: null, createdAt: date.toISOString(), publicationDate: new Date(date.setDate(date.getDate() + 1)).toISOString(), availableResolutions: ["P144"] });
        db_1.db.videos.push(newVideo);
        res.status(201).json(newVideo);
    }),
    updateVideoController: ((req, res) => {
        let videoId = db_1.db.videos.find(v => v.id === +req.params.id);
        if (videoId) {
            videoId.title = req.body.title,
                videoId.author = req.body.author,
                videoId.availableResolutions = req.body.availableResolutions,
                videoId.canBeDownloaded = req.body.canBeDownloaded,
                videoId.minAgeRestriction = req.body.minAgeRestriction,
                videoId.createdAt = req.body.createdAt,
                videoId.publicationDate = req.body.publicationDate;
            res.send(videoId);
        }
        else {
            res.send(404);
        }
    })
};
