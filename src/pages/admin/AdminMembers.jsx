import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetMembers, adminUpdateMemberRole, adminUpdateMemberStatus, adminDeleteMember } from "../../services/api";

const ROLES = ["user", "volunteer", "admin"];
const ROLE_COLORS = { admin: "#2a9d8f", volunteer: "#3aafa9", user: "#4dabf7" };

export default function AdminMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 20;

  const load = () => {
    setLoading(true);
    adminGetMembers({ page, limit, search, role: roleFilter })
      .then(res => { setMembers(res.data || []); setTotal(res.pagination?.total || 0); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { load(); }, [page, roleFilter]);

  const handleSearch = (e) => { e.preventDefault(); setPage(1); load(); };

  const handleRole = async (id, role) => {
    await adminUpdateMemberRole(id, role);
    load();
  };

  const handleStatus = async (id, isActive) => {
    await adminUpdateMemberStatus(id, isActive);
    load();
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this member?")) return;
    await adminDeleteMember(id);
    load();
  };

  const totalPages = Math.ceil(total / limit);

  const s = {
    filters: { display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap", alignItems: "center" },
    searchInput: { flex: 1, minWidth: "200px", padding: "9px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px" },
    select: { padding: "9px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", background: "#fff" },
    searchBtn: { padding: "9px 20px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, cursor: "pointer" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", overflow: "hidden" },
    th: { padding: "13px 16px", textAlign: "left", fontSize: "11px", fontWeight: 700, color: "#888", background: "#f8f9fa", textTransform: "uppercase" },
    td: { padding: "13px 16px", fontSize: "14px", color: "#444", borderBottom: "1px solid #eef3f4" },
    roleBadge: (r) => ({ padding: "3px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 700, background: (ROLE_COLORS[r] || "#ddd") + "22", color: ROLE_COLORS[r] || "#888" }),
    actionBtn: (c) => ({ padding: "5px 12px", borderRadius: "6px", border: "none", cursor: "pointer", fontSize: "11px", fontWeight: 600, background: c + "18", color: c, marginRight: "4px" }),
    pagination: { display: "flex", gap: "8px", justifyContent: "center", marginTop: "20px" },
    pageBtn: (a) => ({ padding: "7px 14px", borderRadius: "6px", border: "2px solid " + (a ? "#2a9d8f" : "#ddd"), background: a ? "#2a9d8f" : "#fff", color: a ? "#fff" : "#555", cursor: "pointer", fontWeight: 600 }),
  };

  return (
    <AdminLayout title="Members">
      <form style={s.filters} onSubmit={handleSearch}>
        <input style={s.searchInput} placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={s.select} value={roleFilter} onChange={e => { setRoleFilter(e.target.value); setPage(1); }}>
          <option value="">All Roles</option>
          {ROLES.map(r => <option key={r} value={r}>{r.charAt(0).toUpperCase() + r.slice(1)}</option>)}
        </select>
        <button type="submit" style={s.searchBtn}>Search</button>
      </form>

      <div style={s.card}>
        {loading ? <p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={s.th}>#</th>
                <th style={s.th}>Name</th>
                <th style={s.th}>Email</th>
                <th style={s.th}>Phone</th>
                <th style={s.th}>Role</th>
                <th style={s.th}>Status</th>
                <th style={s.th}>Joined</th>
                <th style={s.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: "center", color: "#aaa" }}>No members found.</td></tr>}
              {members.map((m, i) => (
                <tr key={m.id}>
                  <td style={s.td}>{(page - 1) * limit + i + 1}</td>
                  <td style={{ ...s.td, fontWeight: 600 }}>{m.name}</td>
                  <td style={s.td}>{m.email}</td>
                  <td style={s.td}>{m.phone || "-"}</td>
                  <td style={s.td}><span style={s.roleBadge(m.role)}>{m.role}</span></td>
                  <td style={s.td}>
                    <span style={{ ...s.roleBadge(m.isActive ? "volunteer" : "admin"), background: m.isActive ? "#3cd49b22" : "#2a9d8f22", color: m.isActive ? "#3aafa9" : "#2a9d8f" }}>
                      {m.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td style={s.td}>{new Date(m.createdAt).toLocaleDateString()}</td>
                  <td style={s.td}>
                    <select
                      style={{ ...s.select, padding: "4px 8px", fontSize: "12px", marginRight: "6px" }}
                      value={m.role}
                      onChange={e => handleRole(m.id, e.target.value)}
                    >
                      {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                    <button style={s.actionBtn(m.isActive ? "#f0a500" : "#3aafa9")} onClick={() => handleStatus(m.id, !m.isActive)}>
                      {m.isActive ? "Deactivate" : "Activate"}
                    </button>
                    <button style={s.actionBtn("#2a9d8f")} onClick={() => handleDelete(m.id)}>Delete</button>
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
