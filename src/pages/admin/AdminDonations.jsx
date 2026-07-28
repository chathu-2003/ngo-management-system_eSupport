import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetDonations } from "../../services/api";

const STATUS_COLORS = { completed: "#3aafa9", pending: "#f0a500", failed: "#2a9d8f" };

export default function AdminDonations() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [totalRaised, setTotalRaised] = useState(0);
  const limit = 15;

  useEffect(() => {
    setLoading(true);
    adminGetDonations({ page, limit })
      .then(res => {
        setDonations(res.data || []);
        setTotal(res.pagination?.total || 0);
        const raised = (res.data || []).reduce((sum, d) => d.status === "completed" ? sum + parseFloat(d.amount || 0) : sum, 0);
        setTotalRaised(raised);
      })
      .finally(() => setLoading(false));
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  const s = {
    summaryRow: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "16px", marginBottom: "24px" },
    summaryCard: (color) => ({ background: "#fff", borderRadius: "12px", padding: "20px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", borderLeft: `4px solid ${color}` }),
    summaryLabel: { fontSize: "13px", color: "#888", marginBottom: "4px" },
    summaryValue: { fontSize: "26px", fontWeight: 800, color: "#1b3d4f" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase", letterSpacing: "0.5px" },
    td: { padding: "14px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    badge: (st) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (STATUS_COLORS[st] || "#ddd") + "22", color: STATUS_COLORS[st] || "#888" }),
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (active) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (active ? "#2a9d8f" : "#ddd"), background: active ? "#2a9d8f" : "#fff", color: active ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
  };

  return (
    <AdminLayout title="Donations">
      <div style={s.summaryRow}>
        <div style={s.summaryCard("#3aafa9")}>
          <p style={s.summaryLabel}>Total Donations</p>
          <p style={s.summaryValue}>{total}</p>
        </div>
        <div style={s.summaryCard("#845ef7")}>
          <p style={s.summaryLabel}>Total Raised (this page)</p>
          <p style={s.summaryValue}>LKR {totalRaised.toLocaleString()}</p>
        </div>
        <div style={s.summaryCard("#4dabf7")}>
          <p style={s.summaryLabel}>Current Page</p>
          <p style={s.summaryValue}>{page} / {totalPages || 1}</p>
        </div>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Donor</th>
                <th style={s.th}>Email</th>
                <th style={s.th}>Cause</th>
                <th style={s.th}>Amount (LKR)</th>
                <th style={s.th}>Method</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No donations yet.</td></tr>}
              {donations.map((d, i) => (
                <tr key={d.id}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{d.donorName || "Anonymous"}</td>
                  <td style={s.td}>{d.donorEmail || "-"}</td>
                  <td style={s.td}>{d.cause?.title || "-"}</td>
                  <td style={{ ...s.td, fontWeight: 700, color: "#3aafa9" }}>{Number(d.amount).toLocaleString()}</td>
                  <td style={s.td}>{d.paymentMethod || "-"}</td>
                  <td style={s.td}><span style={s.badge(d.status)}>{d.status}</span></td>
                  <td style={s.td}>{new Date(d.createdAt).toLocaleDateString()}</td>
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
