import Bus from '../models/Bus.js';

// Create bus
export async function createBus(req, res) {
  try {
    const bus = new Bus(req.body);
    await bus.save();
    res.status(201).json(bus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get all buses
export async function getAllBuses(req, res) {
  try {
    const buses = await find().populate('depot');
    res.json(buses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get bus by ID
export async function getBusById(req, res) {
  try {
    const bus = await findById(req.params.id).populate('depot');
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update bus
export async function updateBus(req, res) {
  try {
    const bus = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json(bus);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete bus
export async function deleteBus(req, res) {
  try {
    const bus = await findByIdAndDelete(req.params.id);
    if (!bus) return res.status(404).json({ message: 'Bus not found' });
    res.json({ message: 'Bus deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}