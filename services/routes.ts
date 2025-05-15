import express from "express";
import { serviceController } from "./controller";

const serviceRouter = express.Router();

const { createService, getServices, getService, editService, deleteService } = serviceController;

serviceRouter.get("/", getServices);
serviceRouter.get("/name/:name", getService);
serviceRouter.post("/create", createService);
serviceRouter.delete("/delete/:id", deleteService);
serviceRouter.put("/edit/:id", editService);

export default serviceRouter;