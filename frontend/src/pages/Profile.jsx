import { useEffect, useState, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";

const ProfilePage = () => {
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get(`/users/profile/${user._id}`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        setProfile(data);
      } catch (err) {
        alert("Failed to load profile");
      }
    };
    fetchProfile();
  }, [user]);

  if (!profile) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <p>Username: {profile.username}</p>
      <p>Email: {profile.email}</p>
      <p>Phone: {profile.phone}</p>
      <p>User Type: {profile.usertype}</p>
    </div>
  );
};

export default ProfilePage;
