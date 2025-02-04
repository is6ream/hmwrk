"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getVideosController = void 0;
const videos = [
    {
        id: 0,
        title: "string",
        author: "string",
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: ["P144"]
    }
];
const getVideosController = (req, res) => {
    res.status(200).json(videos);
};
exports.getVideosController = getVideosController;
//нужно ли прописать перечень данных здесь, или они должны быть отдельно в бд?
