import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetPartners, adminCreatePartner, adminUpdatePartner, adminDeletePartner } from "../../services/api";

const EMPTY = { name: "", logo: "", website: "", type: "partner", description: "", isActive: true };
const TYPE_COLORS = { partner: "#4dabf7", sponsor: "#845ef7", donor: "#3aafa9" };

export default function AdminPartners() {
  const [partners, setPartners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = () => {
    setLoading(true);
    adminGetPartners()
      .then(res => setPartners(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setMsg(""); setShowForm(true); };
  const openEdit = (p) => {
    setForm({ name: p.name, logo: p.logo || "", website: p.website || "", type: p.type, description: p.description || "", isActive: p.isActive });
    setEditId(p.id); setMsg(""); setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) { await adminUpdatePartner(editId, form); setMsg("Updated."); }
      else { await adminCreatePartner(form); setMsg("Added."); }
      load();
      setTimeout(() => { setShowForm(false); setMsg(""); }, 1000);
    } catch (err) { setMsg(err.message || "Failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove partner?")) return;
    await adminDeletePartner(id);
    load();
  };

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    addBtn: { padding: "10px 24px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" },
    pCard: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: "20px", display: "flex", flexDirection: "column", gap: "8px" },
    logoBox: { width: "60px", height: "60px", borderRadius: "8px", objectFit: "contain", background: "#f8f9fa", padding: "6px" },
    pName: { fontWeight: 700, fontSize: "15px", color: "#1b3d4f" },
    typeBadge: (t) => ({ display: "inline-block", padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (TYPE_COLORS[t] || "#ddd") + "22", color: TYPE_COLORS[t] || "#888" }),
    pDesc: { fontSize: "13px", color: "#888", lineHeight: 1.5 },
    pActions: { display: "flex", gap: "8px", marginTop: "4px" },
    actionBtn: (c) => ({ flex: 1, padding: "6px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, background: c + "18", color: c }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "480px", maxHeight: "85vh", overflowY: "auto" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
  };

  return (
    <AdminLayout title="Partners & Sponsors">
      <div style={s.topBar}>
        <span style={{ color: "#888", fontSize: "14px" }}>{partners.length} partners</span>
        <button style={s.addBtn} onClick={openCreate}>+ Add Partner</button>
      </div>

      {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
        partners.length === 0 ? <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>No partners yet.</p> : (
          <div style={s.grid}>
            {partners.map(p => (
              <div key={p.id} style={{ ...s.pCard, opacity: p.isActive ? 1 : 0.55 }}>
                {p.logo ? <img src={p.logo} alt={p.name} style={s.logoBox} onError={e => e.target.style.display = "none"} /> : null}
                <p style={s.pName}>{p.name}</p>
                <span style={s.typeBadge(p.type)}>{p.type}</span>
                {p.description && <p style={s.pDesc}>{p.description}</p>}
                {p.website && <a href={p.website} target="_blank" rel="noreferrer" style={{ fontSize: "12px", color: "#4dabf7" }}>{p.website}</a>}
                <div style={s.pActions}>
                  <button style={s.actionBtn("#4dabf7")} onClick={() => openEdit(p)}>Edit</button>
                  <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(p.id)}>Remove</button>
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
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>{editId ? "Edit Partner" : "Add Partner"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <label style={s.label}>Name *</label>
              <input style={s.input} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required placeholder="Organization name" />
              <label style={s.label}>Type</label>
              <select style={{ ...s.input }} value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                <option value="partner">Partner</option>
                <option value="sponsor">Sponsor</option>
                <option value="donor">Donor</option>
              </select>
              <label style={s.label}>Logo URL</label>
              <input style={s.input} value={form.logo} onChange={e => setForm({ ...form, logo: e.target.value })} placeholder="https://..." />
              <label style={s.label}>Website</label>
              <input style={s.input} value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="https://..." />
              <label style={s.label}>Description</label>
              <textarea style={{ ...s.input, minHeight: "70px", resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <label style={{ ...s.label, display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                Active (visible on site)
              </label>
              {msg && <p style={{ color: "#3aafa9", marginBottom: "12px", fontWeight: 600 }}>{msg}</p>}
              <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>{saving ? "Saving..." : (editId ? "Update" : "Add Partner")}</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
