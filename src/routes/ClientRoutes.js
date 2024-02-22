import { Router } from 'express';
import ClientController from '../controllers/ClientController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

// Only to study, normally does not existis on real systems
router.get('/', ClientController.index);
router.get('/:id', ClientController.show);

router.post('/', ClientController.create);
router.put('/', loginRequired, ClientController.update);
router.delete('/:id', loginRequired, ClientController.delete);

export default router;
