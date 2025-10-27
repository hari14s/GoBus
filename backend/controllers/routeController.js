import Route from '../models/Route.js';
import Schedule from "../models/Schedule.js";

// Create route
export async function createRoute(req, res) {
  try {
    const route = new Route(req.body);
    await route.save();
    res.status(201).json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get all routes
export async function getAllRoutes(req, res) {
  try {
    const routes = await Route.find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get route by ID
export async function getRouteById(req, res) {
  try {
    const route = await Route.findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update route
export async function updateRoute(req, res) {
  try {
    const route = await Route.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete route
export async function deleteRoute(req, res) {
  try {
    const route = await Route.findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getSchedules(req, res){
    try{
        const schedules = await Schedule.find({ route_id: req.params.id })
      .populate("bus_id")
      .populate("driver")
      .populate("conductor");
       res.json(schedules);
    } catch (err) {
    res.status(500).json({ message: err.message });
    }
}