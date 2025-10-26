import { create, find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/Employee';

// Add Employee
export async function createEmployee(req, res) {
  try {
    const employee = await create(req.body);
    res.status(201).json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get All Employees
export async function getEmployees(req, res) {
  try {
    const employees = await find();
    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get Employee by ID
export async function getEmployeeById(req, res) {
  try {
    const employee = await findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update Employee
export async function updateEmployee(req, res) {
  try {
    const employee = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete Employee
export async function deleteEmployee(req, res) {
  try {
    const employee = await findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}