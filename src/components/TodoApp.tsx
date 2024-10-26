import React, { useState } from 'react';
import { useTasks } from '../context/TaskContext';
import TodoItem from './TodoItem';
import { FaSearch, FaUndo, FaRedo } from 'react-icons/fa';
import useDebounce from '../hooks/useDebounce';

const ToDoApp: React.FC = () => {
  const {
    addTask,
    deleteTask,
    toggleTask,
    filterTasks,
    searchTasks,
    undo,
    redo,
  } = useTasks();
  const [filter, setFilter] = useState<'all' | 'completed' | 'incomplete'>(
    'all'
  );
  const [newTask, setNewTask] = useState('');
  const [search, setSeach] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const handleAddTask = () => {
    if (newTask.trim()) {
      addTask(newTask);
      setNewTask('');
    } else {
      alert('Task cannot be empty!');
    }
  };

  return (
    <>
      <div className='flex flex-col items-start md:flex-row md:items-center justify-center gap-4 mb-8'>
        <h1 className='text-2xl font-bold text-center'>Today</h1>

        <div className='relative w-full'>
          <FaSearch className='absolute left-3 top-2.5 text-gray-400' />
          <input
            type='text'
            placeholder='Search'
            value={search}
            onChange={(e) => setSeach(e.target.value)}
            className='w-full p-2 pl-10 border border-gray-400 rounded-full'
          />
        </div>
        <div className='flex justify-center gap-3'>
          {['All', 'Completed', 'Incomplete'].map((filterItem: string) => (
            <button
              key={filterItem}
              onClick={() =>
                setFilter(
                  filterItem.toLowerCase() as 'all' | 'completed' | 'incomplete'
                )
              }
              className={`text-white px-1 py-0 rounded ${
                filter === filterItem.toLowerCase()
                  ? 'bg-green-500'
                  : 'bg-gray-400'
              }`}
            >
              {filterItem}
            </button>
          ))}
          <button
            title='Undo'
            onClick={undo}
            className='bg-gray-100 text-black p-1 rounded border border-black'
          >
            <FaUndo />
          </button>
          <button
            title='Redo'
            onClick={redo}
            className='bg-gray-100 text-black p-1 rounded border  border-black'
          >
            <FaRedo />
          </button>
        </div>
      </div>

      <ul>
        {searchTasks(debouncedSearch, filterTasks(filter)).map((task) => (
          <TodoItem
            key={task.id}
            task={task}
            onDelete={deleteTask}
            onToggleComplete={toggleTask}
          />
        ))}
      </ul>
      <input
        type='text'
        placeholder='Type Something'
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        className='w-full p-2 border border-gray-400 rounded-lg'
      />
      <button
        onClick={handleAddTask}
        className='w-full mt-2 bg-black text-white p-2 rounded-lg mb-4'
      >
        Add Task
      </button>
    </>
  );
};

export default ToDoApp;
