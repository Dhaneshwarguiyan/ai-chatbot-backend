import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import connectDb from './config/connectDb';
import userRoutes from './routes/userRoutes'; // Import user routes
import chatRoutes from './routes/chatRoute'; // Import chat routes

dotenv.config();
const app = express();


app.use(cors({
    origin: [process.env.FRONTEND_URL as string ,'http://localhost:3000'], // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed HTTP methods
    credentials: true, // Allow cookies and credentials
}));
app.use(express.json());

app.use('/api/chat', chatRoutes); // Use chat routes for API requests
app.use('/api/user', userRoutes); // Use user routes for API requests
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 4000

connectDb();
app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`)
})