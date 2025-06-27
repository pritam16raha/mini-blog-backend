"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getAllPosts = void 0;
const db_1 = __importDefault(require("../db"));
const getAllPosts = (req, res) => {
    try {
        const { posts } = db_1.default.data;
        res.status(200).json(posts);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to fetch posts", error });
    }
};
exports.getAllPosts = getAllPosts;
const createPost = async (req, res) => {
    try {
        const { title, body } = req.body;
        if (!title || !body) {
            res.status(400).json({ message: "Title and body are required." });
            return;
        }
        const newPost = {
            id: db_1.default.data.posts.length > 0
                ? Math.max(...db_1.default.data.posts.map((p) => p.id)) + 1
                : 1,
            title,
            body,
        };
        db_1.default.data.posts.push(newPost);
        await db_1.default.write();
        res.status(201).json(newPost);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to create post", error });
    }
};
exports.createPost = createPost;
const updatePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id, 10);
        const { title, body } = req.body;
        const postIndex = db_1.default.data.posts.findIndex((p) => p.id === postId);
        if (postIndex === -1) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        const updatedPost = { ...db_1.default.data.posts[postIndex], title, body };
        db_1.default.data.posts[postIndex] = updatedPost;
        await db_1.default.write();
        res.status(200).json(updatedPost);
    }
    catch (error) {
        res.status(500).json({ message: "Failed to update post", error });
    }
};
exports.updatePost = updatePost;
const deletePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id, 10);
        const postIndex = db_1.default.data.posts.findIndex((p) => p.id === postId);
        if (postIndex === -1) {
            res.status(404).json({ message: "Post not found" });
            return;
        }
        db_1.default.data.posts.splice(postIndex, 1);
        await db_1.default.write();
        res.status(200).json({ message: "Post deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Failed to delete post", error });
    }
};
exports.deletePost = deletePost;
