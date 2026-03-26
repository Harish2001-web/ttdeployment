import { useEffect,useState } from "react";
import { getRooms,getCustomers,getBookings } from "../services/api";
import { PieChart,Pie,Cell,Tooltip } from "recharts";

export default function Dashboard(){

const [rooms,setRooms]=useState([]);
const [customers,setCustomers]=useState([]);
const [bookings,setBookings]=useState([]);

useEffect(()=>{
loadData();
},[]);

const loadData = async () => {

try{

const r = await getRooms();
const c = await getCustomers();
const b = await getBookings();

setRooms(r.data || []);
setCustomers(c.data || []);
setBookings(b.data || []);

}catch(err){

console.log(err);

}

};

const available = rooms.filter(r=>r.available).length;

const data = [
{ name:"Available", value:available },
{ name:"Booked", value:rooms.length-available }
];

return (
	<div className="page" style={{ background: 'linear-gradient(135deg, #f9fafc 0%, #c7d2fe 100%)', minHeight: '100vh', paddingBottom: 40 }}>
		<h1 style={{ margin: 0, fontWeight: 800, fontSize: 36, letterSpacing: 1, marginBottom: 10 }}>Dashboard</h1>
		<div className="card-grid">
	<div className="card">
		<h3>Total Rooms</h3>
		<h2>{rooms.length}</h2>
	</div>
	<div className="card">
		<h3>Available Rooms</h3>
		<h2 style={{ color: '#22c55e' }}>{available}</h2>
	</div>
	<div className="card">
		<h3>Booked Rooms</h3>
		<h2 style={{ color: '#ef4444' }}>{rooms.length - available}</h2>
	</div>
	<div className="card">
		<h3>Total Customers</h3>
		<h2>{customers.length}</h2>
	</div>
	<div className="card">
		<h3>Total Bookings</h3>
		<h2>{bookings.length}</h2>
	</div>
</div>

<div style={{ display: 'flex', gap: 32, marginTop: 40, flexWrap: 'wrap' }}>
	{/* Room Occupancy Pie Chart */}
	<div style={{ flex: 1, minWidth: 340, background: '#fff', borderRadius: 18, boxShadow: '0 5px 24px rgba(99,102,241,0.08)', padding: 24, border: '1px solid #e0e7ff' }}>
		<h2 style={{ fontSize: 22, marginBottom: 18 }}>Room Occupancy</h2>
		<PieChart width={320} height={220}>
			<Pie data={data} dataKey="value" outerRadius={90}>
				<Cell fill="#22c55e" />
				<Cell fill="#6366f1" />
			</Pie>
			<Tooltip />
		</PieChart>
	</div>

	{/* Room Status Card */}
	<div style={{ flex: 1, minWidth: 320, background: '#fff', borderRadius: 18, boxShadow: '0 5px 24px rgba(99,102,241,0.08)', padding: 24, border: '1px solid #e0e7ff' }}>
		<h2 style={{ fontSize: 22, marginBottom: 18 }}>Room Status</h2>
		<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e', display: 'inline-block' }}></span>Available <span style={{ marginLeft: 'auto', fontWeight: 600 }}>{rooms.filter(r => r.available).length}</span></div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444', display: 'inline-block' }}></span>Occupied <span style={{ marginLeft: 'auto', fontWeight: 600 }}>{rooms.filter(r => !r.available).length}</span></div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#6366f1', display: 'inline-block' }}></span>Reserved <span style={{ marginLeft: 'auto', fontWeight: 600 }}>0</span></div>
			<div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><span style={{ width: 12, height: 12, borderRadius: '50%', background: '#fbbf24', display: 'inline-block' }}></span>Maintenance <span style={{ marginLeft: 'auto', fontWeight: 600 }}>0</span></div>
		</div>
	</div>
</div>

{/* Recent Reservations Table */}
<div style={{ marginTop: 40, background: '#fff', borderRadius: 18, boxShadow: '0 5px 24px rgba(99,102,241,0.08)', padding: 24, border: '1px solid #e0e7ff' }}>
	<h2 style={{ fontSize: 22, marginBottom: 18 }}>Recent Reservations</h2>
	<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
		<thead>
			<tr style={{ color: '#6366f1', textAlign: 'left' }}>
				<th style={{ padding: '8px 12px' }}>Guest</th>
				<th style={{ padding: '8px 12px' }}>Room</th>
				<th style={{ padding: '8px 12px' }}>Dates</th>
				<th style={{ padding: '8px 12px' }}>Status</th>
			</tr>
		</thead>
		<tbody>
			{bookings.slice(0, 5).map((b, idx) => {
				const guest = customers.find(c => c.id === b.customerId) || {};
				const room = rooms.find(r => r.id === b.roomId) || {};
				return (
					<tr key={b.id || idx} style={{ borderBottom: '1px solid #f1f5f9' }}>
						<td style={{ padding: '8px 12px' }}>{guest.name || '-'}</td>
						<td style={{ padding: '8px 12px' }}>{room.number || '-'}</td>
						<td style={{ padding: '8px 12px' }}>{b.startDate} - {b.endDate}</td>
						<td style={{ padding: '8px 12px' }}>
							<span style={{ background: '#d1fae5', color: '#059669', padding: '4px 12px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>CHECKED IN</span>
						</td>
					</tr>
				);
			})}
		</tbody>
	</table>
</div>

</div>

)

}