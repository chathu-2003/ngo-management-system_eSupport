import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetBlogs, adminCreateBlog, adminUpdateBlog, adminDeleteBlog } from "../../services/api";

const EMPTY = { title: "", excerpt: "", content: "", image: "", author: "Admin", category: "", status: "draft" };

export default function AdminBlog() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 15;

  const load = () => {
    setLoading(true);
    adminGetBlogs({ page, limit, status: statusFilter })
      .then(res => { setBlogs(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page, statusFilter]);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setMsg(""); setShowForm(true); };
  const openEdit = (b) => {
    setForm({ title: b.title, excerpt: b.excerpt || "", content: b.content, image: b.image || "", author: b.author || "Admin", category: b.category || "", status: b.status });
    setEditId(b.id); setMsg(""); setShowForm(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) { await adminUpdateBlog(editId, form); setMsg("Updated."); }
      else { await adminCreateBlog(form); setMsg("Published."); }
      load();
      setTimeout(() => { setShowForm(false); setMsg(""); }, 1000);
    } catch (err) { setMsg(err.message || "Failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await adminDeleteBlog(id);
    load();
  };

  const totalPages = Math.ceil(total / limit);

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "12px", flexWrap: "wrap" },
    addBtn: { padding: "10px 24px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" },
    select: { padding: "9px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", background: "#fff" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase" },
    td: { padding: "13px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    badge: (s) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: s === "published" ? "#3cd49b22" : "#ffb83b22", color: s === "published" ? "#3aafa9" : "#f0a500" }),
    actionBtn: (c) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: c + "18", color: c, marginRight: "4px" }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "600px", maxHeight: "90vh", overflowY: "auto" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (a) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (a ? "#2a9d8f" : "#ddd"), background: a ? "#2a9d8f" : "#fff", color: a ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
  };

  return (
    <AdminLayout title="Blog / News">
      <div style={s.topBar}>
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          <span style={{ color: "#888", fontSize: "14px" }}>{total} posts</span>
          <select style={s.select} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
            <option value="">All</option>
            <option value="published">Published</option>
            <option value="draft">Drafts</option>
          </select>
        </div>
        <button style={s.addBtn} onClick={openCreate}>+ New Post</button>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Title</th>
                <th style={s.th}>Author</th>
                <th style={s.th}>Category</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Views</th>
                <th style={s.th}>Date</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No posts yet.</td></tr>}
              {blogs.map((b, i) => (
                <tr key={b.id}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600, maxWidth: "220px" }}>
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{b.title}</div>
                  </td>
                  <td style={s.td}>{b.author}</td>
                  <td style={s.td}>{b.category || "-"}</td>
                  <td style={s.td}><span style={s.badge(b.status)}>{b.status}</span></td>
                  <td style={s.td}>{b.views || 0}</td>
                  <td style={s.td}>{new Date(b.createdAt).toLocaleDateString()}</td>
                  <td style={s.td}>
                    <button style={s.actionBtn("#4dabf7")} onClick={() => openEdit(b)}>Edit</button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(b.id)}>Delete</button>
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
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>{editId ? "Edit Post" : "New Post"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <label style={s.label}>Title *</label>
              <input style={s.input} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required placeholder="Post title" />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label style={s.label}>Author</label>
                  <input style={s.input} value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
                </div>
                <div>
                  <label style={s.label}>Category</label>
                  <input style={s.input} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. News, Events" />
                </div>
              </div>
              <label style={s.label}>Featured Image URL</label>
              <input style={s.input} value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." />
              <label style={s.label}>Excerpt (short summary)</label>
              <textarea style={{ ...s.input, minHeight: "60px", resize: "vertical" }} value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} placeholder="Brief summary..." />
              <label style={s.label}>Content *</label>
              <textarea style={{ ...s.input, minHeight: "160px", resize: "vertical" }} value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required placeholder="Full article content..." />
              <label style={s.label}>Status</label>
              <select style={{ ...s.input }} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
              {msg && <p style={{ color: "#3aafa9", marginBottom: "12px", fontWeight: 600 }}>{msg}</p>}
              <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>{saving ? "Saving..." : (editId ? "Update Post" : "Create Post")}</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
