import express from 'express';
import * as UserController from '../controllers/userController';
import { authenticate } from '../middlewares/authMiddleware'; 

const router = express.Router();

router.post('/registrar', UserController.createUser);

router.post('/login', authenticate, (req, res) => {
  res.json(req.user); // Aqui pode ser usado token JWT
});

export default router;
