import React from 'react';

// Type alias for filter tabs
export type FilterType = 'All' | 'Active' | 'Completed';

// Interface for Todo object shape
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

// Interface for component props
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggle, onDelete }) => {
  return (
    <div
      className={`group flex items-center justify-between p-4 rounded-xl border transition-all ${
        todo.completed 
          ? 'bg-slate-950/40 border-slate-900 text-slate-500' 
          : 'bg-slate-950 border-slate-800 text-slate-200 hover:border-slate-700'
      }`}
    >
      <div 
        className="flex items-center gap-3.5 flex-1 min-w-0 cursor-pointer" 
        onClick={() => onToggle(todo.id)}
      >
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => {}}
          className="w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-0 bg-slate-900 cursor-pointer"
        />
        <span className={`text-sm truncate ${todo.completed ? 'line-through text-slate-500' : 'text-slate-200'}`}>
          {todo.text}
        </span>
      </div>

      <button
        onClick={() => onDelete(todo.id)}
        className="text-slate-600 hover:text-red-400 p-1.5 rounded-lg hover:bg-slate-900 transition opacity-0 group-hover:opacity-100 ml-2"
        title="Delete"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2.028 2.028 0 0116.138 21H7.862a2.028 2.028 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </div>
  );
};