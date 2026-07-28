import React, { useEffect, useState } from "react";
import AdminLayout from "./AdminLayout";
import { adminGetSettings, adminUpdateSettings } from "../../services/api";

const EMPTY = {
  registrationNumber: "", legalStatus: "", missionStatement: "", visionStatement: "", history: "",
  foundedYear: "", address: "", phone: "", email: "", facebookUrl: "", twitterUrl: "", instagramUrl: "",
  whatsappNumber: "", privacyPolicy: "", termsOfUse: "", refundPolicy: "", beneficiariesCount: 0,
};

export default function AdminSettings() {
  const [form, setForm] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    adminGetSettings()
      .then(res => setForm({ ...EMPTY, ...res.data }))
      .finally(() => setLoading(false));
  }, []);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      await adminUpdateSettings(form);
      setMsg("Settings saved.");
      setTimeout(() => setMsg(""), 2000);
    } catch (err) {
      setMsg(err.message || "Failed to save.");
    } finally {
      setSaving(false);
    }
  };

  const s = {
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", padding: "26px", marginBottom: "20px" },
    sectionTitle: { fontSize: "15px", fontWeight: 700, color: "#1b3d4f", marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px" },
    row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" },
    row3: { display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px" },
    label: { display: "block", fontSize: "13px", fontWeight: 600, color: "#1b3d4f", marginBottom: "6px" },
    input: { width: "100%", padding: "10px 14px", borderRadius: "8px", border: "1.5px solid #ddd", fontSize: "14px", marginBottom: "14px", boxSizing: "border-box" },
    textarea: { minHeight: "80px", resize: "vertical" },
    saveBar: { position: "sticky", bottom: "0", background: "#fff", padding: "16px 20px", borderRadius: "12px", boxShadow: "0 -2px 16px rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" },
    saveBtn: { padding: "12px 32px", background: "#2a9d8f", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 700, fontSize: "15px", cursor: "pointer" },
  };

  if (loading) return <AdminLayout title="Site Settings"><p style={{ textAlign: "center", padding: "40px", color: "#888" }}>Loading...</p></AdminLayout>;

  return (
    <AdminLayout title="Site Settings & Trust Info">
      <form onSubmit={handleSave}>
        <div style={s.card}>
          <p style={s.sectionTitle}><i className="bi bi-patch-check"></i> Registration &amp; Legal Status</p>
          <div style={s.row3}>
            <div><label style={s.label}>Registration Number</label><input style={s.input} value={form.registrationNumber || ""} onChange={set("registrationNumber")} placeholder="PVT/NGO/0000/2020" /></div>
            <div><label style={s.label}>Legal Status</label><input style={s.input} value={form.legalStatus || ""} onChange={set("legalStatus")} placeholder="Registered NGO, Sri Lanka" /></div>
            <div><label style={s.label}>Founded Year</label><input style={s.input} type="number" value={form.foundedYear || ""} onChange={set("foundedYear")} placeholder="2020" /></div>
          </div>
        </div>

        <div style={s.card}>
          <p style={s.sectionTitle}><i className="bi bi-bullseye"></i> Mission, Vision &amp; History</p>
          <label style={s.label}>Mission Statement</label>
          <textarea style={{ ...s.input, ...s.textarea }} value={form.missionStatement || ""} onChange={set("missionStatement")} />
          <label style={s.label}>Vision Statement</label>
          <textarea style={{ ...s.input, ...s.textarea }} value={form.visionStatement || ""} onChange={set("visionStatement")} />
          <label style={s.label}>History</label>
          <textarea style={{ ...s.input, ...s.textarea }} value={form.history || ""} onChange={set("history")} />
          <label style={s.label}>Beneficiaries Reached (manual count)</label>
          <input style={s.input} type="number" min="0" value={form.beneficiariesCount || 0} onChange={set("beneficiariesCount")} />
        </div>

        <div style={s.card}>
          <p style={s.sectionTitle}><i className="bi bi-geo-alt"></i> Contact Info</p>
          <div style={s.row2}>
            <div><label style={s.label}>Address</label><input style={s.input} value={form.address || ""} onChange={set("address")} /></div>
            <div><label style={s.label}>Phone</label><input style={s.input} value={form.phone || ""} onChange={set("phone")} /></div>
          </div>
          <div style={s.row2}>
            <div><label style={s.label}>Email</label><input style={s.input} value={form.email || ""} onChange={set("email")} /></div>
            <div><label style={s.label}>WhatsApp Number</label><input style={s.input} value={form.whatsappNumber || ""} onChange={set("whatsappNumber")} placeholder="+94 77 123 4567" /></div>
          </div>
        </div>

        <div style={s.card}>
          <p style={s.sectionTitle}><i className="bi bi-share"></i> Social Links</p>
          <div style={s.row3}>
            <div><label style={s.label}>Facebook URL</label><input style={s.input} value={form.facebookUrl || ""} onChange={set("facebookUrl")} placeholder="https://facebook.com/..." /></div>
            <div><label style={s.label}>Twitter / X URL</label><input style={s.input} value={form.twitterUrl || ""} onChange={set("twitterUrl")} placeholder="https://x.com/..." /></div>
            <div><label style={s.label}>Instagram URL</label><input style={s.input} value={form.instagramUrl || ""} onChange={set("instagramUrl")} placeholder="https://instagram.com/..." /></div>
          </div>
        </div>

        <div style={s.card}>
          <p style={s.sectionTitle}><i className="bi bi-file-earmark-lock"></i> Policies</p>
          <label style={s.label}>Privacy Policy</label>
          <textarea style={{ ...s.input, ...s.textarea }} value={form.privacyPolicy || ""} onChange={set("privacyPolicy")} />
          <label style={s.label}>Terms of Use</label>
          <textarea style={{ ...s.input, ...s.textarea }} value={form.termsOfUse || ""} onChange={set("termsOfUse")} />
          <label style={s.label}>Refund Policy</label>
          <textarea style={{ ...s.input, ...s.textarea }} value={form.refundPolicy || ""} onChange={set("refundPolicy")} />
        </div>

        <div style={s.saveBar}>
          <span style={{ color: msg.includes("saved") ? "#3aafa9" : "#e05c3a", fontWeight: 600, fontSize: "14px" }}>{msg}</span>
          <button style={{ ...s.saveBtn, opacity: saving ? 0.7 : 1 }} disabled={saving}>{saving ? "Saving..." : "Save Settings"}</button>
        </div>
      </form>
    </AdminLayout>
  );
}
