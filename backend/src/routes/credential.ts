import express from 'express';
import CredentialController from '../controllers/credentials';

const router = express.Router();

const { addCredentials, deleteCredentials, updateCredentials } = CredentialController;

router.post('/new', addCredentials);
router.patch('/update', updateCredentials);
router.delete('/delete', deleteCredentials);

export default router;
