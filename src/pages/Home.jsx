import React, { useState } from 'react';
import { 
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaMapMarkerAlt, 
  FaSearch, FaRegUser, FaHeart, FaHandshake, FaPlay, FaChevronUp,
  FaChevronLeft, FaChevronRight, FaRegHeart, FaGift
} from 'react-icons/fa';

const Home = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const tabContents = {
    mission: "Our Mission: There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or random aset words which don't look even slightly believable.",
    vision: "Our Vision: To establish a world where every individual has access to clean water, proper education, and fundamental human rights without any discrimination.",
    value: "Our Core Values: Transparency, accountability, empathy, and relentless commitment to the upliftment of marginalized children and societies globally."
  };

  // Carousel එක ඇතුලේ දිගටම rotate වෙන්න ඕන items ටික
  const features = [
    {
      id: 1,
      title: "Become an\nvolunteer",
      desc: "Lorem ipsum dolor sit amet consect cingo eiusmod tempor sentence structures to generate Lorem Ipsum",
      icon: <FaHandshake />,
      bgColor: '#ff544a',
      gradColor: '#d43b32',
      shadow: 'rgba(255,84,74,0.3)'
    },
    {
      id: 2,
      title: "Quick Fundraising",
      desc: "Lorem ipsum dolor sit amet consect cingo eiusmod tempor sentence structures to generate Lorem Ipsum",
      icon: <FaRegHeart />,
      bgColor: '#3cd49b',
      gradColor: '#22a875',
      shadow: 'rgba(60,212,155,0.3)'
    },
    {
      id: 3,
      title: "Start Donating",
      desc: "Lorem ipsum dolor sit amet consect cingo eiusmod tempor sentence structures to generate Lorem Ipsum",
      icon: <FaGift />,
      bgColor: '#ffb83b',
      gradColor: '#d99621',
      shadow: 'rgba(255,184,59,0.3)'
    }
  ];

  // Infinite smooth loop එකක් හැදෙන්න array එක double (6 cards) කරනවා
  const duplicatedFeatures = [...features, ...features];

  // Upcoming Event Section images (matches the screenshot)
  const eventImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=800",
      alt: "Doctor checking child health"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800",
      alt: "Smiling children"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=800",
      alt: "Group of children"
    }
  ];

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

        /* Continuous Smooth Slide/Rotate Animation Container */
        .slider-container {
          overflow: hidden;
          width: 100%;
          position: relative;
        }

        .slider-track {
          display: flex;
          width: max-content;
          animation: infiniteScroll 20s linear infinite;
        }

        /* Mouse එක track එක උඩට ගියාම slide වෙන එක නතර වෙන්න (Pause on Hover) */
        .slider-track:hover {
          animation-play-state: paused;
        }

        @keyframes infiniteScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            /* Total items 6න් හරියටම බාගයක් (Items 3ක්) වමට ගියාම loop එක reset වෙනවා */
            transform: translateX(calc(-33.333% * 3));
          }
        }

        .event-img-wrap {
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 15px 35px rgba(0,0,0,0.08);
        }
        .event-img-wrap img {
          transition: transform 0.5s ease;
        }
        .event-img-wrap:hover img {
          transform: scale(1.08);
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
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <svg width="50" height="50" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#134e5e" />
                  <stop offset="100%" stopColor="#2575fc" />
                </linearGradient>
                <linearGradient id="orangeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff512f" />
                  <stop offset="100%" stopColor="#dd2476" />
                </linearGradient>
              </defs>
              <path d="M 20,50 A 30,30 0 1,1 80,50 A 30,30 0 0,1 20,50" stroke="url(#blueGrad)" strokeWidth="6" fill="none" opacity="0.9" />
              <path d="M 30,25 A 30,30 0 0,1 80,50" stroke="url(#orangeGrad)" strokeWidth="5" fill="none" />
              <circle cx="50" cy="32" r="6" fill="#134e5e" />
              <path d="M 36,42 C 45,45 48,50 50,65 C 52,50 55,45 64,42 Z" fill="url(#orangeGrad)" />
            </svg>
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#162a35', margin: 0, letterSpacing: '0.5px' }}>EMPOWER HOPES</h4>
              <p style={{ fontSize: '10px', color: '#555', fontWeight: '600', margin: 0, letterSpacing: '1px' }}>HUMANITARIAN NETWORK</p>
            </div>
          </a>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav align-items-center gap-2">
              <li className="nav-item"><a className="nav-link active" href="#" style={{ fontWeight: '600', color: '#e65c00' }}>Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Causes</a></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Events</a></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Portfolio</a></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Pages</a></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Blog</a></li>
            </ul>
            <div className="d-flex align-items-center ms-lg-4">
              <button style={{ background: 'none', border: 'none', color: '#333', fontSize: '18px' }} className="px-2"><FaSearch /></button>
              <button style={{ background: 'none', border: 'none', color: '#333', fontSize: '18px' }} className="px-2 me-3"><FaRegUser /></button>
              <button style={{ backgroundColor: '#d9531e', color: 'white', fontWeight: '700', fontSize: '14px', padding: '10px 24px', borderRadius: '5px', border: 'none' }}>
                DONATE NOW
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* 4. Hero Section */}
      <section style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920')", backgroundSize: 'cover', backgroundPosition: 'center', height: '550px' }} className="d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 style={{ fontSize: '52px', fontWeight: '800' }} className="mb-4">
            Donations Even If It Is A Small Can <br />
            <span style={{ borderBottom: '4px solid #ffb83b' }}>Bring Bigger</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#e0e0e0', maxWidth: '750px' }} className="mx-auto mb-5">
            Only when the society comes together and contributes we will be able to make an impact.
          </p>
          <div className="d-flex gap-3 justify-content-center">
            <button style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', padding: '14px 32px', borderRadius: '5px', border: 'none' }}>Donate Now</button>
            <button style={{ backgroundColor: '#ffb83b', color: 'white', fontWeight: '700', padding: '14px 32px', borderRadius: '5px', border: 'none' }}>Contact Us</button>
          </div>
        </div>
      </section>

      {/* 4.5 ROTATING/SLIDING SECTION ─── "How Could You Help?" ─── */}
      <section className="p-0 border-bottom" style={{ backgroundColor: '#fdfbf9' }}>
        <div className="container-fluid p-0">
          <div className="row g-0">
            
            {/* Left Side Dark Image Banner */}
            <div className="col-lg-3 d-flex flex-column justify-content-center align-items-center text-center p-5 text-white position-relative" 
                 style={{ 
                   backgroundImage: "linear-gradient(rgba(26, 26, 26, 0.90), rgba(26, 26, 26, 0.90)), url('https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600')",
                   backgroundSize: 'cover',
                   backgroundPosition: 'center',
                   minHeight: '460px',
                   zIndex: 10
                 }}>
              <h2 style={{ fontSize: '34px', fontWeight: '800', lineHeight: '1.3' }} className="mb-3">
                Child<br />Education<br />Help
              </h2>
              <p style={{ fontSize: '13.5px', opacity: 0.85, maxWidth: '240px' }} className="mb-4">
                Your little help can make milion childrean smile model sentence structures
              </p>
              
              <div style={{ position: 'relative', width: '85%' }} className="mb-4">
                <div style={{ position: 'absolute', left: '-4px', top: '4px', width: '100%', height: '100%', borderRadius: '5px', border: '2px dashed #ff544a', zIndex: 1 }}></div>
                <button style={{ width: '100%', backgroundColor: '#ff544a', color: 'white', fontWeight: '700', fontSize: '13px', padding: '14px 10px', border: 'none', borderRadius: '5px', letterSpacing: '0.5px', position: 'relative', zIndex: 2 }}>
                  DONATION NOW
                </button>
              </div>

              <div className="d-flex gap-2 justify-content-center mt-2">
                <span style={{ width: '18px', height: '7px', backgroundColor: '#ff544a', borderRadius: '4px', display: 'inline-block' }}></span>
                <span style={{ width: '8px', height: '7px', backgroundColor: '#555', borderRadius: '50%', display: 'inline-block' }}></span>
                <span style={{ width: '8px', height: '7px', backgroundColor: '#555', borderRadius: '50%', display: 'inline-block' }}></span>
              </div>
            </div>

            {/* Right Side Content Area with Infinite Slide Animation */}
            <div className="col-lg-9 p-5 d-flex flex-column justify-content-center position-relative" style={{ backgroundColor: '#fcfaf5', backgroundImage: 'radial-gradient(#e6e3dd 0.8px, transparent 0.8px)', backgroundSize: '16px 16px', overflow: 'hidden' }}>
              <div className="px-md-4">
                
                {/* Header Section */}
                <div className="d-flex justify-content-between align-items-start mb-2">
                  <div>
                    <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '30px', display: 'block' }}>
                      Our Features
                    </span>
                    <div className="d-inline-block position-relative">
                      <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
                        How Could You Help?
                      </h2>
                      <div style={{ width: '65%', height: '8px', marginTop: '4px' }}>
                        <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                          <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Small Arrows */}
                  <div className="d-flex gap-2 pt-3">
                    <button style={{ border: '1px solid #ff8882', background: 'none', color: '#ff8882', width: '40px', height: '40px', borderRadius: '4px', fontSize: '12px' }} className="d-flex align-items-center justify-content-center">
                      <FaChevronLeft />
                    </button>
                    <button style={{ border: '1px solid #ff8882', background: 'none', color: '#ff8882', width: '40px', height: '40px', borderRadius: '4px', fontSize: '12px' }} className="d-flex align-items-center justify-content-center">
                      <FaChevronRight />
                    </button>
                  </div>
                </div>

                <p style={{ fontSize: '14.5px', color: '#777', maxWidth: '720px', marginBottom: '45px', lineHeight: '1.6' }}>
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem voluptatem obcaecati consectetur adipisicing elit. Rem autem voluptatem obcaecati
                </p>

                {/* --- INFINITE ROTATING CAROUSEL TRACK --- */}
                <div className="slider-container">
                  <div className="slider-track">
                    {duplicatedFeatures.map((item, index) => (
                      <div 
                        key={index} 
                        style={{ width: '300px', marginRight: '50px', flexShrink: 0 }}
                        className="text-start"
                      >
                        <div className="d-flex justify-content-start mb-3">
                          <div 
                            style={{ 
                              width: '65px', 
                              height: '65px', 
                              backgroundColor: item.bgColor, 
                              borderRadius: '50%', 
                              color: 'white', 
                              fontSize: '24px', 
                              boxShadow: `0 6px 15px ${item.shadow}`, 
                              backgroundImage: `radial-gradient(circle at 20px 20px, ${item.bgColor}, ${item.gradColor})` 
                            }} 
                            className="d-flex align-items-center justify-content-center"
                          >
                            {item.icon}
                          </div>
                        </div>
                        <h4 style={{ fontSize: '21px', fontWeight: '800', color: '#1c2d37', lineHeight: '1.2', whiteSpace: 'pre-line' }} className="mb-3">
                          {item.title}
                        </h4>
                        <p style={{ fontSize: '13.5px', color: '#6e6e6e', lineHeight: '1.7' }}>
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                {/* -------------------------------------- */}

              </div>

              {/* Decorative Accent Leaf */}
              <div style={{ position: 'absolute', right: '40px', bottom: '25px', opacity: 0.85 }}>
                <svg width="45" height="45" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 35 C12 22, 25 15, 38 12" stroke="#23a455" strokeWidth="3" strokeLinecap="round"/>
                  <path d="M12 26 C16 18, 26 12, 35 8" stroke="#23a455" strokeWidth="2.5" strokeLinecap="round"/>
                  <path d="M22 32 C24 24, 30 18, 36 16" stroke="#23a455" strokeWidth="2.5" strokeLinecap="round"/>
                </svg>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 5. Our Latest Causes Section */}
      <section style={{ padding: '80px 0', backgroundColor: '#fdfbf7' }} className="text-center">
        <div className="container">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>
            Our Causes
          </span>
          
          <div className="d-inline-block mb-3 position-relative">
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
              Our Latest Causes
            </h2>
            <div style={{ width: '60%', height: '8px', margin: '4px auto 0 auto' }}>
              <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#7e7e7e', maxWidth: '680px', margin: '15px auto 55px auto', lineHeight: '1.7' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem voluptatem obcaecati consectetur adipisicing elit. Rem autem voluptatem.
          </p>

          <div className="row g-4 text-start">
            
            {/* Cause Card 1 */}
            <div className="col-xl-3 col-md-6">
              <div className="card" style={{ background: 'white', borderRadius: '0px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: 'none', height: '100%' }}>
                <div style={{ padding: '16px 16px 0 16px' }}>
                  <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600" alt="Water" style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '6px' }} />
                </div>
                <div className="card-body p-4 pt-3">
                  <h4 style={{ fontSize: '19px', fontWeight: '700', color: '#1c2d37', marginBottom: '14px' }}>Water For All Children</h4>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.6' }} className="mb-4">Every child deserves a future. Every last child.</p>
                  <div className="d-flex justify-content-between" style={{ fontSize: '13.5px', fontWeight: '600', color: '#444' }}>
                    <span>Raised : $87689</span>
                    <span>Goal : $87689</span>
                  </div>
                  <div style={{ height: '7px', backgroundColor: '#eeeeee', borderRadius: '10px', marginTop: '10px' }}>
                    <div className="custom-progress-red" style={{ width: '75%', height: '100%', borderRadius: '10px' }}></div>
                  </div>
                  <div style={{ position: 'relative', marginTop: '30px' }}>
                    <div style={{ position: 'absolute', left: '-4px', top: '4px', width: '100%', height: '100%', borderRadius: '4px', border: '2px dashed #ff544a', zIndex: 1 }}></div>
                    <button style={{ width: '100%', padding: '12px 20px', fontSize: '13.5px', fontWeight: '700', color: 'white', backgroundColor: '#ff544a', border: 'none', borderRadius: '4px', position: 'relative', zIndex: 2 }}>
                      DONATION NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cause Card 2 */}
            <div className="col-xl-3 col-md-6">
              <div className="card" style={{ background: 'white', borderRadius: '0px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: 'none', height: '100%' }}>
                <div style={{ padding: '16px 16px 0 16px' }}>
                  <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=600" alt="Protecting" style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '6px' }} />
                </div>
                <div className="card-body p-4 pt-3">
                  <h4 style={{ fontSize: '19px', fontWeight: '700', color: '#1c2d37', marginBottom: '14px' }}>Protecting Children</h4>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.6' }} className="mb-4">Every child deserves a future. Every last child.</p>
                  <div className="d-flex justify-content-between" style={{ fontSize: '13.5px', fontWeight: '600', color: '#444' }}>
                    <span>Raised : $89679</span>
                    <span>Goal : $89286</span>
                  </div>
                  <div style={{ height: '7px', backgroundColor: '#eeeeee', borderRadius: '10px', marginTop: '10px' }}>
                    <div className="custom-progress-orange" style={{ width: '65%', height: '100%', borderRadius: '10px' }}></div>
                  </div>
                  <div style={{ position: 'relative', marginTop: '30px' }}>
                    <div style={{ position: 'absolute', left: '-4px', top: '4px', width: '100%', height: '100%', borderRadius: '4px', border: '2px dashed #ffb83b', zIndex: 1 }}></div>
                    <button style={{ width: '100%', padding: '12px 20px', fontSize: '13.5px', fontWeight: '700', color: 'white', backgroundColor: '#ffb83b', border: 'none', borderRadius: '4px', position: 'relative', zIndex: 2 }}>
                      DONATION NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cause Card 3 */}
            <div className="col-xl-3 col-md-6">
              <div className="card" style={{ background: 'white', borderRadius: '0px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: 'none', height: '100%' }}>
                <div style={{ padding: '16px 16px 0 16px' }}>
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600" alt="Rights" style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '6px' }} />
                </div>
                <div className="card-body p-4 pt-3">
                  <h4 style={{ fontSize: '19px', fontWeight: '700', color: '#1c2d37', marginBottom: '14px' }}>The Rights of Children</h4>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.6' }} className="mb-4">Every child deserves a future. Every last child.</p>
                  <div className="d-flex justify-content-between" style={{ fontSize: '13.5px', fontWeight: '600', color: '#444' }}>
                    <span>Raised : $97679</span>
                    <span>Goal : $97679</span>
                  </div>
                  <div style={{ height: '7px', backgroundColor: '#eeeeee', borderRadius: '10px', marginTop: '10px' }}>
                    <div className="custom-progress-green" style={{ width: '70%', height: '100%', borderRadius: '10px' }}></div>
                  </div>
                  <div style={{ position: 'relative', marginTop: '30px' }}>
                    <div style={{ position: 'absolute', left: '-4px', top: '4px', width: '100%', height: '100%', borderRadius: '4px', border: '2px dashed #10b981', zIndex: 1 }}></div>
                    <button style={{ width: '100%', padding: '12px 20px', fontSize: '13.5px', fontWeight: '700', color: 'white', backgroundColor: '#10b981', border: 'none', borderRadius: '4px', position: 'relative', zIndex: 2 }}>
                      DONATION NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cause Card 4 */}
            <div className="col-xl-3 col-md-6">
              <div className="card" style={{ background: 'white', borderRadius: '0px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)', border: 'none', height: '100%' }}>
                <div style={{ padding: '16px 16px 0 16px' }}>
                  <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=600" alt="Water Duplicate" style={{ width: '100%', height: '210px', objectFit: 'cover', borderRadius: '6px' }} />
                </div>
                <div className="card-body p-4 pt-3">
                  <h4 style={{ fontSize: '19px', fontWeight: '700', color: '#1c2d37', marginBottom: '14px' }}>Water For All Children</h4>
                  <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.6' }} className="mb-4">Every child deserves a future. Every last child.</p>
                  <div className="d-flex justify-content-between" style={{ fontSize: '13.5px', fontWeight: '600', color: '#444' }}>
                    <span>Raised : $87689</span>
                    <span>Goal : $87689</span>
                  </div>
                  <div style={{ height: '7px', backgroundColor: '#eeeeee', borderRadius: '10px', marginTop: '10px' }}>
                    <div className="custom-progress-red" style={{ width: '75%', height: '100%', borderRadius: '10px' }}></div>
                  </div>
                  <div style={{ position: 'relative', marginTop: '30px' }}>
                    <div style={{ position: 'absolute', left: '-4px', top: '4px', width: '100%', height: '100%', borderRadius: '4px', border: '2px dashed #ff544a', zIndex: 1 }}></div>
                    <button style={{ width: '100%', padding: '12px 20px', fontSize: '13.5px', fontWeight: '700', color: 'white', backgroundColor: '#ff544a', border: 'none', borderRadius: '4px', position: 'relative', zIndex: 2 }}>
                      DONATION NOW
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. About Us Section */}
      <section style={{ padding: '120px 0 80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div style={{ position: 'relative', height: '520px' }}>
                <div style={{ position: 'absolute', left: 0, top: 0, width: '52%', zIndex: 3, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.07)' }}>
                  <img src="https://images.unsplash.com/photo-1573497620053-ea5300f94f21?q=80&w=600" alt="Volunteer" style={{ width: '100%', height: '440px', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', right: '3%', top: '-20px', width: '42%', zIndex: 2, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.07)' }}>
                  <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400" alt="Children" style={{ width: '100%', height: '230px', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', right: '3%', bottom: '-30px', width: '42%', zIndex: 2, borderRadius: '20px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.07)' }}>
                  <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400" alt="Kids" style={{ width: '100%', height: '250px', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', right: '-15px', top: '95px', background: 'white', padding: '14px 22px', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.12)', zIndex: 5 }} className="d-flex align-items-center gap-2">
                  <div style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '800', fontSize: '22px', width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>25</div>
                  <div style={{ fontSize: '14px', fontWeight: '700', color: '#1c2d37', lineHeight: '1.2' }}>Years<br />Experiences</div>
                </div>
              </div>
            </div>

            <div className="col-lg-6 ps-lg-5">
              <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>About us</span>
              <h2 style={{ fontSize: '44px', fontWeight: '800', color: '#1c2d37' }} className="mb-4">
                Check What Makes Us Different
              </h2>
              <p style={{ fontSize: '15px', color: '#777', lineHeight: '1.8' }} className="mb-5">
                There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form.
              </p>
              <div className="d-flex flex-column gap-4 mb-5">
                <div className="d-flex align-items-center gap-3">
                  <div style={{ width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#ffedf0', color: '#ff544a', fontSize: '24px' }} className="d-flex align-items-center justify-content-center"><FaHeart /></div>
                  <div>
                    <h3 style={{ fontSize: '32px', fontWeight: '800', margin: 0 }}>876,000</h3>
                    <p style={{ color: '#666', margin: 0 }}>Raised by 78,000 people in one year</p>
                  </div>
                </div>
              </div>
              <button style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', fontSize: '13px', padding: '16px 35px', borderRadius: '5px', border: 'none' }}>Discover More</button>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us Section */}
      <section style={{ backgroundColor: '#1a1a1a', color: 'white', padding: '90px 0' }}>
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '30px', display: 'block' }}>Why Choose Us</span>
              <h2 style={{ fontSize: '42px', fontWeight: '800' }} className="mb-4">Trusted Non Profit Center</h2>
              
              <div className="d-flex gap-2 my-4">
                {['mission', 'vision', 'value'].map((tab) => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    style={{ padding: '10px 24px', fontWeight: '700', borderRadius: '6px', border: 'none', backgroundColor: activeTab === tab ? '#ff544a' : '#2b2b2b', color: 'white' }}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
              <p style={{ fontSize: '15px', color: '#ccc', minHeight: '90px' }}>{tabContents[activeTab]}</p>
            </div>

            <div className="col-lg-6 text-center">
              <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                <img src="https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=800" alt="Video Cover" style={{ width: '100%', borderRadius: '16px', height: '380px', objectFit: 'cover' }} />
                <button style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '70px', height: '70px', backgroundColor: 'white', borderRadius: '50%', color: '#ff544a', border: 'none', fontSize: '20px', paddingLeft: '5px' }}>
                  <FaPlay />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Our Upcoming Event Section */}
      <section style={{ padding: '90px 0 100px 0', backgroundColor: '#ffffff' }} className="text-center">
        <div className="container">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>
            Our Event
          </span>

          <div className="d-inline-block mb-3 position-relative">
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
              Our Upcoming Event
            </h2>
            <div style={{ width: '60%', height: '8px', margin: '4px auto 0 auto' }}>
              <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#7e7e7e', maxWidth: '680px', margin: '15px auto 55px auto', lineHeight: '1.7' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem voluptatem obcaecati consectetur adipisicing
          </p>

          <div className="row g-4">
            {eventImages.map((img) => (
              <div className="col-lg-4 col-md-6" key={img.id}>
                <div className="event-img-wrap">
                  <img
                    src={img.src}
                    alt={img.alt}
                    style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

export default Home;