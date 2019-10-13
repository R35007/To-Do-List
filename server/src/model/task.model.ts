export interface ITask {
  id: number;
  name: string;
  description: string;
  status: string;
  openOn: string;
  inProgressOn: null | string;
  doneOn: null | string;
  deletedOn: null | string;
}
