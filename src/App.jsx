import { useState, useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function App() {
const [tasks, setTasks] = useState(() => {
  const savedTasks = localStorage.getItem("tasks");
  return savedTasks ? JSON.parse(savedTasks) : [];
});  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  // Load from localStorage
 useEffect(() => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}, [tasks]);

  // Save to localStorage
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 bg-indigo-900 to-purple-600 flex items-center justify-center p-6">

      <div className="bg-purple-500 rounded-3xl shadow-2xl p-8 w-full max-w-md h-4xl">
        
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          To-Do App 
        </h1>

        {/* Input */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter task..."
            className="flex-1 border rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <button
            onClick={addTask}
            className="bg-green-500 text-purple hover:bg-green-600 px-4 py-2 rounded-xl"
          >
            {editIndex !== null ? "Update" : "Add"}
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3 max-h-80 overflow-y-auto">
          {tasks.map((task, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-gray-100 p-3 rounded-xl"
            >
              <span
                onClick={() => toggleComplete(index)}
                className={`cursor-pointer flex-1 ${
                  task.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {task.text}
              </span>

              <div className="flex gap-2 ml-2">
                <button
                  onClick={() => editTask(index)}
                  className="text-blue-500"
                >
                    <FaEdit className="text-green-500 text-xl"/>
                </button>
                <button
                  onClick={() => deleteTask(index)}
                  className="text-red-500"
                >
                   <FaTrash className="text-red-600 text-xl"/>
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}