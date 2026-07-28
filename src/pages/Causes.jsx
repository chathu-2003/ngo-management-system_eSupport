import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCauses } from "../services/api";

export default function Causes() {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getCauses()
      .then(res => setCauses(res.data || []))
      .catch(err => setError(err.message || "Failed to load causes."))
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
    cardTitle: { fontSize: "18px", fontWeight: 700, color: "#162a35", marginBottom: "10px" },
    desc: { color: "#666", fontSize: "14px", lineHeight: 1.6, marginBottom: "16px" },
    progressBar: { background: "#f0f0f0", borderRadius: "20px", height: "8px", overflow: "hidden", marginBottom: "10px" },
    amounts: { display: "flex", justifyContent: "space-between", fontSize: "13px", color: "#888", marginBottom: "16px" },
    donateBtn: { display: "inline-block", padding: "10px 24px", background: "#ff544a", color: "#fff", borderRadius: "6px", fontWeight: 700, fontSize: "13px", textDecoration: "none", border: "none", cursor: "pointer" },
    loading: { textAlign: "center", padding: "80px", color: "#888", fontSize: "18px" },
    backBtn: { display: "inline-block", marginBottom: "28px", color: "#ff544a", fontWeight: 600, textDecoration: "none" },
    noData: { textAlign: "center", color: "#888", padding: "60px", fontSize: "16px" },
  };

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Our <span style={s.accent}>Causes</span></h1>
        <p style={s.breadcrumb}><Link to="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</Link> &rsaquo; Causes</p>
      </div>
      <div style={s.container}>
        <Link to="/" style={s.backBtn}>← Back to Home</Link>
        {loading && <div style={s.loading}>Loading causes...</div>}
        {error && <div style={{ ...s.loading, color: "#ff544a" }}>{error}</div>}
        {!loading && !error && causes.length === 0 && (
          <div style={s.noData}>No active causes at the moment. Check back soon!</div>
        )}
        <div style={s.grid}>
          {causes.map(cause => (
            <div key={cause.id} style={s.card}>
              {cause.image
                ? <img src={`http://localhost:5000/uploads/${cause.image}`} alt={cause.title} style={s.cardImg} />
                : <div style={{ ...s.cardImg, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: "48px" }}><i className="bi bi-heart-fill"></i></div>
              }
              <div style={s.cardBody}>
                <h3 style={s.cardTitle}>{cause.title}</h3>
                <p style={s.desc}>{cause.description}</p>
                <div style={s.progressBar}>
                  <div style={{ height: "100%", width: `${cause.progress || 0}%`, background: cause.color || "#ff544a", borderRadius: "20px", transition: "width 0.6s ease" }} />
                </div>
                <div style={s.amounts}>
                  <span>Raised: <strong>LKR {Number(cause.raised).toLocaleString()}</strong></span>
                  <span>Goal: <strong>LKR {Number(cause.goal).toLocaleString()}</strong></span>
                </div>
                <Link to="/donate" style={s.donateBtn}>Donate Now</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
