import { Link } from "react-router-dom";

export default function Sidebar(){

return(

<div className="sidebar">

<div className="sidebar-header">
  <h3>Menu</h3>
</div>

<Link to="/" className="sidebar-item">
  <span className="sidebar-icon">📊</span>
  <span>Dashboard</span>
</Link>

<Link to="/rooms" className="sidebar-item">
  <span className="sidebar-icon">🛏️</span>
  <span>Rooms</span>
</Link>

<Link to="/customers" className="sidebar-item">
  <span className="sidebar-icon">👥</span>
  <span>Customers</span>
</Link>

<Link to="/bookings" className="sidebar-item">
  <span className="sidebar-icon">📅</span>
  <span>Bookings</span>
</Link>

</div>

)

}