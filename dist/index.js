"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const connectDb_1 = __importDefault(require("./config/connectDb"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes")); // Import user routes
const chatRoute_1 = __importDefault(require("./routes/chatRoute")); // Import chat routes
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies and credentials
}));
app.use(express_1.default.json());
app.use('/api/chat', chatRoute_1.default); // Use chat routes for API requests
app.use('/api/users', userRoutes_1.default); // Use user routes for API requests
app.get('/', (req, res) => {
    res.send('API is running...');
});
const PORT = process.env.PORT || 4000;
(0, connectDb_1.default)();
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
