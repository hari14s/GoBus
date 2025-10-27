import React, { useEffect, useState, useContext } from "react";
import api from "../services/api.js";
import Navbar from "../components/navbar.jsx";
import { AuthContext } from "../context/AuthContext.jsx";
import "../styles/employeeDashboard.css";

const EmployeeDashboard = () => {
  const { user } = useContext(AuthContext);
  const [schedules, setSchedules] = useState([]);
  //const [employeeId, setEmployeeId] = useState(null);

  useEffect(() => {
    const fetchEmployeeAndSchedules = async () => {
      if (!user?._id) return;

      try {
        const schedRes = await api.get(`/schedules/employee/${user?._id}`);
        setSchedules(schedRes.data);
      } catch (err) {
        console.error("Error fetching employee or schedules:", err);
      }
    };

    fetchEmployeeAndSchedules();
  }, [user]);

  if (!user) return <p>Please log in to view your dashboard.</p>;
  return (
    <div>
      <Navbar />
      <div className="employee-dashboard">
        <h2>Welcome, {user.username}</h2>
        <h3>Your Assigned Schedules</h3>

        {schedules.length === 0 ? (
          <p>No schedules assigned yet.</p>
        ) : (
          <ul className="schedule-list">
            {schedules.map((s) => (
              <li key={s._id} className="schedule-card">
                <h4>{s.route?.name}</h4>
                <p><strong>Route:</strong> {s.route_id?.start_point} → {s.route_id?.end_point}</p>
                <p><strong>Bus:</strong> {s.bus_id?.bus_name} ({s.bus_id?.numberPlate})</p>
                <p>
                  <strong>Departure:</strong> {s.departureTime}
                </p>
                <p>
                  <strong>Arrival:</strong> {s.arrivalTime}
                </p>
                <p>
                  <strong>Driver:</strong> {s.driver?.first_name} {s.driver?.last_name}<br/>
                  <strong>Conductor:</strong> {s.conductor?.first_name} {s.conductor?.last_name}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default EmployeeDashboard;

