import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetVolunteers, adminUpdateVolunteerStatus, adminDeleteVolunteer } from "../../services/api";

const STATUS_COLORS = { pending: "#f0a500", approved: "#3aafa9", rejected: "#2a9d8f" };

export default function AdminVolunteers() {
  const [volunteers, setVolunteers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  const load = () => {
    setLoading(true);
    adminGetVolunteers({ page, limit, ...(filter ? { status: filter } : {}) })
      .then(res => { setVolunteers(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page, filter]);

  const updateStatus = async (id, status) => {
    await adminUpdateVolunteerStatus(id, status);
    load();
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this volunteer?")) return;
    await adminDeleteVolunteer(id);
    setSelected(null);
    load();
  };

  const totalPages = Math.ceil(total / limit);

  const s = {
    topBar: { display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" },
    filterBtn: (active) => ({ padding: "7px 18px", borderRadius: "20px", border: "2px solid " + (active ? "#2a9d8f" : "#ddd"), background: active ? "#2a9d8f" : "#fff", color: active ? "#fff" : "#555", cursor: "pointer", fontSize: "13px", fontWeight: 600 }),
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase", letterSpacing: "0.5px" },
    td: { padding: "14px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    badge: (st) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (STATUS_COLORS[st] || "#ddd") + "22", color: STATUS_COLORS[st] || "#888" }),
    actionBtn: (color) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, background: color + "18", color }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "520px", maxHeight: "80vh", overflowY: "auto" },
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (active) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (active ? "#2a9d8f" : "#ddd"), background: active ? "#2a9d8f" : "#fff", color: active ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
    fl: { fontSize: "12px", color: "#888", marginBottom: "4px" },
    fv: { fontSize: "14px", color: "#333", marginBottom: "16px" },
  };

  return (
    <AdminLayout title="Volunteer Applications">
      <div style={s.topBar}>
        <span style={{ fontWeight: 600, color: "#555", marginRight: "8px" }}>Filter:</span>
        {["", "pending", "approved", "rejected"].map(f => (
          <button key={f} style={s.filterBtn(filter === f)} onClick={() => { setFilter(f); setPage(1); }}>
            {f || "All"}
          </button>
        ))}
        <span style={{ marginLeft: "auto", color: "#888", fontSize: "13px" }}>Total: {total}</span>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Name</th>
                <th style={s.th}>Email</th>
                <th style={s.th}>Phone</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Applied</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {volunteers.length === 0 && (
                <tr><td colSpan={7} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No volunteers found.</td></tr>
              )}
              {volunteers.map((v, i) => (
                <tr key={v.id} style={{ cursor: "pointer" }} onClick={() => setSelected(v)}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{v.name}</td>
                  <td style={s.td}>{v.email}</td>
                  <td style={s.td}>{v.phone}</td>
                  <td style={s.td}><span style={s.badge(v.status)}>{v.status}</span></td>
                  <td style={s.td}>{new Date(v.createdAt).toLocaleDateString()}</td>
                  <td style={s.td} onClick={e => e.stopPropagation()}>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                      <button style={s.actionBtn("#3aafa9")} onClick={() => updateStatus(v.id, "approved")}>Approve</button>
                      <button style={s.actionBtn("#2a9d8f")} onClick={() => updateStatus(v.id, "rejected")}>Reject</button>
                      <button style={s.actionBtn("#888")} onClick={() => handleDelete(v.id)}>Delete</button>
                    </div>
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
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>Volunteer Detail</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>x</button>
            </div>
            <p style={s.fl}>Name</p><p style={s.fv}>{selected.name}</p>
            <p style={s.fl}>Email</p><p style={s.fv}>{selected.email}</p>
            <p style={s.fl}>Phone</p><p style={s.fv}>{selected.phone}</p>
            {selected.dateOfBirth && <><p style={s.fl}>Date of Birth</p><p style={s.fv}>{selected.dateOfBirth}</p></>}
            {selected.message && <><p style={s.fl}>Message</p><p style={{ ...s.fv, background: "#f8f9fa", padding: "12px", borderRadius: "8px", lineHeight: 1.6 }}>{selected.message}</p></>}
            <p style={s.fl}>Current Status</p>
            <span style={{ ...s.badge(selected.status), display: "inline-block", marginBottom: "16px" }}>{selected.status}</span>
            <p style={{ ...s.fl, marginTop: "8px" }}>Update Status</p>
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
              <button style={{ ...s.actionBtn("#3aafa9"), padding: "8px 20px" }} onClick={() => updateStatus(selected.id, "approved")}>Approve</button>
              <button style={{ ...s.actionBtn("#f0a500"), padding: "8px 20px" }} onClick={() => updateStatus(selected.id, "pending")}>Pending</button>
              <button style={{ ...s.actionBtn("#2a9d8f"), padding: "8px 20px" }} onClick={() => updateStatus(selected.id, "rejected")}>Reject</button>
            </div>
            <button style={{ width: "100%", padding: "10px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" }}
              onClick={() => handleDelete(selected.id)}>Delete Volunteer</button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
