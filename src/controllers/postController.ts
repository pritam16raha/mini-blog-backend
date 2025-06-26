import { RequestHandler } from "express";
import db from "../db";
import { Post } from "../types";

export const getAllPosts: RequestHandler = (req, res) => {
  try {
    const { posts } = db.data;
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch posts", error });
  }
};

export const createPost: RequestHandler = async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      res.status(400).json({ message: "Title and body are required." });
      return;
    }

    const newPost: Post = {
      id:
        db.data.posts.length > 0
          ? Math.max(...db.data.posts.map((p) => p.id)) + 1
          : 1,
      title,
      body,
    };

    db.data.posts.push(newPost);
    await db.write();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to create post", error });
  }
};

export const updatePost: RequestHandler = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);
    const { title, body } = req.body;
    const postIndex = db.data.posts.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    const updatedPost = { ...db.data.posts[postIndex], title, body };
    db.data.posts[postIndex] = updatedPost;
    await db.write();
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Failed to update post", error });
  }
};

export const deletePost: RequestHandler = async (req, res) => {
  try {
    const postId = parseInt(req.params.id, 10);
    const postIndex = db.data.posts.findIndex((p) => p.id === postId);

    if (postIndex === -1) {
      res.status(404).json({ message: "Post not found" });
      return;
    }

    db.data.posts.splice(postIndex, 1);
    await db.write();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete post", error });
  }
};
