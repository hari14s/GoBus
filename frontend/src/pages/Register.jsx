import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: "", email: "", phone: "", password: "", user_role: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/register", form);
      alert("Registration successful!");
      switch (form.usertype) {
        case "employee":
          navigate("/details");
          break;
        default:
            navigate("/login");
      }
      
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} required />
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="phone" placeholder="Phone" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <label for="userRole">Select User Role:</label>
      <select id="userRole" name="user_role" value={form.user_role} onChange={handleChange} required>
        <option value="" disabled selected>-- Choose a Role --</option>
        <option value="admin">Admin</option>
        <option value="passenger">Passenger</option>
        <option value="employee">Employee</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
};

export default RegisterPage;
