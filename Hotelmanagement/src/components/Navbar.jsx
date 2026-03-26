import { useNavigate } from "react-router-dom";

export default function Navbar(){

const navigate = useNavigate();

const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/login");
};

return(

<div className="navbar">

<div className="navbar-left">
  <h2 className="navbar-title">🏨 LuxeStay Admin</h2>
</div>

<div className="navbar-right">
  <div className="navbar-user">
    <span className="user-avatar">👤</span>
    <span className="user-name">Admin</span>
  </div>
  <button onClick={handleLogout} className="btn btn-logout">
    Logout
  </button>
</div>

</div>

)

}