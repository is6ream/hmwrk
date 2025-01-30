"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findVideoController = void 0;
const db_1 = require("../db/db");
const findVideoController = (req, res) => {
    const { id } = req.params;
    const videos = db_1.db.videos.find((video) => video.id === id);
    res.status(200).json(videos);
};
exports.findVideoController = findVideoController;
