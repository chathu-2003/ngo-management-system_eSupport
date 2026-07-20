import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { 
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaMapMarkerAlt, 
  FaSearch, FaRegUser, FaChevronUp, FaEnvelope, FaPhoneAlt, 
  FaYoutube, FaStore, FaHandHoldingHeart, FaArrowRight, FaGlobe,
  FaInstagram, FaCheckCircle
} from 'react-icons/fa';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');

  // Small business owner profiles data
  const businessOwners = [
    {
      id: 1,
      name: "Nadeesha Kumari",
      business: "Kumari Handloom Textiles",
      category: "Textiles",
      location: "Kandy, Sri Lanka",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
      alt: "Small business owner working with handloom textiles",
      story: "Started with a single loom funded by our Micro-Business Fund, Nadeesha now employs 6 women from her village weaving traditional handloom fabric.",
      funded: "$1,200",
      goal: "$1,500",
      progress: 80,
      color: "#ff544a",
      verified: true
    },
    {
      id: 2,
      name: "Ruwan Perera",
      business: "Perera Organic Farms",
      category: "Agriculture",
      location: "Kurunegala, Sri Lanka",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
      alt: "Small business owner tending to an organic farm",
      story: "With seed capital and training support, Ruwan converted his family's land into a thriving organic vegetable farm supplying three local markets.",
      funded: "$980",
      goal: "$1,000",
      progress: 98,
      color: "#3cd49b",
      verified: true
    },
    {
      id: 3,
      name: "Amara Silva",
      business: "Amara's Bakery Corner",
      category: "Food & Beverage",
      location: "Galle, Sri Lanka",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
      alt: "Small business owner in her bakery",
      story: "A small equipment grant helped Amara upgrade her home bakery into a proper storefront, now serving fresh bread to her whole neighborhood.",
      funded: "$650",
      goal: "$800",
      progress: 81,
      color: "#ffb83b",
      verified: true
    },
    {
      id: 4,
      name: "Chaminda Fernando",
      business: "Fernando Woodcraft",
      category: "Handicrafts",
      location: "Matara, Sri Lanka",
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600",
      alt: "Small business owner working on woodcraft",
      story: "Chaminda uses reclaimed wood to craft furniture and toys, now shipping to buyers across the country thanks to a small business loan.",
      funded: "$1,450",
      goal: "$1,450",
      progress: 100,
      color: "#10b981",
      verified: true
    },
    {
      id: 5,
      name: "Ishara Jayasuriya",
      business: "Ishara's Tailoring Studio",
      category: "Textiles",
      location: "Colombo, Sri Lanka",
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=600",
      alt: "Small business owner working at a tailoring studio",
      story: "A single sewing machine grew into a full tailoring studio that now trains and employs three young women from Ishara's community.",
      funded: "$720",
      goal: "$900",
      progress: 80,
      color: "#ff544a",
      verified: false
    },
    {
      id: 6,
      name: "Saman Wickramasinghe",
      business: "Wickrama Fisheries",
      category: "Agriculture",
      location: "Negombo, Sri Lanka",
      src: "https://images.unsplash.com/photo-1608333687205-19a5b8bf1b58?q=80&w=600",
      alt: "Small business owner working near fishing boats",
      story: "With support to repair his fishing boat, Saman was able to return to work and now supplies fresh catch to five local restaurants.",
      funded: "$1,100",
      goal: "$1,300",
      progress: 85,
      color: "#3cd49b",
      verified: true
    }
  ];

  const categories = ['All', 'Textiles', 'Agriculture', 'Food & Beverage', 'Handicrafts'];

  const filteredOwners = activeFilter === 'All'
    ? businessOwners
    : businessOwners.filter((o) => o.category === activeFilter);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcfbf9', position: 'relative' }}>

      {/* Google Fonts & Custom CSS Rules */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

        .custom-progress-red {
          background: repeating-linear-gradient(45deg, #ff544a, #ff544a 10px, #ff6b62 10px, #ff6b62 20px) !important;
        }
        .custom-progress-orange {
          background: repeating-linear-gradient(45deg, #ffb83b, #ffb83b 10px, #ffc455 10px, #ffc455 20px) !important;
        }
        .custom-progress-green {
          background: repeating-linear-gradient(45deg, #10b981, #10b981 10px, #14d494 10px, #14d494 20px) !important;
        }
        .custom-progress-teal {
          background: repeating-linear-gradient(45deg, #3cd49b, #3cd49b 10px, #56e0ab 10px, #56e0ab 20px) !important;
        }

        .project-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .project-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }
        .project-img-wrap {
          overflow: hidden;
          position: relative;
        }
        .project-img-wrap img {
          transition: transform 0.5s ease;
        }
        .project-card:hover .project-img-wrap img {
          transform: scale(1.08);
        }

        .filter-btn {
          border: 1.5px solid #eee;
          background-color: white;
          color: #444;
          padding: 10px 22px;
          border-radius: 30px;
          font-size: 13.5px;
          font-weight: 600;
          transition: all 0.2s ease;
          cursor: pointer;
        }
        .filter-btn:hover {
          border-color: #ff544a;
          color: #ff544a;
        }
        .filter-btn.active {
          background-color: #ff544a;
          border-color: #ff544a;
          color: white;
        }

        .owner-social-icon {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #f7f5f1;
          color: #666;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s ease, color 0.2s ease;
          font-size: 13px;
        }
        .owner-social-icon:hover {
          background-color: #ff544a;
          color: white;
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
              <li className="nav-item"><Link className="nav-link active" to="/projects" style={{ fontWeight: '600', color: '#e65c00' }}>Portfolio</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/about" style={{ fontWeight: '600', color: '#333' }}>About</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/news" style={{ fontWeight: '600', color: '#333' }}>News</Link></li>
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
      <section style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1920')", backgroundSize: 'cover', backgroundPosition: 'center', height: '320px' }} className="d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 style={{ fontSize: '44px', fontWeight: '800' }} className="mb-3">
            Our Projects
          </h1>
          <div className="d-flex align-items-center justify-content-center gap-2" style={{ fontSize: '14px', fontWeight: '600' }}>
            <Link to="/" style={{ color: '#ffb83b', textDecoration: 'none' }}>Home</Link>
            <span style={{ color: '#ccc' }}>/</span>
            <span style={{ color: '#fff' }}>Projects</span>
          </div>
        </div>
      </section>

      {/* 5. Small Business Owner Profiles Section */}
      <section style={{ padding: '90px 0 100px 0', backgroundColor: '#fdfbf7' }} className="text-center">
        <div className="container">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>
            Small Business Fund
          </span>

          <div className="d-inline-block mb-3 position-relative">
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
              Meet The Business Owners
            </h2>
            <div style={{ width: '60%', height: '8px', margin: '4px auto 0 auto' }}>
              <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#7e7e7e', maxWidth: '680px', margin: '15px auto 45px auto', lineHeight: '1.7' }}>
            Every small business here was launched or grown with support from donors like you. Browse the profiles below and see the real people behind each project.
          </p>

          {/* Filter Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2 mb-5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`filter-btn ${activeFilter === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Agriculture Category Banner Image (shown only when Agriculture filter is active) */}
          {activeFilter === 'Agriculture' && (
            <div className="text-start mb-5" style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.1)' }}>
              <img
                src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600"
                alt="Small-scale agriculture business owners working in the field"
                style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(90deg, rgba(60,212,155,0.85), rgba(60,212,155,0.15))' }}></div>
              <div style={{ position: 'absolute', left: '30px', top: '50%', transform: 'translateY(-50%)', color: 'white', maxWidth: '420px' }}>
                <span style={{ fontSize: '12px', fontWeight: '700', backgroundColor: 'rgba(255,255,255,0.2)', padding: '5px 14px', borderRadius: '20px', display: 'inline-block', marginBottom: '12px' }}>
                  AGRICULTURE
                </span>
                <h3 style={{ fontSize: '26px', fontWeight: '800', margin: 0, lineHeight: '1.3' }}>
                  Growing Farms, Growing Futures
                </h3>
                <p style={{ fontSize: '13.5px', marginTop: '10px', marginBottom: 0, opacity: 0.95 }}>
                  Supporting small farmers and fisheries with seed capital, tools, and training.
                </p>
              </div>
            </div>
          )}

          {/* Business Owner Profile Cards */}
          <div className="row g-4 text-start">
            {filteredOwners.map((owner) => (
              <div className="col-xl-4 col-md-6" key={owner.id}>
                <div className="project-card" style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', height: '100%' }}>
                  
                  <div className="project-img-wrap">
                    <img src={owner.src} alt={owner.alt} style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }} />
                    <span style={{ position: 'absolute', left: '16px', top: '16px', backgroundColor: owner.color, color: 'white', fontSize: '11.5px', fontWeight: '700', padding: '6px 14px', borderRadius: '4px' }}>
                      <FaStore style={{ marginRight: '6px' }} />{owner.category}
                    </span>
                  </div>

                  <div className="p-4">
                    <div className="d-flex align-items-center justify-content-between mb-2">
                      <h4 style={{ fontSize: '19px', fontWeight: '700', color: '#1c2d37', margin: 0 }}>
                        {owner.name}
                        {owner.verified && <FaCheckCircle style={{ color: '#3cd49b', fontSize: '14px', marginLeft: '8px' }} title="Verified Owner" />}
                      </h4>
                    </div>
                    <p style={{ fontSize: '13.5px', fontWeight: '600', color: owner.color, marginBottom: '4px' }}>
                      {owner.business}
                    </p>
                    <p style={{ fontSize: '12.5px', color: '#999', marginBottom: '16px' }} className="d-flex align-items-center gap-1">
                      <FaMapMarkerAlt style={{ color: owner.color }} /> {owner.location}
                    </p>

                    <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.7' }} className="mb-4">
                      {owner.story}
                    </p>

                    <div className="d-flex justify-content-between" style={{ fontSize: '13px', fontWeight: '600', color: '#444' }}>
                      <span>Funded : {owner.funded}</span>
                      <span>Goal : {owner.goal}</span>
                    </div>
                    <div style={{ height: '7px', backgroundColor: '#eeeeee', borderRadius: '10px', marginTop: '10px', marginBottom: '20px' }}>
                      <div
                        className={
                          owner.color === '#ff544a' ? 'custom-progress-red' :
                          owner.color === '#ffb83b' ? 'custom-progress-orange' :
                          owner.color === '#3cd49b' ? 'custom-progress-teal' :
                          'custom-progress-green'
                        }
                        style={{ width: `${owner.progress}%`, height: '100%', borderRadius: '10px' }}
                      ></div>
                    </div>

                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex gap-2">
                        <a href="#" className="owner-social-icon"><FaGlobe /></a>
                        <a href="#" className="owner-social-icon"><FaInstagram /></a>
                        <a href="#" className="owner-social-icon"><FaFacebookF /></a>
                      </div>
                      <a href="#" style={{ fontSize: '13px', fontWeight: '700', color: owner.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        View Profile <FaArrowRight size={11} />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <Link to="/donate" style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', padding: '14px 35px', borderRadius: '5px', border: 'none', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <FaHandHoldingHeart /> Support A Small Business
            </Link>
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
                <Link to="/projects" className="footer-link">Projects</Link>
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

export default Projects;