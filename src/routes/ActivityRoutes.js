import { Router } from 'express';
import activityController from '../controllers/ActivityController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, activityController.create);
router.get('/', activityController.index);
// router.get('/project/:id', activityController.showByProjects);
router.get('/:id', activityController.show);
/*
router.put('/', loginRequired, activityController.update);
router.delete('/:id', loginRequired, activityController.delete);
*/

export default router;
