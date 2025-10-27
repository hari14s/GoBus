import Schedule from '../models/Schedule.js';
import Employee from '../models/Employee.js';

// Create Schedule
export async function createSchedule(req, res) {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Schedules
export async function getSchedules(req, res) {
  try {
    const schedules = await Schedule.find()
      .populate('route_id')
      .populate('bus_id')
      .populate('driver')
      .populate('conductor');
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Schedule by ID
export async function getScheduleById(req, res) {
  try {
    const schedule = await Schedule.findById(req.params.id)
      .populate('route')
      .populate('bus')
      .populate('driver')
      .populate('conductor');
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Schedule
export async function updateSchedule (req, res) {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Schedule
export async function deleteSchedule(req, res) {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json({ message: 'Schedule deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Schedules for a specific employee
export async function getSchedulesByEmployee (req, res) {
  try {
    console.log("UserId param:", req.params.id);
    const employee = await Employee.findOne({ userId: req.params.id });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const schedules = await Schedule.find({
      $or: [{ driver: employee._id }, { conductor: employee._id }]
    })
    .populate('route_id')
    .populate('bus_id')
    .populate('driver')
    .populate('conductor');
    res.json(schedules); 
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};