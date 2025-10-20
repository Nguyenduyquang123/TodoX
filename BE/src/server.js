import express, { request, response } from 'express'
import taskRouter from './routers/tasksRouters.js'
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import cors from 'cors';
import path from 'path';

dotenv.config();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();


const app = express();

// Middleware
app.use(express.json());

if(process.env.NODE_ENV !== 'production'){
    app.use(cors({origin: 'http://localhost:5173'}));
}


app.use("/",taskRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, "../FE/dist")));

    app.get("*",(request,response)=>{
        response.sendFile(path.join(__dirname, "../FE/dist/index.html"))
})
}

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server chạy trên cổng ${PORT}`)
    })
})

