import { ITask } from "../model/task.model";
import { ITimes } from "../model/times.model";

export function getTimes(task: ITask): ITimes {
  return {
    openOnTime: convertDateToTime(task.openOn),
    inProgressOnTime: convertDateToTime(task.inProgressOn),
    doneOnTime: convertDateToTime(task.doneOn),
    deleteOnTime: convertDateToTime(task.deletedOn)
  };
}

export function convertDateToTime(date: string | null) {
  if (date) {
    const newDate = new Date(date);
    newDate.setHours(0, 0, 0, 0);
    return newDate.getTime();
  }

  return 0;
}
export function convertTimeToTime(time: string) {
  const newDate = new Date(parseInt(time));
  newDate.setHours(0, 0, 0, 0);
  return newDate.getTime();
}
