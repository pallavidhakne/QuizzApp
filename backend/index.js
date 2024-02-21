
import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
import cors from 'cors';
import path from "path";
//router files
import userRoutes from './routes/userRoutes.js';
dotenv.config();

(async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (err) {
        console.error("Error connecting to the database", err);
        throw err;
    }
})();

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;
app.use(express.json());

app.use('/api/user',userRoutes);
app.get('/',(req,res)=>{
    res.send("Hellooooo")
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, // Include credentials (e.g., cookies, HTTP authentication) in the CORS request
}));