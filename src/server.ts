import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import db from './db'; // Import the database instance
import postRoutes from './routes/postRoutes';
import { getAllPosts } from './controllers/postController';

const app: Express = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

// --- Database Middleware ---
// This middleware ensures the database is loaded before any route is handled.
// This is a robust pattern for serverless environments like Vercel.
app.use(async (req: Request, res: Response, next: NextFunction) => {
    try {
        // db.data will be null on the first request to a new serverless instance.
        if (!db.data) {
            console.log("Database not loaded. Reading now...");
            await db.read();
            console.log("Database read complete.");
        }
        next(); // Proceed to the next route handler
    } catch (error) {
        console.error("Failed to load database:", error);
        res.status(500).json({ message: "Failed to initialize database" });
    }
});

// --- API Routes ---
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("Backend API is running successfully!");
});
app.get('/api/posts', getAllPosts);
app.use('/admin', postRoutes);

// --- Conditional Listen for Local Development ---
// This will be ignored by Vercel but allows `npm run dev` to work locally.
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Backend server starting for local development on http://localhost:${port}`);
    });
}

// --- Export for Vercel ---
// Vercel uses this default export to run the app.
export default app;
