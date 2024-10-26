import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { Task, TaskContextType, Filter } from '../utils/Types';

const TaskContext = createContext<TaskContextType | undefined>(undefined);

const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [history, setHistory] = useState<Task[][]>([]);
  const [redoHistory, setRedoHistory] = useState<Task[][]>([]);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string) => {
    const newTask = { id: Date.now(), text, completed: false };
    setHistory([...history, tasks]);
    setTasks([...tasks, newTask]);
    setRedoHistory([]);
  };

  const deleteTask = (id: number) => {
    setHistory([...history, tasks]);
    setTasks(tasks.filter((task) => task.id !== id));
    setRedoHistory([]);
  };

  const toggleTask = (id: number) => {
    setHistory([...history, tasks]);
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    setRedoHistory([]);
  };

  const undo = () => {
    if (history.length === 0) return;
    const lastState = history[history.length - 1];
    setHistory(history.slice(0, -1));
    setRedoHistory([tasks, ...redoHistory]);
    setTasks(lastState);
  };

  const redo = () => {
    if (redoHistory.length === 0) return;
    const nextState = redoHistory[0];
    setRedoHistory(redoHistory.slice(1));
    setHistory([...history, tasks]);
    setTasks(nextState);
  };

  const filterTasks = (status: Filter) => {
    if (status === 'completed') return tasks.filter((task) => task.completed);
    if (status === 'incomplete') return tasks.filter((task) => !task.completed);
    return tasks;
  };

  const searchTasks = (searchKey: string, data: Task[]) => {
    return data.filter(({ text }) =>
      text.toLowerCase().includes(searchKey.toLowerCase())
    );
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        toggleTask,
        filterTasks,
        searchTasks,
        undo,
        redo,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

const useTasks = (): TaskContextType => {
  const context = useContext(TaskContext);
  if (!context) throw new Error('useTasks must be used within TaskProvider');
  return context;
};

export { TaskProvider, useTasks };
