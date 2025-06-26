import express, { Express } from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes';
import { getAllPosts } from './controllers/postController';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.get('/api/posts', getAllPosts);

app.use('/admin', postRoutes);

app.listen(port, () => {
    console.log(`Backend server is running on http://localhost:${port}`);
});