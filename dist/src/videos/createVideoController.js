"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVideoController = void 0;
const video_types_1 = require("../input-output-types/video-types");
exports.createVideoController = ((req, res) => {
    const errors = inputValidation(req.body);
    if (errors.errorsMessages.length) {
        res
            .status(404)
            .json(errors);
        return;
    }
    const date = new Date();
    const newVideo = Object.assign(Object.assign({}, req.body), { id: +Date.now() + Math.random(), title: req.body.title, author: req.body.author, availableResolutions: video_types_1.RESOLUTIONS, canBeDownloaded: false, minAgeRestriction: null, createdAt: date.toISOString(), publicationDate: new Date(date.setDate(date.getDate() + 1)) });
    res.send(201).json(newVideo);
});
