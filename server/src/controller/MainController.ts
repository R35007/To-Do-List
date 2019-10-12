import { Controller, Get } from "@overnightjs/core";
import { Request, Response } from "express";

import Path from "path";

@Controller("api")
export class MainController {
  @Get("*")
  getAssets(req: Request, res: Response) {
    const url = req.params[0];
    res.sendFile(Path.resolve(__dirname, `../../../../${url}`));
  }
}
