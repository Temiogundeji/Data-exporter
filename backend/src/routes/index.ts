import { Router } from "express";
import auth from "./auth";
import { Authentications } from '../middlewares';
import users from "./users";
const { authenticate } = Authentications;
const router = Router();

router.use('/auth', auth);
router.use('/users', authenticate, users);

export default router;