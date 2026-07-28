import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await login(form);
      loginUser(res.token, res.user);
      navigate(res.user?.role === 'admin' ? '/admin' : '/');
    } catch (err) {
      setError(err.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  const s = {
    page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", fontFamily: "Poppins, sans-serif" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 4px 24px rgba(0,0,0,0.10)", padding: "48px 40px", width: "100%", maxWidth: "420px" },
    title: { fontSize: "28px", fontWeight: 700, color: "#162a35", marginBottom: "8px", textAlign: "center" },
    sub: { color: "#888", textAlign: "center", marginBottom: "32px", fontSize: "14px" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#162a35", marginBottom: "6px" },
    input: { width: "100%", padding: "12px 16px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "18px", boxSizing: "border-box" },
    btn: { width: "100%", padding: "13px", background: "#ff544a", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
    error: { color: "#ff544a", background: "#fff0ef", padding: "10px 14px", borderRadius: "6px", marginBottom: "16px", fontSize: "14px" },
    footer: { textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#888" },
  };

  return (
    <div style={s.page}>
      <div style={s.card}>
        <h1 style={s.title}>Welcome Back</h1>
        <p style={s.sub}>Sign in to your <strong style={{ color: "#ff544a" }}>eSupport</strong> account</p>
        {error && <div style={s.error}>{error}</div>}
        <form onSubmit={handleSubmit}>
          <label style={s.label}>Email Address</label>
          <input style={s.input} type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} required />
          <label style={s.label}>Password</label>
          <input style={s.input} type="password" placeholder="........" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} required />
          <button style={{ ...s.btn, opacity: loading ? 0.7 : 1 }} disabled={loading}>{loading ? "Signing in..." : "Sign In"}</button>
        </form>
        <div style={s.footer}>No account? <Link to="/register" style={{ color: "#ff544a", fontWeight: 600 }}>Register here</Link></div>
        <div style={{ ...s.footer, marginTop: "8px" }}><Link to="/" style={{ color: "#aaa" }}>← Back to Home</Link></div>
      </div>
    </div>
  );
}
