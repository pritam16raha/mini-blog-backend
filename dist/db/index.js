"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lowdb_1 = require("lowdb");
const node_1 = require("lowdb/node");
const path_1 = __importDefault(require("path"));
const file = path_1.default.join(__dirname, '..', '..', 'db.json');
const adapter = new node_1.JSONFile(file);
const db = new lowdb_1.Low(adapter, { posts: [] });
db.read();
exports.default = db;
