"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.videosRouter = void 0;
const express_1 = require("express");
const getVideosController_1 = require("../videos/getVideosController");
exports.videosRouter = (0, express_1.Router)();
exports.videosRouter.get('/', getVideosController_1.getVideosController);
