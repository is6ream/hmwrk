"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoController = void 0;
const db_1 = require("../db/db");
const deleteVideoController = (req, res) => {
    const { id } = req.params; //получаем id видео из параметров пути
    const videoIndex = db_1.db.videos.findIndex((video) => video.id = id);
    db_1.db.videos.splice(videoIndex, 1);
    res.sendStatus(200).json({ message: "Video deleted successfully" });
    return;
};
exports.deleteVideoController = deleteVideoController;
