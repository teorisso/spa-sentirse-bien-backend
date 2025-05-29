import express from "express";
import { turnoController } from "./controller";

const turnoRouter = express.Router();

const { getTurnos, getTurno, getUserTurnos, createTurno, editTurno, deleteTurno } = turnoController;

turnoRouter.get("/", getTurnos);
turnoRouter.post("/create", createTurno);   // ✅ Mover ANTES de /:id
turnoRouter.get("/user/:id", getUserTurnos);
turnoRouter.put("/edit/:id", editTurno);
turnoRouter.delete("/delete/:id", deleteTurno);
turnoRouter.get("/:id", getTurno);          // ✅ Mover AL FINAL

export default turnoRouter;