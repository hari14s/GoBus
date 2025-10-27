import { Router } from 'express';
const router = Router();
import { createEmployee, getEmployees, getEmployeeById, updateEmployee, deleteEmployee, GetEmployeeFromUser} from '../controllers/employeeController.js';

router.post('/', createEmployee);
router.get('/', getEmployees);
router.get('/:id', getEmployeeById);
router.put('/:id', updateEmployee);
router.delete('/:id', deleteEmployee);
router.get('/user/:userId', GetEmployeeFromUser)

export default router;