import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirm) { setError("Passwords do not match."); return; }
    setLoading(true);
    setError("");
    try {
      const res = await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      loginUser(res.token, res.user);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  const s = {
    page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", fontFamily: "Poppins, sans-serif", padding: "40px 16px" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", padding: "48px 40px", width: "100%", maxWidth: "440px" },
    title: { fontSize: "26px", fontWeight: 700, color: "#162a35", marginBottom: "8px", textAlign: "center" },
    sub: { color: "#888", textAlign: "center", marginBottom: "28px", fontSize: "14px" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#162a35", marginBottom: "6px" },
    input: { width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "16px", boxSizing: "border-box" },
    btn: { width: "100%", padding: "13px", background: "#ff544a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    error: { color: "#ff544a", background: "#fff0ef", padding: "10px 14px", borderRadius: "6px", marginBottom: "14px", fontSize: "14px" },
    footer: { textAlign: "center", marginTop: "18px", fontSize: "14px", color: "#888" },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h1 style={s.title}>Create Account</h1>
        <p style={s.sub}>Join <strong style={{ color: "#ff544a" }}>eSupport</strong> and make a difference</p>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Full Name</label>
          <input style={s.input} type="text" placeholder="John Doe" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
          <label style={s.label}>Email Address</label>
          <input style={s.input} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <label style={s.label}>Phone Number</label>
          <input style={s.input} type="tel" placeholder="+94 71 234 5678" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
          <label style={s.label}>Password</label>
          <input style={s.input} type="password" placeholder="Min 6 characters" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required minLength={6} />
          <label style={s.label}>Confirm Password</label>
          <input style={s.input} type="password" placeholder="Repeat password" value={form.confirm} onChange={e => setForm({ ...form, confirm: e.target.value })} required />
          <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>{loading ? "Creating account..." : "Create Account"}</button>
        </form>
        <div style={s.footer}>Already have an account? <Link to="/login" style={{ color: "#ff544a", fontWeight: 600 }}>Sign in</Link></div>
        <div style={{ ...s.footer, marginTop: "8px" }}><Link to="/" style={{ color: "#aaa" }}>← Back to Home</Link></div>
      </div>
    </div>
  );
}
