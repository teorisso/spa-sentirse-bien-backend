import express from "express";
import { turnoController } from "./controller";

const turnoRouter = express.Router();

const { getTurnos, getTurno, createTurno, editTurno, deleteTurno } = turnoController;

turnoRouter.get("/", getTurnos);
turnoRouter.get("/:id", getTurno);
turnoRouter.post("/create", createTurno);
turnoRouter.delete("/delete/:id", deleteTurno);
turnoRouter.put("/edit/:id", editTurno);

export default turnoRouter;