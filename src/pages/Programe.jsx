import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

import {
  FaHeart, FaFacebookF, FaTwitter, FaLinkedinIn, FaPinterestP,
  FaSearch, FaUser, FaMinus, FaPlus, FaArrowUp, FaMapMarkerAlt,
  FaBars, FaTimes, FaHandsHelping, FaUsers, FaHandHoldingHeart,
  FaSeedling, FaLeaf, FaPaw, FaBrain, FaBalanceScale, FaShieldAlt,
  FaBullhorn, FaUserGraduate, FaDonate, FaChild, FaBuilding
} from 'react-icons/fa';

const Programs = () => {
  // Programme Accordion State
  const [openProgram, setOpenProgram] = useState(0);
  // Mobile Nav Toggle State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleProgram = (index) => {
    setOpenProgram(openProgram === index ? null : index);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ====== Programmes data (based on the Articles) ======
  const programs = [
    {
      id: 1,
      title: "Humanitarian Assistance",
      icon: <FaHandsHelping />,
      color: '#e65100',
      overview: "Providing timely, dignified support to individuals and families facing crisis, hardship, or displacement.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 2,
      title: "Poverty Reduction",
      icon: <FaHandHoldingHeart />,
      color: '#ff544a',
      overview: "Working with communities to address the root causes of poverty through sustainable, long-term solutions.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 3,
      title: "Women's Empowerment",
      icon: <FaUsers />,
      color: '#ffb83b',
      overview: "Building opportunities for women to gain independence, confidence, and a stronger voice in their communities.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 4,
      title: "Entrepreneurship Development",
      icon: <FaSeedling />,
      color: '#3cd49b',
      overview: "Supporting aspiring and existing entrepreneurs with the skills, mentorship, and resources to grow sustainable livelihoods.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 5,
      title: "Community Development",
      icon: <FaBuilding />,
      color: '#2575fc',
      overview: "Strengthening communities from within, through participatory projects that build resilience and self-reliance.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 6,
      title: "Environmental Sustainability",
      icon: <FaLeaf />,
      color: '#3cd49b',
      overview: "Protecting natural resources and promoting environmentally responsible practices for future generations.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 7,
      title: "Animal Welfare",
      icon: <FaPaw />,
      color: '#e65100',
      overview: "Advocating for the humane treatment and protection of animals within the communities we serve.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 8,
      title: "Mental Health & Wellbeing",
      icon: <FaBrain />,
      color: '#ffb83b',
      overview: "Raising awareness and providing accessible support for mental health and emotional wellbeing.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 9,
      title: "Diversity, Equity & Inclusion",
      icon: <FaBalanceScale />,
      color: '#2575fc',
      overview: "Championing equal opportunity and inclusive participation for people of all backgrounds and abilities.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 10,
      title: "Disaster Preparedness & Response",
      icon: <FaShieldAlt />,
      color: '#ff544a',
      overview: "Equipping communities to prepare for, withstand, and recover from natural and humanitarian disasters.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 11,
      title: "Advocacy",
      icon: <FaBullhorn />,
      color: '#e65100',
      overview: "Giving voice to the communities we serve and advocating for policies that advance humanitarian goals.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 12,
      title: "Volunteer Development",
      icon: <FaUserGraduate />,
      color: '#3cd49b',
      overview: "Training and nurturing a network of skilled, passionate volunteers who power our programmes.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    },
    {
      id: 13,
      title: "Fundraising & Awareness",
      icon: <FaDonate />,
      color: '#ffb83b',
      overview: "Mobilising resources and public awareness to sustain and expand our humanitarian programmes.",
      objectives: "Content coming soon.",
      current: "Content coming soon.",
      future: "Content coming soon.",
      support: "Content coming soon."
    }
  ];
  // ====== END ======

  // ====== Impact / Statistics data (pending Facebook history extraction) ======
  const impactStats = [
    { id: 1, number: "XX", label: "Active Members" },
    { id: 2, number: "XX", label: "Volunteers" },
    { id: 3, number: "XX", label: "Projects Completed" },
    { id: 4, number: "XX", label: "Ongoing Projects" },
    { id: 5, number: "XX", label: "Beneficiaries" },
    { id: 6, number: "XX", label: "Districts Reached" },
    { id: 7, number: "XX", label: "Partner Organizations" },
    { id: 8, number: "$XX", label: "Funds Raised" }
  ];
  // ====== END ======

  // ====== Get Involved data ======
  const getInvolvedOptions = [
    {
      id: 1,
      title: "Volunteer",
      icon: <FaHandsHelping />,
      color: '#e65100',
      desc: "Join a passionate network of volunteers making meaningful change through community service, humanitarian response, fundraising, professional expertise, and advocacy. Choose the way you want to get involved.",
      cta: "Choose Your Way To Help"
    },
    {
      id: 2,
      title: "Become a Member",
      icon: <FaChild />,
      color: '#3cd49b',
      desc: "Become part of Empower Hopes and contribute your skills, experience, and passion toward building stronger and more resilient communities.",
      cta: "Join As A Member"
    },
    {
      id: 3,
      title: "Partner With Us",
      icon: <FaBuilding />,
      color: '#2575fc',
      desc: "We welcome partnerships with NGOs, businesses, educational institutions, government agencies, community groups, and international organizations to maximize our collective impact.",
      cta: "Start A Partnership"
    }
  ];
  // ====== END ======

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

        /* Programme accordion card hover */
        .program-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .program-card:hover {
          box-shadow: 0 12px 26px rgba(0,0,0,0.07);
        }

        /* Impact stat card hover */
        .impact-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .impact-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 26px rgba(0,0,0,0.08);
        }

        /* Get Involved card hover */
        .involved-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid #f0f0f0;
        }
        .involved-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        /* --- RESPONSIVE MEDIA QUERIES --- */
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
          .cta-banner h2 {
            font-size: 24px !important;
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

          {/* Logo */}
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

          {/* Desktop Navigation Links */}
          <div className="d-none d-lg-flex align-items-center gap-4">
            <Link to="/" className="nav-link-custom">Home</Link>
            <Link to="/programs" className="nav-link-custom active">Programes</Link>
            <a href="#" className="nav-link-custom">Events</a>
            <a href="#" className="nav-link-custom">Portfolio</a>
            <Link to="/about" className="nav-link-custom">About</Link>
            <a href="#" className="nav-link-custom">Blog</a>
          </div>

          {/* Header Action Buttons & Hamburger */}
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
                boxShadow: '0 4px 12px rgba(230, 81, 0, 0.25)',
                transition: 'background-color 0.2s'
              }}
            >
              DONATE NOW
            </Link>

            {/* Mobile Hamburger Toggle */}
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

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="d-lg-none mobile-menu-drawer" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #eee', padding: '20px 0', marginTop: '15px' }}>
            <div className="container d-flex flex-column gap-3">
              <Link to="/" className="nav-link-custom" onClick={toggleMobileMenu}>Home</Link>
              <Link to="/programs" className="nav-link-custom active" onClick={toggleMobileMenu}>Programes</Link>
              <a href="#" className="nav-link-custom" onClick={toggleMobileMenu}>Events</a>
              <a href="#" className="nav-link-custom" onClick={toggleMobileMenu}>Portfolio</a>
              <Link to="/about" className="nav-link-custom" onClick={toggleMobileMenu}>About</Link>
              <a href="#" className="nav-link-custom" onClick={toggleMobileMenu}>Blog</a>
              <Link
                to="/donate"
                className="d-sm-none text-center mt-2"
                style={{
                  backgroundColor: '#e65100',
                  color: '#ffffff',
                  fontWeight: '700',
                  padding: '12px',
                  borderRadius: '6px',
                  textDecoration: 'none'
                }}
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
          backgroundImage: "linear-gradient(rgba(19, 40, 50, 0.8), rgba(19, 40, 50, 0.8)), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1920')",
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
                What We Do
              </span>
              <h1 className="hero-title" style={{ fontSize: '52px', fontWeight: '800', lineHeight: 1.2, margin: '20px 0' }}>
                Our Programmes For A Better Tomorrow
              </h1>
              <p style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '35px', maxWidth: '650px', lineHeight: '1.6' }}>
                Thirteen programmes built on our founding Articles, each one working toward stronger, more resilient, and more hopeful communities.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/donate" style={{ backgroundColor: '#e65100', color: 'white', padding: '14px 28px', borderRadius: '6px', fontWeight: '700', textDecoration: 'none' }}>
                  Donate Now
                </Link>
                <a href="#get-involved" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white', padding: '14px 28px', borderRadius: '6px', fontWeight: '700', textDecoration: 'none' }}>
                  Get Involved
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 4. PROGRAMMES ACCORDION SECTION ----------------- */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Our Programmes</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>What We Do</h2>
          <p style={{ color: '#666', maxWidth: '650px', margin: '15px auto 0', fontSize: '15px' }}>
            Current programmes based on the Articles. Select any programme below to view its overview, objectives, current and future projects, and how you can support it.
          </p>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-9">
              {programs.map((program, i) => (
                <div key={program.id} className="program-card mb-3" style={{ background: 'white', borderRadius: '10px', border: '1px solid #eee', overflow: 'hidden' }}>
                  <button
                    onClick={() => toggleProgram(i)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span className="d-flex align-items-center gap-3">
                      <span style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '50%',
                        backgroundColor: `${program.color}1a`,
                        color: program.color,
                        fontSize: '18px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0
                      }}>
                        {program.icon}
                      </span>
                      <span style={{ fontWeight: '700', color: '#132832', fontSize: '16px' }}>{program.title}</span>
                    </span>
                    <span style={{ color: '#e65100', marginLeft: '10px', flexShrink: 0 }}>
                      {openProgram === i ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>

                  {openProgram === i && (
                    <div style={{ padding: '0 24px 26px' }}>
                      <div style={{ borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>

                        <div className="mb-3">
                          <h5 style={{ fontSize: '13px', fontWeight: '700', color: program.color, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Overview</h5>
                          <p style={{ fontSize: '14px', color: '#555', lineHeight: '1.7', margin: 0 }}>{program.overview}</p>
                        </div>

                        <div className="row g-3">
                          <div className="col-md-6">
                            <div className="p-3 h-100" style={{ backgroundColor: '#fafafa', borderRadius: '8px' }}>
                              <h6 style={{ fontSize: '13px', fontWeight: '700', color: '#132832', marginBottom: '6px' }}>Objectives</h6>
                              <p style={{ fontSize: '13px', color: '#999', fontStyle: 'italic', margin: 0 }}>{program.objectives}</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="p-3 h-100" style={{ backgroundColor: '#fafafa', borderRadius: '8px' }}>
                              <h6 style={{ fontSize: '13px', fontWeight: '700', color: '#132832', marginBottom: '6px' }}>Current Projects</h6>
                              <p style={{ fontSize: '13px', color: '#999', fontStyle: 'italic', margin: 0 }}>{program.current}</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="p-3 h-100" style={{ backgroundColor: '#fafafa', borderRadius: '8px' }}>
                              <h6 style={{ fontSize: '13px', fontWeight: '700', color: '#132832', marginBottom: '6px' }}>Future Projects</h6>
                              <p style={{ fontSize: '13px', color: '#999', fontStyle: 'italic', margin: 0 }}>{program.future}</p>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <div className="p-3 h-100" style={{ backgroundColor: '#fff7ed', borderRadius: '8px', borderLeft: `3px solid ${program.color}` }}>
                              <h6 style={{ fontSize: '13px', fontWeight: '700', color: '#132832', marginBottom: '6px' }}>How People Can Support</h6>
                              <p style={{ fontSize: '13px', color: '#999', fontStyle: 'italic', margin: 0 }}>{program.support}</p>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 5. IMPACT / STATISTICS SECTION ----------------- */}
      <section style={{ padding: '80px 0', backgroundColor: '#fcfaf5' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Our Impact</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>Impact & Statistics</h2>
          <p style={{ color: '#666', maxWidth: '650px', margin: '15px auto 0', fontSize: '15px' }}>
            Figures below are placeholders pending confirmation from our records. Final numbers will be updated soon.
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            {impactStats.map((stat) => (
              <div className="col-lg-3 col-md-4 col-6" key={stat.id}>
                <div className="impact-card text-center p-4 h-100" style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px dashed #e2e8f0' }}>
                  <h3 style={{ fontSize: '30px', fontWeight: '800', color: '#e65100', margin: 0 }}>{stat.number}</h3>
                  <p style={{ margin: '8px 0 0', fontWeight: '600', color: '#132832', fontSize: '13px' }}>{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 6. GET INVOLVED SECTION ----------------- */}
      <section id="get-involved" style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Join Us</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>Get Involved</h2>
          <p style={{ color: '#666', maxWidth: '650px', margin: '15px auto 0', fontSize: '15px' }}>
            There is a place for every citizen to contribute, whichever way is within their means. Pick how you would like to help, and see exactly which project your contribution supports.
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            {getInvolvedOptions.map((option) => (
              <div className="col-lg-4 col-md-6" key={option.id}>
                <div className="involved-card p-4 rounded-3 text-center h-100" style={{ backgroundColor: '#fafafa' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: `${option.color}1a`, color: option.color, fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    {option.icon}
                  </div>
                  <h4 style={{ fontWeight: '700', color: '#132832', fontSize: '20px' }}>{option.title}</h4>
                  <p style={{ fontSize: '14px', color: '#777', marginTop: '10px', marginBottom: '20px' }}>{option.desc}</p>
                  <a href="#" style={{ backgroundColor: option.color, color: 'white', padding: '12px 24px', borderRadius: '6px', fontWeight: '700', textDecoration: 'none', display: 'inline-block', fontSize: '13px' }}>
                    {option.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 7. FOOTER BANNER SECTION (CTA) ----------------- */}
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
                Make A Difference Today
              </span>
              <h2 style={{ fontSize: '30px', fontWeight: '800', marginTop: '6px', marginBottom: '8px' }}>
                Ready to Help Children Have a Better Future?
              </h2>
              <p style={{ margin: 0, opacity: 0.9, fontSize: '14px' }}>
                Join our network today as a volunteer or contribute a small donation to empower lives.
              </p>
            </div>

            <div className="col-lg-4 text-lg-end">
              <div className="d-flex gap-3 justify-content-center justify-content-lg-end flex-wrap">
                <Link
                  to="/donate"
                  style={{
                    backgroundColor: '#132832',
                    color: '#ffffff',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    fontSize: '13px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                  }}
                >
                  DONATE NOW
                </Link>
                <a
                  href="#get-involved"
                  style={{
                    backgroundColor: '#ffffff',
                    color: '#e65100',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '700',
                    textDecoration: 'none',
                    fontSize: '13px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                  }}
                >
                  BECOME VOLUNTEER
                </a>
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* ----------------- 8. FOOTER SECTION ----------------- */}
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
              <a href="#" className="footer-link">Programes</a>
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
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Get Involved</h4>
              <a href="#get-involved" className="footer-link">Volunteer</a>
              <a href="#get-involved" className="footer-link">Become a Member</a>
              <a href="#get-involved" className="footer-link">Partner With Us</a>
            </div>

          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div style={{ backgroundColor: '#0f0f0f', borderTop: '1px solid #1f1f1f', padding: '20px 0', position: 'relative' }}>
          <div className="container text-center">
            <p style={{ margin: 0, fontSize: '13px', color: '#8c8c8c' }}>
              Copyright 2026 All Right Reserved
            </p>
          </div>

          <button
            onClick={scrollToTop}
            style={{
              position: 'absolute',
              right: '20px',
              bottom: '15px',
              backgroundColor: '#e65100',
              color: 'white',
              border: 'none',
              padding: '10px 14px',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
            aria-label="Scroll to top"
          >
            <FaArrowUp />
          </button>
        </div>
      </footer>

    </div>
  );
};

export default Programs;