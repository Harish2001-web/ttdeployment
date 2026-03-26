
import { useEffect, useState } from "react";
import { getRooms, getCustomers, getBookings, createBooking } from "../services/api";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export default function Bookings() {
	const [rooms, setRooms] = useState([]);
	const [customers, setCustomers] = useState([]);
	const [bookings, setBookings] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [customerId, setCustomerId] = useState("");
	const [roomId, setRoomId] = useState("");
	const [date, setDate] = useState(new Date());
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadData();
	}, []);

	const loadData = async () => {
		try {
			const r = await getRooms();
			setRooms(r.data);
			const c = await getCustomers();
			setCustomers(c.data);
			const b = await getBookings();
			setBookings(b.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleAddBooking = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await createBooking({ customerId, roomId, date });
			setShowForm(false);
			setCustomerId("");
			setRoomId("");
			setDate(new Date());
			loadData();
		} catch (err) {
			if (err.response && err.response.data && err.response.data.message) {
				alert("Failed to add booking: " + err.response.data.message);
			} else if (err.response && err.response.status) {
				alert(`Failed to add booking: HTTP ${err.response.status}`);
			} else {
				alert("Failed to add booking: " + err.message);
			}
			console.error("Add booking error:", err);
		}
		setLoading(false);
	};

	return (
		<div className="page">
			<h1>Bookings</h1>
			<button className="btn" style={{ marginBottom: 24 }} onClick={() => setShowForm((v) => !v)}>
				{showForm ? "Cancel" : "Add Booking"}
			</button>
			{showForm && (
				<form onSubmit={handleAddBooking} style={{
					background: '#fff',
					borderRadius: 16,
					boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
					padding: 24,
					marginBottom: 32,
					maxWidth: 400
				}}>
					<h3 style={{marginTop:0}}>Add New Booking</h3>
					<label>Customer:</label>
					<select value={customerId} onChange={e => setCustomerId(e.target.value)} required style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #e0e7ff' }}>
						<option value="">Select Customer</option>
						{customers.map(c => (
							<option key={c.id} value={c.id}>{c.name} ({c.email})</option>
						))}
					</select>
					<label>Room:</label>
					<select value={roomId} onChange={e => setRoomId(e.target.value)} required style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #e0e7ff' }}>
						<option value="">Select Room</option>
						{rooms.filter(r => r.available).map(r => (
							<option key={r.id} value={r.id}>{r.type} - {r.roomNumber}</option>
						))}
					</select>
					<label>Date:</label>
					<Calendar value={date} onChange={setDate} minDate={new Date()} style={{ marginBottom: 12 }} />
					<button className="btn btn-primary" type="submit" disabled={loading} style={{ marginTop: 16 }}>
						{loading ? "Adding..." : "Add Booking"}
					</button>
				</form>
			)}
						<div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 5px 24px rgba(99,102,241,0.08)', padding: 24, border: '1px solid #e0e7ff', marginTop: 24 }}>
							<table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
								<thead>
									<tr style={{ color: '#6366f1', textAlign: 'left' }}>
										<th style={{ padding: '8px 12px' }}>Booking ID</th>
										<th style={{ padding: '8px 12px' }}>Guest</th>
										<th style={{ padding: '8px 12px' }}>Room</th>
										<th style={{ padding: '8px 12px' }}>Date</th>
										<th style={{ padding: '8px 12px' }}>Status</th>
									</tr>
								</thead>
								<tbody>
									{bookings.map(b => {
										const customer = b.customer ? b.customer : customers.find(c => c.id === (b.customerId || (b.customer && b.customer.id)));
										const room = b.room ? b.room : rooms.find(r => r.id === (b.roomId || (b.room && b.room.id)));
										return (
											<tr key={b.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
												<td style={{ padding: '8px 12px', color: '#a5b4fc', fontWeight: 700 }}>#{b.id}</td>
												<td style={{ padding: '8px 12px', fontWeight: 600 }}>{customer ? (customer.name || customer.email || customer.id) : b.customerId}</td>
												<td style={{ padding: '8px 12px', color: '#6366f1', fontWeight: 600 }}>{room ? `${room.type} ${room.roomNumber}` : '-'}</td>
												<td style={{ padding: '8px 12px' }}>{b.date ? new Date(b.date).toLocaleDateString() : "-"}</td>
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
	);
}