"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RESOLUTIONS = exports.STATUSES = exports.SETTINGS = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)(); // добавление переменных из файла .env в process.env
exports.SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 3003,
    PATH: {
        VIDEOS: '/videos',
    },
};
exports.STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404
};
var RESOLUTIONS;
(function (RESOLUTIONS) {
    RESOLUTIONS["P144"] = "P144";
    RESOLUTIONS["P240"] = "P240";
    RESOLUTIONS["P360"] = "P360";
    RESOLUTIONS["P480"] = "P480";
    RESOLUTIONS["P720"] = "P720";
    RESOLUTIONS["P1080"] = "P1080";
    RESOLUTIONS["P1440"] = "P1440";
    RESOLUTIONS["P2160"] = "P2160";
})(RESOLUTIONS || (exports.RESOLUTIONS = RESOLUTIONS = {}));
