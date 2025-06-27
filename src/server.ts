import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import postRoutes from './routes/postRoutes';
import { getAllPosts } from './controllers/postController';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Backend API is running successfully!");
});

app.use('/api/posts', getAllPosts);
app.use('/admin', postRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Backend server is running for local development on http://localhost:${port}`);
    });
}

export default app;