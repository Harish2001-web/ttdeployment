import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export default function Login(){

const [username,setUsername]=useState("");
const [password,setPassword]=useState("");
const [loading,setLoading]=useState(false);
const navigate=useNavigate();

const handleLogin=async(e)=>{
e.preventDefault();
setLoading(true);

try{
const res=await login({username,password});
localStorage.setItem("token",res.data.token);
navigate("/");
}catch{
alert("Invalid credentials");
}finally{
setLoading(false);
}
};

return(

<div className="auth-container">
<div className="auth-wrapper">
	<div className="auth-content">
		<div className="auth-header">
			<div className="hotel-icon">🏨</div>
			<h1>LuxeStay Admin</h1>
			<p>Hotel Management System</p>
		</div>

		<form onSubmit={handleLogin} className="auth-form">
			<div className="form-group">
				<label>Username</label>
				<input
					type="text"
					placeholder="Enter your username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					required
					className="form-input"
				/>
			</div>

			<div className="form-group">
				<label>Password</label>
				<input
					type="password"
					placeholder="Enter your password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
					className="form-input"
				/>
			</div>

			<button type="submit" disabled={loading} className="btn btn-login">
				{loading ? "Logging in..." : "Login"}
			</button>
		</form>

		<div className="auth-footer">
			<p>Don't have an account? <a href="/register" className="auth-link">Create one</a></p>
		</div>
	</div>

	<div className="auth-sidebar">
		<div className="sidebar-content">
			<h2>Welcome Back!</h2>
			<p>Manage your hotel with ease and efficiency</p>
			<div className="feature-list">
				<div className="feature-item">
					<span className="feature-icon">📊</span>
					<span>Manage Rooms</span>
				</div>
				<div className="feature-item">
					<span className="feature-icon">👥</span>
					<span>Customer Database</span>
				</div>
				<div className="feature-item">
					<span className="feature-icon">📅</span>
					<span>Track Bookings</span>
				</div>
			</div>
		</div>
	</div>
</div>

</div>

);
}