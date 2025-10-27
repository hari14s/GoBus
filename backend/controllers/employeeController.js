import Employee from '../models/Employee.js';

// Add Employee
export async function createEmployee(req, res) {
  try {
    const { first_name, last_name, dob, phone, EmployeeType, license_no, gender, userId } = req.body;
    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }
    const newEmployee = await Employee.create({
      userId: userId,
      first_name,
      last_name,
      dob,
      phone,
      EmployeeType,
      license_no,
      gender,
    });
    res.status(201).json({message: "Employee Detils updated"});
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get All Employees
export async function getEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
}

// Get Employee by ID
export async function getEmployeeById(req, res) {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update Employee
export async function updateEmployee(req, res) {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json(employee);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete Employee
export async function deleteEmployee(req, res) {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    res.json({ message: 'Employee deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function GetEmployeeFromUser(req,res){
  try{
    const employee = await Employee.findOne({ _id: req.params.userId });
    if (!employee) return res.status(404).json({ message: "Employee not found" });
    res.json(employee);
  }catch (err) {
    res.status(500).json({ message: err.message });
  }
}