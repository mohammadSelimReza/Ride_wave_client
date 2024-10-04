import { useEffect, useState } from "react";
import { ACCESS_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";

const useAuth = () => {
  const [isAuth, setIsAuth] = useState(false);
  const [decode, setDecode] = useState(null);
  const [user, setUser] = useState(null);
  const [userId, setUserId] = useState(0);
  const [riderData, setRiderData] = useState(false);
  const [driverData, setDriverData] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    if (token) {
      const decoded = jwtDecode(token);
      setIsAuth(true);
      setDecode(decoded);
      console.log(decoded);
      fetchUserData(decoded.user_id);
      setUserId(decoded.user_id);
    } else {
      console.error();
    }
  }, []);
  const fetchUserData = (userId) => {
    api
      .get(`/rider/user/${userId}/`)
      .then((res) => {
        setUser(res.data);
        fetchRoleSpecificData(userId);
      })
      .catch((error) => console.log(error));
  };
  const fetchRoleSpecificData = (userId) => {
    api
      .get(`/rider/register/`)
      .then((res) => {
        const patient = res.data.find((p) => p.user.id === userId);
        if (patient) {
          setRiderData(patient);
          setDriverData(null); // Clear doctor data if patient found
        } else {
          fetchDoctorData(userId);
        }
      })
      .catch(() => fetchDoctorData(userId)); // Fallback to doctor data fetch
  };
  const fetchDoctorData = (userId) => {
    api
      .get(`/driver/register/`)
      .then((res) => {
        const doctor = res.data.find((d) => d.user.id === userId);
        if (doctor) {
          setDriverData(doctor);
          setRiderData(null); // Clear patient data if doctor found
        }
      })
      .catch(error=>console.log(error));
  };

  // const handleAuthFailure = () => {
  //     setIsAuth(false);
  //     localStorage.removeItem(ACCESS_TOKEN);
  //     localStorage.removeItem(REFRESH_TOKEN);
  //     navigate("/user/login");
  //   };
  return { isAuth, setIsAuth, decode, user, userId ,riderData,driverData };
};

export default useAuth;
