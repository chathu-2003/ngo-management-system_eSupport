import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

import { 
  FaHeart, FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP, 
  FaArrowUp, FaMapMarkerAlt, FaCalendarAlt, FaSearch, FaUser, FaBars, FaTimes,
  FaChevronLeft, FaChevronRight
} from 'react-icons/fa';

const Events = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const allEvents = [
    {
      id: 1,
      title: "Clean Water Event",
      date: "Aug 12, 2026",
      location: "Kurunegala District",
      desc: "We're installing safe wells in villages where children walk hours daily just to fetch water.",
      img: "https://images.unsplash.com/photo-1541480601022-2308c0f02487?q=80&w=500"
    },
    {
      id: 2,
      title: "Food For Hunger",
      date: "Aug 19, 2026",
      location: "Colombo City",
      desc: "A weekend of packing and delivering meal kits to families facing food insecurity.",
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500"
    },
    {
      id: 3,
      title: "Adopt a Orphan Child",
      date: "Sep 2, 2026",
      location: "Kandy",
      desc: "Our sponsorship drive connects families with children in care homes for a full year.",
      img: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=500"
    },
    {
      id: 4,
      title: "Happy Child Day Event",
      date: "Sep 14, 2026",
      location: "Galle",
      desc: "Games, art stations, and health checkups for kids in underserved neighbourhoods.",
      img: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=500"
    },
    {
      id: 5,
      title: "Big Project For Water",
      date: "Sep 27, 2026",
      location: "Anuradhapura",
      desc: "A large-scale irrigation and filtration initiative reaching six farming communities.",
      img: "https://images.unsplash.com/photo-1541847438406-c8e0d5f5f5f8?q=80&w=500"
    },
    {
      id: 6,
      title: "Winter Help Event",
      date: "Oct 5, 2026",
      location: "Nuwara Eliya",
      desc: "Warm clothing, blankets, and heaters distributed before the coldest months set in.",
      img: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=500"
    },
    {
      id: 7,
      title: "Volunteer Meetup",
      date: "Oct 18, 2026",
      location: "Kurunegala",
      desc: "New to Empower Hopes? Meet the coordinators and sign up for the next field mission.",
      img: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=500"
    },
    {
      id: 8,
      title: "Giving Hand",
      date: "Oct 31, 2026",
      location: "Matara",
      desc: "A neighbourhood donation drive for school supplies, matched to children starting term.",
      img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=500"
    },
    {
      id: 9,
      title: "Food Campaign",
      date: "Nov 9, 2026",
      location: "Jaffna",
      desc: "Monthly grocery parcels for elderly residents, delivered by our regional volunteers.",
      img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=500"
    }
  ];

  const galleryImages = [
    "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=150",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=150",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=150",
    "https://images.unsplash.com/photo-1484662021-3c7af47f043f?q=80&w=150",
    "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=150",
    "https://images.unsplash.com/photo-1482235225574-c32690364265?q=80&w=150"
  ];

  const eventsPerPage = 3;
  const totalPages = Math.ceil(allEvents.length / eventsPerPage);
  const startIndex = (currentPage - 1) * eventsPerPage;
  const currentEvents = allEvents.slice(startIndex, startIndex + eventsPerPage);

  const goToPage = (page) => {
    setCurrentPage(page);
    document.getElementById('events-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcfbf9', overflowX: 'hidden' }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

        .nav-link-custom {
          color: #2b3940;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          transition: color 0.2s ease;
        }
        .nav-link-custom:hover, .nav-link-custom.active {
          color: #e65100;
        }
        .top-social-icon {
          color: #8fa0a8;
          font-size: 13px;
          transition: color 0.2s ease;
        }
        .top-social-icon:hover {
          color: #ffffff;
        }
        .event-card {
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }
        .event-card:hover {
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          transform: translateY(-6px);
        }
        .footer-link {
          color: #a4a4a4;
          text-decoration: none;
          transition: color 0.2s;
          display: block;
          margin-bottom: 12px;
          font-size: 14px;
        }
        .footer-link:hover {
          color: #ff544a;
        }
        .page-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #132832;
          font-weight: 700;
          font-size: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .page-btn:hover {
          border-color: #e65100;
          color: #e65100;
        }
        .page-btn.active {
          background-color: #e65100;
          border-color: #e65100;
          color: #ffffff;
        }
        .page-arrow {
          border: none;
          background: transparent;
          color: #132832;
          font-size: 16px;
          cursor: pointer;
        }

        @media (max-width: 991px) {
          .hero-title {
            font-size: 36px !important;
          }
          .mobile-menu-drawer {
            display: flex !important;
          }
          .cta-banner {
            padding: 30px 20px !important;
            margin-bottom: -40px !important;
          }
        }

        @media (max-width: 576px) {
          .top-header-container {
            justify-content: center !important;
            text-align: center;
          }
          .hero-section {
            padding: 80px 0 !important;
          }
          .hero-title {
            font-size: 28px !important;
          }
        }
      `}</style>

      {/* ----------------- 1. TOP HEADER BAR ----------------- */}
      <div style={{ backgroundColor: '#132832', color: '#c5d1d7', fontSize: '13px', padding: '10px 0' }}>
        <div className="container d-flex justify-content-between align-items-center flex-wrap gap-2 top-header-container">
          <div className="d-flex align-items-center gap-3 flex-wrap justify-content-center">
            <span>
              <strong style={{ color: '#e65100' }}>HI,</strong> Good Afternoon!
            </span>
            <span className="d-none d-sm-inline" style={{ color: '#3d525d' }}>|</span>
            <span className="d-flex align-items-center gap-2">
              <FaMapMarkerAlt style={{ color: '#e65100' }} /> Shiloh, Hawaii 81063
            </span>
          </div>
          <div className="d-flex align-items-center gap-3">
            <span style={{ fontSize: '13px', color: '#8fa0a8' }}>Follow Us –</span>
            <a href="#" className="top-social-icon"><FaFacebookF /></a>
            <a href="#" className="top-social-icon"><FaTwitter /></a>
            <a href="#" className="top-social-icon"><FaPinterestP /></a>
            <a href="#" className="top-social-icon"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* ----------------- 2. MAIN NAVIGATION BAR ----------------- */}
      <nav style={{ backgroundColor: '#ffffff', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', padding: '15px 0' }} className="sticky-top">
        <div className="container d-flex justify-content-between align-items-center">
          <a href="#" className="d-flex align-items-center gap-3 text-decoration-none">
            <img src={logo} alt="Empower Hopes Logo" style={{ width: '45px', height: '45px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ffffff', boxShadow: '0 8px 22px rgba(0,0,0,0.12)' }} />
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#132832', margin: 0, lineHeight: 1.1, letterSpacing: '0.5px' }}>
                EMPOWER HOPES
              </h3>
              <p style={{ fontSize: '9px', color: '#687b84', fontWeight: '700', margin: 0, letterSpacing: '1px' }}>
                HUMANITARIAN NETWORK
              </p>
            </div>
          </a>

          <div className="d-none d-lg-flex align-items-center gap-4">
            <Link to="/" className="nav-link-custom">Home</Link>
            <a href="#" className="nav-link-custom">Causes</a>
            <Link to="/events" className="nav-link-custom active">Events</Link>
            <a href="#" className="nav-link-custom">Portfolio</a>
            <Link to="/about" className="nav-link-custom">About</Link>
            <a href="#" className="nav-link-custom">Blog</a>
          </div>

          <div className="d-flex align-items-center gap-2 gap-md-3">
            <button style={{ border: 'none', background: 'transparent', color: '#132832', fontSize: '18px', cursor: 'pointer' }} aria-label="Search">
              <FaSearch />
            </button>
            <button style={{ border: 'none', background: 'transparent', color: '#132832', fontSize: '18px', cursor: 'pointer' }} aria-label="User Profile">
              <FaUser />
            </button>
            <Link 
              to="/donate" 
              className="d-none d-sm-inline-block"
              style={{
                backgroundColor: '#e65100',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '13px',
                padding: '10px 20px',
                borderRadius: '6px',
                textDecoration: 'none',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 12px rgba(230, 81, 0, 0.25)'
              }}
            >
              DONATE NOW
            </Link>
            <button 
              className="d-lg-none"
              onClick={toggleMobileMenu}
              style={{ border: 'none', background: 'transparent', fontSize: '22px', color: '#132832', cursor: 'pointer', marginLeft: '5px' }}
              aria-label="Toggle Navigation"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="d-lg-none mobile-menu-drawer" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #eee', padding: '20px 0', marginTop: '15px' }}>
            <div className="container d-flex flex-column gap-3">
              <Link to="/" className="nav-link-custom" onClick={toggleMobileMenu}>Home</Link>
              <a href="#" className="nav-link-custom" onClick={toggleMobileMenu}>Causes</a>
              <Link to="/events" className="nav-link-custom active" onClick={toggleMobileMenu}>Events</Link>
              <a href="#" className="nav-link-custom" onClick={toggleMobileMenu}>Portfolio</a>
              <Link to="/about" className="nav-link-custom" onClick={toggleMobileMenu}>About</Link>
              <a href="#" className="nav-link-custom" onClick={toggleMobileMenu}>Blog</a>
              <Link 
                to="/donate" 
                className="d-sm-none text-center mt-2"
                style={{ backgroundColor: '#e65100', color: '#ffffff', fontWeight: '700', padding: '12px', borderRadius: '6px', textDecoration: 'none' }}
                onClick={toggleMobileMenu}
              >
                DONATE NOW
              </Link>
            </div>
          </div>
        )}
      </nav>

      {/* ----------------- 3. HERO BANNER SECTION ----------------- */}
      <section 
        className="hero-section"
        style={{ 
          backgroundImage: "linear-gradient(rgba(19, 40, 50, 0.8), rgba(19, 40, 50, 0.8)), url('https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=1920')", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          padding: '120px 0',
          color: 'white'
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <span style={{ color: '#ffb83b', fontWeight: '700', letterSpacing: '1px', textTransform: 'uppercase', fontSize: '14px' }}>
                Upcoming Events
              </span>
              <h1 className="hero-title" style={{ fontSize: '52px', fontWeight: '800', lineHeight: 1.2, margin: '20px 0' }}>
                Small Acts, Gathered Together, Change Everything
              </h1>
              <p style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '35px', maxWidth: '650px', lineHeight: '1.6' }}>
                Every event below is a doorway — clean water, a warm meal, an education, a hand held. Join Empower Hopes on the ground, wherever you are.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/donate" style={{ backgroundColor: '#e65100', color: 'white', padding: '14px 28px', borderRadius: '6px', fontWeight: '700', textDecoration: 'none' }}>
                  Donate Now
                </Link>
                <a href="#events-grid" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white', padding: '14px 28px', borderRadius: '6px', fontWeight: '700', textDecoration: 'none' }}>
                  See All Events
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 4. EVENTS GRID SECTION ----------------- */}
      <section id="events-grid" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Get Involved</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>Events Making A Difference</h2>
          <p style={{ color: '#666', maxWidth: '600px', margin: '15px auto 0', fontSize: '15px' }}>
            Children face tough challenges — hunger, malnutrition, limited access to education and medical care. Every event helps close that gap.
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            {currentEvents.map((event) => (
              <div className="col-lg-4 col-md-6" key={event.id}>
                <div className="event-card h-100 rounded-3 overflow-hidden" style={{ backgroundColor: '#fafafa' }}>
                  <img src={event.img} alt={event.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                  <div className="p-4">
                    <div className="d-flex flex-wrap gap-3 mb-3" style={{ fontSize: '12.5px', color: '#8fa0a8', fontWeight: '600' }}>
                      <span className="d-flex align-items-center gap-1">
                        <FaCalendarAlt style={{ color: '#e65100' }} /> {event.date}
                      </span>
                      <span className="d-flex align-items-center gap-1">
                        <FaMapMarkerAlt style={{ color: '#e65100' }} /> {event.location}
                      </span>
                    </div>
                    <h4 style={{ fontWeight: '700', color: '#132832', fontSize: '20px' }}>{event.title}</h4>
                    <p style={{ fontSize: '14px', color: '#777', margin: '10px 0 18px' }}>{event.desc}</p>
                    <a href="#" style={{ color: '#e65100', fontWeight: '700', fontSize: '13px', textDecoration: 'none' }}>
                      Read more →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="d-flex justify-content-center align-items-center gap-2 mt-5">
            <button 
              className="page-arrow" 
              onClick={() => goToPage(currentPage > 1 ? currentPage - 1 : totalPages)}
              aria-label="Previous page"
            >
              <FaChevronLeft />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                className={`page-btn ${currentPage === page ? 'active' : ''}`}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ))}
            <button 
              className="page-arrow" 
              onClick={() => goToPage(currentPage < totalPages ? currentPage + 1 : 1)}
              aria-label="Next page"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>

      {/* ----------------- 5. CTA BANNER SECTION ----------------- */}
      <div className="container" style={{ position: 'relative', zIndex: 10 }}>
        <section 
          className="cta-banner"
          style={{ 
            background: 'linear-gradient(135deg, #e65100 0%, #ff8f00 100%)', 
            color: '#ffffff', 
            padding: '50px 40px', 
            borderRadius: '20px',
            marginBottom: '-60px', 
            boxShadow: '0 15px 35px rgba(230, 81, 0, 0.35)'
          }}
        >
          <div className="row align-items-center text-center text-lg-start">
            <div className="col-lg-8 mb-4 mb-lg-0">
              <span style={{ fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', opacity: 0.9 }}>
                Your Donation Matters
              </span>
              <h2 style={{ fontSize: '30px', fontWeight: '800', marginTop: '6px', marginBottom: '8px' }}>
                92% Of Every Donation Reaches The Field
              </h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                No middlemen — wells, meals, schooling, and shelter for the families who need it most.
              </p>
            </div>
            <div className="col-lg-4 text-lg-end">
              <div className="d-flex gap-3 justify-content-center justify-content-lg-end flex-wrap">
                <Link 
                  to="/donate" 
                  style={{ backgroundColor: '#132832', color: '#ffffff', padding: '12px 24px', borderRadius: '8px', fontWeight: '700', textDecoration: 'none', fontSize: '13px', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' }}
                >
                  DONATE NOW
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ----------------- 6. FOOTER SECTION ----------------- */}
      <footer style={{ backgroundColor: '#141414', color: '#ffffff', paddingTop: '120px' }}>
        <div className="container mb-5">
          <div className="row g-4">
            <div className="col-lg-3 col-md-6">
              <div className="d-flex align-items-center gap-2 mb-4">
                <span style={{ fontSize: '28px', color: '#ff544a' }}><FaHeart /></span>
                <div>
                  <h3 style={{ fontSize: '20px', fontWeight: '800', margin: 0 }}>EMPOWER HOPES</h3>
                  <p style={{ fontSize: '10px', color: '#ffb83b', fontWeight: '700', margin: 0 }}>HELP THE POOR</p>
                </div>
              </div>
              <p style={{ color: '#8c8c8c', fontSize: '14px', lineHeight: '1.7' }}>
                Wimply dummy text of the priatype industry orem Ipsum has Maecenas quis eros at ante lacinia efficitur.
              </p>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>About</h4>
              <a href="#" className="footer-link">Home</a>
              <a href="#" className="footer-link">Donation</a>
              <a href="#" className="footer-link">About us</a>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Quick links</h4>
              <a href="#" className="footer-link">Causes</a>
              <a href="#" className="footer-link">About</a>
              <a href="#" className="footer-link">Stories</a>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Explore</h4>
              <a href="#" className="footer-link">Donate</a>
              <a href="#" className="footer-link">Campaigns</a>
              <a href="#" className="footer-link">Volunteers</a>
            </div>

            <div className="col-lg-3 col-md-6">
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Photo Gallery</h4>
              <div className="row g-2">
                {galleryImages.map((imgUrl, i) => (
                  <div className="col-4" key={i}>
                    <img src={imgUrl} alt="Gallery" style={{ width: '100%', height: '65px', objectFit: 'cover', borderRadius: '4px' }} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#0f0f0f', borderTop: '1px solid #1f1f1f', padding: '20px 0', position: 'relative' }}>
          <div className="container text-center">
            <p style={{ margin: 0, fontSize: '13px', color: '#8c8c8c' }}>
              Copyright 2026 All Right Reserved
            </p>
          </div>
          <button 
            onClick={scrollToTop}
            style={{ position: 'absolute', right: '20px', bottom: '15px', backgroundColor: '#e65100', color: 'white', border: 'none', padding: '10px 14px', borderRadius: '4px', cursor: 'pointer' }}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </footer>

    </div>
  );
};

export default Events;