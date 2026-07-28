import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getGallery } from "../services/api";

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("");
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    setLoading(true);
    getGallery(category)
      .then(res => setImages(res.data || []))
      .catch(err => setError(err.message || "Failed to load gallery."))
      .finally(() => setLoading(false));
  }, [category]);

  const s = {
    page: { fontFamily: "Poppins, sans-serif", minHeight: "100vh", background: "#f9f9f9" },
    hero: { background: "#162a35", color: "#fff", padding: "80px 20px", textAlign: "center" },
    heroTitle: { fontSize: "42px", fontWeight: 700, marginBottom: "12px" },
    accent: { color: "#ff544a" },
    container: { maxWidth: "1200px", margin: "0 auto", padding: "60px 20px" },
    filterBar: { display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "36px" },
    filterBtn: { padding: "8px 20px", borderRadius: "20px", border: "2px solid #ddd", background: "#fff", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
    filterBtnActive: { borderColor: "#ff544a", background: "#ff544a", color: "#fff" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "16px" },
    imgWrap: { borderRadius: "10px", overflow: "hidden", cursor: "pointer", position: "relative", aspectRatio: "1" },
    img: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.3s" },
    overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalImg: { maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "8px" },
    closeBtn: { position: "fixed", top: "24px", right: "28px", color: "#fff", fontSize: "32px", cursor: "pointer", fontWeight: 300 },
    loading: { textAlign: "center", padding: "80px", color: "#888" },
    noData: { textAlign: "center", color: "#888", padding: "60px" },
    backBtn: { display: "inline-block", marginBottom: "28px", color: "#ff544a", fontWeight: 600, textDecoration: "none" },
  };

  const categories = ["", "events", "volunteers", "projects", "community"];
  const categoryLabels = { "": "All", "events": "Events", "volunteers": "Volunteers", "projects": "Projects", "community": "Community" };

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Photo <span style={s.accent}>Gallery</span></h1>
        <p style={{ color: "#ccc", fontSize: "14px" }}><Link to="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</Link> &rsaquo; Gallery</p>
      </div>

      {selected && (
        <div style={s.overlay} onClick={() => setSelected(null)}>
          <span style={s.closeBtn}>×</span>
          <img src={`http://localhost:5000/uploads/${selected}`} alt="Gallery" style={s.modalImg} onClick={e => e.stopPropagation()} />
        </div>
      )}

      <div style={s.container}>
        <Link to="/" style={s.backBtn}>← Back to Home</Link>
        <div style={s.filterBar}>
          {categories.map(cat => (
            <button key={cat} style={{ ...s.filterBtn, ...(category === cat ? s.filterBtnActive : {}) }} onClick={() => setCategory(cat)}>
              {categoryLabels[cat]}
            </button>
          ))}
        </div>
        {loading && <div style={s.loading}>Loading gallery...</div>}
        {error && <div style={{ ...s.loading, color: "#ff544a" }}>{error}</div>}
        {!loading && !error && images.length === 0 && <div style={s.noData}>No images in this category yet.</div>}
        <div style={s.grid}>
          {images.map(item => (
            <div key={item.id} style={s.imgWrap} onClick={() => setSelected(item.image)}>
              <img src={`http://localhost:5000/uploads/${item.image}`} alt={item.title || "Gallery"} style={s.img} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
