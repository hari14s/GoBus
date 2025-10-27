import { useState, useContext, useEffect } from "react";
import api from "../services/api.js";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/employeeDetails.css";
import { AuthContext } from "../context/AuthContext.jsx";

const EmployeeDetails = () => {

  const { user } = useContext(AuthContext);
  const Navigate = useNavigate();
  const location = useLocation();
  
  const { userId } = location.state || {}; 

    const [form, setForm] = useState({ first_name: "", last_name: "", dob: "", phone: "", EmployeeType: "", license_no: "", gender: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/employees", { ...form, userId });
      alert("Employee details updated!");
      Navigate('/employee');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
    };

    return (
        <div className="employee-details-container">
      <form className="employee-details-form" onSubmit={handleSubmit}>
        <h2>Employee Details</h2>
        <input
          name="first_name"
          placeholder="First Name"
          onChange={handleChange}
          required
        />
        <input
          name="last_name"
          placeholder="Last Name"
          onChange={handleChange}
          required
        />
        <input
          name="dob"
          type="date"
          placeholder="Date of Birth"
          onChange={handleChange}
          required
        />
        <input
          name="phone"
          placeholder="Phone"
          onChange={handleChange}
          required
        />
        <label htmlFor="EmployeeType">Select Employee Type:</label>
        <select
          id="EmployeeType"
          name="EmployeeType"
          value={form.EmployeeType}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            -- Choose a Role --
          </option>
          <option value="driver">Driver</option>
          <option value="conductor">Conductor</option>
        </select>
        <input
          name="license_no"
          placeholder="License Number"
          onChange={handleChange}
        />
        <input
          name="gender"
          placeholder="Gender"
          onChange={handleChange}
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
    )
}

export default EmployeeDetails;