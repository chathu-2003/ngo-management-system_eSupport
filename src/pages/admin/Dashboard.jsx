import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout, { C } from "./AdminLayout";
import { getAdminStats } from "../../services/api";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
  PieChart, Pie, Legend,
  RadialBarChart, RadialBar,
} from "recharts";

// ── Uniform button size ────────────────────────────────────────────────────
const BTN = {
  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
  padding: "0 20px", height: "44px", minWidth: "148px",
  borderRadius: "10px", border: "none", cursor: "pointer",
  fontSize: "13px", fontWeight: 600, textDecoration: "none",
  transition: "opacity 0.15s, transform 0.1s", whiteSpace: "nowrap",
};

const ActionBtn = ({ label, to, icon, color }) => (
  <Link to={to} style={{ ...BTN, background: color, color: "#fff", boxShadow: `0 3px 10px ${color}40` }}>
    <i className={`bi ${icon}`} style={{ fontSize: "16px" }}></i>
    {label}
  </Link>
);

// ── Stat card ──────────────────────────────────────────────────────────────
const StatCard = ({ label, value, sub, color, icon, to }) => {
  const [hovered, setHovered] = React.useState(false);
  const inner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? `linear-gradient(135deg, ${color} 0%, ${color}cc 100%)`
          : "#fff",
        borderRadius: "16px",
        padding: "22px 20px 18px",
        boxShadow: hovered
          ? `0 12px 32px ${color}44`
          : "0 2px 12px rgba(27,61,79,0.08)",
        height: "110px",
        boxSizing: "border-box",
        textDecoration: "none",
        color: "inherit",
        position: "relative",
        overflow: "hidden",
        transition: "all 0.25s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
        cursor: to ? "pointer" : "default",
      }}
    >
      {/* Background circle decoration */}
      <div style={{
        position: "absolute", right: "-14px", top: "-14px",
        width: "80px", height: "80px", borderRadius: "50%",
        background: hovered ? "rgba(255,255,255,0.15)" : color + "14",
        transition: "all 0.25s",
      }} />
      <div style={{
        position: "absolute", right: "20px", bottom: "-20px",
        width: "56px", height: "56px", borderRadius: "50%",
        background: hovered ? "rgba(255,255,255,0.08)" : color + "08",
        transition: "all 0.25s",
      }} />

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", position: "relative" }}>
        <div>
          <p style={{
            fontSize: "11px", fontWeight: 700,
            color: hovered ? "rgba(255,255,255,0.75)" : C.textSub,
            textTransform: "uppercase", letterSpacing: "0.7px", marginBottom: "6px",
            transition: "color 0.25s",
          }}>{label}</p>
          <p style={{
            fontSize: "28px", fontWeight: 800, lineHeight: 1,
            color: hovered ? "#fff" : C.text,
            transition: "color 0.25s",
          }}>{value ?? "—"}</p>
          {sub && <p style={{
            fontSize: "11px", marginTop: "4px",
            color: hovered ? "rgba(255,255,255,0.65)" : "#aaa",
            transition: "color 0.25s",
          }}>{sub}</p>}
        </div>
        <div style={{
          width: "40px", height: "40px", borderRadius: "10px",
          background: hovered ? "rgba(255,255,255,0.2)" : color + "18",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "18px", flexShrink: 0,
          transition: "all 0.25s",
        }}><i className={`bi ${icon}`}></i></div>
      </div>
    </div>
  );
  return to ? <Link to={to} style={{ textDecoration: "none" }}>{inner}</Link> : inner;
};

// ── Section header ──────────────────────────────────────────────────────────
const Section = ({ title, subtitle }) => (
  <div style={{ margin: "32px 0 16px" }}>
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <div style={{ width: "4px", height: "20px", background: C.primary, borderRadius: "2px" }}></div>
      <h2 style={{ fontSize: "16px", fontWeight: 700, color: C.text, margin: 0 }}>{title}</h2>
      {subtitle && <span style={{ fontSize: "12px", color: C.textSub, marginLeft: "4px" }}>{subtitle}</span>}
    </div>
  </div>
);

// ── Custom tooltip for charts ───────────────────────────────────────────────
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "#fff", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "10px 14px", boxShadow: "0 4px 16px rgba(0,0,0,0.1)", fontSize: "13px" }}>
      <p style={{ fontWeight: 700, color: C.text, marginBottom: "4px" }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: <strong>{p.value}</strong></p>
      ))}
    </div>
  );
};

// ── Custom pie label ────────────────────────────────────────────────────────
const PieLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  if (percent < 0.04) return null;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  return (
    <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight={700}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAdminStats()
      .then(res => setStats(res.data))
      .catch(err => setError(err.message || "Failed to load stats."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <AdminLayout title="Dashboard">
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", minHeight: "60vh", gap: "16px" }}>
        <div style={{ width: "48px", height: "48px", border: `4px solid ${C.border}`, borderTop: `4px solid ${C.primary}`, borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
        <p style={{ color: C.textSub, fontSize: "14px" }}>Loading dashboard…</p>
        <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
      </div>
    </AdminLayout>
  );

  if (error) return (
    <AdminLayout title="Dashboard">
      <div style={{ textAlign: "center", padding: "80px 20px" }}>
        <div style={{ fontSize: "48px", marginBottom: "16px", color: C.warning }}><i className="bi bi-exclamation-triangle"></i></div>
        <p style={{ color: C.primary, fontWeight: 700, fontSize: "16px", marginBottom: "8px" }}>{error}</p>
        <p style={{ color: C.textSub, fontSize: "13px" }}>Make sure the backend server is running on port 5000.</p>
        <button onClick={() => window.location.reload()} style={{ ...BTN, background: C.primary, color: "#fff", margin: "20px auto 0", display: "flex" }}>
          <i className="bi bi-arrow-clockwise"></i> Retry
        </button>
      </div>
    </AdminLayout>
  );

  const d = stats || {};

  // ── Chart data ─────────────────────────────────────────────────────────────
  const communityBar = [
    { name: "Contacts",   value: d.contacts?.total   || 0, fill: C.primary },
    { name: "Volunteers", value: d.volunteers?.total  || 0, fill: C.teal },
    { name: "Members",    value: d.users?.total       || 0, fill: C.info },
    { name: "Inquiries",  value: d.inquiries?.total   || 0, fill: "#845ef7" },
    { name: "Loans",      value: d.loans?.total       || 0, fill: C.warning },
    { name: "Tasks",      value: d.tasks?.total       || 0, fill: "#3aafa9" },
  ];

  const contentPie = [
    { name: "Blog Posts",    value: d.blogs?.total        || 0, fill: C.primary },
    { name: "Gallery",       value: d.gallery?.total      || 0, fill: C.teal },
    { name: "Testimonials",  value: d.testimonials?.total || 0, fill: "#845ef7" },
    { name: "Partners",      value: d.partners?.total     || 0, fill: C.info },
    { name: "Marketplace",   value: d.marketplace?.total  || 0, fill: C.warning },
  ].filter(x => x.value > 0);

  const volunteerStatus = [
    { name: "Approved",  value: d.volunteers?.approved || 0, fill: C.teal },
    { name: "Pending",   value: d.volunteers?.pending  || 0, fill: C.warning },
    { name: "Total",     value: d.volunteers?.total    || 0, fill: C.primary },
  ];

  const donationPie = [
    { name: "Completed", value: d.donations?.total     || 0, fill: C.teal },
    { name: "Pending",   value: (d.loans?.pending      || 0), fill: C.warning },
    { name: "Inquiries", value: d.inquiries?.pending   || 0, fill: C.primary },
  ].filter(x => x.value > 0);

  const totalRaised = Number(d.donations?.totalRaised || 0);

  return (
    <AdminLayout title="Dashboard">

      {/* ── HERO BANNER ─────────────────────────────────────────────────── */}
      <div style={{
        background: "#ffffff",
        borderRadius: "20px",
        overflow: "hidden",
        boxShadow: "0 4px 24px rgba(42,157,143,0.12), 0 1px 4px rgba(0,0,0,0.06)",
        border: `1px solid ${C.border}`,
        marginBottom: "4px",
      }}>
        {/* Gradient top strip */}
        <div style={{
          height: "6px",
          background: `linear-gradient(90deg, ${C.dark} 0%, ${C.primary} 40%, ${C.teal} 70%, #52c7be 100%)`,
        }} />

        {/* Main content */}
        <div style={{ padding: "28px 32px 24px" }}>
          {/* Top row: label + branding */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
            <div>
              <p style={{ fontSize: "11px", fontWeight: 700, color: C.primary, letterSpacing: "2px", textTransform: "uppercase", marginBottom: "4px" }}>
                Total Raised
              </p>
              <p style={{ fontSize: "13px", color: C.textSub, fontWeight: 400 }}>
                Lifetime fundraising across all campaigns
              </p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/logo.jpeg" alt="Logo" style={{
                width: "44px", height: "44px", borderRadius: "10px",
                objectFit: "cover", border: `2px solid ${C.border}`,
              }} />
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "13px", fontWeight: 700, color: C.text, lineHeight: 1.3 }}>EMPOWER HOPES</p>
                <p style={{ fontSize: "10px", color: C.textSub, letterSpacing: "0.8px" }}>HUMANITARIAN NETWORK</p>
              </div>
            </div>
          </div>

          {/* Big LKR number */}
          <div style={{ marginBottom: "28px" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
              <span style={{
                fontSize: "16px", fontWeight: 700, color: C.primary,
                background: `${C.primary}12`, padding: "4px 10px", borderRadius: "6px",
              }}>LKR</span>
              <span style={{
                fontSize: "52px", fontWeight: 900, color: C.text,
                letterSpacing: "-2px", lineHeight: 1,
              }}>
                {totalRaised.toLocaleString()}
              </span>
            </div>
            <p style={{ color: C.textSub, fontSize: "12px", marginTop: "8px" }}>
              from <strong style={{ color: C.primary }}>{d.donations?.total || 0}</strong> completed donations
            </p>
          </div>

          {/* Stat pills row */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {[
              { l: "Members",    v: d.users?.total         || 0, icon: "bi-person-badge", color: C.info,    to: "/admin/members" },
              { l: "Donations",  v: d.donations?.total     || 0, icon: "bi-cash-coin",    color: C.primary, to: "/admin/donations" },
              { l: "Volunteers", v: d.volunteers?.approved || 0, icon: "bi-people",       color: C.teal,    to: "/admin/volunteers" },
              { l: "Causes",     v: d.causes?.total        || 0, icon: "bi-heart",        color: C.danger,  to: "/admin/causes" },
              { l: "Events",     v: d.events?.total        || 0, icon: "bi-calendar-event", color: C.warning, to: "/admin/events" },
            ].map(({ l, v, icon, color, to }) => (
              <Link key={l} to={to} style={{ textDecoration: "none" }}>
                <div style={{
                  display: "flex", alignItems: "center", gap: "8px",
                  padding: "9px 16px", borderRadius: "50px",
                  background: color + "10", border: `1.5px solid ${color}28`,
                  transition: "all 0.18s", cursor: "pointer",
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = color + "20"; e.currentTarget.style.borderColor = color + "60"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = color + "10"; e.currentTarget.style.borderColor = color + "28"; }}
                >
                  <i className={`bi ${icon}`} style={{ fontSize: "16px", color }}></i>
                  <span style={{ fontSize: "15px", fontWeight: 800, color }}>{v}</span>
                  <span style={{ fontSize: "12px", fontWeight: 500, color: C.textSub }}>{l}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── TOP STATS GRID ─────────────────────────────────────────────── */}
      <Section title="Overview" subtitle="Key metrics at a glance" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "12px" }}>
        <StatCard label="Contacts"     value={d.contacts?.total}   sub={`${d.contacts?.pending || 0} pending`}   color={C.primary} icon="bi-envelope"  to="/admin/contacts" />
        <StatCard label="Volunteers"   value={d.volunteers?.total} sub={`${d.volunteers?.pending || 0} pending`} color={C.teal}    icon="bi-people"  to="/admin/volunteers" />
        <StatCard label="Members"      value={d.users?.total}      sub="registered users"                        color={C.info}    icon="bi-person-badge"  to="/admin/members" />
        <StatCard label="Donations"    value={d.donations?.total}  sub={`LKR ${(totalRaised/1000).toFixed(0)}k raised`} color={C.teal} icon="bi-cash-coin" to="/admin/donations" />
        <StatCard label="Active Causes"  value={d.causes?.total}         sub="fundraising"                  color={C.primary} icon="bi-heart"  to="/admin/causes" />
        <StatCard label="Active Events"  value={d.events?.total}         sub="scheduled"                    color={C.info}    icon="bi-calendar-event"  to="/admin/events" />
        <StatCard label="Inquiries"      value={d.inquiries?.total}      sub={`${d.inquiries?.pending || 0} open`} color="#845ef7" icon="bi-chat-dots" to="/admin/inquiries" />
        <StatCard label="Loan Apps"      value={d.loans?.total}          sub={`${d.loans?.pending || 0} pending`} color={C.warning} icon="bi-bank" to="/admin/loans" />
        <StatCard label="Community Tasks" value={d.tasks?.total}         sub={`${d.tasks?.open || 0} open`}   color={C.teal}    icon="bi-check2-square"  to="/admin/tasks" />
        <StatCard label="Blog Posts"     value={d.blogs?.total}          sub={`${d.blogs?.published || 0} published`} color={C.primary} icon="bi-newspaper" to="/admin/blog" />
        <StatCard label="Newsletter"     value={d.newsletter?.active}    sub={`${d.newsletter?.total || 0} total`} color={C.warning} icon="bi-send" to="/admin/newsletter" />
        <StatCard label="Marketplace"    value={d.marketplace?.total}    sub="active listings"              color="#845ef7"   icon="bi-shop"  to="/admin/marketplace" />
      </div>

      {/* ── CHARTS ROW ─────────────────────────────────────────────────── */}
      <Section title="Analytics" subtitle="Visual overview" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

        {/* Bar Chart — Community */}
        <div style={{ background: "#fff", borderRadius: "18px", padding: "26px", boxShadow: "0 4px 24px rgba(27,61,79,0.09)", border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>Community Overview</p>
          <p style={{ fontSize: "11px", color: C.textSub, marginBottom: "20px" }}>Total entries per category</p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={communityBar} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barSize={28}>
              <CartesianGrid strokeDasharray="3 3" stroke={C.border} vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: C.textSub }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: C.textSub }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: C.bg }} />
              <Bar dataKey="value" name="Count" radius={[6, 6, 0, 0]}>
                {communityBar.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart — Content distribution */}
        <div style={{ background: "#fff", borderRadius: "18px", padding: "26px", boxShadow: "0 4px 24px rgba(27,61,79,0.09)", border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>Content Distribution</p>
          <p style={{ fontSize: "11px", color: C.textSub, marginBottom: "8px" }}>Blog · Gallery · Partners · Marketplace</p>
          {contentPie.length === 0 ? (
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: C.textSub, fontSize: "13px" }}>
              No content yet — start adding!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={contentPie} cx="50%" cy="50%" outerRadius={85} dataKey="value" labelLine={false} label={PieLabel}>
                  {contentPie.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Radial — Volunteer status */}
        <div style={{ background: "#fff", borderRadius: "18px", padding: "26px", boxShadow: "0 4px 24px rgba(27,61,79,0.09)", border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>Volunteer Status</p>
          <p style={{ fontSize: "11px", color: C.textSub, marginBottom: "8px" }}>Approved vs pending vs total</p>
          <ResponsiveContainer width="100%" height={220}>
            <RadialBarChart cx="50%" cy="50%" innerRadius="25%" outerRadius="90%" data={volunteerStatus} startAngle={90} endAngle={-270}>
              <RadialBar minAngle={8} background={{ fill: C.bg }} clockWise dataKey="value" cornerRadius={6}>
                {volunteerStatus.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
              </RadialBar>
              <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px" }} />
              <Tooltip content={<CustomTooltip />} />
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie — Pending items */}
        <div style={{ background: "#fff", borderRadius: "18px", padding: "26px", boxShadow: "0 4px 24px rgba(27,61,79,0.09)", border: `1px solid ${C.border}` }}>
          <p style={{ fontSize: "13px", fontWeight: 700, color: C.text, marginBottom: "4px" }}>Pending Actions</p>
          <p style={{ fontSize: "11px", color: C.textSub, marginBottom: "8px" }}>Items requiring attention</p>
          {donationPie.length === 0 ? (
            <div style={{ height: 220, display: "flex", alignItems: "center", justifyContent: "center", color: C.textSub, fontSize: "13px" }}>
              All clear — nothing pending!
            </div>
          ) : (
            <ResponsiveContainer width="100%" height={220}>
              <PieChart>
                <Pie data={donationPie} cx="50%" cy="50%" innerRadius={50} outerRadius={85} dataKey="value" labelLine={false} label={PieLabel}>
                  {donationPie.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                </Pie>
                <Legend iconType="circle" iconSize={8} wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }} />
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* ── STATUS ALERTS ──────────────────────────────────────────────── */}
      <Section title="Status Alerts" subtitle="Items needing attention" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: "12px" }}>
        {[
          { label: "Pending Contacts",   count: d.contacts?.pending   || 0, to: "/admin/contacts",   color: C.primary, icon: "bi-envelope" },
          { label: "Pending Volunteers", count: d.volunteers?.pending  || 0, to: "/admin/volunteers", color: C.warning, icon: "bi-people" },
          { label: "Pending Loans",      count: d.loans?.pending       || 0, to: "/admin/loans",      color: "#845ef7", icon: "bi-bank" },
          { label: "Open Inquiries",     count: d.inquiries?.pending   || 0, to: "/admin/inquiries",  color: C.teal,    icon: "bi-chat-dots" },
          { label: "Open Tasks",         count: d.tasks?.open          || 0, to: "/admin/tasks",      color: C.info,    icon: "bi-check2-square" },
          { label: "Draft Blog Posts",   count: (d.blogs?.total || 0) - (d.blogs?.published || 0), to: "/admin/blog", color: C.primary, icon: "bi-file-earmark-text" },
        ].map(({ label, count, to, color, icon }) => (
          <Link key={label} to={to} style={{ textDecoration: "none" }}>
            <div style={{
              background: count > 0
                ? `linear-gradient(135deg, ${color}18 0%, ${color}08 100%)`
                : "#fff",
              border: `1.5px solid ${count > 0 ? color + "35" : C.border}`,
              borderRadius: "14px",
              padding: "16px 18px",
              display: "flex", alignItems: "center", gap: "14px",
              height: "80px", boxSizing: "border-box",
              transition: "all 0.2s ease",
              boxShadow: count > 0
                ? `0 4px 16px ${color}20`
                : "0 2px 8px rgba(27,61,79,0.05)",
            }}>
              <div style={{
                width: "42px", height: "42px", borderRadius: "12px", flexShrink: 0,
                background: count > 0 ? color + "20" : C.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "20px",
              }}><i className={`bi ${icon}`}></i></div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: "11px", color: C.textSub, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.4px", marginBottom: "3px" }}>{label}</p>
                <p style={{ fontSize: "24px", fontWeight: 800, color: count > 0 ? color : C.textSub, lineHeight: 1 }}>{count}</p>
              </div>
              {count > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: color, boxShadow: `0 0 8px ${color}` }}></div>
                  <span style={{ fontSize: "9px", color, fontWeight: 700 }}>NEW</span>
                </div>
              ) : (
                <div style={{ fontSize: "16px", color: "#ccc" }}><i className="bi bi-check-circle"></i></div>
              )}
            </div>
          </Link>
        ))}
      </div>

      {/* ── QUICK ACTIONS ──────────────────────────────────────────────── */}
      <Section title="Quick Actions" subtitle="Common tasks" />
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center" }}>
        <ActionBtn label="New Blog Post"  to="/admin/blog"         icon="bi-newspaper" color={C.primary} />
        <ActionBtn label="Add Event"      to="/admin/events"       icon="bi-calendar-event" color={C.info} />
        <ActionBtn label="Add Cause"      to="/admin/causes"       icon="bi-heart" color={C.teal} />
        <ActionBtn label="Add Task"       to="/admin/tasks"        icon="bi-check2-square" color={C.warning} />
        <ActionBtn label="Add Partner"    to="/admin/partners"     icon="bi-building" color="#845ef7" />
        <ActionBtn label="Add Gallery"    to="/admin/gallery"      icon="bi-images" color={C.teal} />
        <ActionBtn label="Review Loans"   to="/admin/loans"        icon="bi-bank" color={C.primary} />
        <ActionBtn label="View Members"   to="/admin/members"      icon="bi-person-badge" color={C.info} />
        <ActionBtn label="Testimonials"   to="/admin/testimonials" icon="bi-quote" color={C.warning} />
        <ActionBtn label="Marketplace"    to="/admin/marketplace"  icon="bi-shop" color="#845ef7" />
        <ActionBtn label="Newsletter"     to="/admin/newsletter"   icon="bi-send" color={C.primary} />
        <ActionBtn label="Donations"      to="/admin/donations"    icon="bi-cash-coin" color={C.teal} />
      </div>

      <div style={{ height: "32px" }} />
    </AdminLayout>
  );
}
