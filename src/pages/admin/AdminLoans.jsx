import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetLoans, adminUpdateLoanStatus, adminDeleteLoan } from "../../services/api";

const STATUS_COLORS = { pending: "#f0a500", reviewing: "#4dabf7", approved: "#3aafa9", rejected: "#2a9d8f", disbursed: "#845ef7" };

export default function AdminLoans() {
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [note, setNote] = useState("");
  const [newStatus, setNewStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const limit = 15;

  const load = () => {
    setLoading(true);
    adminGetLoans({ page, limit, status: statusFilter })
      .then(res => { setLoans(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page, statusFilter]);

  const openDetail = (loan) => { setSelected(loan); setNote(loan.reviewNote || ""); setNewStatus(loan.status); };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await adminUpdateLoanStatus(selected.id, { status: newStatus, reviewNote: note });
      setSelected(null);
      load();
    } finally { setUpdating(false); }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this application?")) return;
    await adminDeleteLoan(id);
    load();
  };

  const totalPages = Math.ceil(total / limit);

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", gap: "12px" },
    select: { padding: "9px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", background: "#fff" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase" },
    td: { padding: "13px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    badge: (st) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (STATUS_COLORS[st] || "#ddd") + "22", color: STATUS_COLORS[st] || "#888" }),
    actionBtn: (c) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: c + "18", color: c, marginRight: "4px" }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "540px", maxHeight: "85vh", overflowY: "auto" },
    detailRow: { display: "flex", gap: "8px", marginBottom: "12px" },
    detailLabel: { fontSize: "12px", fontWeight: 700, color: "#888", minWidth: "100px" },
    detailValue: { fontSize: "14px", color: "#1b3d4f" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (a) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (a ? "#2a9d8f" : "#ddd"), background: a ? "#2a9d8f" : "#fff", color: a ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
  };

  return (
    <AdminLayout title="Loan Applications">
      <div style={s.topBar}>
        <span style={{ color: "#888", fontSize: "14px" }}>{total} applications</span>
        <select style={s.select} value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
          <option value="">All Status</option>
          {["pending", "reviewing", "approved", "rejected", "disbursed"].map(st => (
            <option key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>
          ))}
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
                <th style={s.th}>Amount (LKR)</th>
                <th style={s.th}>Purpose</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Date</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {loans.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No applications.</td></tr>}
              {loans.map((loan, i) => (
                <tr key={loan.id}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{loan.name}</td>
                  <td style={s.td}>{loan.email}</td>
                  <td style={{ ...s.td, fontWeight: 700, color: "#845ef7" }}>{Number(loan.amount).toLocaleString()}</td>
                  <td style={{ ...s.td, maxWidth: "160px" }}>
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{loan.purpose}</div>
                  </td>
                  <td style={s.td}><span style={s.badge(loan.status)}>{loan.status}</span></td>
                  <td style={s.td}>{new Date(loan.createdAt).toLocaleDateString()}</td>
                  <td style={s.td}>
                    <button style={s.actionBtn("#4dabf7")} onClick={() => openDetail(loan)}>Review</button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(loan.id)}>Delete</button>
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
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>Loan Application</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            {[["Name", selected.name], ["Email", selected.email], ["Phone", selected.phone || "-"], ["Amount", `LKR ${Number(selected.amount).toLocaleString()}`], ["Purpose", selected.purpose]].map(([l, v]) => (
              <div key={l} style={s.detailRow}>
                <span style={s.detailLabel}>{l}</span>
                <span style={s.detailValue}>{v}</span>
              </div>
            ))}
            {selected.businessPlan && (
              <div style={{ background: "#f8f9fa", borderRadius: "8px", padding: "14px", marginBottom: "16px" }}>
                <p style={{ fontSize: "12px", fontWeight: 700, color: "#888", marginBottom: "6px" }}>BUSINESS PLAN</p>
                <p style={{ fontSize: "14px", color: "#444", lineHeight: 1.6 }}>{selected.businessPlan}</p>
              </div>
            )}
            <label style={s.label}>Update Status</label>
            <select style={{ ...s.input }} value={newStatus} onChange={e => setNewStatus(e.target.value)}>
              {["pending", "reviewing", "approved", "rejected", "disbursed"].map(st => (
                <option key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>
              ))}
            </select>
            <label style={s.label}>Review Note</label>
            <textarea style={{ ...s.input, minHeight: "80px", resize: "vertical" }} value={note} onChange={e => setNote(e.target.value)} placeholder="Internal review notes..." />
            <button style={{ ...s.saveBtn, opacity: updating ? 0.7 : 1 }} disabled={updating} onClick={handleUpdate}>
              {updating ? "Saving..." : "Save Decision"}
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
