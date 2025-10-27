import { Router } from 'express';
const router = Router();
import { createRoute, getAllRoutes, getRouteById, updateRoute, deleteRoute, getSchedules } from '../controllers/routeController.js';

router.post('/', createRoute);
router.get('/', getAllRoutes);
router.get('/:id', getRouteById);
router.put('/:id', updateRoute);
router.delete('/:id', deleteRoute);

router.get('/:id/schedules', getSchedules);
export default router;