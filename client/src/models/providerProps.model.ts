import { ITask } from "./task.model";

export interface IProviderProps {
  selectedDate: Date;
  tasks: ITask[];
  filteredTasks: ITask[];
  isViewAll: boolean;
  getTasks(selectedDate: Date): void;
  setTasks(tasks: ITask[]): void;
  getAllTasks(): void;
  setFilteredTask(tasks: ITask[]): void;
}
