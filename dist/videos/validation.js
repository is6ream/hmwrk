"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putInputValidation = exports.inputValidation = void 0;
const video_types_1 = require("./../input-output-types/video-types");
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
exports.inputValidation = inputValidation;
const putInputValidation = (video) => {
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
    if (typeof video.canBeDownloaded !== 'boolean') {
        errors.errorsMessages.push({ message: "error!!!", field: "canBeDownloaded" });
    }
    if (video.minAgeRestriction !== undefined && (typeof video.minAgeRestriction !== 'number' || video.minAgeRestriction < 1 || video.minAgeRestriction > 18)) {
        errors.errorsMessages.push({ message: "error!", field: "minAgeRestriction" });
    }
    if (isNaN(Date.parse(video.publicationDate))) {
        errors.errorsMessages.push({ message: "error!!!", field: "publicationDate" });
    }
    return errors;
};
exports.putInputValidation = putInputValidation;
