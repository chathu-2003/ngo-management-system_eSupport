import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetReports, adminCreateReport, adminUpdateReport, adminDeleteReport } from "../../services/api";

const EMPTY = { title: "", year: new Date().getFullYear(), description: "", isPublished: true };

export default function AdminReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const load = () => {
    setLoading(true);
    adminGetReports({ page, limit })
      .then(res => { setReports(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page]);

  const openCreate = () => { setForm(EMPTY); setFile(null); setEditId(null); setMsg(""); setShowForm(true); };
  const openEdit = (r) => {
    setForm({ title: r.title, year: r.year, description: r.description || "", isPublished: r.isPublished });
    setFile(null); setEditId(r.id); setMsg(""); setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!editId && !file) { setMsg("A PDF file is required."); return; }
    setSaving(true);
    setMsg("");
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("year", form.year);
      fd.append("description", form.description);
      fd.append("isPublished", form.isPublished);
      if (file) fd.append("file", file);

      if (editId) { await adminUpdateReport(editId, fd); setMsg("Updated."); }
      else { await adminCreateReport(fd); setMsg("Uploaded."); }
      load();
      setTimeout(() => { setShowForm(false); setMsg(""); }, 1000);
    } catch (err) { setMsg(err.message || "Failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this report?")) return;
    await adminDeleteReport(id);
    load();
  };

  const totalPages = Math.ceil(total / limit);

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    addBtn: { padding: "10px 24px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase" },
    td: { padding: "13px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    badge: (pub) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (pub ? "#3aafa9" : "#888") + "22", color: pub ? "#3aafa9" : "#888" }),
    actionBtn: (c) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: c + "18", color: c, marginRight: "4px", textDecoration: "none", display: "inline-block" }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "480px", maxHeight: "85vh", overflowY: "auto" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (a) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (a ? "#2a9d8f" : "#ddd"), background: a ? "#2a9d8f" : "#fff", color: a ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
  };

  return (
    <AdminLayout title="Financial Reports">
      <div style={s.topBar}>
        <span style={{ color: "#888", fontSize: "14px" }}>{total} reports</span>
        <button style={s.addBtn} onClick={openCreate}>+ Upload Report</button>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Title</th>
                <th style={s.th}>Year</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Uploaded</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length === 0 && <tr><td colSpan={6} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No reports yet.</td></tr>}
              {reports.map((r, i) => (
                <tr key={r.id}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{r.title}</td>
                  <td style={s.td}>{r.year}</td>
                  <td style={s.td}><span style={s.badge(r.isPublished)}>{r.isPublished ? "Published" : "Hidden"}</span></td>
                  <td style={s.td}>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td style={s.td}>
                    <a style={s.actionBtn("#845ef7")} href={`http://localhost:5000/uploads/${r.file}`} target="_blank" rel="noreferrer">View PDF</a>
                    <button style={s.actionBtn("#4dabf7")} onClick={() => openEdit(r)}>Edit</button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(r.id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div style={s.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} style={s.pageBtn(page === p)} onClick={() => setPage(p)}>{p}</button>
          ))}
        </div>
      )}

      {showForm && (
        <div style={s.modal} onClick={() => setShowForm(false)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>{editId ? "Edit Report" : "Upload Report"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <label style={s.label}>Title *</label>
              <input style={s.input} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Annual Report 2025" />
              <label style={s.label}>Year *</label>
              <input style={s.input} type="number" value={form.year} onChange={e => setForm({ ...form, year: e.target.value })} required />
              <label style={s.label}>Description</label>
              <textarea style={{ ...s.input, minHeight: "70px", resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <label style={s.label}>PDF File {editId ? "(leave empty to keep current)" : "*"}</label>
              <input style={s.input} type="file" accept="application/pdf" onChange={e => setFile(e.target.files[0])} />
              <label style={{ ...s.label, display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} />
                Published (visible on site)
              </label>
              {msg && <p style={{ color: msg.includes("Updated") || msg.includes("Uploaded") ? "#3aafa9" : "#e05c3a", marginBottom: "12px", fontWeight: 600 }}>{msg}</p>}
              <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>{saving ? "Saving..." : (editId ? "Update" : "Upload Report")}</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
