import { Router } from 'express';
const router = Router();
import { createBus, getAllBuses, getBusById, updateBus, deleteBus } from '../controllers/busController.js';

router.post('/', createBus);
router.get('/', getAllBuses);
router.get('/:id', getBusById);
router.put('/:id', updateBus);
router.delete('/:id', deleteBus);

export default router;