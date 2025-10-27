import React, { useState, useEffect } from "react";
import api from "../services/api.js";
import Navbar from "../components/navbar.jsx";
import "../styles/passengerDashboard.css";

const PassengerDashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [openRouteId, setOpenRouteId] = useState(null);
  const [schedules, setSchedules] = useState({});

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const res = await api.get("/routes");
        setRoutes(res.data);
      } catch (err) {
        console.error("Error fetching routes:", err);
      }
    };
    fetchRoutes();
  }, []);

  const toggleSchedules = async (routeId) => {
    if (openRouteId === routeId) {
      // Collapse if already open
      setOpenRouteId(null);
      return;
    }

    // If schedules not already fetched for this route, fetch now
    if (!schedules[routeId]) {
      try {
        const res = await api.get(`/routes/${routeId}/schedules`);
        setSchedules((prev) => ({ ...prev, [routeId]: res.data }));
      } catch (err) {
        console.error("Error fetching schedules:", err);
      }
    }

    setOpenRouteId(routeId);
  };

  return (
    <div>
      <Navbar />
      <div className="passenger-dashboard">
        <h2>Available Routes</h2>

        <div className="route-list">
          {routes.map((route) => (
            <div key={route._id} className="route-card">
              <div
                className="route-header"
                onClick={() => toggleSchedules(route._id)}
              >
                <div className="route-info">
                  <h3>{route.name}</h3>
                  <p>
                    {route.start_point} → {route.end_point}
                  </p>
                </div>
                <button className="view-btn">
                  {openRouteId === route._id ? "▲ Hide" : "▼ View"}
                </button>
              </div>

              {openRouteId === route._id && (
                <div className="schedule-dropdown">
                  {schedules[route._id]?.length > 0 ? (
                    schedules[route._id].map((s) => (
                      <div key={s._id} className="schedule-card">
                        <p>
                          <strong>Bus:</strong> {s.bus_id?.bus_name} (
                          {s.bus_id?.numberPlate})
                        </p>
                        <p>
                          <strong>Driver:</strong> {s.driver?.first_name}{" "}
                          {s.driver?.last_name}
                        </p>
                        <p>
                          <strong>Conductor:</strong> {s.conductor?.first_name}{" "}
                          {s.conductor?.last_name}
                        </p>
                        <p>
                          <strong>Departure:</strong> {s.departureTime}
                        </p>
                        <p>
                          <strong>Arrival:</strong> {s.arrivalTime}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="no-schedule">No schedules available.</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PassengerDashboard;

