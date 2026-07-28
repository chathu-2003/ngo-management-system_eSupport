import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

// ── Brand colors ───────────────────────────────────────────────────────────
export const C = {
  primary:   "#2a9d8f",   // green-teal (main brand)
  teal:      "#3aafa9",   // lighter teal accent
  dark:      "#1b3d4f",   // deep dark sidebar
  darkMid:   "#234e63",
  bg:        "#f0f7f6",   // light green-white background
  text:      "#1b3d4f",
  textSub:   "#607d8b",
  border:    "#c8e6e3",
  white:     "#ffffff",
  success:   "#2a9d8f",
  warning:   "#f0a500",
  danger:    "#e05c3a",
  info:      "#4dabf7",
};

const NAV_SECTIONS = [
  {
    label: "Overview",
    items: [
      { path: "/admin", label: "Dashboard", icon: "bi-speedometer2", exact: true },
    ],
  },
  {
    label: "Community",
    items: [
      { path: "/admin/contacts",   label: "Contacts",          icon: "bi-envelope" },
      { path: "/admin/volunteers", label: "Volunteers",        icon: "bi-people" },
      { path: "/admin/members",    label: "Members",           icon: "bi-person-badge" },
      { path: "/admin/inquiries",  label: "Inquiries",         icon: "bi-chat-dots" },
      { path: "/admin/loans",      label: "Loan Applications", icon: "bi-bank" },
      { path: "/admin/tasks",      label: "Community Tasks",   icon: "bi-check2-square" },
      { path: "/admin/task-applications", label: "Task Applications", icon: "bi-clipboard-check" },
    ],
  },
  {
    label: "Programs",
    items: [
      { path: "/admin/causes",    label: "Causes",    icon: "bi-heart" },
      { path: "/admin/events",    label: "Events",    icon: "bi-calendar-event" },
      { path: "/admin/donations", label: "Donations", icon: "bi-cash-coin" },
    ],
  },
  {
    label: "Content",
    items: [
      { path: "/admin/blog",          label: "Blog / News",   icon: "bi-newspaper" },
      { path: "/admin/gallery",       label: "Gallery",       icon: "bi-images" },
      { path: "/admin/testimonials",  label: "Testimonials",  icon: "bi-quote" },
      { path: "/admin/partners",      label: "Partners",      icon: "bi-building" },
      { path: "/admin/newsletter",    label: "Newsletter",    icon: "bi-send" },
    ],
  },
  {
    label: "Shop",
    items: [
      { path: "/admin/marketplace", label: "Marketplace", icon: "bi-shop" },
      { path: "/admin/orders",      label: "Orders",      icon: "bi-bag-check" },
    ],
  },
  {
    label: "Organization",
    items: [
      { path: "/admin/settings", label: "Site Settings",     icon: "bi-gear" },
      { path: "/admin/reports",  label: "Financial Reports", icon: "bi-file-earmark-pdf" },
    ],
  },
];

export default function AdminLayout({ children, title }) {
  const { user, logoutUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => { logoutUser(); navigate("/login"); };

  const isActive = (item) =>
    item.exact ? location.pathname === item.path : location.pathname.startsWith(item.path);

  const s = {
    wrapper: { display: "flex", minHeight: "100vh", fontFamily: "'Poppins', sans-serif", background: C.bg },

    sidebar: {
      width: sidebarOpen ? "240px" : "64px",
      minHeight: "100vh",
      background: C.dark,
      color: "#fff",
      transition: "width 0.25s ease",
      display: "flex",
      flexDirection: "column",
      flexShrink: 0,
      overflow: "hidden",
      boxShadow: "2px 0 12px rgba(0,0,0,0.15)",
    },

    sidebarHeader: {
      padding: "0 14px",
      borderBottom: "1px solid rgba(255,255,255,0.08)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      minHeight: "72px",
      background: "rgba(0,0,0,0.15)",
    },

    logoImg: {
      width: "38px",
      height: "38px",
      borderRadius: "8px",
      objectFit: "cover",
      flexShrink: 0,
      border: `2px solid ${C.primary}`,
    },

    logoText: {
      display: "flex",
      flexDirection: "column",
      whiteSpace: "nowrap",
      overflow: "hidden",
    },

    logoLine1: { color: C.primary, fontWeight: 800, fontSize: "13px", lineHeight: 1.2 },
    logoLine2: { color: "rgba(255,255,255,0.55)", fontWeight: 500, fontSize: "10px", lineHeight: 1.2 },

    toggleBtn: {
      marginLeft: "auto",
      background: "none",
      border: "none",
      color: "rgba(255,255,255,0.5)",
      fontSize: "18px",
      cursor: "pointer",
      padding: "4px",
      flexShrink: 0,
      transition: "color 0.15s",
    },

    nav: { flex: 1, padding: "8px 0", overflowY: "auto", overflowX: "hidden" },

    sectionLabel: {
      padding: "14px 16px 4px",
      fontSize: "9px",
      fontWeight: 700,
      color: "rgba(255,255,255,0.25)",
      textTransform: "uppercase",
      letterSpacing: "1.2px",
      whiteSpace: "nowrap",
    },

    navItem: (active) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "9px 16px",
      color: active ? C.primary : "rgba(255,255,255,0.65)",
      background: active ? `rgba(${hexToRgb(C.primary)},0.12)` : "transparent",
      textDecoration: "none",
      fontSize: "13px",
      fontWeight: active ? 600 : 400,
      borderLeft: `3px solid ${active ? C.primary : "transparent"}`,
      whiteSpace: "nowrap",
      transition: "all 0.15s",
    }),

    navIcon: { fontSize: "15px", flexShrink: 0 },

    sidebarFooter: {
      padding: "12px 0",
      borderTop: "1px solid rgba(255,255,255,0.08)",
      flexShrink: 0,
    },

    homeLink: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      padding: "9px 16px",
      color: "rgba(255,255,255,0.35)",
      textDecoration: "none",
      fontSize: "13px",
      whiteSpace: "nowrap",
    },

    main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },

    topbar: {
      background: C.white,
      padding: "0 24px",
      height: "72px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      boxShadow: "0 1px 0 " + C.border,
      position: "sticky",
      top: 0,
      zIndex: 100,
    },

    topLeft: { display: "flex", alignItems: "center", gap: "14px" },

    backBtn: {
      background: "none",
      border: `1.5px solid ${C.border}`,
      borderRadius: "8px",
      padding: "6px 12px",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      gap: "6px",
      fontSize: "13px",
      fontWeight: 600,
      color: C.textSub,
      transition: "border-color 0.15s, color 0.15s",
    },

    pageTitle: { fontSize: "19px", fontWeight: 700, color: C.text, margin: 0 },

    userMenu: { display: "flex", alignItems: "center", gap: "12px" },

    avatar: {
      width: "36px",
      height: "36px",
      borderRadius: "50%",
      background: `linear-gradient(135deg, ${C.primary}, ${C.teal})`,
      color: "#fff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontWeight: 700,
      fontSize: "14px",
      flexShrink: 0,
    },

    userName: { fontSize: "14px", color: C.text, fontWeight: 600 },

    logoutBtn: {
      padding: "7px 16px",
      background: C.primary,
      color: "#fff",
      border: "none",
      borderRadius: "8px",
      fontSize: "13px",
      fontWeight: 600,
      cursor: "pointer",
    },

    content: { flex: 1, padding: "28px 24px" },
  };

  return (
    <div style={s.wrapper}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={s.sidebarHeader}>
          <img src="/logo.jpeg" alt="Logo" style={s.logoImg} />
          {sidebarOpen && (
            <div style={s.logoText}>
              <span style={s.logoLine1}>EMPOWER HOPES</span>
              <span style={s.logoLine2}>Admin Panel</span>
            </div>
          )}
          <button style={s.toggleBtn} onClick={() => setSidebarOpen(!sidebarOpen)}>
            <i className={`bi ${sidebarOpen ? "bi-layout-sidebar" : "bi-layout-sidebar-reverse"}`}></i>
          </button>
        </div>

        <nav style={s.nav}>
          {NAV_SECTIONS.map(section => (
            <div key={section.label}>
              {sidebarOpen && <div style={s.sectionLabel}>{section.label}</div>}
              {section.items.map(item => {
                const active = isActive(item);
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={s.navItem(active)}
                    title={!sidebarOpen ? item.label : undefined}
                  >
                    <i className={`bi ${item.icon}`} style={s.navIcon}></i>
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        <div style={s.sidebarFooter}>
          <Link to="/" style={s.homeLink} title={!sidebarOpen ? "Back to Site" : undefined}>
            <i className="bi bi-house" style={s.navIcon}></i>
            {sidebarOpen && <span>Back to Site</span>}
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div style={s.main}>
        <header style={s.topbar}>
          <div style={s.topLeft}>
            {location.pathname !== "/admin" && (
              <button style={s.backBtn} onClick={() => navigate(-1)}>
                <i className="bi bi-arrow-left"></i> Back
              </button>
            )}
            <h1 style={s.pageTitle}>{title}</h1>
          </div>
          <div style={s.userMenu}>
            <div style={s.avatar}>{user?.name?.[0]?.toUpperCase() || "A"}</div>
            {user && <span style={s.userName}>{user.name}</span>}
            <button style={s.logoutBtn} onClick={handleLogout}>Logout</button>
          </div>
        </header>

        <main style={s.content}>{children}</main>
      </div>
    </div>
  );
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `${r},${g},${b}`;
}
