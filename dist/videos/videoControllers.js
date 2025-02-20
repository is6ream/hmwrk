"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videoControllers = void 0;
const db_1 = require("../db/db");
const video_types_1 = require("../input-output-types/video-types");
// const updateValidation = (video) => {
//     const errors = {
//         errorsMessages: []
//     };
//     if (!video.title || video.title.trim().length === 0 || typeof video.title !== "string" || video.title.length > 40) {
//         errors.errorsMessages.push({ message: "error!!!", field: "title" });
//     }
//     if (!video.author || video.author.trim().length === 0 || typeof video.author !== "string" || video.author.length > 20) {
//         errors.errorsMessages.push({ message: "error!!!", field: "author" });
//     }
//     if (!Array.isArray(video.availableResolutions) ||
//         video.availableResolutions.find((p) => !video_types_1.RESOLUTIONS[p])) {
//         errors.errorsMessages.push({ message: "error!!!", field: "availableResolutions" });
//     }
//     if (!video.canBeDownloaded || typeof video.canBeDownloaded !== "boolean") {
//         errors.errorsMessages.push({ message: "error!!!", field: "canBeDownloaded" });
//     }
//     if (video.minAgeRestriction || typeof video.minAgeRestriction !== "number") {
//         errors.errorsMessages.push({ message: "error!!!", field: "minAgeRestriction" });
//     }
//     if (!video.publicationDate || typeof video.publicationDate !== "string") {
//         errors.errorsMessages.push({ message: "error!!!", field: "publicationDate" });
//     }
//     return errors;
// }; Остановился тут

const inputValidation = (video) => {
    const errors = {
        errorsMessages: []
    };
    if (!video.title || video.title.trim().length === 0 || typeof video.title !== 'string' || video.title.length > 40) {
        errors.errorsMessages.push({ message: "error!!!", field: "title" });
    }
    if (!video.author || video.author.trim().length === 0 || typeof video.author !== 'string' || video.author.length > 20) {
        errors.errorsMessages.push({ message: "error!!!", field: "author" });
    }
    if (!Array.isArray(video.availableResolutions) ||
        video.availableResolutions.find((p) => !video_types_1.RESOLUTIONS[p])) {
        errors.errorsMessages.push({ message: "error!!!", field: "availableResolutions" });
        console.log(errors);
    }
    return errors;
};
exports.videoControllers = {
    deleteAllVideosController: ((req, res) => {
        const videoId = +req.params.id;
        db_1.db.videos = [];
        res.status(204).send();
    }),
    getVideosController: ((req, res) => {
        const videos = db_1.db.videos;
        res
            .status(200)
            .json(videos);
    }),
    createVideoController: ((req, res) => {
        const errors = inputValidation(req.body);
        console.log("Ошибка валидации: ", errors);
        if (errors.errorsMessages.length) {
            res
                .status(400)
                .json(errors);
            return;
        }
        const date = new Date();
        const newVideo = Object.assign(Object.assign({}, req.body), { id: Date.now() + Math.random(), title: req.body.title, author: req.body.author, canBeDownloaded: false, minAgeRestriction: null, createdAt: date.toISOString(), publicationDate: new Date(date.setDate(date.getDate() + 1)).toISOString(), availableResolutions: ["P144"] });
        db_1.db.videos.push(newVideo);
        console.log(newVideo);
        res.status(201).json(newVideo);
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
    updateVideoController: ((req, res) => {
        var _a, _b;
        const errors = updateValidation(req.body);
        if (errors.errorsMessages.length) {
            res
                .status(400)
                .json(errors);
        }
        const videoId = +req.params.id;
        const findVideo = db_1.db.videos.find(v => v.id === videoId);
        if (!findVideo) {
            res
                .status(404)
                .json({ message: 'Видео не найдено!' });
        }
        findVideo.title = req.body.title || findVideo.title;
        findVideo.author = req.body.author || findVideo.author;
        findVideo.availableResolutions = req.body.availableResolutions || findVideo.availableResolutions;
        findVideo.canBeDownloaded = (_a = req.body.canBeDownloaded) !== null && _a !== void 0 ? _a : findVideo.canBeDownloaded;
        findVideo.minAgeRestriction = (_b = req.body.minAgeRestriction) !== null && _b !== void 0 ? _b : findVideo.minAgeRestriction;
        findVideo.publicationDate = req.body.publicationDate || findVideo.publicationDate;
        res.status(204).send();
    }), //остановился на том, что данные, которые передаются в title undefined
    deleteVideoController: ((req, res) => {
        const videoId = +req.params.id;
        const findVideo = db_1.db.videos.find(v => v.id === videoId);
        if (!findVideo) {
            res
                .status(404)
                .json({ message: 'Видео не найдено!' });
        }
        db_1.db.videos = db_1.db.videos.filter(v => v.id !== videoId);
        res.status(204).send();
    })
};
