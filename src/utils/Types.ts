export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

export type Filter = 'all' | 'completed' | 'incomplete';

export interface TaskContextType {
  tasks: Task[];
  addTask: (text: string) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  filterTasks: (status: Filter) => Task[];
  searchTasks: (searchKey: string, data: Task[]) => Task[];
  undo: () => void;
  redo: () => void;
}
