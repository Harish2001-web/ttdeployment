import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api"
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* AUTH */
export const login = (data) => API.post("/auth/login", data);
export const register = (data) => API.post("/auth/register", data);

/* ROOMS */
export const getRooms = () => API.get("/rooms");
export const addRoom = (room) => API.post("/rooms", room);
export const deleteRoom = (id) => API.delete(`/rooms/${id}`);

/* CUSTOMERS */
export const getCustomers = () => API.get("/customers");
export const addCustomer = (customer) => API.post("/customers", customer);

/* BOOKINGS */
export const getBookings = () => API.get("/bookings");
export const createBooking = (booking) => API.post("/bookings", booking);

export default API;