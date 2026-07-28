import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getMarketplace } from "../services/api";

export default function Marketplace() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 12;

  useEffect(() => {
    setLoading(true);
    getMarketplace({ page, limit, ...(category ? { category } : {}) })
      .then(res => { setItems(res.data || []); setTotal(res.pagination?.total || 0); })
      .catch(err => setError(err.message || "Failed to load marketplace."))
      .finally(() => setLoading(false));
  }, [page, category]);

  const s = {
    page: { fontFamily: "Poppins, sans-serif", minHeight: "100vh", background: "#f9f9f9" },
    hero: { background: "#162a35", color: "#fff", padding: "80px 20px", textAlign: "center" },
    heroTitle: { fontSize: "42px", fontWeight: 700, marginBottom: "12px" },
    accent: { color: "#ffb83b" },
    container: { maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" },
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "32px" },
    filterBar: { display: "flex", gap: "10px", flexWrap: "wrap" },
    filterBtn: { padding: "8px 18px", borderRadius: "20px", border: "2px solid #ddd", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
    filterBtnActive: { borderColor: "#ffb83b", background: "#ffb83b", color: "#fff" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "24px" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", overflow: "hidden" },
    cardImg: { width: "100%", height: "180px", objectFit: "cover", background: "#e8e8e8" },
    cardBody: { padding: "18px" },
    badge: { display: "inline-block", padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, marginBottom: "8px", textTransform: "uppercase" },
    cardTitle: { fontSize: "16px", fontWeight: 700, color: "#162a35", marginBottom: "6px" },
    price: { fontSize: "20px", fontWeight: 700, color: "#ff544a", marginTop: "12px" },
    seller: { fontSize: "12px", color: "#aaa", marginTop: "4px" },
    contactBtn: { display: "inline-block", marginTop: "12px", padding: "8px 20px", background: "#162a35", color: "#fff", borderRadius: "6px", fontSize: "13px", fontWeight: 600, textDecoration: "none", cursor: "pointer", border: "none" },
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "40px" },
    pageBtn: { padding: "8px 16px", borderRadius: "6px", border: "2px solid #ddd", background: "#fff", cursor: "pointer", fontWeight: 600 },
    pageBtnActive: { borderColor: "#ff544a", background: "#ff544a", color: "#fff" },
    loading: { textAlign: "center", padding: "80px", color: "#888" },
    noData: { textAlign: "center", color: "#888", padding: "60px" },
    backBtn: { display: "inline-block", marginBottom: "28px", color: "#ff544a", fontWeight: 600, textDecoration: "none" },
  };

  const conditionColors = { new: "#3cd49b", used: "#ffb83b", donated: "#ff544a" };
  const categories = ["", "clothing", "furniture", "electronics", "books", "toys", "other"];
  const totalPages = Math.ceil(total / limit);

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Charity <span style={s.accent}>Marketplace</span></h1>
        <p style={{ color: "#ccc", fontSize: "14px" }}><Link to="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</Link> &rsaquo; Marketplace</p>
      </div>
      <div style={s.container}>
        <div style={s.topBar}>
          <Link to="/" style={s.backBtn}>← Back to Home</Link>
          <div style={s.filterBar}>
            {categories.map(cat => (
              <button key={cat} style={{ ...s.filterBtn, ...(category === cat ? s.filterBtnActive : {}) }} onClick={() => { setCategory(cat); setPage(1); }}>
                {cat || "All"}
              </button>
            ))}
          </div>
        </div>
        {loading && <div style={s.loading}>Loading marketplace...</div>}
        {error && <div style={{ ...s.loading, color: "#ff544a" }}>{error}</div>}
        {!loading && !error && items.length === 0 && <div style={s.noData}>No items available right now.</div>}
        <div style={s.grid}>
          {items.map(item => (
            <div key={item.id} style={s.card}>
              {item.image
                ? <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title} style={s.cardImg} />
                : <div style={{ ...s.cardImg, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: "40px" }}><i className="bi bi-bag"></i></div>
              }
              <div style={s.cardBody}>
                <span style={{ ...s.badge, background: conditionColors[item.condition] + "22", color: conditionColors[item.condition] }}>{item.condition}</span>
                <h3 style={s.cardTitle}>{item.title}</h3>
                {item.description && <p style={{ color: "#888", fontSize: "13px" }}>{item.description.substring(0, 80)}{item.description.length > 80 ? "..." : ""}</p>}
                <p style={s.price}>LKR {Number(item.price).toLocaleString()}</p>
                {item.seller && <p style={s.seller}>Listed by {item.seller.name}</p>}
              </div>
            </div>
          ))}
        </div>
        {totalPages > 1 && (
          <div style={s.pagination}>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
              <button key={p} style={{ ...s.pageBtn, ...(page === p ? s.pageBtnActive : {}) }} onClick={() => setPage(p)}>{p}</button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
