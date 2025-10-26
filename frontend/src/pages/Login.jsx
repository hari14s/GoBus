import { useState, useContext } from "react";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext.js";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/users/login", form);
      login(data);

      switch (data.usertype) {
        case "admin":
          navigate("/admin");
          break;
        case "employee":
          navigate("/employee");
          break;
        case "passenger":
        default:
            navigate("/passenger");
      }
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;
