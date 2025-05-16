import express from "express";
import { turnoController } from "./controller";

const turnoRouter = express.Router();

const { getTurnos, getTurno, getUserTurnos,createTurno, editTurno, deleteTurno } = turnoController;

turnoRouter.get("/", getTurnos);
turnoRouter.get("/user/:id", getUserTurnos); // More specific route first
turnoRouter.get("/:id", getTurno);          // Generic parameter route second
turnoRouter.post("/create", createTurno);
turnoRouter.delete("/delete/:id", deleteTurno);
turnoRouter.put("/edit/:id", editTurno);

export default turnoRouter;