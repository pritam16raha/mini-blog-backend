import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import db from './db'; // Import the database instance
import postRoutes from './routes/postRoutes';
import { getAllPosts } from './controllers/postController';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// --- API Routes ---
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Backend API is running successfully!");
});
app.get('/api/posts', getAllPosts);
app.use('/admin', postRoutes);


// --- Main Application Startup Function ---
const startServer = async () => {
    try {
        // 1. Await the database read to ensure it's loaded before we proceed.
        await db.read();
        console.log("Database connected and loaded successfully.");

        // 2. Only listen if we are in a local development environment.
        if (process.env.NODE_ENV !== 'production') {
            app.listen(port, () => {
                console.log(`Backend server is running for local development on http://localhost:${port}`);
            });
        }
    } catch (error) {
        console.error("Failed to start the server:", error);
        process.exit(1); // Exit the process if the database fails to load
    }
};

// --- Execute the startup function ---
startServer();


// --- Export for Vercel ---
// Vercel uses this default export to run the app as a serverless function.
export default app;
