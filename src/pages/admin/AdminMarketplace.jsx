import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetMarketplace, adminUpdateMarketplaceStatus, adminDeleteMarketplaceItem } from "../../services/api";

const CONDITION_COLORS = { new: "#3aafa9", used: "#f0a500", donated: "#845ef7" };

export default function AdminMarketplace() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 15;

  const load = () => {
    setLoading(true);
    adminGetMarketplace({ page, limit })
      .then(res => { setItems(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page]);

  const handleToggle = async (id, isAvailable) => {
    await adminUpdateMarketplaceStatus(id, !isAvailable);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this listing?")) return;
    await adminDeleteMarketplaceItem(id);
    load();
  };

  const totalPages = Math.ceil(total / limit);

  const s = {
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase" },
    td: { padding: "13px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    badge: (c) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (CONDITION_COLORS[c] || "#ddd") + "22", color: CONDITION_COLORS[c] || "#888" }),
    actionBtn: (c) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: c + "18", color: c, marginRight: "4px" }),
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (a) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (a ? "#2a9d8f" : "#ddd"), background: a ? "#2a9d8f" : "#fff", color: a ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
  };

  return (
    <AdminLayout title="Marketplace">
      <div style={{ marginBottom: "16px", color: "#888", fontSize: "14px" }}>{total} listings</div>
      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Title</th>
                <th style={s.th}>Category</th>
                <th style={s.th}>Price (LKR)</th>
                <th style={s.th}>Condition</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Listed</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No listings.</td></tr>}
              {items.map((item, i) => (
                <tr key={item.id}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{item.title}</td>
                  <td style={s.td}>{item.category || "-"}</td>
                  <td style={{ ...s.td, fontWeight: 700, color: "#3aafa9" }}>{Number(item.price).toLocaleString()}</td>
                  <td style={s.td}><span style={s.badge(item.condition)}>{item.condition}</span></td>
                  <td style={s.td}>
                    <span style={{ ...s.badge("x"), background: item.isAvailable ? "#3cd49b22" : "#2a9d8f22", color: item.isAvailable ? "#3aafa9" : "#2a9d8f" }}>
                      {item.isAvailable ? "Available" : "Sold/Hidden"}
                    </span>
                  </td>
                  <td style={s.td}>{new Date(item.createdAt).toLocaleDateString()}</td>
                  <td style={s.td}>
                    <button style={s.actionBtn(item.isAvailable ? "#f0a500" : "#3aafa9")} onClick={() => handleToggle(item.id, item.isAvailable)}>
                      {item.isAvailable ? "Hide" : "Show"}
                    </button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(item.id)}>Delete</button>
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
