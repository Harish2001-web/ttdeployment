
import { useEffect, useState } from "react";
import { getRooms, addRoom } from "../services/api";


export default function Rooms() {
	const [rooms, setRooms] = useState([]);
	const [showForm, setShowForm] = useState(false);
	const [roomNumber, setRoomNumber] = useState("");
	const [type, setType] = useState("");
	const [price, setPrice] = useState("");
	const [available, setAvailable] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadRooms();
	}, []);

	const loadRooms = async () => {
		try {
			const res = await getRooms();
			setRooms(res.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleAddRoom = async (e) => {
		e.preventDefault();
		setLoading(true);
		try {
			await addRoom({ roomNumber, type, price, available });
			setRoomNumber("");
			setType("");
			setPrice("");
			setAvailable(true);
			setShowForm(false);
			loadRooms();
		} catch {
			alert("Failed to add room");
		}
		setLoading(false);
	};

	return (
		<div className="page">
			<h1>Rooms</h1>
			<button className="btn" style={{ marginBottom: 24 }} onClick={() => setShowForm((v) => !v)}>
				{showForm ? "Cancel" : "Add Room"}
			</button>
			{showForm && (
				<form onSubmit={handleAddRoom} style={{
					background: '#fff',
					borderRadius: 16,
					boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
					padding: 24,
					marginBottom: 32,
					maxWidth: 400
				}}>
					<h3 style={{marginTop:0}}>Add New Room</h3>
					<input
						placeholder="Room Number"
						value={roomNumber}
						onChange={e => setRoomNumber(e.target.value)}
						style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #e0e7ff' }}
						required
					/>
					<input
						placeholder="Type (e.g. Deluxe, Suite)"
						value={type}
						onChange={e => setType(e.target.value)}
						style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #e0e7ff' }}
						required
					/>
					<input
						type="number"
						placeholder="Price"
						value={price}
						onChange={e => setPrice(e.target.value)}
						style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #e0e7ff' }}
						required
					/>
					<label style={{ display: 'block', marginBottom: 12 }}>
						<input
							type="checkbox"
							checked={available}
							onChange={e => setAvailable(e.target.checked)}
							style={{ marginRight: 8 }}
						/>
						Available
					</label>
					<button className="btn btn-primary" type="submit" disabled={loading}>
						{loading ? "Adding..." : "Add Room"}
					</button>
				</form>
			)}
			<div className="rooms-grid">
				{rooms.map(room => (
					<div className="room-card" key={room.id} style={{ display: 'flex', flexDirection: 'column', minHeight: 320 }}>
						<img src="https://images.unsplash.com/photo-1611892440504-42a792e24d32" alt="Room" />
						<div className="room-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
							<div>
								<h3 style={{ margin: 0, fontWeight: 700, fontSize: 22 }}>{room.type}</h3>
								<p style={{ color: '#6366f1', fontWeight: 600, margin: '8px 0 4px' }}>Room {room.roomNumber}</p>
								<p style={{ color: '#64748b', margin: 0 }}>₹{room.price}</p>
							</div>
							<div style={{ marginTop: 18 }}>
								<span style={{
									background: room.available ? '#d1fae5' : '#fee2e2',
									color: room.available ? '#059669' : '#dc2626',
									padding: '6px 18px',
									borderRadius: 8,
									fontWeight: 700,
									fontSize: 15,
									letterSpacing: 1
								}}>
									{room.available ? 'Available' : 'Occupied'}
								</span>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}