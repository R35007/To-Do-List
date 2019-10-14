export interface ITask {
  id: number;
  name: string;
  description: string;
  status: string;
  openOn: string;
  inProgressOn: null | string;
  doneOn: null | string;
  deletedOn: null | string;
  openOnTime: number;
  inProgressOnTime: null | number;
  doneOnTime: null | number;
  deletedOnTime: null | number;
}
