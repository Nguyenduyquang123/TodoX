import { cn } from "@/lib/utils";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, CheckCircle2, Circle, SquarePen, Trash } from "lucide-react";
import { Input } from "./ui/input";
import api from "@/lib/axios";
import { useState } from "react";
import { toast } from "sonner";

const TaskCart = ({task, index, handleTaskChange}) => {
    const [isEditing, setIsEditing] = useState(false);
    const [updateTaskTitle, setUpdateTaskTitle] = useState(task.title || "");

    const deleteTask = async (taskId) => {
        try {
            await api.delete(`/tasks/${taskId}`);
            handleTaskChange();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    }
    const updateTask = async () => {  
        try {
            setIsEditing(false);     
            await api.put(`/tasks/${task._id}`, { title: updateTaskTitle });
            handleTaskChange();
        } catch (error) {
            console.error("Error updating task:", error);
        }
        
    }

    const toggleTaskCompleteButton = async () => {
        try{
            if(task.status === "active"){
                await api.put(`/tasks/${task._id}`, { 
                    status: "completed",
                    completedAt: new Date().toISOString(),
                });   
                handleTaskChange();
                toast.success("Nhiệm vụ đã được đánh dấu là hoàn thành");
            }else {
                await api.put(`/tasks/${task._id}`, { 
                    status: "active",
                    completedAt: null,
                });
                handleTaskChange();
                toast.success("Nhiệm vụ đã được đánh dấu là chưa hoàn thành");
            }
        }catch (error) {
            console.error("Error toggling task status:", error);
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            updateTask();
        }
    }
    return (
        <Card className={cn(
            "p-4 bg-gradient-card border-0 shadow-custom-md hover:shadow-custom-lg transition-all duration-200 animate-fade-in group",
            task.status === "completed" && "opacity-50"
        )}
        style={{animationDelay: `${index * 50}ms`}}
        >
            <div className="flex items-center gap-4">
                {/* nut tròn */}
                <Button
                    variant='ghost'
                    size="icon"
                    className={cn(
                        "flex-shrink-0 size-8 rounded-full transform-all duration-200",
                        task.status === "completed" 
                        ? "text-success hover:text-success/80"
                        : "text-muted-foreground hover:text-primary"
                    )}
                    onClick={toggleTaskCompleteButton}
                >
                    {task.status === "completed" ? (
                        <CheckCircle2 className="size-5" />
                    ) : (
                        <Circle className="size-5" />
                    )}

                </Button>
                {/* tiêu đề công việc */}
                <div className="flex-1 min-w-0">
                        {isEditing ? (
                            <Input 
                            pkaceholder="Nhập tiêu đề công việc"
                            className="flex-1 h-12 text-base border-border/50 focus:border-primary/50 focus:ring-primary/20"
                            type="text"
                            value={updateTaskTitle}
                            onChange={(e) => setUpdateTaskTitle(e.target.value)}
                            onKeyPress={handleKeyPress}
                            onBlur={() =>{
                                setIsEditing(false);
                                setUpdateTaskTitle(task.title || "");
                            }}
                            />
                        ) :(
                            <p className={cn(
                                "text-base transition-all duration-200",
                                task.status === "completed" ?
                                "line-through text-muted-foreground" :
                                "text-foreground "
                            )}>
                                {task.title}

                            </p>
                        )
                    }
                    {/* ngày tạo & hoàn thành */}
                    <div className="flex items-center gap-1 mt-1">
                        <Calendar className="size-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                            {new Date(task.createdAt).toLocaleString()} 
                        </span>
                        {
                            task.completedAt && (
                                <>
                                <span className="text-sm text-muted-foreground">-</span>
                                <Calendar className="size-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                    {new Date(task.completedAt).toLocaleString()} 
                                </span>
                                
                                </>
                            )
                        }
                        
                    </div>
                </div>

                {/* nút sửa & xóa */}
                <div 
                    className="hidden gap-2 group-hover:inline-flex animate-slide-up"
                >
                    {/* nút sửa */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="flex-shrink-0 transform-colors size-8 text-muted-foreground hover:text-info"
                        onClick={() => {
                            setIsEditing(true);
                            setUpdateTaskTitle(task.title || "");
                        }}
                    >
                       <SquarePen className="size-4" />
                    </Button>
                    {/* nút xóa */}
                    <Button
                        variant="ghost"
                        size="icon"
                         className="flex-shrink-0 transform-colors size-8 text-muted-foreground hover:text-destructive"
                        onClick={() => deleteTask(task._id)}
                    >
                        <Trash className="size-4" />
                    </Button>
                </div>

            </div>
        </Card>
    )
}
export default TaskCart;