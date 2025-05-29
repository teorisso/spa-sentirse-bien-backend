import { ITurno } from "./type";
import { turnoDao } from "./dao";
import { addHours, isBefore, parseISO } from 'date-fns';

const { getAllTurnos, getTurnoById, createTurno, editTurno, deleteTurno, getTurnosByUserId } = turnoDao;

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
            // Validar la restricción de 48 horas
            const ahora = new Date();
            const limiteReserva = addHours(ahora, 48);
            
            // Crear objeto Date combinando fecha y hora del turno
            const fechaTurno = new Date(turno.fecha);
            const [hours, minutes] = turno.hora.split(':').map(Number);
            fechaTurno.setHours(hours, minutes, 0, 0);
            
            if (isBefore(fechaTurno, limiteReserva)) {
                throw new Error("Los turnos deben reservarse con al menos 48 horas de anticipación.");
            }
            
            const newTurno = await createTurno(turno);
            return newTurno;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error creating turno: " + error);
        }
    }

    async editTurno(turnoId: string, turno: ITurno): Promise<ITurno | null> {
        try {
            // También validar en edición si se cambia la fecha/hora
            if (turno.fecha || turno.hora) {
                const ahora = new Date();
                const limiteReserva = addHours(ahora, 48);
                
                const fechaTurno = new Date(turno.fecha);
                const [hours, minutes] = turno.hora.split(':').map(Number);
                fechaTurno.setHours(hours, minutes, 0, 0);
                
                if (isBefore(fechaTurno, limiteReserva)) {
                    throw new Error("Los turnos deben reservarse con al menos 48 horas de anticipación.");
                }
            }
            
            const updatedTurno = await editTurno(turnoId, turno);
            return updatedTurno;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
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

    async getUserTurnos(userId: string): Promise<ITurno[]> {
        try {
            return await getTurnosByUserId(userId);
        } catch (error) {
            throw new Error("Error fetching user turnos: " + error);
        }
    }
}

export const turnoService = new TurnoService();