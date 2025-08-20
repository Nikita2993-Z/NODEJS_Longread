import { Router } from 'express';
import studentsRouter from './students.js';
import routerAuth from './auth.js';

const router = Router();

router.use('/students', studentsRouter);
router.use('/auth', routerAuth);

export default router;
