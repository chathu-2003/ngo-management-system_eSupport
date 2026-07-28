import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetTaskApplications, adminUpdateTaskApplicationStatus } from "../../services/api";

const STATUS_COLORS = { applied: "#f0a500", accepted: "#3aafa9", rejected: "#e05c3a", completed: "#4dabf7" };

export default function AdminTaskApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  const load = () => {
    setLoading(true);
    adminGetTaskApplications(filter ? { status: filter } : {})
      .then(res => setApplications(res.data || []))
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [filter]);

  const updateStatus = async (id, status) => {
    await adminUpdateTaskApplicationStatus(id, status);
    load();
  };

  const s = {
    topBar: { display: "flex", gap: "10px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" },
    filterBtn: (active) => ({ padding: "7px 18px", borderRadius: "20px", border: "2px solid " + (active ? "#2a9d8f" : "#ddd"), background: active ? "#2a9d8f" : "#fff", color: active ? "#fff" : "#555", cursor: "pointer", fontSize: "13px", fontWeight: 600 }),
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "14px 16px", textAlign: "left", fontSize: "12px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase", letterSpacing: "0.5px" },
    td: { padding: "14px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    badge: (st) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (STATUS_COLORS[st] || "#ddd") + "22", color: STATUS_COLORS[st] || "#888" }),
    actionBtn: (color) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "12px", fontWeight: 600, background: color + "18", color, marginRight: "6px" }),
  };

  return (
    <AdminLayout title="Task Applications">
      <div style={s.topBar}>
        <span style={{ fontWeight: 600, color: "#555", marginRight: "8px" }}>Filter:</span>
        {["", "applied", "accepted", "rejected", "completed"].map(f => (
          <button key={f} style={s.filterBtn(filter === f)} onClick={() => setFilter(f)}>{f || "All"}</button>
        ))}
        <span style={{ marginLeft: "auto", color: "#888", fontSize: "13px" }}>{applications.length} applications</span>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Applicant</th>
                <th style={s.th}>Task</th>
                <th style={s.th}>Message</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Applied</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 && <tr><td colSpan={7} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No applications found.</td></tr>}
              {applications.map((a, i) => (
                <tr key={a.id}>
                  <td style={s.td}>{i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{a.applicant?.name || "-"}<br /><span style={{ fontSize: "12px", color: "#888" }}>{a.applicant?.email}</span></td>
                  <td style={s.td}>{a.task?.title || "-"}</td>
                  <td style={{ ...s.td, maxWidth: "220px" }}>
                    <div style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{a.message || "-"}</div>
                  </td>
                  <td style={s.td}><span style={s.badge(a.status)}>{a.status}</span></td>
                  <td style={s.td}>{new Date(a.createdAt).toLocaleDateString()}</td>
                  <td style={s.td}>
                    <div style={{ display: "flex", flexWrap: "wrap" }}>
                      {a.status === "applied" && (
                        <>
                          <button style={s.actionBtn("#3aafa9")} onClick={() => updateStatus(a.id, "accepted")}>Accept</button>
                          <button style={s.actionBtn("#e05c3a")} onClick={() => updateStatus(a.id, "rejected")}>Reject</button>
                        </>
                      )}
                      {a.status === "accepted" && (
                        <button style={s.actionBtn("#4dabf7")} onClick={() => updateStatus(a.id, "completed")}>Mark Completed</button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}
