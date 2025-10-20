import AddTask from "@/components/AddTask";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import StatsAndFilters from "@/components/StatsAndFilters";
import TaskList from "@/components/TaskList";
import TaskListPagination from "@/components/TaskListPagination";
import DateTimeFilter from "@/components/DateTimeFilter";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import api from "@/lib/axios";
import { visibleTaskLimit } from "@/lib/data";

const HomePage = () => {
  const [taskBuffer, setTaskBuffer] = useState([]);
  const [activeTasksCount, setActiveTasksCount] = useState(0);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [filter, setFilter] = useState("all");
  const [DateQuery, setDateQuery] = useState("today");
  const [page , setPage] = useState(1)



  useEffect(() => {
    fetchTasks();
  }, [DateQuery]);

  useEffect(() =>{
    setPage(1);
  },[filter,DateQuery])

  
  const fetchTasks = async () => {
    try {
      const response = await api.get(`/tasks?filter=${DateQuery}`);
      setTaskBuffer(response.data.tasks);
      setActiveTasksCount(response.data.activeCount);
      setCompletedTasksCount(response.data.completedCount);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
    }
  }
  const filteredTasks = taskBuffer.filter((task) => {
    if (filter === "active") return task.status === "active";
    if (filter === "completed") return task.status === "completed";
    return true;
  });

  const handleTaskChange = () => {
    fetchTasks();
  }
  const handleNext = () =>{
    if(page < totalPages){
      setPage((prve) => prve +1)
    }
  };
  const handlePrev = () =>{
    if(page > 1 ){
      setPage((prev) => prev - 1);
    }
  }

  const handlePageChange = (newPage) => {
    setPage(newPage)
  }

  const visibleTasks = filteredTasks.slice(
    (page - 1) * visibleTaskLimit,
    page * visibleTaskLimit
  );

  if(visibleTasks.length === 0){
    handlePrev();
  }
  const totalPages = Math.ceil(filteredTasks.length / visibleTaskLimit);



  return (
    <div className="min-h-screen w-full bg-white relative">
      {/* Dual Gradient Overlay Swapped Background */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `
        linear-gradient(to right, rgba(229,231,235,0.8) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(229,231,235,0.8) 1px, transparent 1px),
        radial-gradient(circle 500px at 20% 20%, rgba(139,92,246,0.3), transparent),
        radial-gradient(circle 500px at 80% 80%, rgba(59,130,246,0.3), transparent)
      `,
          backgroundSize: "48px 48px, 48px 48px, 100% 100%, 100% 100%",
        }}
      />
      {/* Your Content/Components */}
      <div className="container pt-8 mx-auto relative z-10 ">
        <div className="w-full max-w-2xl p-6 mx-auto space-y-6">
          {/* đầu trang */}
          <Header  />
          {/* Tạo nhiệm vụ */}
          <AddTask handleNewTaskAdded={handleTaskChange} />
          {/* Thống kê và bộ lọc */}
          <StatsAndFilters
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
            filter={filter}
            setFilter={setFilter}
          />
          {/* Danh sách nhiệm vụ */}
          <TaskList  filteredTasks={visibleTasks} filter={filter} handleTaskChange={handleTaskChange} />
          {/* Phân trang và bộ lọc ngày giờ */}
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <TaskListPagination
            handleNext={handleNext}
            handlePrev={handlePrev}
            handlePageChange={handlePageChange}
            page={page}
            totalPages={totalPages}
            
            />
            <DateTimeFilter DateQuery={DateQuery} setDateQuery={setDateQuery} />
          </div>
          {/* chân trang */}
          <Footer
            activeTasksCount={activeTasksCount}
            completedTasksCount={completedTasksCount}
          />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
