import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetTasks, adminCreateTask, adminUpdateTask, adminDeleteTask } from "../../services/api";

const EMPTY = { title: "", description: "", category: "", deadline: "", reward: "", status: "open" };
const STATUS_COLORS = { open: "#3aafa9", in_progress: "#f0a500", completed: "#4dabf7" };

export default function AdminTasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const load = () => {
    setLoading(true);
    adminGetTasks({ status: statusFilter })
      .then(res => setTasks(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [statusFilter]);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setMsg(""); setShowForm(true); };
  const openEdit = (t) => {
    const dl = t.deadline ? new Date(t.deadline).toISOString().slice(0, 10) : "";
    setForm({ title: t.title, description: t.description || "", category: t.category || "", deadline: dl, reward: t.reward || "", status: t.status });
    setEditId(t.id); setMsg(""); setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) { await adminUpdateTask(editId, form); setMsg("Updated."); }
      else { await adminCreateTask(form); setMsg("Created."); }
      load();
      setTimeout(() => { setShowForm(false); setMsg(""); }, 1000);
    } catch (err) { setMsg(err.message || "Failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove this task?")) return;
    await adminDeleteTask(id);
    load();
  };

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "12px", flexWrap: "wrap" },
    addBtn: { padding: "10px 24px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" },
    select: { padding: "9px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", background: "#fff" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase" },
    td: { padding: "13px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    badge: (st) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (STATUS_COLORS[st] || "#ddd") + "22", color: STATUS_COLORS[st] || "#888" }),
    actionBtn: (c) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: c + "18", color: c, marginRight: "4px" }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "480px", maxHeight: "85vh", overflowY: "auto" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
  };

  return (
    <AdminLayout title="Community Tasks">
      <div style={s.topBar}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ color: "#888", fontSize: "14px" }}>{tasks.length} tasks</span>
          <select style={s.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        <button style={s.addBtn} onClick={openCreate}>+ Add Task</button>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Title</th>
                <th style={s.th}>Category</th>
                <th style={s.th}>Deadline</th>
                <th style={s.th}>Reward</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 && <tr><td colSpan={7} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No tasks yet.</td></tr>}
              {tasks.map((t, i) => (
                <tr key={t.id}>
                  <td style={s.td}>{i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{t.title}</td>
                  <td style={s.td}>{t.category || "-"}</td>
                  <td style={s.td}>{t.deadline ? new Date(t.deadline).toLocaleDateString() : "-"}</td>
                  <td style={s.td}>{t.reward || "-"}</td>
                  <td style={s.td}><span style={s.badge(t.status)}>{t.status.replace("_", " ")}</span></td>
                  <td style={s.td}>
                    <button style={s.actionBtn("#4dabf7")} onClick={() => openEdit(t)}>Edit</button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(t.id)}>Remove</button>
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
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>{editId ? "Edit Task" : "Add Task"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <label style={s.label}>Title *</label>
              <input style={s.input} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Task title" />
              <label style={s.label}>Category</label>
              <input style={s.input} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Teaching, Medical, Tech" />
              <label style={s.label}>Deadline</label>
              <input style={s.input} type="date" value={form.deadline} onChange={e => setForm({ ...form, deadline: e.target.value })} />
              <label style={s.label}>Reward / Compensation</label>
              <input style={s.input} value={form.reward} onChange={e => setForm({ ...form, reward: e.target.value })} placeholder="e.g. Volunteer certificate, LKR 5000" />
              <label style={s.label}>Description</label>
              <textarea style={{ ...s.input, minHeight: "80px", resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Task details..." />
              <label style={s.label}>Status</label>
              <select style={{ ...s.input }} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              {msg && <p style={{ color: "#3aafa9", marginBottom: "12px", fontWeight: 600 }}>{msg}</p>}
              <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>{saving ? "Saving..." : (editId ? "Update" : "Create Task")}</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
