"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVideoController = void 0;
const db_1 = require("./../db/db");
exports.findVideoController = ((req, res) => {
    const videoId = req.params.id;
    const findVideo = db_1.db.videos.find(video => video.id === videoId);
    if (!findVideo) {
        res.status(401)
            .json({ message: 'Не найдено' });
    }
    res.json(findVideo);
});
