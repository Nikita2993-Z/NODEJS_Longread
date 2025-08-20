import { Router } from 'express';
import {
  getStudentByIdController,
  getStudentsController,
  createStudentController,
  deleteStudentController,
  upsertStudentController,
  patchStudentController,
} from '../controllers/students.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/student.js';
import { isValidId } from '../middlewares/isValidId.js';
import { authenticate } from '../middlewares/authenticate.js';

const studentsRouter = Router();

studentsRouter.use('/students', authenticate);

studentsRouter.get('/', getStudentsController);

studentsRouter.get('/:studentId', isValidId, getStudentByIdController);

studentsRouter.post(
  '/',
  validateBody(createStudentSchema),
  createStudentController,
);

studentsRouter.delete('/:studentId', isValidId, deleteStudentController);

studentsRouter.put(
  '/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  upsertStudentController,
);

studentsRouter.patch(
  '/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  patchStudentController,
);

export default studentsRouter;
