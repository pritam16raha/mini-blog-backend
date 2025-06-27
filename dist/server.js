"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const postRoutes_1 = __importDefault(require("./routes/postRoutes"));
const postController_1 = require("./controllers/postController");
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.status(200).send("Backend API is running successfully!");
});
app.use('/api/posts', postController_1.getAllPosts);
app.use('/admin', postRoutes_1.default);
if (process.env.NODE_ENV !== 'production') {
    app.listen(port, () => {
        console.log(`Backend server is running for local development on http://localhost:${port}`);
    });
}
exports.default = app;
