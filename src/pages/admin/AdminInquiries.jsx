import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetInquiries, adminUpdateInquiryStatus, adminDeleteInquiry } from "../../services/api";

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [response, setResponse] = useState("");
  const [updating, setUpdating] = useState(false);
  const limit = 15;

  const load = () => {
    setLoading(true);
    adminGetInquiries({ page, limit, status: statusFilter })
      .then(res => { setInquiries(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page, statusFilter]);

  const openDetail = (inq) => { setSelected(inq); setResponse(inq.response || ""); };

  const handleResolve = async () => {
    setUpdating(true);
    try {
      await adminUpdateInquiryStatus(selected.id, { status: "resolved", response });
      setSelected(null);
      load();
    } finally { setUpdating(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete inquiry?")) return;
    await adminDeleteInquiry(id);
    load();
  };

  const totalPages = Math.ceil(total / limit);

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "12px" },
    select: { padding: "9px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", background: "#fff" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase" },
    td: { padding: "13px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    actionBtn: (c) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: c + "18", color: c, marginRight: "4px" }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "540px", maxHeight: "85vh", overflowY: "auto" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#3aafa9", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (a) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (a ? "#2a9d8f" : "#ddd"), background: a ? "#2a9d8f" : "#fff", color: a ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
  };

  return (
    <AdminLayout title="Inquiries / Support">
      <div style={s.topBar}>
        <span style={{ color: "#888", fontSize: "14px" }}>{total} inquiries</span>
        <select style={s.select} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Name</th>
                <th style={s.th}>Email</th>
                <th style={s.th}>Subject</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Date</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {inquiries.length === 0 && <tr><td colSpan={7} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No inquiries.</td></tr>}
              {inquiries.map((inq, i) => (
                <tr key={inq.id} style={{ background: inq.status === "pending" ? "#fffaf8" : "#fff" }}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{inq.name}</td>
                  <td style={s.td}>{inq.email}</td>
                  <td style={{ ...s.td, maxWidth: "200px" }}>
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{inq.subject}</div>
                  </td>
                  <td style={s.td}>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: inq.status === "pending" ? "#ffb83b22" : "#3cd49b22", color: inq.status === "pending" ? "#f0a500" : "#3aafa9" }}>
                      {inq.status}
                    </span>
                  </td>
                  <td style={s.td}>{new Date(inq.createdAt).toLocaleDateString()}</td>
                  <td style={s.td}>
                    <button style={s.actionBtn("#4dabf7")} onClick={() => openDetail(inq)}>View</button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(inq.id)}>Delete</button>
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

      {selected && (
        <div style={s.modal} onClick={() => setSelected(null)}>
          <div style={s.modalBox} onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>Inquiry Detail</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#888", marginBottom: "4px" }}>FROM</p>
            <p style={{ fontWeight: 700, color: "#1b3d4f", marginBottom: "4px" }}>{selected.name} — {selected.email}</p>
            {selected.phone && <p style={{ color: "#888", fontSize: "13px", marginBottom: "16px" }}>{selected.phone}</p>}
            <p style={{ fontSize: "12px", fontWeight: 700, color: "#888", marginBottom: "4px" }}>SUBJECT</p>
            <p style={{ fontWeight: 600, color: "#1b3d4f", marginBottom: "16px" }}>{selected.subject}</p>
            <div style={{ background: "#f8f9fa", borderRadius: "8px", padding: "14px", marginBottom: "20px" }}>
              <p style={{ fontSize: "12px", fontWeight: 700, color: "#888", marginBottom: "6px" }}>MESSAGE</p>
              <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>{selected.message}</p>
            </div>
            <label style={s.label}>Response / Note</label>
            <textarea style={{ ...s.input, minHeight: "100px", resize: "vertical" }} value={response} onChange={e => setResponse(e.target.value)} placeholder="Write your response or internal note..." />
            <button style={{ ...s.saveBtn, opacity: updating ? 0.7 : 1 }} disabled={updating} onClick={handleResolve}>
              {updating ? "Saving..." : "Mark Resolved"}
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
