import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetNewsletter, adminUpdateNewsletterStatus, adminDeleteNewsletter } from "../../services/api";

export default function AdminNewsletter() {
  const [subs, setSubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const load = () => {
    setLoading(true);
    adminGetNewsletter({ page, limit })
      .then(res => { setSubs(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page]);

  const handleToggle = async (id, isActive) => {
    await adminUpdateNewsletterStatus(id, !isActive);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove subscriber?")) return;
    await adminDeleteNewsletter(id);
    load();
  };

  const active = subs.filter(s => s.isActive).length;
  const totalPages = Math.ceil(total / limit);

  const s = {
    summaryRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" },
    summaryCard: (c) => ({ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", borderLeft: `4px solid ${c}` }),
    summaryLabel: { fontSize: "13px", color: "#888", marginBottom: "4px" },
    summaryValue: { fontSize: "26px", fontWeight: 800, color: "#1b3d4f" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase" },
    td: { padding: "13px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    actionBtn: (c) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: c + "18", color: c, marginRight: "4px" }),
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (a) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (a ? "#2a9d8f" : "#ddd"), background: a ? "#2a9d8f" : "#fff", color: a ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
  };

  return (
    <AdminLayout title="Newsletter Subscribers">
      <div style={s.summaryRow}>
        <div style={s.summaryCard("#3aafa9")}>
          <p style={s.summaryLabel}>Total Subscribers</p>
          <p style={s.summaryValue}>{total}</p>
        </div>
        <div style={s.summaryCard("#4dabf7")}>
          <p style={s.summaryLabel}>Active (this page)</p>
          <p style={s.summaryValue}>{active}</p>
        </div>
        <div style={s.summaryCard("#2a9d8f")}>
          <p style={s.summaryLabel}>Unsubscribed (this page)</p>
          <p style={s.summaryValue}>{subs.length - active}</p>
        </div>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Email</th>
                <th style={s.th}>Name</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Subscribed</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {subs.length === 0 && <tr><td colSpan={6} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No subscribers yet.</td></tr>}
              {subs.map((sub, i) => (
                <tr key={sub.id}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{sub.email}</td>
                  <td style={s.td}>{sub.name || "-"}</td>
                  <td style={s.td}>
                    <span style={{ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: sub.isActive ? "#3cd49b22" : "#2a9d8f22", color: sub.isActive ? "#3aafa9" : "#2a9d8f" }}>
                      {sub.isActive ? "Active" : "Unsubscribed"}
                    </span>
                  </td>
                  <td style={s.td}>{new Date(sub.createdAt).toLocaleDateString()}</td>
                  <td style={s.td}>
                    <button style={s.actionBtn(sub.isActive ? "#f0a500" : "#3aafa9")} onClick={() => handleToggle(sub.id, sub.isActive)}>
                      {sub.isActive ? "Unsubscribe" : "Reactivate"}
                    </button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(sub.id)}>Remove</button>
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
    </AdminLayout>
  );
}
