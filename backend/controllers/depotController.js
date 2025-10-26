const Depot = require('../models/Depot');

// Add Depot
exports.createDepot = async (req, res) => {
  try {
    const depot = await Depot.create(req.body);
    res.status(201).json(depot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get All Depots
exports.getDepots = async (req, res) => {
  try {
    const depots = await Depot.find();
    res.json(depots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get Depot by ID
exports.getDepotById = async (req, res) => {
  try {
    const depot = await Depot.findById(req.params.id);
    if (!depot) return res.status(404).json({ message: 'Depot not found' });
    res.json(depot);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update Depot
exports.updateDepot = async (req, res) => {
  try {
    const depot = await Depot.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!depot) return res.status(404).json({ message: 'Depot not found' });
    res.json(depot);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete Depot
exports.deleteDepot = async (req, res) => {
  try {
    const depot = await Depot.findByIdAndDelete(req.params.id);
    if (!depot) return res.status(404).json({ message: 'Depot not found' });
    res.json({ message: 'Depot deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};