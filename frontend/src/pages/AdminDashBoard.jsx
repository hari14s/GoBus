import React, { useEffect, useState } from 'react';
import api from '../services/api';

const AdminDashboard = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      const { data } = await api.get('/routes');
      setRoutes(data);
    };
    fetchRoutes();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <h3>Routes</h3>
      <ul>
        {routes.map(route => (
          <li key={route.id}>{route.start_point} - {route.stop_point}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;
