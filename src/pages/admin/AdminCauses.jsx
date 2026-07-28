import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetCauses, adminCreateCause, adminUpdateCause, adminDeleteCause } from "../../services/api";

const EMPTY_FORM = { title: "", description: "", goal: "", color: "#2a9d8f" };

export default function AdminCauses() {
  const [causes, setCauses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const load = () => {
    setLoading(true);
    adminGetCauses().then(res => setCauses(res.data || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setMsg(""); setShowForm(true); };
  const openEdit = (c) => { setForm({ title: c.title, description: c.description, goal: c.goal, color: c.color || "#2a9d8f" }); setEditId(c.id); setMsg(""); setShowForm(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) {
        await adminUpdateCause(editId, form);
        setMsg("Cause updated.");
      } else {
        await adminCreateCause(form);
        setMsg("Cause created.");
      }
      load();
      setTimeout(() => { setShowForm(false); setMsg(""); }, 1200);
    } catch (err) {
      setMsg(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this cause?")) return;
    await adminDeleteCause(id);
    load();
  };

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    addBtn: { padding: "10px 24px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer", fontSize: "14px" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase", letterSpacing: "0.5px" },
    td: { padding: "14px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    actionBtn: (color) => ({ padding: "6px 14px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, background: color + "18", color, marginRight: "6px" }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "480px" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    progress: (val, color) => ({ background: "#eef3f4", borderRadius: "8px", height: "6px", overflow: "hidden", position: "relative" }),
  };

  return (
    <AdminLayout title="Manage Causes">
      <div style={s.topBar}>
        <span style={{ color: "#888", fontSize: "14px" }}>{causes.length} active causes</span>
        <button style={s.addBtn} onClick={openCreate}>+ Add New Cause</button>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>Title</th>
                <th style={s.th}>Goal (LKR)</th>
                <th style={s.th}>Raised (LKR)</th>
                <th style={s.th}>Progress</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {causes.length === 0 && <tr><td colSpan={5} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No causes yet.</td></tr>}
              {causes.map(c => {
                const pct = c.goal > 0 ? Math.min(Math.round((c.raised / c.goal) * 100), 100) : 0;
                return (
                  <tr key={c.id}>
                    <td style={{ ...s.td, fontWeight: 600 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: c.color || "#2a9d8f", flexShrink: 0 }} />
                        {c.title}
                      </div>
                    </td>
                    <td style={s.td}>{Number(c.goal).toLocaleString()}</td>
                    <td style={s.td}>{Number(c.raised).toLocaleString()}</td>
                    <td style={s.td}>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <div style={{ flex: 1, background: "#eef3f4", borderRadius: "8px", height: "6px", overflow: "hidden" }}>
                          <div style={{ height: "100%", width: `${pct}%`, background: c.color || "#2a9d8f", borderRadius: "8px" }} />
                        </div>
                        <span style={{ fontSize: "12px", color: "#888", width: "36px" }}>{pct}%</span>
                      </div>
                    </td>
                    <td style={s.td}>
                      <button style={s.actionBtn("#4dabf7")} onClick={() => openEdit(c)}>Edit</button>
                      <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(c.id)}>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div style={s.modal} onClick={() => setShowForm(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>{editId ? "Edit Cause" : "Add New Cause"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>x</button>
            </div>
            <form onSubmit={handleSave}>
              <label style={s.label}>Title *</label>
              <input style={s.input} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Cause title" />
              <label style={s.label}>Description</label>
              <textarea style={{ ...s.input, minHeight: "80px", resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Describe the cause..." />
              <label style={s.label}>Fundraising Goal (LKR) *</label>
              <input style={s.input} type="number" min="1" value={form.goal} onChange={e => setForm({ ...form, goal: e.target.value })} required placeholder="e.g. 500000" />
              <label style={s.label}>Color</label>
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
                <input type="color" value={form.color} onChange={e => setForm({ ...form, color: e.target.value })} style={{ width: "48px", height: "40px", border: "1.5px solid #ddd", borderRadius: "8px", cursor: "pointer" }} />
                <span style={{ fontSize: "13px", color: "#888" }}>{form.color}</span>
              </div>
              {msg && <p style={{ color: msg.includes("success") || msg.includes("updated") || msg.includes("created") ? "#3aafa9" : "#2a9d8f", marginBottom: "12px", fontWeight: 600 }}>{msg}</p>}
              <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>{saving ? "Saving..." : (editId ? "Update Cause" : "Create Cause")}</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
