
import express from "express";
import dotenv from 'dotenv';
import mongoose from "mongoose";
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
const port = process.env.PORT || 3000;
app.use(express.json());

app.use("/api/user",userRoutes);
app.get('/',(req,res)=>{
    res.send("Hellooooo")
})
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
