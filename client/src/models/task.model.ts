export interface ITask {
  id: number;
  summary: string;
  status: string;
  openOn: string;
  inProgressOn: null | string;
  doneOn: undefined | string;
  deletedOn: undefined | string;
  deadLine: undefined | string;
  deadLineTime: undefined | number;
  openOnTime: number;
  inProgressOnTime: undefined | number;
  doneOnTime: undefined | number;
  deleteOnTime: undefined | number;
  priority: number;
  inEdit: boolean;
}
