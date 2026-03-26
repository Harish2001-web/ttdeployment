import { useEffect, useState } from "react";
import { getCustomers, addCustomer, getBookings } from "../services/api";


export default function Customers() {
  const [customers, setCustomers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCustomers();
    loadBookings();
  }, []);

  const loadCustomers = async () => {
    try {
      const res = await getCustomers();
      setCustomers(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const loadBookings = async () => {
    try {
      const res = await getBookings();
      setBookings(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await addCustomer({ name, email });
      setName("");
      setEmail("");
      setShowForm(false);
      loadCustomers();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        alert("Failed to add customer: " + err.response.data.message);
      } else if (err.response && err.response.status) {
        alert(`Failed to add customer: HTTP ${err.response.status}`);
      } else {
        alert("Failed to add customer: " + err.message);
      }
      console.error("Add customer error:", err);
    }
    setLoading(false);
  };

  // Helper: count bookings for a customer
  const getRoomsBooked = (customerId) => {
    return bookings.filter(b => b.customerId === customerId).length;
  };

  return (
    <div className="page">
      <h1>Customers</h1>
      <button className="btn" style={{ marginBottom: 24 }} onClick={() => setShowForm((v) => !v)}>
        {showForm ? "Cancel" : "Add Customer"}
      </button>
      {showForm && (
        <form onSubmit={handleAddCustomer} style={{
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 2px 12px rgba(99,102,241,0.07)',
          padding: 24,
          marginBottom: 32,
          maxWidth: 400
        }}>
          <h3 style={{marginTop:0}}>Add New Customer</h3>
          <input
            placeholder="Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #e0e7ff' }}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: '100%', marginBottom: 12, padding: 10, borderRadius: 8, border: '1px solid #e0e7ff' }}
            required
          />
          <button className="btn btn-primary" type="submit" disabled={loading}>
            {loading ? "Adding..." : "Add Customer"}
          </button>
        </form>
      )}
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 5px 24px rgba(99,102,241,0.08)', padding: 24, border: '1px solid #e0e7ff', marginTop: 24 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 16 }}>
          <thead>
            <tr style={{ color: '#6366f1', textAlign: 'left' }}>
              <th style={{ padding: '8px 12px' }}>Name</th>
              <th style={{ padding: '8px 12px' }}>Email</th>
              <th style={{ padding: '8px 12px' }}>Rooms Booked</th>
            </tr>
          </thead>
          <tbody>
            {customers.map(customer => (
              <tr key={customer.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '8px 12px', fontWeight: 600 }}>{customer.name}</td>
                <td style={{ padding: '8px 12px', color: '#64748b' }}>{customer.email}</td>
                <td style={{ padding: '8px 12px' }}>
                  <span style={{ background: '#e0e7ff', color: '#6366f1', padding: '4px 12px', borderRadius: 8, fontWeight: 600, fontSize: 14 }}>{getRoomsBooked(customer.id)}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}