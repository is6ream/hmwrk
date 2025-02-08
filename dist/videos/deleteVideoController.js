"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteVideoController = void 0;
const db_1 = require("../db/db");
exports.deleteVideoController = ((req, res) => {
    for (let i = 0; i < db_1.db.videos.length; i++) {
        if (db_1.db.videos[i].id === +req.params.id) {
            db_1.db.videos.splice(i, 1);
            res.status(201);
            return;
        }
        res.status(404);
    }
});
