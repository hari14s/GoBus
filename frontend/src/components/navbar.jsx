// import React, { useContext, useState, useRef, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";
// import "../styles/navbar.css";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useContext(AuthContext);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const dropdownRef = useRef();

//   console.log(user);

//   const handleLogout = () => {
//     logout();
//     navigate("/login");
//   };

//   // Close dropdown if clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setDropdownOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   return (
//     <nav className="navbar">
//       <div className="navbar-title" onClick={() => navigate("/")}>
//         GoBus Management System
//       </div>

//       <div className="navbar-right">
//         <div className="profile-container" ref={dropdownRef}>
//           <div className="profile-info" onClick={() => setDropdownOpen(!dropdownOpen)}>
//             <img
//               src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
//               alt="profile"
//               className="profile-img"
//             />
//             <span>{user?.username || "Profile"}</span>
//           </div>

//           {dropdownOpen && (
//             <div className="profile-dropdown">
//               <p><strong>{user?.username}</strong></p>
//               <p>Email: {user?.email}</p>
//               <p>Phone: {user?.phone}</p>
//               <p>User Type: {user?.usertype}</p>
//               <button onClick={handleLogout} className="logout-btn">Logout</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Generate avatar initial
  const getInitial = (name) => name?.charAt(0)?.toUpperCase() || "U";

  // Badge color by user role
  const getRoleColor = (role) => {
    switch (role) {
      case "admin":
        return "#DC2626"; // red
      case "employee":
        return "#2563EB"; // blue
      case "passenger":
        return "#059669"; // green
      default:
        return "#6B7280"; // gray
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left" onClick={() => navigate("/")}>
        🚌 <span className="navbar-title">GoBus Management</span>
      </div>

      <div className="navbar-right" ref={dropdownRef}>
        <div
          className="profile-info"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div
            className="profile-avatar"
            style={{ backgroundColor: getRoleColor(user?.usertype) }}
          >
            {getInitial(user?.username)}
          </div>
          <span className="profile-name">{user?.username || "User"}</span>
        </div>

        {dropdownOpen && (
          <div className="profile-dropdown">
            <div className="dropdown-header">
              <div
                className="dropdown-avatar"
                style={{ backgroundColor: getRoleColor(user?.usertype) }}
              >
                {getInitial(user?.username)}
              </div>
              <div className="dropdown-user-info">
                <h4>{user?.username}</h4>
                <span
                  className="role-badge"
                  style={{ backgroundColor: getRoleColor(user?.usertype) }}
                >
                  {user?.usertype || "User"}
                </span>
              </div>
            </div>

            <div className="dropdown-body">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Phone:</strong> {user?.phone}</p>
            </div>

            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

