import Task from "../models/Task.js";


export const getAllTasks = async (request,response) =>{
    const { filter = "today" } = request.query;
    const now = new Date();
    let startDate;

    if(filter === "today"){
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    }
    if(filter === "week"){
        const mondayDate = now.getDate() - (now.getDay() - 1)  - (now.getDay() === 0 ? 7 : 0);
        startDate = new Date(now.getFullYear(), now.getMonth(), mondayDate);
    }
    if(filter === "month"){
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
    }
    if(filter === "all"){
        startDate = null; // Ngày bắt đầu từ epoch time
    }

    const query = startDate ? { createdAt: { $gte: startDate } } : {};

    try{
        const result = await Task.aggregate([
            {
                $match: query
            },
            {
                $facet:{
                    tasks:[{ $sort: { createdAt: -1 } }],
                    activeCount:[{ $match: { status: "active" } }, { $count: "count" }],
                    completedCount:[{ $match: { status: "completed" } }, { $count: "count" }]
                }
            }
        ])
        const tasks = result[0].tasks;
        const activeCount = result[0].activeCount[0]?.count || 0;
        const completedCount = result[0].completedCount[0]?.count || 0;
        response.status(200).json({ tasks, activeCount, completedCount });
    }catch(error){
        console.error("Lỗi khi lấy danh sách nhiệm vụ:", error);
        response.status(500).json({message: "Lỗi khi lấy danh sách nhiệm vụ"});
    }
}

export const createTask = async (request,response) =>{
    try{
        const {title,status,completedAt} = request.body;
       const task = new Task({title,status,completedAt});

       const newTask = await task.save(); 
        response.status(201).json({message: "Nhiệm vụ đã được tạo thành công", task: newTask});

    }catch(error){
        console.error("Lỗi khi thêm nhiệm vụ:", error);
        response.status(500).json({message: "Lỗi khi thêm nhiệm vụ"});
    }
}

export const updateTask = async (request,response) =>{
    try{
        const { title,status,completedAt } = request.body;
        const updatedTask = await Task.findByIdAndUpdate(
            request.params.id,
            {
                title,
                status,
                completedAt
            },
            { new: true }
        );
        if (!updatedTask) {
            return response.status(404).json({ message: "Nhiệm vụ không tồn tại" });
        }
        response.status(200).json({ message: "Nhiệm vụ đã được cập nhật thành công", task: updatedTask });
    }catch(error){
        console.error("Lỗi khi cập nhật nhiệm vụ:", error);
        response.status(500).json({ message: "Lỗi khi cập nhật nhiệm vụ" });
    }
}

export const deleteTask = async (request,response) =>{
    try{
        const { id } = request.params;
        const deletedTask = await Task.findByIdAndDelete(id);
        if (!deletedTask) {
            return response.status(404).json({ message: "Nhiệm vụ không tồn tại" });
        }
        response.status(200).json({ message: "Nhiệm vụ đã được xóa thành công" });
    }catch(error){
        console.error("Lỗi khi xóa nhiệm vụ:", error);
        response.status(500).json({ message: "Lỗi khi xóa nhiệm vụ" });
    }
}

