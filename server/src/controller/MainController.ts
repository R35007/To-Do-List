import { Controller, Get, Post, Put, Delete } from "@overnightjs/core";
import { Request, Response } from "express";

import Path from "path";
import fs from "fs";
import { ITask } from "../model/task.model";
import { convertDateNumberToTime } from "../utils/utils";
const TASKPATH = Path.resolve(__dirname, `../../../assets/tasks.json`);

@Controller("api")
export class MainController {
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  @Get("tasks/all")
  getAllTasks(req: Request, res: Response) {
    const tasks = JSON.parse(fs.readFileSync(TASKPATH, "utf-8"));
    const data = tasks.filter((task: ITask) => !task.deleteOnTime);
    res.send(data);
  }

  @Get("tasks/:selectedTime")
  getTasks(req: Request, res: Response) {
    const selectedTime = convertDateNumberToTime(req.params.selectedTime);
    const tasks = JSON.parse(fs.readFileSync(TASKPATH, "utf-8"));

    const data = tasks.filter((task: ITask) => {
      const { openOnTime, doneOnTime = 0, deleteOnTime = 0 } = task;
      return (
        openOnTime <= selectedTime &&
        deleteOnTime == 0 &&
        (doneOnTime >= selectedTime || doneOnTime == 0)
      );
    });
    res.send(data);
  }

  @Post("tasks")
  insertTask(req: Request, res: Response) {
    const newData = req.body;
    const tasks = JSON.parse(fs.readFileSync(TASKPATH, "utf-8"));
    newData.id = tasks.length + 1;
    tasks.push(newData);
    fs.writeFileSync(TASKPATH, JSON.stringify(tasks, null, 4), "utf8");
    res.send(newData);
  }

  @Put("tasks")
  updateTask(req: Request, res: Response) {
    const updatedData = req.body;
    const tasks = JSON.parse(fs.readFileSync(TASKPATH, "utf-8"));
    const dataIndex = tasks.findIndex((task: ITask) => task.id == updatedData.id);
    tasks[dataIndex] = updatedData;
    fs.writeFileSync(TASKPATH, JSON.stringify(tasks, null, 4), "utf8");
    res.send(updatedData);
  }

  @Delete("tasks")
  removeTask(req: Request, res: Response) {
    const removeData = req.body;
    const tasks = JSON.parse(fs.readFileSync(TASKPATH, "utf-8"));
    const dataIndex = tasks.findIndex((task: ITask) => task.id == removeData.id);
    tasks[dataIndex] = removeData;
    fs.writeFileSync(TASKPATH, JSON.stringify(tasks, null, 4), "utf8");
    res.send(removeData);
  }

  @Get("*")
  getAssets(req: Request, res: Response) {
    const url = req.params[0];
    res.sendFile(Path.resolve(__dirname, `../../../../${url}`));
  }
}
