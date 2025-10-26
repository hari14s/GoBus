const Schedule = require('../models/Schedule');

// Create Schedule
exports.createSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.create(req.body);
    res.status(201).json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Schedules
exports.getSchedules = async (req, res) => {
  try {
    const schedules = await Schedule.find()
      .populate('route')
      .populate('bus')
      .populate('driver')
      .populate('conductor');
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Schedule by ID
exports.getScheduleById = async (req, res) => {
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
exports.updateSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json(schedule);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Schedule
exports.deleteSchedule = async (req, res) => {
  try {
    const schedule = await Schedule.findByIdAndDelete(req.params.id);
    if (!schedule) return res.status(404).json({ message: 'Schedule not found' });
    res.json({ message: 'Schedule deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Schedules for a specific employee
exports.getSchedulesByEmployee = async (req, res) => {
  try {
    const schedules = await Schedule.find({
      $or: [{ driver: req.params.id }, { conductor: req.params.id }]
    })
    .populate('route')
    .populate('bus')
    .populate('driver')
    .populate('conductor');
    res.json(schedules);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};