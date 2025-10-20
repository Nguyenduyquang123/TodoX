import { Circle } from "lucide-react";
import { Card } from "./ui/card";

const TasksEmptyState = ({filter}) => {
    return (
        <Card 
            className="p-8 text-center border-0 bg-gradient-card shadow-custom-md" 
        >
            <div className="space-y-3">
                <Circle className="size-12 mx-auto text-muted-foreground" />
                <div>
                    <h3 className="font-medium text-foreground"> 
                        {
                            filter ==="active" ?
                            "Không có công việc đang làm" :
                            filter ==="completed" ?
                            "Không có công việc hoàn thành" :
                            "Không có công việc nào, hãy thêm công việc mới"
                        }
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {
                            filter === "all" ? "Thêm nhiệm vụ đầu tiên vào để bắt đầu!" :
                            `Chuyển sang tab 'Tất cả' để xem tất cả nhiệm vụ ${
                                filter === "active" ? " đang làm" : " hoàn thành"
                            }`
                        }
                    </p>
                </div>
            </div>
        </Card>
    )
}
export default TasksEmptyState;