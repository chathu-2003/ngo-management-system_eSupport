import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { 
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaMapMarkerAlt, 
  FaSearch, FaRegUser, FaChevronUp, FaEnvelope, FaPhoneAlt, 
  FaYoutube, FaCalendarAlt, FaUserEdit, FaArrowRight
} from 'react-icons/fa';

const News = () => {

  // News articles data
  const newsArticles = [
    {
      id: 1,
      title: "New Clean Water Wells Completed In 5 Villages",
      excerpt: "Thanks to generous donors, five villages now have permanent access to clean, safe drinking water for the first time.",
      src: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800",
      alt: "Newly built water well in a village",
      author: "Empower Hopes Team",
      date: "July 12, 2026",
      color: "#ff544a"
    },
    {
      id: 2,
      title: "1,200 Children Enrolled In Our Education Fund",
      excerpt: "This year our Education Fund reached a new milestone, giving over a thousand children the chance to attend school.",
      src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800",
      alt: "Children studying in a classroom",
      author: "Empower Hopes Team",
      date: "June 28, 2026",
      color: "#3cd49b"
    },
    {
      id: 3,
      title: "Volunteers Host Annual Health Camp",
      excerpt: "Over 300 volunteers came together this month to run free medical checkups for children in underserved communities.",
      src: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800",
      alt: "Doctor checking a child's health",
      author: "Empower Hopes Team",
      date: "June 15, 2026",
      color: "#ffb83b"
    },
    {
      id: 4,
      title: "Empower Hopes Partners With Local Schools",
      excerpt: "A new partnership with local schools will bring school supplies, meals, and mentorship programs to more children.",
      src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
      alt: "Smiling children at school",
      author: "Empower Hopes Team",
      date: "May 30, 2026",
      color: "#10b981"
    },
    {
      id: 5,
      title: "Donor Spotlight: How Small Gifts Add Up",
      excerpt: "We look back at how everyday donations from ordinary people came together to fund life-changing projects this year.",
      src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=800",
      alt: "Group of volunteers smiling",
      author: "Empower Hopes Team",
      date: "May 18, 2026",
      color: "#ff544a"
    },
    {
      id: 6,
      title: "Protecting Children Program Expands To New Regions",
      excerpt: "Our child protection program is now active in three additional regions, reaching hundreds more vulnerable children.",
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800",
      alt: "Group of children together",
      author: "Empower Hopes Team",
      date: "May 2, 2026",
      color: "#3cd49b"
    }
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcfbf9', position: 'relative' }}>

      {/* Google Fonts & Custom CSS Rules */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

        .news-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .news-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .news-img-wrap {
          overflow: hidden;
        }
        .news-img-wrap img {
          transition: transform 0.5s ease;
        }
        .news-card:hover .news-img-wrap img {
          transform: scale(1.08);
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
              <li className="nav-item"><Link className="nav-link active" to="/news" style={{ fontWeight: '600', color: '#e65c00' }}>News</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/blog" style={{ fontWeight: '600', color: '#333' }}>Blog</Link></li>
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
      <section style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920')", backgroundSize: 'cover', backgroundPosition: 'center', height: '320px' }} className="d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 style={{ fontSize: '44px', fontWeight: '800' }} className="mb-3">
            Latest News
          </h1>
          <div className="d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '14px', fontWeight: '600' }}>
            <Link to="/" style={{ color: '#ffb83b', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#ccc' }}>/</span>
            <span style={{ color: '#fff' }}>News</span>
          </div>
        </div>
      </section>

      {/* 5. News Grid Section */}
      <section style={{ padding: '90px 0 100px 0', backgroundColor: '#fdfbf7' }} className="text-center">
        <div className="container">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>
            Our News
          </span>

          <div className="d-inline-block mb-3 position-relative">
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
              What's Happening
            </h2>
            <div style={{ width: '60%', height: '8px', margin: '4px auto 0 auto' }}>
              <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#7e7e7e', maxWidth: '680px', margin: '15px auto 55px auto', lineHeight: '1.7' }}>
            Stay up to date with the latest stories, updates, and milestones from our work in communities around the world.
          </p>

          <div className="row g-4 text-start">
            {newsArticles.map((article) => (
              <div className="col-lg-4 col-md-6" key={article.id}>
                <div className="news-card" style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', height: '100%' }}>
                  <div className="news-img-wrap">
                    <img src={article.src} alt={article.alt} style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }} />
                  </div>
                  <div className="p-4">
                    <div className="d-flex align-items-center gap-3 mb-3" style={{ fontSize: '12.5px', color: '#999', fontWeight: '600' }}>
                      <span className="d-flex align-items-center gap-1"><FaCalendarAlt style={{ color: article.color }} /> {article.date}</span>
                      <span className="d-flex align-items-center gap-1"><FaUserEdit style={{ color: article.color }} /> {article.author}</span>
                    </div>
                    <h4 style={{ fontSize: '19px', fontWeight: '700', color: '#1c2d37', lineHeight: '1.4', marginBottom: '14px' }}>
                      {article.title}
                    </h4>
                    <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.7' }} className="mb-4">
                      {article.excerpt}
                    </p>
                    <a href="#" style={{ fontSize: '13.5px', fontWeight: '700', color: article.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                      Read More <FaArrowRight size={12} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <button style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', padding: '14px 35px', borderRadius: '5px', border: 'none' }}>
              Load More News
            </button>
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

export default News;