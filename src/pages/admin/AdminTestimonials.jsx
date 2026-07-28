import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetTestimonials, adminCreateTestimonial, adminUpdateTestimonial, adminDeleteTestimonial } from "../../services/api";

const EMPTY = { name: "", role: "", organization: "", message: "", photo: "", rating: 5, isActive: true };

export default function AdminTestimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = () => {
    setLoading(true);
    adminGetTestimonials()
      .then(res => setItems(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setMsg(""); setShowForm(true); };
  const openEdit = (t) => {
    setForm({ name: t.name, role: t.role || "", organization: t.organization || "", message: t.message, photo: t.photo || "", rating: t.rating || 5, isActive: t.isActive });
    setEditId(t.id); setMsg(""); setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) { await adminUpdateTestimonial(editId, form); setMsg("Updated."); }
      else { await adminCreateTestimonial(form); setMsg("Added."); }
      load();
      setTimeout(() => { setShowForm(false); setMsg(""); }, 1000);
    } catch (err) { setMsg(err.message || "Failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete testimonial?")) return;
    await adminDeleteTestimonial(id);
    load();
  };

  const Stars = ({ n }) => (
    <>
      {Array.from({ length: 5 }, (_, i) => (
        <i key={i} className={`bi ${i < n ? "bi-star-fill" : "bi-star"}`} style={{ marginRight: "2px" }}></i>
      ))}
    </>
  );

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    addBtn: { padding: "10px 24px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" },
    tCard: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: "22px" },
    tHeader: { display: "flex", gap: "12px", alignItems: "center", marginBottom: "12px" },
    avatar: { width: "48px", height: "48px", borderRadius: "50%", objectFit: "cover", background: "#eef3f4" },
    avatarPlaceholder: { width: "48px", height: "48px", borderRadius: "50%", background: "#2a9d8f22", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#2a9d8f", fontWeight: 700 },
    tName: { fontWeight: 700, fontSize: "15px", color: "#1b3d4f" },
    tRole: { fontSize: "12px", color: "#888" },
    tMsg: { fontSize: "14px", color: "#555", lineHeight: 1.6, marginBottom: "12px", fontStyle: "italic" },
    tStars: { color: "#f0a500", fontSize: "14px", marginBottom: "12px" },
    tActions: { display: "flex", gap: "8px" },
    actionBtn: (c) => ({ flex: 1, padding: "6px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, background: c + "18", color: c }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "480px", maxHeight: "85vh", overflowY: "auto" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
  };

  return (
    <AdminLayout title="Testimonials">
      <div style={s.topBar}>
        <span style={{ color: "#888", fontSize: "14px" }}>{items.length} testimonials</span>
        <button style={s.addBtn} onClick={openCreate}>+ Add Testimonial</button>
      </div>

      {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
        items.length === 0 ? <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>No testimonials yet.</p> : (
          <div style={s.grid}>
            {items.map(t => (
              <div key={t.id} style={{ ...s.tCard, opacity: t.isActive ? 1 : 0.55 }}>
                <div style={s.tHeader}>
                  {t.photo
                    ? <img src={t.photo} alt={t.name} style={s.avatar} onError={e => e.target.style.display = "none"} />
                    : <div style={s.avatarPlaceholder}>{t.name.charAt(0)}</div>
                  }
                  <div>
                    <p style={s.tName}>{t.name}</p>
                    <p style={s.tRole}>{[t.role, t.organization].filter(Boolean).join(", ") || "Community Member"}</p>
                  </div>
                </div>
                <p style={s.tStars}><Stars n={t.rating || 5} /></p>
                <p style={s.tMsg}>"{t.message}"</p>
                <div style={s.tActions}>
                  <button style={s.actionBtn("#4dabf7")} onClick={() => openEdit(t)}>Edit</button>
                  <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(t.id)}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {showForm && (
        <div style={s.modal} onClick={() => setShowForm(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>{editId ? "Edit Testimonial" : "Add Testimonial"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <label style={s.label}>Name *</label>
              <input style={s.input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Person's name" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={s.label}>Role / Title</label>
                  <input style={s.input} value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="e.g. Beneficiary" />
                </div>
                <div>
                  <label style={s.label}>Organization</label>
                  <input style={s.input} value={form.organization} onChange={e => setForm({ ...form, organization: e.target.value })} placeholder="e.g. Village School" />
                </div>
              </div>
              <label style={s.label}>Photo URL</label>
              <input style={s.input} value={form.photo} onChange={e => setForm({ ...form, photo: e.target.value })} placeholder="https://..." />
              <label style={s.label}>Testimonial *</label>
              <textarea style={{ ...s.input, minHeight: "100px", resize: "vertical" }} value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} required placeholder="Their story or feedback..." />
              <label style={s.label}>Rating: {form.rating}/5</label>
              <input style={s.input} type="range" min="1" max="5" value={form.rating} onChange={e => setForm({ ...form, rating: +e.target.value })} />
              <label style={{ ...s.label, display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                Active (visible on site)
              </label>
              {msg && <p style={{ color: "#3aafa9", marginBottom: "12px", fontWeight: 600 }}>{msg}</p>}
              <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>{saving ? "Saving..." : (editId ? "Update" : "Add Testimonial")}</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
