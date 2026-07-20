import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { 
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaMapMarkerAlt, 
  FaSearch, FaRegUser, FaChevronUp, FaEnvelope, FaPhoneAlt, 
  FaYoutube, FaCalendarAlt, FaUserEdit, FaArrowRight, FaCommentDots, FaTags
} from 'react-icons/fa';

const Blog = () => {

  // Blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "5 Simple Ways You Can Help Children In Need Today",
      excerpt: "You don't need to be wealthy to make a difference. Here are five simple, everyday actions that create real change for children.",
      src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
      alt: "Smiling children playing together",
      author: "Sarah Mitchell",
      date: "July 15, 2026",
      category: "Volunteering",
      comments: 12,
      color: "#ff544a"
    },
    {
      id: 2,
      title: "Why Clean Water Access Changes Everything",
      excerpt: "Clean water isn't just a convenience — it's the foundation for health, education, and a fair chance at a better life.",
      src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800",
      alt: "Well providing clean water to a village",
      author: "James Cooper",
      date: "July 8, 2026",
      category: "Clean Water",
      comments: 8,
      color: "#3cd49b"
    },
    {
      id: 3,
      title: "Behind The Scenes: A Day At Our Health Camp",
      excerpt: "Take a look at what really happens during one of our community health camps, from setup to the final checkup of the day.",
      src: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800",
      alt: "Doctor checking a child's health",
      author: "Dr. Alina Perera",
      date: "June 27, 2026",
      category: "Health",
      comments: 5,
      color: "#ffb83b"
    },
    {
      id: 4,
      title: "How Education Breaks The Cycle Of Poverty",
      excerpt: "A closer look at how access to schooling changes the long-term outlook for children and entire communities.",
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
      alt: "Children studying in a classroom",
      author: "Sarah Mitchell",
      date: "June 19, 2026",
      category: "Education",
      comments: 15,
      color: "#10b981"
    },
    {
      id: 5,
      title: "Volunteer Stories: What Kept Me Coming Back",
      excerpt: "Long-time volunteer Marcus shares why he keeps returning year after year to help with our community programs.",
      src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
      alt: "Group of volunteers smiling",
      author: "Marcus Reed",
      date: "June 10, 2026",
      category: "Volunteering",
      comments: 9,
      color: "#ff544a"
    },
    {
      id: 6,
      title: "The True Cost Of A Small Donation",
      excerpt: "Ever wondered exactly where your donation goes? We break down the real, measurable impact of every dollar given.",
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800",
      alt: "Group of children together",
      author: "James Cooper",
      date: "May 29, 2026",
      category: "Donations",
      comments: 21,
      color: "#3cd49b"
    }
  ];

  const categories = [
    { name: "Volunteering", count: 8 },
    { name: "Clean Water", count: 5 },
    { name: "Health", count: 6 },
    { name: "Education", count: 9 },
    { name: "Donations", count: 4 }
  ];

  const recentPosts = blogPosts.slice(0, 3);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcfbf9', position: 'relative' }}>

      {/* Google Fonts & Custom CSS Rules */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

        .blog-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .blog-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .blog-img-wrap {
          overflow: hidden;
          position: relative;
        }
        .blog-img-wrap img {
          transition: transform 0.5s ease;
        }
        .blog-card:hover .blog-img-wrap img {
          transform: scale(1.08);
        }

        .sidebar-cat-link {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 16px;
          border-radius: 6px;
          color: #444;
          text-decoration: none;
          font-size: 14px;
          font-weight: 600;
          background-color: #f7f5f1;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .sidebar-cat-link:hover {
          background-color: #ff544a;
          color: white;
        }

        .recent-post-link {
          text-decoration: none;
          color: inherit;
          display: flex;
          gap: 14px;
          align-items: center;
        }
        .recent-post-link:hover h6 {
          color: #ff544a;
        }

        .footer-link {
          color: #b7b7b7;
          text-decoration: none;
          transition: color 0.2s ease, padding-left 0.2s ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: #ff544a;
          padding-left: 4px;
        }
        .footer-social-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgba(255,255,255,0.06);
          color: #d0d0d0;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease, color 0.2s ease;
        }
        .footer-social-icon:hover {
          background-color: #ff544a;
          color: white;
        }
      `}</style>

      {/* 1. Envato Market Top Bar */}
      <div style={{ backgroundColor: '#262626', fontSize: '13px' }} className="py-2 px-4 d-flex justify-content-between align-items-center text-white">
        <div className="fw-bold">
          envato<span style={{ color: '#82b440' }}>market</span>
        </div>
        <button style={{ backgroundColor: '#82b440', color: 'white', border: 'none', padding: '3px 12px', borderRadius: '4px', fontWeight: '600', fontSize: '12px' }}>
          Buy now
        </button>
      </div>

      {/* 2. Mini Info Header Bar */}
      <div style={{ backgroundColor: '#162a35', color: '#c5c5c5', fontSize: '13px' }} className="py-2 px-4 d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <span>
            <span style={{ color: '#e65c00', fontWeight: 'bold' }}>HI</span>, Good Afternoon!
          </span>
          <span className="text-secondary">|</span>
          <span className="d-flex align-items-center gap-1">
            <FaMapMarkerAlt className="text-danger" /> Shiloh, Hawaii 81063
          </span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span>Follow Us -</span>
          <div className="d-flex gap-3">
            <a href="#" style={{ color: '#8c8c8c' }}><FaFacebookF /></a>
            <a href="#" style={{ color: '#8c8c8c' }}><FaTwitter /></a>
            <a href="#" style={{ color: '#8c8c8c' }}><FaPinterestP /></a>
            <a href="#" style={{ color: '#8c8c8c' }}><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* 3. Sticky Main Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light py-3" style={{ position: 'sticky', top: 0, zIndex: 1050, backgroundColor: 'rgba(255, 255, 255, 0.95)', backdropFilter: 'blur(10px)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)' }}>
        <div className="container-fluid px-4">
          <Link className="navbar-brand d-flex align-items-center gap-2" to="/">
            <img src={logo} alt="Empower Hopes Logo" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#162a35', margin: 0, letterSpacing: '0.5px' }}>EMPOWER HOPES</h4>
              <p style={{ fontSize: '10px', color: '#555', fontWeight: '600', margin: 0, letterSpacing: '1px' }}>HUMANITARIAN NETWORK</p>
            </div>
          </Link>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav align-items-center gap-2">
              <li className="nav-item"><Link className="nav-link" to="/" style={{ fontWeight: '600', color: '#333' }}>Home</Link></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Causes</a></li>
              <li className="nav-item"><Link className="nav-link" to="/events" style={{ fontWeight: '600', color: '#333' }}>Events</Link></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Portfolio</a></li>
              <li className="nav-item"><Link className="nav-link" to="/about" style={{ fontWeight: '600', color: '#333' }}>About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/news" style={{ fontWeight: '600', color: '#333' }}>News</Link></li>
              <li className="nav-item"><Link className="nav-link active" to="/blog" style={{ fontWeight: '600', color: '#e65c00' }}>Blog</Link></li>
            </ul>
            <div className="d-flex align-items-center ms-lg-4">
              <button style={{ background: 'none', border: 'none', color: '#333', fontSize: '18px' }} className="px-2"><FaSearch /></button>
              <button style={{ background: 'none', border: 'none', color: '#333', fontSize: '18px' }} className="px-2 me-3"><FaRegUser /></button>
              <Link to="/donate" style={{ backgroundColor: '#d9531e', color: 'white', fontWeight: '700', fontSize: '14px', padding: '10px 24px', borderRadius: '5px', border: 'none', textDecoration: 'none', display: 'inline-block' }}>
                DONATE NOW
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. Page Hero Banner */}
      <section style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920')", backgroundSize: 'cover', backgroundPosition: 'center', height: '320px' }} className="d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 style={{ fontSize: '44px', fontWeight: '800' }} className="mb-3">
            Our Blog
          </h1>
          <div className="d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '14px', fontWeight: '600' }}>
            <Link to="/" style={{ color: '#ffb83b', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#ccc' }}>/</span>
            <span style={{ color: '#fff' }}>Blog</span>
          </div>
        </div>
      </section>

      {/* 5. Blog Grid + Sidebar Section */}
      <section style={{ padding: '90px 0 100px 0', backgroundColor: '#fdfbf7' }}>
        <div className="container">
          <div className="text-center">
            <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>
              Our Blog
            </span>
            <div className="d-inline-block mb-3 position-relative">
              <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
                Stories & Insights
              </h2>
              <div style={{ width: '60%', height: '8px', margin: '4px auto 0 auto' }}>
                <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                  <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </div>
            </div>
            <p style={{ fontSize: '15px', color: '#7e7e7e', maxWidth: '680px', margin: '15px auto 55px auto', lineHeight: '1.7' }}>
              Thoughts, stories, and lessons from the field — written by our team and the volunteers who make our work possible.
            </p>
          </div>

          <div className="row g-5">

            {/* Blog Posts Grid */}
            <div className="col-lg-8">
              <div className="row g-4 text-start">
                {blogPosts.map((post) => (
                  <div className="col-md-6" key={post.id}>
                    <div className="blog-card" style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', height: '100%' }}>
                      <div className="blog-img-wrap">
                        <img src={post.src} alt={post.alt} style={{ width: '100%', height: '210px', objectFit: 'cover', display: 'block' }} />
                        <span style={{ position: 'absolute', left: '16px', top: '16px', backgroundColor: post.color, color: 'white', fontSize: '11.5px', fontWeight: '700', padding: '6px 14px', borderRadius: '4px' }}>
                          {post.category}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="d-flex align-items-center flex-wrap gap-3 mb-3" style={{ fontSize: '12px', color: '#999', fontWeight: '600' }}>
                          <span className="d-flex align-items-center gap-1"><FaCalendarAlt style={{ color: post.color }} /> {post.date}</span>
                          <span className="d-flex align-items-center gap-1"><FaUserEdit style={{ color: post.color }} /> {post.author}</span>
                          <span className="d-flex align-items-center gap-1"><FaCommentDots style={{ color: post.color }} /> {post.comments}</span>
                        </div>
                        <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1c2d37', lineHeight: '1.4', marginBottom: '12px' }}>
                          {post.title}
                        </h4>
                        <p style={{ fontSize: '13.5px', color: '#777', lineHeight: '1.7' }} className="mb-4">
                          {post.excerpt}
                        </p>
                        <a href="#" style={{ fontSize: '13px', fontWeight: '700', color: post.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                          Read More <FaArrowRight size={11} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-5 text-center text-lg-start">
                <button style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', padding: '14px 35px', borderRadius: '5px', border: 'none' }}>
                  Load More Posts
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div className="col-lg-4 text-start">

              {/* Search Box */}
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '26px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#1c2d37', marginBottom: '18px' }}>Search</h4>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search articles..."
                    style={{ width: '100%', padding: '12px 44px 12px 16px', borderRadius: '6px', border: '1px solid #eee', fontSize: '13.5px', outline: 'none' }}
                  />
                  <FaSearch style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', color: '#ff544a' }} />
                </div>
              </div>

              {/* Categories */}
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '26px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#1c2d37', marginBottom: '18px' }} className="d-flex align-items-center gap-2">
                  <FaTags style={{ color: '#ff544a' }} /> Categories
                </h4>
                <div className="d-flex flex-column gap-2">
                  {categories.map((cat) => (
                    <a href="#" className="sidebar-cat-link" key={cat.name}>
                      <span>{cat.name}</span>
                      <span>({cat.count})</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* Recent Posts */}
              <div style={{ backgroundColor: 'white', borderRadius: '10px', padding: '26px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', marginBottom: '30px' }}>
                <h4 style={{ fontSize: '17px', fontWeight: '700', color: '#1c2d37', marginBottom: '20px' }}>Recent Posts</h4>
                <div className="d-flex flex-column gap-3">
                  {recentPosts.map((post) => (
                    <a href="#" className="recent-post-link" key={post.id}>
                      <img src={post.src} alt={post.alt} style={{ width: '65px', height: '65px', borderRadius: '8px', objectFit: 'cover', flexShrink: 0 }} />
                      <div>
                        <h6 style={{ fontSize: '13.5px', fontWeight: '700', color: '#1c2d37', margin: 0, lineHeight: '1.4', transition: 'color 0.2s ease' }}>
                          {post.title}
                        </h6>
                        <span style={{ fontSize: '11.5px', color: '#999' }}>{post.date}</span>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Newsletter Box */}
              <div style={{ backgroundColor: '#1a1a1a', borderRadius: '10px', padding: '30px', textAlign: 'center' }}>
                <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'white', marginBottom: '10px' }}>Newsletter</h4>
                <p style={{ fontSize: '13px', color: '#ccc', lineHeight: '1.7', marginBottom: '18px' }}>
                  Subscribe to get our latest stories delivered to your inbox.
                </p>
                <input
                  type="email"
                  placeholder="Your email address"
                  style={{ width: '100%', padding: '12px 16px', borderRadius: '6px', border: 'none', fontSize: '13px', outline: 'none', marginBottom: '12px' }}
                />
                <button style={{ width: '100%', backgroundColor: '#ff544a', color: 'white', fontWeight: '700', fontSize: '13px', padding: '12px', borderRadius: '6px', border: 'none' }}>
                  SUBSCRIBE
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#0f0f0f', color: '#b7b7b7', paddingTop: '70px' }}>
        <div className="container">
          <div className="row g-5 pb-5">

            {/* About column */}
            <div className="col-lg-3 col-md-6">
              <div className="d-flex align-items-center gap-2 mb-3">
                <img src={logo} alt="Empower Hopes Logo" style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} />
                <h4 style={{ fontSize: '16px', fontWeight: '800', color: 'white', margin: 0 }}>EMPOWER HOPES</h4>
              </div>
              <p style={{ fontSize: '13.5px', lineHeight: '1.8', color: '#9a9a9a' }}>
                We are a non-profit humanitarian network working with communities to bring clean water, education and hope to children who need it the most.
              </p>
              <div className="d-flex gap-2 mt-3">
                <a href="#" className="footer-social-icon"><FaFacebookF size={13} /></a>
                <a href="#" className="footer-social-icon"><FaTwitter size={13} /></a>
                <a href="#" className="footer-social-icon"><FaPinterestP size={13} /></a>
                <a href="#" className="footer-social-icon"><FaYoutube size={13} /></a>
              </div>
            </div>

            {/* Quick Links column */}
            <div className="col-lg-3 col-md-6">
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'white', marginBottom: '22px' }}>Quick Links</h4>
              <div className="d-flex flex-column gap-3">
                <Link to="/" className="footer-link">Home</Link>
                <Link to="/about" className="footer-link">About Us</Link>
                <Link to="/events" className="footer-link">Events</Link>
                <Link to="/news" className="footer-link">News</Link>
                <Link to="/donate" className="footer-link">Donate</Link>
              </div>
            </div>

            {/* Causes column */}
            <div className="col-lg-3 col-md-6">
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'white', marginBottom: '22px' }}>Our Causes</h4>
              <div className="d-flex flex-column gap-3">
                <a href="#" className="footer-link">Water For All Children</a>
                <a href="#" className="footer-link">Protecting Children</a>
                <a href="#" className="footer-link">The Rights of Children</a>
                <a href="#" className="footer-link">Education Fund</a>
              </div>
            </div>

            {/* Contact column */}
            <div className="col-lg-3 col-md-6">
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: 'white', marginBottom: '22px' }}>Get In Touch</h4>
              <div className="d-flex flex-column gap-3">
                <div className="d-flex align-items-start gap-2">
                  <FaMapMarkerAlt style={{ marginTop: '3px', color: '#ff544a', flexShrink: 0 }} />
                  <span style={{ fontSize: '13.5px' }}>Shiloh, Hawaii 81063</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaPhoneAlt style={{ color: '#ff544a', flexShrink: 0 }} />
                  <span style={{ fontSize: '13.5px' }}>+1 (555) 234-5678</span>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <FaEnvelope style={{ color: '#ff544a', flexShrink: 0 }} />
                  <span style={{ fontSize: '13.5px' }}>hello@empowerhopes.org</span>
                </div>
              </div>
            </div>

          </div>

          {/* Bottom bar */}
          <div style={{ borderTop: '1px solid #262626', padding: '22px 0' }} className="d-flex flex-wrap justify-content-between align-items-center">
            <p style={{ fontSize: '13px', margin: 0, color: '#8a8a8a' }}>
              © {new Date().getFullYear()} Empower Hopes. All Rights Reserved.
            </p>
            <div className="d-flex gap-4">
              <a href="#" className="footer-link" style={{ fontSize: '13px' }}>Privacy Policy</a>
              <a href="#" className="footer-link" style={{ fontSize: '13px' }}>Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Back To Top Arrow Button */}
      <button 
        style={{ position: 'fixed', right: '30px', bottom: '25px', backgroundColor: '#ff544a', color: 'white', width: '45px', height: '45px', border: 'none', borderRadius: '4px', zIndex: 2000 }}
        className="d-flex align-items-center justify-content-center"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <FaChevronUp />
      </button>

    </div>
  );
};

export default Blog;