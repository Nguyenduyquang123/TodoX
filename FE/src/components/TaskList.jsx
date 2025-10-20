import TasksEmptyState from "./TasksEmtyState";
import TaskCart from "./TaskCart";


const TaskList = ({ filteredTasks, filter, handleTaskChange }) => {
   

    if(!filteredTasks || filteredTasks.length === 0){
        return <TasksEmptyState filter={filter} />;
    }

    return (
        <div className="space-y-3">
            {filteredTasks.map((task,index) => (
                <TaskCart
                    key={task.id ?? index}
                    task={task}
                    index={index}
                    handleTaskChange={handleTaskChange}
                />
            ))}
        </div>
    )
}
export default TaskList;