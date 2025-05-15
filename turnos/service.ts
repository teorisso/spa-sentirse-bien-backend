import { ITurno } from "./type";
import { turnoDao } from "./dao";

const { getAllTurnos, getTurnoById, createTurno, editTurno, deleteTurno } = turnoDao;

class TurnoService {
    async getTurnos(): Promise<ITurno[]> {
        try {
            const turnos = await getAllTurnos();
            return turnos;
        } catch (error) {
            throw new Error("Error fetching turnos: " + error);
        }
    }

    async getTurno(turnoId: string): Promise<ITurno | null> {
        try {
            const turno = await getTurnoById(turnoId);
            return turno;
        } catch (error) {
            throw new Error("Error fetching turno: " + error);
        }
    }

    async createTurno(turno: ITurno): Promise<ITurno> {
        try {
            const newTurno = await createTurno(turno);
            return newTurno;
        } catch (error) {
            throw new Error("Error creating turno: " + error);
        }
    }

    async editTurno(turnoId: string, turno: ITurno): Promise<ITurno | null> {
        try {
            const updatedTurno = await editTurno(turnoId, turno);
            return updatedTurno;
        } catch (error) {
            throw new Error("Error updating turno: " + error);
        }
    }

    async deleteTurno(turnoId: string): Promise<ITurno | null> {
        try {
            const deletedTurno = await deleteTurno(turnoId);
            return deletedTurno;
        } catch (error) {
            throw new Error("Error deleting turno: " + error);
        }
    }
}

export const turnoService = new TurnoService();