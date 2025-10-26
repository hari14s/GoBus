import Route, { find, findById, findByIdAndUpdate, findByIdAndDelete } from '../models/Route';

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
    const routes = await find();
    res.json(routes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Get route by ID
export async function getRouteById(req, res) {
  try {
    const route = await findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Update route
export async function updateRoute(req, res) {
  try {
    const route = await findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Delete route
export async function deleteRoute(req, res) {
  try {
    const route = await findByIdAndDelete(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json({ message: 'Route deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

// Add stop to a route
export async function addStop(req, res) {
  try {
    const route = await findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    route.stops.push(req.body.stop);
    await route.save();
    res.json(route);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
}

// Get all stops of a route
export async function getStops(req, res) {
  try {
    const route = await findById(req.params.id);
    if (!route) return res.status(404).json({ message: 'Route not found' });
    res.json(route.stops);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}