import { Router } from 'express';
import userRouter from '../users/routes';
import serviceRouter from '../services/routes'
import turnoRouter from '../turnos/routes';

const router= Router();

router.use('/user', userRouter);
router.use('/service', serviceRouter);
router.use('/turno', turnoRouter);

export default router;