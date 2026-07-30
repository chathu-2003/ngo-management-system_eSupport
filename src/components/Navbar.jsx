import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.jpeg";
import { FaSearch, FaUser, FaBars, FaTimes } from "react-icons/fa";

const NAV_ITEMS = [
  { key: "home", label: "Home", to: "/" },
  { key: "programe", label: "Programs", to: "/programe" },
  { key: "causes", label: "Causes", to: "/causes" },
  { key: "events", label: "Events", to: "/events" },
  { key: "projects", label: "Projects", to: "/projects" },
  { key: "gallery", label: "Portfolio", to: "/gallery" },
  { key: "about", label: "About", to: "/about" },
  { key: "news", label: "News", to: "/news" },
  { key: "blog", label: "Blog", to: "/blog" },
  { key: "stories", label: "Success Stories", to: "/success-stories" },
];

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const s = {
    header: { backgroundColor: "#ffffff", boxShadow: "0 2px 10px rgba(0,0,0,0.06)", position: "sticky", top: 0, zIndex: 1050 },
    navContainer: { maxWidth: "1280px", margin: "0 auto", padding: "14px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "24px" },
    logoArea: { display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" },
    logoImg: { width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover", border: "2px solid #eee" },
    logoTitle: { fontSize: "17px", fontWeight: 800, color: "#162a35", margin: 0, letterSpacing: "0.5px" },
    logoSubtitle: { fontSize: "9px", color: "#687b84", fontWeight: 700, margin: 0, letterSpacing: "1px" },
    navLinks: { display: "flex", alignItems: "center", gap: "28px" },
    navLink: { fontSize: "14px", fontWeight: 600, color: "#333", textDecoration: "none" },
    navLinkActive: { color: "#e65c00" },
    navRight: { display: "flex", alignItems: "center", gap: "14px" },
    iconBtn: { border: "none", background: "transparent", color: "#333", fontSize: "16px", cursor: "pointer", padding: "4px" },
    btnDonate: { backgroundColor: "#e65c00", color: "#fff", fontWeight: 700, fontSize: "13px", padding: "10px 22px", borderRadius: "5px", textDecoration: "none" },
    hamburger: { border: "none", background: "transparent", fontSize: "22px", color: "#162a35", cursor: "pointer" },
    mobileMenu: { backgroundColor: "#fff", borderTop: "1px solid #eee", padding: "16px 24px 20px", display: "flex", flexDirection: "column", gap: "14px" },
    mobileLink: { fontSize: "15px", fontWeight: 600, color: "#333", textDecoration: "none" },
    mobileLinkActive: { color: "#e65c00" },
    mobileDonateBtn: { backgroundColor: "#e65c00", color: "#fff", fontWeight: 700, fontSize: "14px", padding: "12px", borderRadius: "6px", textDecoration: "none", textAlign: "center", marginTop: "6px" },
  };

  return (
    <header style={s.header}>
      <div style={s.navContainer}>
        <Link to="/" style={s.logoArea} onClick={close}>
          <img src={logo} alt="Empower Hopes Logo" style={s.logoImg} />
          <div>
            <h3 style={s.logoTitle}>EMPOWER HOPES</h3>
            <p style={s.logoSubtitle}>HUMANITARIAN NETWORK</p>
          </div>
        </Link>

        <div className="d-none d-lg-flex" style={s.navLinks}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.key} to={item.to} style={{ ...s.navLink, ...(active === item.key ? s.navLinkActive : {}) }}>
              {item.label}
            </Link>
          ))}
        </div>

        <div className="d-none d-lg-flex" style={s.navRight}>
          <button style={s.iconBtn} aria-label="Search"><FaSearch /></button>
          <button style={s.iconBtn} aria-label="Account"><FaUser /></button>
          <Link to="/donate" style={s.btnDonate}>DONATE NOW</Link>
        </div>

        <button className="d-lg-none" style={s.hamburger} onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation">
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {open && (
        <div className="d-lg-none" style={s.mobileMenu}>
          {NAV_ITEMS.map((item) => (
            <Link key={item.key} to={item.to} style={{ ...s.mobileLink, ...(active === item.key ? s.mobileLinkActive : {}) }} onClick={close}>
              {item.label}
            </Link>
          ))}
          <Link to="/donate" style={s.mobileDonateBtn} onClick={close}>DONATE NOW</Link>
        </div>
      )}
    </header>
  );
}
