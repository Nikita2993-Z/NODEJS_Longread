import { Router } from 'express';
import { loginUserSchema, registerUserSchema } from '../validation/auth.js';
import {
  loginUserController,
  logoutUserController,
  refreshUserSessionController,
  registerUserController,
} from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';

const routerAuth = Router();

routerAuth.post(
  '/register',
  validateBody(registerUserSchema),
  registerUserController,
);
routerAuth.post('/login', validateBody(loginUserSchema), loginUserController);
routerAuth.post('/logout', logoutUserController);
routerAuth.post('/refresh', refreshUserSessionController);

export default routerAuth;
