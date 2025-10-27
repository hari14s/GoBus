import { Router } from 'express';
const router = Router();
import { createSchedule, getSchedules, getScheduleById, updateSchedule, deleteSchedule, getSchedulesByEmployee } from '../controllers/scheduleController.js';

router.post('/', createSchedule);
router.get('/', getSchedules);
router.get('/:id', getScheduleById);
router.put('/:id', updateSchedule);
router.delete('/:id', deleteSchedule);
router.get('/employee/:id', getSchedulesByEmployee);

export default router;