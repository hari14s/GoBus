const EmployeeDetails = () => {

    const [form, setForm] = useState({ first_name: "", last_name: "", dob: "", phone: "", EmployeeType: "", license_no: "", gender: "" });
    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/details", form);
      alert("Employee details updated!");
      Navigate('/login');
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input name="first_name" placeholder="First Name" onChange={handleChange} required/>
            <input name="last_name" placeholder="Lastname" onChange={handleChange} required />
            <input name="dob" type="date" placeholder="DateofBirth" onChange={handleChange} required />
            <input name="phone" placeholder="Phone" onChange={handleChange} required />
            <label for="EmployeeType">Select Employee Type:</label>
            <select id="EmployeeType" name="EmployeeType" value={form.EmployeeType} onChange={handleChange} required>
                <option value="" disabled selected>-- Choose a Role --</option>
                <option value="driver">Driver</option>
                <option value="conductor">Conductor</option>
            </select>
            <input name="license_no" placeholder="License Number" onChange={handleChange} />
            <input name="gender" placeholder="Gender" onChange={handleChange} required />
            <button type="submit">Submit</button>
        </form>
    )
}