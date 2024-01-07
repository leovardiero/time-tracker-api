import { Router } from 'express';
import projectController from '../controllers/ProjectController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, projectController.create);
router.get('/', projectController.index);
router.get('/:id', projectController.show);
router.put('/', loginRequired, projectController.update);
router.delete('/:id', loginRequired, projectController.delete);

export default router;
