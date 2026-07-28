import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getBlogBySlug } from "../services/api";

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    getBlogBySlug(slug)
      .then(res => setPost(res.data))
      .catch(err => setError(err.message || "Blog post not found."))
      .finally(() => setLoading(false));
  }, [slug]);

  const s = {
    page: { fontFamily: "Poppins, sans-serif", minHeight: "100vh", background: "#f9f9f9" },
    hero: { background: "#162a35", color: "#fff", padding: "80px 20px", textAlign: "center" },
    heroTitle: { fontSize: "36px", fontWeight: 700, marginBottom: "12px", maxWidth: "800px", margin: "0 auto 12px" },
    breadcrumb: { fontSize: "14px", color: "#ccc" },
    container: { maxWidth: "800px", margin: "0 auto", padding: "60px 20px" },
    img: { width: "100%", height: "360px", objectFit: "cover", borderRadius: "12px", marginBottom: "32px" },
    meta: { color: "#aaa", fontSize: "13px", marginBottom: "24px" },
    content: { color: "#444", fontSize: "16px", lineHeight: 1.8, whiteSpace: "pre-line" },
    loading: { textAlign: "center", padding: "80px", color: "#888", fontSize: "18px" },
    backBtn: { display: "inline-block", marginBottom: "28px", color: "#ff544a", fontWeight: 600, textDecoration: "none" },
  };

  if (loading) return <div style={s.page}><div style={s.loading}>Loading...</div></div>;
  if (error || !post) return (
    <div style={s.page}>
      <div style={s.container}>
        <Link to="/blog" style={s.backBtn}>← Back to Blog</Link>
        <div style={{ ...s.loading, color: "#ff544a" }}>{error || "Blog post not found."}</div>
      </div>
    </div>
  );

  return (
    <div style={s.page}>
      <div style={s.hero}>
        <h1 style={s.heroTitle}>{post.title}</h1>
        <p style={s.breadcrumb}><Link to="/" style={{ color: "#ccc", textDecoration: "none" }}>Home</Link> &rsaquo; <Link to="/blog" style={{ color: "#ccc", textDecoration: "none" }}>Blog</Link> &rsaquo; {post.title}</p>
      </div>
      <div style={s.container}>
        <Link to="/blog" style={s.backBtn}>← Back to Blog</Link>
        {post.image && <img src={`http://localhost:5000/uploads/${post.image}`} alt={post.title} style={s.img} />}
        <p style={s.meta}>{post.author} · {new Date(post.publishedAt || post.createdAt).toLocaleDateString()} · {post.views} views</p>
        <div style={s.content}>{post.content}</div>
      </div>
    </div>
  );
}
