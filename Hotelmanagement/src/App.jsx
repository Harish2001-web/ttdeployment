import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Rooms from "./pages/Rooms";
import Customers from "./pages/Customers";
import Bookings from "./pages/Bookings";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const ProtectedRoute = ({children}) => {

  const token = localStorage.getItem("token");

  if(!token){
    return <Navigate to="/login" />
  }

  return (
    <>
      <Navbar/>
      <div style={{display:"flex"}}>
        <Sidebar/>
        <div style={{padding:"20px",width:"100%"}}>
          {children}
        </div>
      </div>
    </>
  )
}

export default function App(){

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={<Navigate to={localStorage.getItem("token") ? "/dashboard" : "/login"} />} 
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/rooms"
          element={
            <ProtectedRoute>
              <Rooms />
            </ProtectedRoute>
          }
        />
        <Route
          path="/customers"
          element={
            <ProtectedRoute>
              <Customers />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}