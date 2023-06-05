import express from 'express';
import OrganizationController from '../controllers/organizations';

const router = express.Router();

const { addOrganization, deleteOrganization, updateOrganization } = OrganizationController;

router.post('/new', addOrganization);
router.patch('/update', updateOrganization);
router.delete('/delete', deleteOrganization);

export default router;
