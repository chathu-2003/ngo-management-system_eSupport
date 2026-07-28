import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetEvents, adminCreateEvent, adminUpdateEvent, adminDeleteEvent, adminGetEventRegistrations } from "../../services/api";

const EMPTY_FORM = { title: "", description: "", date: "", location: "", attendees: 0 };

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [regsFor, setRegsFor] = useState(null);
  const [registrations, setRegistrations] = useState([]);
  const [regsLoading, setRegsLoading] = useState(false);

  const openRegistrations = (ev) => {
    setRegsFor(ev);
    setRegsLoading(true);
    adminGetEventRegistrations(ev.id)
      .then(res => setRegistrations(res.data || []))
      .finally(() => setRegsLoading(false));
  };

  const load = () => {
    setLoading(true);
    adminGetEvents().then(res => setEvents(res.data || [])).finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, []);

  const openCreate = () => { setForm(EMPTY_FORM); setEditId(null); setMsg(""); setShowForm(true); };
  const openEdit = (ev) => {
    const dateStr = ev.date ? new Date(ev.date).toISOString().slice(0, 16) : "";
    setForm({ title: ev.title, description: ev.description || "", date: dateStr, location: ev.location || "", attendees: ev.attendees || 0 });
    setEditId(ev.id);
    setMsg("");
    setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) {
        await adminUpdateEvent(editId, form);
        setMsg("Event updated.");
      } else {
        await adminCreateEvent(form);
        setMsg("Event created.");
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
    if (!window.confirm("Remove this event?")) return;
    await adminDeleteEvent(id);
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
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "480px", maxHeight: "85vh", overflowY: "auto" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    dateBadge: { display: "inline-block", padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: "#4dabf718", color: "#4dabf7" },
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString("en-US", { day: "numeric", month: "short", year: "numeric" }) : "-";
  const isPast = (d) => d && new Date(d) < new Date();

  return (
    <AdminLayout title="Manage Events">
      <div style={s.topBar}>
        <span style={{ color: "#888", fontSize: "14px" }}>{events.length} events</span>
        <button style={s.addBtn} onClick={openCreate}>+ Add New Event</button>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>Title</th>
                <th style={s.th}>Date</th>
                <th style={s.th}>Location</th>
                <th style={s.th}>Attendees</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 && <tr><td colSpan={5} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No events yet.</td></tr>}
              {events.map(ev => (
                <tr key={ev.id} style={{ opacity: isPast(ev.date) ? 0.65 : 1 }}>
                  <td style={{ ...s.td, fontWeight: 600 }}>{ev.title}</td>
                  <td style={s.td}>
                    <span style={{ ...s.dateBadge, background: isPast(ev.date) ? "#eef3f4" : "#4dabf718", color: isPast(ev.date) ? "#888" : "#4dabf7" }}>
                      {formatDate(ev.date)}
                    </span>
                  </td>
                  <td style={s.td}>{ev.location || "-"}</td>
                  <td style={s.td}>{ev.attendees || 0}</td>
                  <td style={s.td}>
                    <button style={s.actionBtn("#845ef7")} onClick={() => openRegistrations(ev)}>Registrations</button>
                    <button style={s.actionBtn("#4dabf7")} onClick={() => openEdit(ev)}>Edit</button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(ev.id)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {showForm && (
        <div style={s.modal} onClick={() => setShowForm(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>{editId ? "Edit Event" : "Add New Event"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>x</button>
            </div>
            <form onSubmit={handleSave}>
              <label style={s.label}>Title *</label>
              <input style={s.input} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Event title" />
              <label style={s.label}>Date & Time *</label>
              <input style={s.input} type="datetime-local" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} required />
              <label style={s.label}>Location</label>
              <input style={s.input} value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} placeholder="Event location" />
              <label style={s.label}>Description</label>
              <textarea style={{ ...s.input, minHeight: "80px", resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Event description..." />
              <label style={s.label}>Expected Attendees</label>
              <input style={s.input} type="number" min="0" value={form.attendees} onChange={e => setForm({ ...form, attendees: e.target.value })} />
              {msg && <p style={{ color: msg.includes("updated") || msg.includes("created") ? "#3aafa9" : "#2a9d8f", marginBottom: "12px", fontWeight: 600 }}>{msg}</p>}
              <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>{saving ? "Saving..." : (editId ? "Update Event" : "Create Event")}</button>
            </form>
          </div>
        </div>
      )}

      {regsFor && (
        <div style={s.modal} onClick={() => setRegsFor(null)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>Registrations — {regsFor.title}</h2>
              <button onClick={() => setRegsFor(null)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            {regsLoading ? <p style={{ textAlign: "center", padding: "20px", color: "#888" }}>Loading...</p> : (
              registrations.length === 0 ? <p style={{ textAlign: "center", padding: "20px", color: "#aaa" }}>No registrations yet.</p> : (
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th style={s.th}>Name</th>
                      <th style={s.th}>Email</th>
                      <th style={s.th}>Phone</th>
                      <th style={s.th}>Guests</th>
                    </tr>
                  </thead>
                  <tbody>
                    {registrations.map(r => (
                      <tr key={r.id}>
                        <td style={s.td}>{r.name}</td>
                        <td style={s.td}>{r.email}</td>
                        <td style={s.td}>{r.phone || "-"}</td>
                        <td style={s.td}>{r.guests}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
