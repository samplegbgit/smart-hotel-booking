import { useEffect, useState } from "react";
import { API } from "./config";

function App() {
  const [hotels, setHotels] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [name, setName] = useState("");
  const [hotel, setHotel] = useState("");
  const [city, setCity] = useState("");

  useEffect(() => {
    fetch(`${API}/hotels`)
      .then(res => res.json())
      .then(data => setHotels(data || []))
      .catch(() => setHotels([]));

    fetch(`${API}/bookings`)
      .then(res => res.json())
      .then(data => setBookings(data.bookings || data || []))
      .catch(() => setBookings([]));
  }, []);

  const bookHotel = async () => {
    if (!name || !hotel || !city) return alert("Fill all fields");

    const res = await fetch(`${API}/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, hotel, city })
    });

    const data = await res.json();
    setBookings(data.bookings || []);
    alert("Booking Confirmed");
    setName("");
    setHotel("");
    setCity("");
  };

  const cancelBooking = async (id) => {
  if (!window.confirm("Cancel this booking?")) return;

  try {
    await fetch(`${API}/bookings/cancel/${id}`, {
      method: "DELETE",
    });
    setBookings(prev => prev.filter(b => b.id !== id));

    alert("Booking Cancelled");
  } catch (err) {
    console.error(err);
    alert("Error cancelling booking");
  }
};


  const cities = [...new Set(hotels.map(h => h.city))];

  const filteredHotels = city
    ? hotels.filter(h => h.city === city)
    : hotels;

  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "Inter, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>🏨 Smart Hotel Booking</h1>

      <div className="card" style={{ padding: 20, borderRadius: 8, boxShadow: "0 2px 10px rgba(0,0,0,0.1)" }}>
        <input
          placeholder="Your Name"
          value={name}
          onChange={e => setName(e.target.value)}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        />

        <select
          value={city}
          onChange={e => {
            setCity(e.target.value);
            setHotel("");
          }}
          style={{ width: "100%", padding: 8, marginBottom: 10 }}
        >
          <option value="">Select City</option>
          {cities.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select
          value={hotel}
          onChange={e => setHotel(e.target.value)}
          style={{ width: "100%", padding: 8 }}
        >
          <option value="">Select Hotel</option>
          {filteredHotels.map(h => (
            <option key={h.id} value={h.name}>
              {h.name} — ₹{h.price}
            </option>
          ))}
        </select>

        <br /><br />
        <button
          onClick={bookHotel}
          style={{ width: "100%", padding: 10, background: "#1976d2", color: "#fff", border: "none", borderRadius: 5 }}
        >
          Book Now
        </button>
      </div>

      <h2 style={{ marginTop: 40 }}>📄 Your Bookings</h2>

      {bookings && bookings.length === 0 && <p>No bookings yet</p>}

      {bookings && bookings.map(b => (
        <div
          key={b.id}
          style={{
            padding: 12,
            marginBottom: 10,
            background: "#f5f5f5",
            borderRadius: 6,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}
        >
          <div>
            <strong>{b.name}</strong><br />
            {b.hotel} ({b.city})
          </div>
          <button
            onClick={() => cancelBooking(b.id)}
            style={{ background: "#d32f2f", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 4 }}
          >
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}

export default App;
