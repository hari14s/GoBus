import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext.jsx";

import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import AdminDashboard from "./pages/AdminDashBoard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import PassengerDashboard from "./pages/PassengerDashBoard.jsx";
import EmployeeDetails from "./pages/EmployeeDetails.jsx";

const App = () => {
   const { user } = useContext(AuthContext);

   return(
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route
          path="/admin"
          element={user?.usertype === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      <Route
          path="/employee"
          element={user?.usertype === "employee" ? <EmployeeDashboard /> : <Navigate to="/login" />}
        />
      <Route
          path="/passenger"
          element={user?.usertype === "passenger" ? <PassengerDashboard /> : <Navigate to="/login" />}
        />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/details" element={<EmployeeDetails/>} />
    </Routes>
   );
};

export default App;

