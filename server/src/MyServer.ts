import * as bodyParser from "body-parser";

import { Server } from "@overnightjs/core";
import { MainController } from "./controller/MainController";

export class MyServer extends Server {
  private static instance: MyServer;
  constructor() {
    super();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    let mainController = new MainController();
    super.addControllers([mainController]);
  }

  public static getInstance(): MyServer {
    if (!MyServer.instance) {
      MyServer.instance = new MyServer();
    }
    return MyServer.instance;
  }

  public start(port: number = 3001) {
    this.app.listen(port, () => {
      console.log("Server listening on port: " + port);
    });
  }
}
