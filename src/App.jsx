import { useState, useEffect } from "react";
import { FaEdit, FaTrash, FaPlus, FaCheckCircle, FaRegCircle } from "react-icons/fa";

export default function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Sync with localStorage (Sirf ek useEffect kaafi hai)
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex].text = input;
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { text: input, completed: false }]);
    }
    setInput("");
  };

  const deleteTask = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  };

  const toggleComplete = (index) => {
    const updated = [...tasks];
    updated[index].completed = !updated[index].completed;
    setTasks(updated);
  };

  const editTask = (index) => {
    setInput(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <div className="min-h-screen bg-[#0f172a] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      
      {/* Main Container with Glassmorphism */}
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl shadow-2xl p-6 w-full max-w-md">
        
        <header className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            My Tasks
          </h1>
          <p className="text-slate-400 text-sm mt-2">Stay organized and productive</p>
        </header>

        {/* Input Section */}
        <div className="flex gap-2 mb-8">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTask()}
            placeholder="What needs to be done?"
            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-3 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
          />
          <button
            onClick={addTask}
            className={`${
              editIndex !== null ? "bg-amber-500 hover:bg-amber-600" : "bg-purple-600 hover:bg-purple-700"
            } text-white p-4 rounded-2xl transition-all duration-300 shadow-lg flex items-center justify-center`}
          >
            {editIndex !== null ? <FaEdit /> : <FaPlus />}
          </button>
        </div>

        {/* Task List */}
        <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
          {tasks.length === 0 && (
            <p className="text-center text-slate-500 py-10 italic">No tasks yet. Add one above!</p>
          )}
          
          {tasks.map((task, index) => (
            <div
              key={index}
              className="group flex items-center justify-between bg-white/5 hover:bg-white/10 border border-white/5 p-4 rounded-2xl transition-all duration-200"
            >
              <div 
                className="flex items-center gap-3 cursor-pointer flex-1"
                onClick={() => toggleComplete(index)}
              >
                <div className="text-xl">
                  {task.completed ? (
                    <FaCheckCircle className="text-emerald-400" />
                  ) : (
                    <FaRegCircle className="text-slate-500" />
                  )}
                </div>
                <span
                  className={`text-lg transition-all ${
                    task.completed ? "line-through text-slate-500" : "text-slate-200"
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => editTask(index)}
                  className="p-2 text-slate-400 hover:text-cyan-400 transition-colors"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-between text-xs text-slate-500 uppercase tracking-widest font-semibold">
          <span>Total: {tasks.length}</span>
          <span>Done: {tasks.filter(t => t.completed).length}</span>
        </div>
      </div>
    </div>
  );
}