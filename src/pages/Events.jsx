import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../services/api";

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getEvents()
      .then(res => setEvents(res.data || []))
      .catch(err => setError(err.message || "Failed to load events."))
      .finally(() => setLoading(false));
  }, []);

  const s = {
    page: { fontFamily: "Poppins, sans-serif", minHeight: "100vh", background: "#f9f9f9" },
    hero: { background: "#162a35", color: "#fff", padding: "80px 20px", textAlign: "center" },
    heroTitle: { fontSize: "42px", fontWeight: 700, marginBottom: "12px" },
    accent: { color: "#ff544a" },
    breadcrumb: { fontSize: "14px", color: "#ccc" },
    container: { maxWidth: "1100px", margin: "0 auto", padding: "60px 20px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", overflow: "hidden" },
    cardImg: { width: "100%", height: "200px", objectFit: "cover", background: "#e0e0e0" },
    cardBody: { padding: "24px" },
    date: { color: "#ff544a", fontSize: "13px", fontWeight: 600, marginBottom: "8px" },
    cardTitle: { fontSize: "18px", fontWeight: 700, color: "#162a35", marginBottom: "8px" },
    location: { color: "#888", fontSize: "13px", marginBottom: "10px" },
    desc: { color: "#666", fontSize: "14px", lineHeight: 1.6 },
    loading: { textAlign: "center", padding: "80px", color: "#888", fontSize: "18px" },
    backBtn: { display: "inline-block", marginBottom: "28px", color: "#ff544a", fontWeight: 600, textDecoration: "none" },
    noData: { textAlign: "center", color: "#888", padding: "60px", fontSize: "16px" },
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  };

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Our <span style={s.accent}>Events</span></h1>
        <p style={s.breadcrumb}><Link to="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</Link> &rsaquo; Events</p>
      </div>
      <div style={s.container}>
        <Link to="/" style={s.backBtn}>← Back to Home</Link>
        {loading && <div style={s.loading}>Loading events...</div>}
        {error && <div style={{ ...s.loading, color: "#ff544a" }}>{error}</div>}
        {!loading && !error && events.length === 0 && (
          <div style={s.noData}>No events available at the moment. Check back soon!</div>
        )}
        <div style={s.grid}>
          {events.map(event => (
            <div key={event.id} style={s.card}>
              {event.image
                ? <img src={`http://localhost:5000/uploads/${event.image}`} alt={event.title} style={s.cardImg} />
                : <div style={{ ...s.cardImg, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: "40px" }}><i className="bi bi-calendar-event"></i></div>
              }
              <div style={s.cardBody}>
                <p style={s.date}>{formatDate(event.date)}</p>
                <h3 style={s.cardTitle}>{event.title}</h3>
                {event.location && <p style={s.location}><i className="bi bi-geo-alt-fill"></i> {event.location}</p>}
                {event.description && <p style={s.desc}>{event.description}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
