import { Router } from 'express';
import projectController from '../controllers/ProjectController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, projectController.create);

export default router;
