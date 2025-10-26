import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login.jsx";
import RegisterPage from "./pages/Register.jsx";
import ProfilePage from "./pages/Profile.jsx";
import AdminDashboard from "./pages/AdminDashBoard.jsx";
import EmployeeDashboard from "./pages/EmployeeDashboard.jsx";
import PassengerDashboard from "./pages/PassengerDashBoard.jsx";
import EmployeeDetails from "./pages/EmployeeDetails.jsx"

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/profile" element={<ProfilePage />} />

      <Route
          path="/admin"
          element={user?.usertype === "admin" ? <AdminDashboard /> : <Navigate to="/login" />}
        />
      <Route
          path="/employee"
          element={user?.usertype === "employee" ? <EmployeeDashboard /> : <Navigate to="/login" />}
        />
      <Route
          path="/dashboard"
          element={user?.usertype === "passenger" ? <PassengerDashboard /> : <Navigate to="/login" />}
        />
      <Route path="*" element={<Navigate to="/login" />} />
      <Route path="/details" element={<EmployeeDetails/>} />
    </Routes>
  </BrowserRouter>
);

export default App;

