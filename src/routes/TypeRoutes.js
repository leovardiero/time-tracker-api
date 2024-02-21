import { Router } from 'express';
import typeController from '../controllers/TypeController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, typeController.create);
router.get('/', typeController.index);
router.get('/:id', typeController.show);
router.put('/', loginRequired, typeController.update);
router.delete('/:id', loginRequired, typeController.delete);

export default router;
