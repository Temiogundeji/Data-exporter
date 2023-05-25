import express from "express";
import { Uploader } from "../middlewares";
import getUser from "../controllers/users/getUser";
import upload from "../controllers/users/upload";

const router = express.Router();

router.get('/me', getUser);
// router.post('/reset', resetPin);
router.post('/upload', Uploader.single('image'), upload);


export default router;