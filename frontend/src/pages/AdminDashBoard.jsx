// import React, { useEffect, useState } from "react";
// import api from "../services/api.js";
// import Navbar from "../components/navbar.jsx";
// import "../styles/adminDashboard.css";

// const AdminDashboard = () => {
//   const [routes, setRoutes] = useState([]);
//   const [schedules, setSchedules] = useState([]);
//   const [employees, setEmployees] = useState([]);
//   const [buses, setBuses] = useState([]);
//   const [newRoute, setNewRoute] = useState({ name: "", start_point: "", end_point: "", distance: 0 });
//   const [newSchedule, setNewSchedule] = useState({ route_id: "", bus_id: "", driver: "", conductor: "", departureTime: "", arrivalTime: "" });
//   const [newBus, setNewBus] = useState({ bus_name: "", numberPlate: "", model: "", capacity: 0 });

//   const fetchData = async () => {
//     try {
//       const [routesRes, schedulesRes, employeesRes, busesRes] = await Promise.all([
//         api.get("/routes"),
//         api.get("/schedules"),
//         api.get("/employees"),
//         api.get("/buses"),
//       ]);
//       setRoutes(routesRes.data);
//       setSchedules(schedulesRes.data);
//       setEmployees(employeesRes.data);
//       setBuses(busesRes.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // ROUTE CRUD
//   const createRoute = async () => {
//     try {
//       await api.post("/routes", newRoute);
//       setNewRoute({ name: "", start_point: "", end_point: "", distance: 0 });
//       fetchData();
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const deleteRoute = async (id) => {
//     await api.delete(`/routes/${id}`);
//     fetchData();
//   };

//   // SCHEDULE CRUD
//   const createSchedule = async () => {
//     try{
//       await api.post("/schedules", newSchedule);
//       setNewSchedule({route_id: "", bus_id: "", driver: "", conductor: "", departureTime: "", arrivalTime: ""});
//       fetchData();
//     }catch(err){
//       console.error(err);
//     }
//   };

//   const deleteSchedule = async (id) => {
//     await api.delete(`/schedules/${id}`);
//     fetchData();
//   };

//   // EMPLOYEE CRUD
//   const deleteEmployee = async (id) => {
//     await api.delete(`/employees/${id}`);
//     fetchData();
//   };

//   const createBus = async () => {
//   try {
//     await api.post("/buses", newBus);
//     setNewBus({ bus_name: "", numberPlate: "", model: "", capacity: 0});
//     fetchData(); // refresh data
//   } catch (err) {
//     console.error(err);
//   }
// };

//  const deleteBus = async (id) => {
//   try {
//     await api.delete(`/buses/${id}`);
//     fetchData(); // refresh data
//   } catch (err) {
//     console.error(err);
//   }
// };

//   return (
//     <div>
//       <Navbar />

//       <div className="admin-dashboard">
//         <h2>Admin Dashboard</h2>

//         {/* ROUTES SECTION */}
//         <section className="dashboard-section">
//           <h3>Routes</h3>
//           <div className="form-group">
//             <input
//               placeholder="Name"
//               value={newRoute.name}
//               onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
//             />
//             <input
//               placeholder="Start Point"
//               value={newRoute.start_point}
//               onChange={(e) =>
//                 setNewRoute({ ...newRoute, start_point: e.target.value })
//               }
//             />
//             <input
//               placeholder="End Point"
//               value={newRoute.end_point}
//               onChange={(e) =>
//                 setNewRoute({ ...newRoute, end_point: e.target.value })
//               }
//             />
//             <input
//               type="number"
//               placeholder="Distance"
//               value={newRoute.distance}
//               onChange={(e) =>
//                 setNewRoute({ ...newRoute, distance: Number(e.target.value) })
//               }
//             />
//             <button onClick={createRoute}>Add Route</button>
//           </div>

//           <ul className="data-list">
//             {routes.map((r) => (
//               <li key={r._id}>
//                 {r.name} ({r.start_point} → {r.end_point}, {r.distance} km)
//                 <button onClick={() => deleteRoute(r._id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* SCHEDULE SECTION */}
//         <section className="dashboard-section">
//           <h3>Schedules</h3>

//           <div className="form-group">
//             <select
//               name="route_id"
//               value={newSchedule.route_id}
//               onChange={(e) =>
//                 setNewSchedule({ ...newSchedule, route_id: e.target.value })
//               }
//             >
//               <option value="">Select Route</option>
//               {routes.map((r) => (
//                 <option key={r._id} value={r._id}>
//                   {r.name} ({r.start_point} → {r.end_point})
//                 </option>
//               ))}
//             </select>

//             <select
//               name="bus_id"
//               value={newSchedule.bus_id}
//               onChange={(e) =>
//                 setNewSchedule({ ...newSchedule, bus_id: e.target.value })
//               }
//             >
//               <option value="">Select Bus</option>
//               {buses.map((b) => (
//                 <option key={b._id} value={b._id}>
//                   {b.bus_name}
//                 </option>
//               ))}
//             </select>

//             <select
//               name="driver"
//               value={newSchedule.driver}
//               onChange={(e) =>
//                 setNewSchedule({ ...newSchedule, driver: e.target.value })
//               }
//             >
//               <option value="">Select Driver</option>
//               {employees
//                 .filter((emp) => emp.EmployeeType === "driver")
//                 .map((emp) => (
//                   <option key={emp._id} value={emp._id}>
//                     {emp.first_name} {emp.last_name}
//                   </option>
//                 ))}
//             </select>

//             <select
//               name="conductor"
//               value={newSchedule.conductor}
//               onChange={(e) =>
//                 setNewSchedule({ ...newSchedule, conductor: e.target.value })
//               }
//             >
//               <option value="">Select Conductor</option>
//               {employees
//                 .filter((emp) => emp.EmployeeType === "conductor")
//                 .map((emp) => (
//                   <option key={emp._id} value={emp._id}>
//                     {emp.first_name} {emp.last_name}
//                   </option>
//                 ))}
//             </select>

//             <input
//               type="time"
//               value={newSchedule.departureTime}
//               onChange={(e) =>
//                 setNewSchedule({ ...newSchedule, departureTime: e.target.value })
//               }
//             />

//             <input
//               type="time"
//               value={newSchedule.arrivalTime}
//               onChange={(e) =>
//                 setNewSchedule({ ...newSchedule, arrivalTime: e.target.value })
//               }
//             />

//             <button onClick={createSchedule}>Add Schedule</button>
//           </div>

//          <ul className="data-list">
//             {schedules.map((s) => (
//               <li key={s._id}>
//                 Route: {s.route_id?.name} ({s.route_id?.start_point} → {s.route_id?.end_point}) | 
//                 Bus: {s.bus_id?.bus_name} | 
//                 Driver: {s.driver?.first_name} {s.driver?.last_name} | 
//                 Conductor: {s.conductor?.first_name} {s.conductor?.last_name} | 
//                 Dep: {s.departureTime} | 
//                 Arr: {s.arrivalTime}
//                 <button onClick={() => deleteSchedule(s._id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </section>

//         {/* BUSES SECTION */}
// <section className="dashboard-section">
//   <h3>Buses</h3>

//   <div className="form-group">
//     <input
//       placeholder="Bus Name"
//       value={newBus.bus_name}
//       onChange={(e) => setNewBus({ ...newBus, bus_name: e.target.value })}
//     />
//     <input
//       placeholder="Number Plate"
//       value={newBus.numberPlate}
//       onChange={(e) => setNewBus({ ...newBus, numberPlate: e.target.value })}
//     />
//     <input
//       placeholder="Model"
//       value={newBus.model}
//       onChange={(e) => setNewBus({ ...newBus, model: e.target.value })}
//     />
//     <input
//       type="number"
//       placeholder="Capacity"
//       value={newBus.capacity}
//       onChange={(e) => setNewBus({ ...newBus, capacity: Number(e.target.value) })}
//     />
//     <button onClick={createBus}>Add Bus</button>
//   </div>

//   <ul className="data-list">
//     {buses.map((b) => (
//       <li key={b._id}>
//         {b.bus_name} - {b.numberPlate} | {b.model} | Capacity: {b.capacity}
//         <button onClick={() => deleteBus(b._id)}>Delete</button>
//       </li>
//     ))}
//   </ul>
// </section>

//         {/* EMPLOYEES SECTION */}
//         <section className="dashboard-section">
//           <h3>Employees</h3>
//           <ul className="data-list">
//             {employees.map((e) => (
//               <li key={e._id}>
//                 {e.first_name} {e.last_name} ({e.EmployeeType})
//                 <button onClick={() => deleteEmployee(e._id)}>Delete</button>
//               </li>
//             ))}
//           </ul>
//         </section>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import Navbar from "../components/navbar.jsx";
import "../styles/adminDashboard.css";

const AdminDashboard = () => {
  const [routes, setRoutes] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [buses, setBuses] = useState([]);
  const [activeTab, setActiveTab] = useState("routes");

  const [newRoute, setNewRoute] = useState({ name: "", start_point: "", end_point: "", distance: 0 });
  const [newSchedule, setNewSchedule] = useState({ route_id: "", bus_id: "", driver: "", conductor: "", departureTime: "", arrivalTime: "" });
  const [newBus, setNewBus] = useState({ bus_name: "", numberPlate: "", model: "", capacity: 0 });

  const fetchData = async () => {
    try {
      const [routesRes, schedulesRes, employeesRes, busesRes] = await Promise.all([
        api.get("/routes"),
        api.get("/schedules"),
        api.get("/employees"),
        api.get("/buses"),
      ]);
      setRoutes(routesRes.data);
      setSchedules(schedulesRes.data);
      setEmployees(employeesRes.data);
      setBuses(busesRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // === CRUD ===
  const createRoute = async () => {
    await api.post("/routes", newRoute);
    setNewRoute({ name: "", start_point: "", end_point: "", distance: 0 });
    fetchData();
  };

  const deleteRoute = async (id) => {
    await api.delete(`/routes/${id}`);
    fetchData();
  };

  const createSchedule = async () => {
    await api.post("/schedules", newSchedule);
    setNewSchedule({ route_id: "", bus_id: "", driver: "", conductor: "", departureTime: "", arrivalTime: "" });
    fetchData();
  };

  const deleteSchedule = async (id) => {
    await api.delete(`/schedules/${id}`);
    fetchData();
  };

  const createBus = async () => {
    await api.post("/buses", newBus);
    setNewBus({ bus_name: "", numberPlate: "", model: "", capacity: 0 });
    fetchData();
  };

  const deleteBus = async (id) => {
    await api.delete(`/buses/${id}`);
    fetchData();
  };

  const deleteEmployee = async (id) => {
    await api.delete(`/employees/${id}`);
    fetchData();
  };

  return (
    <div className="admin-dashboard-container">
      <Navbar />

      <div className="admin-layout">
        {/* Sidebar Navigation */}
        <aside className="sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li
              className={activeTab === "routes" ? "active" : ""}
              onClick={() => setActiveTab("routes")}
            >
              Routes
            </li>
            <li
              className={activeTab === "schedules" ? "active" : ""}
              onClick={() => setActiveTab("schedules")}
            >
              Schedules
            </li>
            <li
              className={activeTab === "buses" ? "active" : ""}
              onClick={() => setActiveTab("buses")}
            >
              Buses
            </li>
            <li
              className={activeTab === "employees" ? "active" : ""}
              onClick={() => setActiveTab("employees")}
            >
              Employees
            </li>
          </ul>
        </aside>

        {/* Main Content */}
        <main className="dashboard-content">
          <h2 className="dashboard-title">
            {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}
          </h2>

          {/* ROUTES */}
          {activeTab === "routes" && (
            <section className="dashboard-section">
              <div className="form-group">
                <input
                  placeholder="Name"
                  value={newRoute.name}
                  onChange={(e) => setNewRoute({ ...newRoute, name: e.target.value })}
                />
                <input
                  placeholder="Start Point"
                  value={newRoute.start_point}
                  onChange={(e) => setNewRoute({ ...newRoute, start_point: e.target.value })}
                />
                <input
                  placeholder="End Point"
                  value={newRoute.end_point}
                  onChange={(e) => setNewRoute({ ...newRoute, end_point: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Distance (km)"
                  value={newRoute.distance}
                  onChange={(e) => setNewRoute({ ...newRoute, distance: Number(e.target.value) })}
                />
                <button onClick={createRoute}>Add Route</button>
              </div>

              <ul className="data-list">
                {routes.map((r) => (
                  <li key={r._id}>
                    <span>{r.name} ({r.start_point} → {r.end_point}) — {r.distance} km</span>
                    <button className="delete-btn" onClick={() => deleteRoute(r._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* SCHEDULES */}
          {activeTab === "schedules" && (
            <section className="dashboard-section">
              <div className="form-group">
                <select
                  value={newSchedule.route_id}
                  onChange={(e) => setNewSchedule({ ...newSchedule, route_id: e.target.value })}
                >
                  <option value="">Select Route</option>
                  {routes.map((r) => (
                    <option key={r._id} value={r._id}>
                      {r.name}
                    </option>
                  ))}
                </select>

                <select
                  value={newSchedule.bus_id}
                  onChange={(e) => setNewSchedule({ ...newSchedule, bus_id: e.target.value })}
                >
                  <option value="">Select Bus</option>
                  {buses.map((b) => (
                    <option key={b._id} value={b._id}>
                      {b.bus_name}
                    </option>
                  ))}
                </select>

                <select
                  value={newSchedule.driver}
                  onChange={(e) => setNewSchedule({ ...newSchedule, driver: e.target.value })}
                >
                  <option value="">Select Driver</option>
                  {employees
                    .filter((e) => e.EmployeeType === "driver")
                    .map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.first_name} {emp.last_name}
                      </option>
                    ))}
                </select>

                <select
                  value={newSchedule.conductor}
                  onChange={(e) => setNewSchedule({ ...newSchedule, conductor: e.target.value })}
                >
                  <option value="">Select Conductor</option>
                  {employees
                    .filter((e) => e.EmployeeType === "conductor")
                    .map((emp) => (
                      <option key={emp._id} value={emp._id}>
                        {emp.first_name} {emp.last_name}
                      </option>
                    ))}
                </select>

                <input
                  type="time"
                  value={newSchedule.departureTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, departureTime: e.target.value })}
                />
                <input
                  type="time"
                  value={newSchedule.arrivalTime}
                  onChange={(e) => setNewSchedule({ ...newSchedule, arrivalTime: e.target.value })}
                />
                <button onClick={createSchedule}>Add Schedule</button>
              </div>

              <ul className="data-list">
                {schedules.map((s) => (
                  <li key={s._id}>
                    <span>
                      {s.route_id?.name} | Bus: {s.bus_id?.bus_name} | Driver:{" "}
                      {s.driver?.first_name} | Conductor: {s.conductor?.first_name} |
                      DepartureTime: {s.departureTime} | ArrivalTime: {s.arrivalTime}
                    </span>
                    <button className="delete-btn" onClick={() => deleteSchedule(s._id)}>
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* BUSES */}
          {activeTab === "buses" && (
            <section className="dashboard-section">
              <div className="form-group">
                <input
                  placeholder="Bus Name"
                  value={newBus.bus_name}
                  onChange={(e) => setNewBus({ ...newBus, bus_name: e.target.value })}
                />
                <input
                  placeholder="Number Plate"
                  value={newBus.numberPlate}
                  onChange={(e) => setNewBus({ ...newBus, numberPlate: e.target.value })}
                />
                <input
                  placeholder="Model"
                  value={newBus.model}
                  onChange={(e) => setNewBus({ ...newBus, model: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Capacity"
                  value={newBus.capacity}
                  onChange={(e) => setNewBus({ ...newBus, capacity: Number(e.target.value) })}
                />
                <button onClick={createBus}>Add Bus</button>
              </div>

              <ul className="data-list">
                {buses.map((b) => (
                  <li key={b._id}>
                    <span>
                      {b.bus_name} ({b.numberPlate}) | {b.model} | Capacity: {b.capacity}
                    </span>
                    <button className="delete-btn" onClick={() => deleteBus(b._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* EMPLOYEES */}
          {activeTab === "employees" && (
            <section className="dashboard-section">
              <ul className="data-list">
                {employees.map((e) => (
                  <li key={e._id}>
                    <span>{e.first_name} {e.last_name} ({e.EmployeeType})</span>
                    <button className="delete-btn" onClick={() => deleteEmployee(e._id)}>Delete</button>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
