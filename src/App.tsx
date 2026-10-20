import React, { useState, useEffect } from 'react';
import { TodoItem } from './TodoItem';
import type { Todo, FilterType } from './TodoItem';

const App: React.FC = () => {
  // Typed state with generic array of Todo
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('pro_todos');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [inputText, setInputText] = useState<string>('');
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    localStorage.setItem('pro_todos', JSON.stringify(todos));
  }, [todos]);

  // Typed form submit handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputText.trim(),
      completed: false,
    };

    setTodos([newTodo, ...todos]);
    setInputText('');
  };

  const toggleTodo = (id: number): void => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number): void => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos: Todo[] = todos.filter((todo) => {
    if (filter === 'Active') return !todo.completed;
    if (filter === 'Completed') return todo.completed;
    return true;
  });

  const completedCount: number = todos.filter((t) => t.completed).length;
  const progress: number = todos.length > 0 ? Math.round((completedCount / todos.length) * 100) : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="px-8 pt-8 pb-6 border-b border-slate-800 bg-slate-900/50 backdrop-blur">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-white flex items-center gap-2">
                <span className="inline-block w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                Task Manager
              </h1>
              <p className="text-slate-400 text-sm mt-0.5">TypeScript & React Workspace</p>
            </div>
            <div className="text-right">
              <span className="text-xs font-medium px-2.5 py-1 bg-slate-800 text-slate-300 rounded-full border border-slate-700">
                {completedCount}/{todos.length} Completed
              </span>
            </div>
          </div>

          <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-blue-500 h-full transition-all duration-500 ease-out" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Input Form */}
        <div className="p-8 space-y-6">
          <form onSubmit={handleSubmit} className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputText(e.target.value)}
              placeholder="Enter a new task..."
              className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-6 py-3 rounded-xl text-sm transition shadow-lg shadow-blue-600/20 active:scale-[0.98]"
            >
              Add Task
            </button>
          </form>

          {/* Filter Controls */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-medium">
              {(['All', 'Active', 'Completed'] as FilterType[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-4 py-1.5 rounded-lg transition ${
                    filter === tab 
                      ? 'bg-slate-800 text-white shadow-sm' 
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <span className="text-xs text-slate-500">Showing {filteredTodos.length} items</span>
          </div>

          {/* Task List */}
          <div className="space-y-3 max-h-[340px] overflow-y-auto pr-1">
            {filteredTodos.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-slate-800 rounded-2xl bg-slate-950/50">
                <p className="text-slate-500 text-sm">No tasks found.</p>
              </div>
            ) : (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default App;