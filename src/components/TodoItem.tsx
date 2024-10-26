import React from 'react';
import { Task } from '../utils/Types';
import { RxCross2, RxCheckCircled, RxCircle } from 'react-icons/rx';

interface TodoItemProps {
  task: Task;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  task,
  onDelete,
  onToggleComplete,
}) => (
  <li
    className={`flex justify-between items-center p-2 mb-2 border rounded-lg ${
      task.completed
        ? 'bg-green-100 border-green-500'
        : 'bg-white border-gray-300'
    }`}
  >
    <div
      className='cursor-pointer flex items-center'
      onClick={() => onToggleComplete(task.id)}
    >
      {task.completed ? (
        <RxCheckCircled size={20} className='text-green-500' />
      ) : (
        <RxCircle size={20} className='text-gray-400' />
      )}
      <span className='ml-2'>{task.text}</span>
    </div>

    <button onClick={() => onDelete(task.id)}>
      <RxCross2 size={20} className='text-gray-400' />
    </button>
  </li>
);

export default TodoItem;
