import { Router } from 'express';
import userController from '../controllers/UserController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Only to study, normally does not existis on real systems
/*
router.get('/', userController.index);
router.get('/:id', loginRequired, userController.show);
*/

router.post('/', userController.create);
router.put('/', loginRequired, userController.update);
router.delete('/', loginRequired, userController.delete);

export default router;
