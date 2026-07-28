import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetOrders, adminUpdateOrderStatus } from "../../services/api";

const STATUS_COLORS = { pending: "#f0a500", processing: "#4dabf7", shipped: "#845ef7", delivered: "#3aafa9", cancelled: "#e05c3a" };
const PAY_COLORS = { pending: "#f0a500", paid: "#3aafa9" };

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selected, setSelected] = useState(null);
  const [newStatus, setNewStatus] = useState("");
  const [newPayStatus, setNewPayStatus] = useState("");
  const [updating, setUpdating] = useState(false);
  const limit = 20;

  const load = () => {
    setLoading(true);
    adminGetOrders({ page, limit })
      .then(res => { setOrders(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page]);

  const openDetail = (o) => { setSelected(o); setNewStatus(o.status); setNewPayStatus(o.paymentStatus); };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await adminUpdateOrderStatus(selected.id, { status: newStatus, paymentStatus: newPayStatus });
      setSelected(null);
      load();
    } finally { setUpdating(false); }
  };

  const totalPages = Math.ceil(total / limit);

  const s = {
    topBar: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase" },
    td: { padding: "13px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    badge: (map, v) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (map[v] || "#ddd") + "22", color: map[v] || "#888" }),
    actionBtn: (c) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: c + "18", color: c }),
    modal: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "20px" },
    modalBox: { background: "#fff", borderRadius: "16px", padding: "32px", width: "100%", maxWidth: "540px", maxHeight: "85vh", overflowY: "auto" },
    detailRow: { display: "flex", gap: "8px", marginBottom: "10px" },
    detailLabel: { fontSize: "12px", fontWeight: 700, color: "#888", minWidth: "110px" },
    detailValue: { fontSize: "14px", color: "#1b3d4f" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    saveBtn: { width: "100%", padding: "12px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (a) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (a ? "#2a9d8f" : "#ddd"), background: a ? "#2a9d8f" : "#fff", color: a ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
    itemRow: { display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: "1px solid #eef3f4", fontSize: "13px" },
  };

  return (
    <AdminLayout title="Marketplace Orders">
      <div style={s.topBar}>
        <span style={{ color: "#888", fontSize: "14px" }}>{total} orders</span>
      </div>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Buyer</th>
                <th style={s.th}>Items</th>
                <th style={s.th}>Total (LKR)</th>
                <th style={s.th}>Payment</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Date</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No orders yet.</td></tr>}
              {orders.map((o, i) => (
                <tr key={o.id}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{o.buyer?.name || "-"}</td>
                  <td style={s.td}>{(o.items || []).length} item(s)</td>
                  <td style={{ ...s.td, fontWeight: 700, color: "#845ef7" }}>{Number(o.totalAmount).toLocaleString()}</td>
                  <td style={s.td}><span style={s.badge(PAY_COLORS, o.paymentStatus)}>{o.paymentStatus}</span></td>
                  <td style={s.td}><span style={s.badge(STATUS_COLORS, o.status)}>{o.status}</span></td>
                  <td style={s.td}>{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td style={s.td}>
                    <button style={s.actionBtn("#4dabf7")} onClick={() => openDetail(o)}>View / Update</button>
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
              <h2 style={{ fontSize: "18px", fontWeight: 700, color: "#1b3d4f" }}>Order #{selected.id}</h2>
              <button onClick={() => setSelected(null)} style={{ background: "none", border: "none", fontSize: "22px", cursor: "pointer", color: "#888" }}>×</button>
            </div>
            {[["Buyer", selected.buyer?.name || "-"], ["Email", selected.buyer?.email || "-"], ["Phone", selected.phone || "-"], ["Shipping Address", selected.shippingAddress || "-"], ["Payment Method", selected.paymentMethod || "-"]].map(([l, v]) => (
              <div key={l} style={s.detailRow}>
                <span style={s.detailLabel}>{l}</span>
                <span style={s.detailValue}>{v}</span>
              </div>
            ))}

            <p style={{ ...s.label, marginTop: "16px" }}>Items</p>
            <div style={{ background: "#f8f9fa", borderRadius: "8px", padding: "10px 14px", marginBottom: "16px" }}>
              {(selected.items || []).map(it => (
                <div key={it.id} style={s.itemRow}>
                  <span>{it.title} × {it.quantity}</span>
                  <span style={{ fontWeight: 700 }}>LKR {Number(it.subtotal).toLocaleString()}</span>
                </div>
              ))}
              <div style={{ ...s.itemRow, borderBottom: "none", fontWeight: 700 }}>
                <span>Total</span>
                <span>LKR {Number(selected.totalAmount).toLocaleString()}</span>
              </div>
            </div>

            <label style={s.label}>Order Status</label>
            <select style={{ ...s.input }} value={newStatus} onChange={e => setNewStatus(e.target.value)}>
              {["pending", "processing", "shipped", "delivered", "cancelled"].map(st => (
                <option key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>
              ))}
            </select>
            <label style={s.label}>Payment Status</label>
            <select style={{ ...s.input }} value={newPayStatus} onChange={e => setNewPayStatus(e.target.value)}>
              {["pending", "paid"].map(st => (
                <option key={st} value={st}>{st.charAt(0).toUpperCase() + st.slice(1)}</option>
              ))}
            </select>
            <button style={{ ...s.saveBtn, opacity: updating ? 0.7 : 1 }} disabled={updating} onClick={handleUpdate}>
              {updating ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
