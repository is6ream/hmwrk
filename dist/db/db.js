"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setDB = exports.db = void 0;
const date = new Date();
exports.db = {
    videos: [{
            id: 0,
            title: 'Barca - Juve',
            author: 'Champions league',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: date.toISOString(),
            publicationDate: new Date(date.setDate(date.getDate() + 1)).toISOString(),
            availableResolutions: [
                "P144"
            ]
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
