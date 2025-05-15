import { Request, Response } from 'express';
import { turnoService } from './service';
import { ITurno } from './type';

const { getTurnos, getTurno, createTurno, editTurno, deleteTurno } = turnoService;

class TurnoController {
    async getTurnos(req: Request, res: Response) {
        try {
            const turnos = await getTurnos();
            res.status(200).json(turnos);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getTurno(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const turno = await getTurno(id);
            res.status(200).json(turno);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async createTurno(req: Request, res: Response) {
        const { servicio, fecha, hora, cliente, estado } = req.body;
        try {
            const turno: ITurno = { servicio, fecha, hora, cliente, estado };
            const newTurno = await createTurno(turno);
            res.status(201).json(newTurno);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async editTurno(req: Request, res: Response) {
        const id = req.params.id;
        const turno: ITurno = req.body;
        try {
            const updatedTurno = await editTurno(id, turno);
            res.status(200).json(updatedTurno);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deleteTurno(req: Request, res: Response) {
        try {
            await deleteTurno(req.params.id);
            res.status(200).json({ message: 'Turno deleted successfully' });
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export const turnoController = new TurnoController();