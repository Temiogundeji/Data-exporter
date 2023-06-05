import { Router } from "express";
import auth from "./auth";
import { Authentications } from '../middlewares';
import users from "./users";
import credentials from "./credential";
import organizations from "./organization";
const { authenticate } = Authentications;
const router = Router();

router.use('/auth', auth);
router.use('/users', authenticate, users);
router.use('/credentials', authenticate, credentials);
router.use('/organizations', authenticate, organizations);

export default router;