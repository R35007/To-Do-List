import { Controller, Get, Post, Put, Delete } from "@overnightjs/core";
import { Request, Response } from "express";

import Path from "path";

@Controller("api")
export class MainController {
  @Get("tasks/:date/:month/:year")
  getTasks(req: Request, res: Response) {
    res.send([]);
  }

  @Get("*")
  getAssets(req: Request, res: Response) {
    const url = req.params[0];
    res.sendFile(Path.resolve(__dirname, `../../../../${url}`));
  }

  @Post("tasks/:date/:month/:year")
  insertTask(req: Request, res: Response) {
    console.log("post");
  }

  @Put("tasks/:date/:month/:year")
  updateTask(req: Request, res: Response) {
    console.log("update");
  }

  @Delete("tasks/:date/:month/:year")
  removeTask(req: Request, res: Response) {
    console.log("delete");
  }
}
