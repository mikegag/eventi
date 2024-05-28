import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const isAuthenticated = () => {
    //setup later
//   const isLoggedIn = localStorage.getItem("user_id");
//   return isLoggedIn !== null;
return true

}

export default function ProtectedRoute() {
  return isAuthenticated() ? <Outlet /> : <Navigate to="/login" />
}