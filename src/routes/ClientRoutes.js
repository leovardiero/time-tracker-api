import { Router } from 'express';
import ClientController from '../controllers/ClientController';
// import loginRequired from '../middlewares/loginRequired// ';

const router = new Router();

// Only to study, normally does not existis on real systems
router.get('/', ClientController.index);
router.get('/:id', ClientController.show);

router.post('/', ClientController.create);
router.put('/', ClientController.update);
router.delete('/', ClientController.delete);

export default router;
