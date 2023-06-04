import { Router } from "express";
import auth from "./auth";
import { Authentications } from '../middlewares';
import users from "./users";
import credentials from "./credential";
const { authenticate } = Authentications;
const router = Router();

router.use('/auth', auth);
router.use('/users', authenticate, users);
router.use('/credentials', authenticate, credentials)

export default router;