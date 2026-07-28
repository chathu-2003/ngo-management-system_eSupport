import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetGallery, adminCreateGallery, adminUpdateGallery, adminDeleteGallery } from "../../services/api";

const EMPTY = { title: "", description: "", image: "", category: "", isActive: true };

export default function AdminGallery() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const load = () => {
    setLoading(true);
    adminGetGallery({ page, limit })
      .then(res => { setItems(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page]);

  const openCreate = () => { setForm(EMPTY); setEditId(null); setMsg(""); setShowForm(true); };
  const openEdit = (item) => { setForm({ title: item.title || "", description: item.description || "", image: item.image || "", category: item.category || "", isActive: item.isActive }); setEditId(item.id); setMsg(""); setShowForm(true); };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      if (editId) { await adminUpdateGallery(editId, form); setMsg("Updated."); }
      else { await adminCreateGallery(form); setMsg("Added."); }
      load();
      setTimeout(() => { setShowForm(false); setMsg(""); }, 1000);
    } catch (err) { setMsg(err.message || "Failed."); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image?")) return;
    await adminDeleteGallery(id);
    load();
  };

  const totalPages = Math.ceil(total / limit);

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    addBtn: { padding: "10px 24px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "16px" },
    imgCard: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    imgBox: { width: "100%", height: "140px", objectFit: "cover", background: "#eef3f4" },
    imgMeta: { padding: "12px" },
    imgTitle: { fontWeight: 700, fontSize: "13px", color: "#1b3d4f", marginBottom: "4px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" },
    imgCat: { fontSize: "11px", color: "#888", marginBottom: "10px" },
    imgActions: { display: "flex", gap: "6px" },
    actionBtn: (c) => ({ flex: 1, padding: "6px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, background: c + "18", color: c }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "480px", maxHeight: "85vh", overflowY: "auto" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (a) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (a ? "#2a9d8f" : "#ddd"), background: a ? "#2a9d8f" : "#fff", color: a ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
  };

  return (
    <AdminLayout title="Gallery">
      <div style={s.topBar}>
        <span style={{ color: "#888", fontSize: "14px" }}>{total} images</span>
        <button style={s.addBtn} onClick={openCreate}>+ Add Image</button>
      </div>

      {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
        items.length === 0 ? <p style={{ textAlign: "center", color: "#aaa", marginTop: "40px" }}>No gallery images yet.</p> : (
          <div style={s.grid}>
            {items.map(item => (
              <div key={item.id} style={s.imgCard}>
                {item.image ? (
                  <img src={item.image} alt={item.title} style={s.imgBox} onError={e => { e.target.style.background = "#eef3f4"; e.target.style.display = "none"; }} />
                ) : (
                  <div style={{ ...s.imgBox, display: "flex", alignItems: "center", justifyContent: "center", color: "#ccc", fontSize: "28px" }}><i className="bi bi-image"></i></div>
                )}
                <div style={s.imgMeta}>
                  <p style={s.imgTitle}>{item.title || "Untitled"}</p>
                  <p style={s.imgCat}>{item.category || "Uncategorized"} · {item.isActive ? "Active" : "Hidden"}</p>
                  <div style={s.imgActions}>
                    <button style={s.actionBtn("#4dabf7")} onClick={() => openEdit(item)}>Edit</button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(item.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )
      )}

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
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>{editId ? "Edit Image" : "Add Image"}</h2>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <form onSubmit={handleSave}>
              <label style={s.label}>Image URL *</label>
              <input style={s.input} value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} required placeholder="https://..." />
              <label style={s.label}>Title</label>
              <input style={s.input} value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Image title" />
              <label style={s.label}>Category</label>
              <input style={s.input} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Events, Programs" />
              <label style={s.label}>Description</label>
              <textarea style={{ ...s.input, minHeight: "70px", resize: "vertical" }} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
              <label style={{ ...s.label, display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px" }}>
                <input type="checkbox" checked={form.isActive} onChange={e => setForm({ ...form, isActive: e.target.checked })} />
                Active (visible on site)
              </label>
              {msg && <p style={{ color: msg.includes("Updated") || msg.includes("Added") ? "#3aafa9" : "#2a9d8f", marginBottom: "12px", fontWeight: 600 }}>{msg}</p>}
              <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>{saving ? "Saving..." : (editId ? "Update" : "Add Image")}</button>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
