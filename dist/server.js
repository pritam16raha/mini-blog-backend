"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./db")); // Import the database instance
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const postController_1 = require("./controllers/postController");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- Database Middleware ---
// This middleware ensures the database is loaded before any route is handled.
// This is a robust pattern for serverless environments like Vercel.
app.use(async (req, res, next) => {
    try {
        // db.data will be null on the first request to a new serverless instance.
        if (!db_1.default.data) {
            console.log("Database not loaded. Reading now...");
            await db_1.default.read();
            console.log("Database read complete.");
        }
        next(); // Proceed to the next route handler
    }
    catch (error) {
        console.error("Failed to load database:", error);
        res.status(500).json({ message: "Failed to initialize database" });
    }
});
// --- API Routes ---
app.get("/", (req, res) => {
    res.status(200).send("Backend API is running successfully!");
});
app.get('/api/posts', postController_1.getAllPosts);
app.use('/admin', postRoutes_1.default);
// --- Conditional Listen for Local Development ---
// This will be ignored by Vercel but allows `npm run dev` to work locally.
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Backend server starting for local development on http://localhost:${port}`);
    });
}
// --- Export for Vercel ---
// Vercel uses this default export to run the app.
exports.default = app;
