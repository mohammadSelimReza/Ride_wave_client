import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { jwtDecode } from "jwt-decode";
import api from "../api";


const ProtectedRoute = ({children}) => {
    const [isAuthorised,setIsAuthorized] = useState(null);

    useEffect(()=>{
        auth().catch(()=>setIsAuthorized(false));
    },[])


    const refreshToken = async () =>{
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/token/refresh/",{refresh: refreshToken});
            if(res.status === 200){
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            }
            else{
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    }

    const auth = async () =>{
        const token = localStorage.getItem(ACCESS_TOKEN);
        if(!token){
            setIsAuthorized(false);
            return;
        }
        const decode = jwtDecode(token);
        const tokenExpire = decode.exp;
        const now = Date.now()/1000;

        if(tokenExpire < now){
            await refreshToken();
        }
        else{
            setIsAuthorized(true);
        }
    }

    if(isAuthorised === null){
        return <div>Loading....</div>
    }

    return isAuthorised ? children : <Navigate to="/user/login"></Navigate>
};

export default ProtectedRoute;