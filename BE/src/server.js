import express, { request, response } from 'express'
import taskRouter from './routers/tasksRouters.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors';

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();

// Middleware
app.use(express.json());
app.use(cors({origin: 'http://localhost:5173'}));

app.use("/",taskRouter)

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server chạy trên cổng ${PORT}`)
    })
})

