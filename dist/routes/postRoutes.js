"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const postController_1 = require("../controllers/postController");
const router = (0, express_1.Router)();
router.get('/posts', postController_1.getAllPosts);
router.post('/posts', postController_1.createPost);
router.put('/posts/:id', postController_1.updatePost);
router.delete('/posts/:id', postController_1.deletePost);
exports.default = router;
