import { Router } from 'express';
import projectController from '../controllers/ProjectController';
import loginRequired from '../middlewares/LoginRequired';

const router = new Router();

router.post('/', loginRequired, projectController.create);

export default router;
