import { useEffect, useState } from "react";
import useAuth from "./useAuth";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import api from "../api";
import { jwtDecode } from "jwt-decode";

const useUser = () => {
    const [setIsAuth] = useAuth();
    const [user,setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(()=>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (token) {
            const decoded = jwtDecode(token);
            fetchUserData(decoded.user_id);
          } else {
            handleAuthFailure();
          }
    },[])
    const fetchUserData = (userId) => {
        api.get(`/rider/user/${userId}/`)
          .then((res) => {
            setUser(res.data);
          })
          .catch(handleAuthFailure);
      };
      const handleAuthFailure = () => {
        setIsAuth(false);
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        navigate("/login");
      };
    return [user];
};

export default useUser;