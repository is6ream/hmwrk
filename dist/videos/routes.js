"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const videoControllers_1 = require("./videoControllers");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/videos', videoControllers_1.videoControllers.getVideosController);
exports.videosRouter.post('/videos', videoControllers_1.videoControllers.createVideoController);
exports.videosRouter.get('/videos/:id', videoControllers_1.videoControllers.findVideoController);
exports.videosRouter.delete('/testing/all-data', videoControllers_1.videoControllers.deleteVideosController);
exports.videosRouter.delete('/videos/:id', videoControllers_1.videoControllers.deleteVideosController);
// videosRouter.delete('/', videoControllers.deleteVideosController)
exports.videosRouter.put('/videos/:id', videoControllers_1.videoControllers.updateVideoController);
