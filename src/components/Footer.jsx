import React from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn } from "react-icons/fa";

const GALLERY_PREVIEW = [
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=200",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=200",
  "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=200",
  "https://images.unsplash.com/photo-1497486751825-1233686d5d80?q=80&w=200",
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=200",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?q=80&w=200",
];

export default function Footer() {
  const s = {
    footer: { backgroundColor: "#141414", color: "#ffffff", paddingTop: "70px" },
    inner: { maxWidth: "1280px", margin: "0 auto", padding: "0 24px" },
    row: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px", paddingBottom: "50px" },
    brandRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" },
    brandTitle: { fontSize: "20px", fontWeight: 800, margin: 0 },
    brandSub: { fontSize: "10px", color: "#ffb83b", fontWeight: 700, margin: 0 },
    brandText: { color: "#8c8c8c", fontSize: "14px", lineHeight: 1.7, marginBottom: "16px" },
    socialRow: { display: "flex", gap: "12px" },
    socialIcon: { width: "34px", height: "34px", borderRadius: "50%", background: "rgba(255,255,255,0.08)", color: "#ccc", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: "13px" },
    heading: { fontSize: "15px", fontWeight: 700, marginBottom: "18px" },
    link: { display: "block", color: "#a0a0a0", fontSize: "14px", textDecoration: "none", marginBottom: "10px" },
    galleryGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" },
    galleryImg: { width: "100%", height: "60px", objectFit: "cover", borderRadius: "4px" },
    bottomBar: { borderTop: "1px solid rgba(255,255,255,0.08)", padding: "20px 24px", display: "flex", justifyContent: "center", alignItems: "center", flexWrap: "wrap", gap: "10px", fontSize: "13px", color: "#888" },
  };

  return (
    <footer style={s.footer}>
      <div style={s.inner}>
        <div style={s.row}>
          <div>
            <div style={s.brandRow}>
              <span style={{ fontSize: "26px", color: "#ff544a" }}><FaHeart /></span>
              <div>
                <h3 style={s.brandTitle}>EMPOWER HOPES</h3>
                <p style={s.brandSub}>HUMANITARIAN NETWORK</p>
              </div>
            </div>
            <p style={s.brandText}>Empower Hopes Humanitarian Network works to bring education, healthcare, and economic opportunity to communities across Sri Lanka.</p>
            <div style={s.socialRow}>
              <a href="#" style={s.socialIcon} aria-label="Facebook"><FaFacebookF /></a>
              <a href="#" style={s.socialIcon} aria-label="Twitter"><FaTwitter /></a>
              <a href="#" style={s.socialIcon} aria-label="Pinterest"><FaPinterestP /></a>
              <a href="#" style={s.socialIcon} aria-label="LinkedIn"><FaLinkedinIn /></a>
            </div>
          </div>

          <div>
            <h4 style={s.heading}>About</h4>
            <Link to="/" style={s.link}>Home</Link>
            <Link to="/donate" style={s.link}>Donation</Link>
            <Link to="/about" style={s.link}>About us</Link>
            <Link to="/events" style={s.link}>Events</Link>
            <Link to="/marketplace" style={s.link}>Marketplace</Link>
          </div>

          <div>
            <h4 style={s.heading}>Quick Links</h4>
            <Link to="/causes" style={s.link}>Causes</Link>
            <Link to="/gallery" style={s.link}>Gallery</Link>
            <Link to="/blog" style={s.link}>Stories</Link>
            <Link to="/contact" style={s.link}>Contact</Link>
            <Link to="/register" style={s.link}>Become a Member</Link>
          </div>

          <div>
            <h4 style={s.heading}>Photo Gallery</h4>
            <div style={s.galleryGrid}>
              {GALLERY_PREVIEW.map((url, i) => (
                <img key={i} src={url} alt="Gallery preview" style={s.galleryImg} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div style={s.bottomBar}>
        <span>Donate by:</span>
        <i className="bi bi-credit-card" style={{ fontSize: "16px", color: "#aaa" }}></i>
        <i className="bi bi-paypal" style={{ fontSize: "16px", color: "#aaa" }}></i>
        <span style={{ marginLeft: "8px" }}>&copy; {new Date().getFullYear()} Empower Hopes Humanitarian Network. All rights reserved.</span>
      </div>
    </footer>
  );
}
