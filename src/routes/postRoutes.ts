import { Router } from 'express';
import {
    createPost,
    deletePost,
    getAllPosts,
    updatePost,
} from '../controllers/postController';

const router = Router();
router.get('/posts', getAllPosts);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);

export default router;