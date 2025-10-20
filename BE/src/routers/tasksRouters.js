import express from 'express'
import { getAllTasks,createTask,updateTask,deleteTask } from '../controller/tasksControllers.js'

const router = express.Router()

router.get("/tasks", getAllTasks)

router.post("/tasks",createTask)

router.put("/tasks/:id",updateTask)
router.delete("/tasks/:id",deleteTask)

export default router;