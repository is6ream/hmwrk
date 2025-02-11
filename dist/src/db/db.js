"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
exports.db = {
    videos: [{
            id: 1,
            title: 'Barca - Juve',
            author: 'Champions league',
            availableResolutions: [],
            canBeDownloaded: false,
            minAgeRestriction: null,
            createdAt: null,
            publicationDate: null
        }],
};
//Partial - это встроенный тип, который создает новый тип на основе типа DBType, делая все его свойства необязательными.
//Это значит, что любый свойства объекта DBType могут быть опущены.
const setDB = (dataset) => {
    if (!dataset) { //значит очищаем базу
        exports.db.videos = [];
        return;
    }
    exports.db.videos = dataset.videos || exports.db.videos; //заменяем старые значения новыми
};
exports.setDB = setDB;
