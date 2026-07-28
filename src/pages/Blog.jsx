import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBlogs } from "../services/api";

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getBlogs()
      .then(res => setPosts(res.data || []))
      .catch(err => setError(err.message || "Failed to load blog posts."))
      .finally(() => setLoading(false));
  }, []);

  const s = {
    page: { fontFamily: "Poppins, sans-serif", minHeight: "100vh", background: "#f9f9f9" },
    hero: { background: "#162a35", color: "#fff", padding: "80px 20px", textAlign: "center" },
    heroTitle: { fontSize: "42px", fontWeight: 700, marginBottom: "12px" },
    accent: { color: "#ff544a" },
    breadcrumb: { fontSize: "14px", color: "#ccc" },
    container: { maxWidth: "1100px", margin: "0 auto", padding: "60px 20px" },
    grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "28px" },
    card: { background: "#fff", borderRadius: "12px", boxShadow: "0 2px 16px rgba(0,0,0,0.08)", overflow: "hidden", textDecoration: "none", color: "inherit", display: "block" },
    cardImg: { width: "100%", height: "200px", objectFit: "cover", background: "#e0e0e0" },
    cardBody: { padding: "24px" },
    category: { color: "#ff544a", fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "8px", display: "block" },
    cardTitle: { fontSize: "18px", fontWeight: 700, color: "#162a35", marginBottom: "10px" },
    excerpt: { color: "#666", fontSize: "14px", lineHeight: 1.6, marginBottom: "14px" },
    meta: { fontSize: "12px", color: "#aaa" },
    loading: { textAlign: "center", padding: "80px", color: "#888", fontSize: "18px" },
    backBtn: { display: "inline-block", marginBottom: "28px", color: "#ff544a", fontWeight: 600, textDecoration: "none" },
    noData: { textAlign: "center", color: "#888", padding: "60px", fontSize: "16px" },
  };

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Our <span style={s.accent}>Blog</span></h1>
        <p style={s.breadcrumb}><Link to="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</Link> &rsaquo; Blog</p>
      </div>
      <div style={s.container}>
        <Link to="/" style={s.backBtn}>← Back to Home</Link>
        {loading && <div style={s.loading}>Loading posts...</div>}
        {error && <div style={{ ...s.loading, color: "#ff544a" }}>{error}</div>}
        {!loading && !error && posts.length === 0 && (
          <div style={s.noData}>No blog posts published yet. Check back soon!</div>
        )}
        <div style={s.grid}>
          {posts.map(post => (
            <Link key={post.id} to={`/blog/${post.slug}`} style={s.card}>
              {post.image
                ? <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} style={s.cardImg} />
                : <div style={{ ...s.cardImg, display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb", fontSize: "40px" }}><i className="bi bi-newspaper"></i></div>
              }
              <div style={s.cardBody}>
                {post.category && <span style={s.category}>{post.category}</span>}
                <h3 style={s.cardTitle}>{post.title}</h3>
                {post.excerpt && <p style={s.excerpt}>{post.excerpt}</p>}
                <p style={s.meta}>{post.author} · {new Date(post.publishedAt || post.createdAt).toLocaleDateString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
