import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { 
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaMapMarkerAlt, 
  FaSearch, FaRegUser, FaHeart, FaHandshake, FaPlay, FaChevronUp,
  FaChevronLeft, FaChevronRight, FaRegHeart, FaGift, FaShareAlt,
  FaArrowRight, FaEnvelope, FaPhoneAlt, FaQuoteLeft, FaYoutube
} from 'react-icons/fa';

const Home = () => {
  const [activeTab, setActiveTab] = useState('mission');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const tabContents = {
    mission: "Our Mission: There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or random aset words which don't look even slightly believable.",
    vision: "Our Vision: To establish a world where every individual has access to clean water, proper education, and fundamental human rights without any discrimination.",
    value: "Our Core Values: Transparency, accountability, empathy, and relentless commitment to the upliftment of marginalized children and societies globally."
  };

  const faqItems = [
    {
      id: 1,
      question: "How Can I Get Help?",
      answer: "Lorem ipsum dolor sit amet, vix an natum labitur eleifnd, mel am laoreet menandri. Ei justo complectitur duo. Ei mundi solet ut soletu possit quo."
    },
    {
      id: 2,
      question: "How Do I Become A Volunteer?",
      answer: "Lorem ipsum dolor sit amet, vix an natum labitur eleifnd, mel am laoreet menandri. Ei justo complectitur duo."
    },
    {
      id: 3,
      question: "Where Do My Donations Go?",
      answer: "Lorem ipsum dolor sit amet, vix an natum labitur eleifnd, mel am laoreet menandri. Ei justo complectitur duo."
    },
    {
      id: 4,
      question: "Is My Contribution Tax Deductible?",
      answer: "Lorem ipsum dolor sit amet, vix an natum labitur eleifnd, mel am laoreet menandri. Ei justo complectitur duo."
    }
  ];

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? -1 : index);
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

  // Become A Volunteer Section collage images
  const volunteerCollage = {
    left: { src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=400", alt: "Volunteers packing donation boxes" },
    main: { src: "https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=700", alt: "Group of volunteers smiling" },
    topRight: { src: "https://images.unsplash.com/photo-1608333687205-19a5b8bf1b58?q=80&w=400", alt: "Volunteer helping elderly woman" },
    midRight: { src: "https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=400", alt: "Volunteers sorting donation clothes" },
    bottom1: { src: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=300", alt: "Volunteer serving food" },
    bottom2: { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=300", alt: "Volunteer with child" },
    bottom3: { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=300", alt: "Volunteer smiling" }
  };

  // FAQ Section collage images
  const faqCollage = {
    tall: { src: "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?q=80&w=500", alt: "Volunteer packing food donation boxes" },
    short: { src: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=400", alt: "Volunteer smiling with donation items" },
    mid: { src: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400", alt: "Volunteer reading with a child" },
    wide: { src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=500", alt: "Children smiling together" }
  };

  // Meet With Volunteers Section team members
  const teamVolunteers = [
    { id: 1, name: "Robart Jonson", role: "Volunteer", color: "#3cd49b", src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=700", alt: "Male volunteer with glasses smiling" },
    { id: 2, name: "Leslie Alexander", role: "Volunteer", color: "#ff544a", src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=700", alt: "Female volunteer smiling" },
    { id: 3, name: "Kristin Watson", role: "Volunteer", color: "#ffb83b", src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=700", alt: "Male volunteer smiling" }
  ];

  // Testimonial floating avatars
  const testimonialAvatars = [
    { id: 1, src: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=300", alt: "Smiling curly-haired volunteer", color: "#ffb83b" },
    { id: 2, src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300", alt: "Bearded volunteer with glasses", color: "#3cd49b" },
    { id: 3, src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=300", alt: "Older volunteer with grey hair", color: "#ff544a" }
  ];

  // ====== Success Stories data (NGO donation-impact focused) ======
  const successStories = [
    {
      id: 1,
      name: "Amara Perera",
      role: "Funded by Education Sponsors",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
      alt: "Young girl who benefited from an education sponsorship",
      story: "When Amara's family could no longer afford school fees, donors from our Education Fund stepped in. Today she has finished her nursing degree and works at her village clinic, giving back to the very community that once supported her.",
      color: "#ff544a"
    },
    {
      id: 2,
      name: "Nimal Silva's Village",
      role: "Clean Water For All Children Project",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
      alt: "Villager standing beside a newly built water well",
      story: "Through contributions to our Water For All Children cause, a new well was built for Nimal's village. Over 300 families now walk minutes instead of hours to reach clean, safe drinking water.",
      color: "#3cd49b"
    },
    {
      id: 3,
      name: "Sithara Fernando",
      role: "Supported Through The Rights Of Children Cause",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
      alt: "Woman who was helped through a child-protection and livelihood programme",
      story: "Sithara was one of the first children enrolled in our protection programme years ago. With continued donor support into adulthood, she now runs a small community workshop that trains and employs other young women from the same background.",
      color: "#ffb83b"
    }
  ];
  // ====== END ======

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

        .faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.3s ease;
        }
        .faq-answer-wrap.open {
          grid-template-rows: 1fr;
        }
        .faq-answer-inner {
          overflow: hidden;
        }
        .faq-q-btn:hover .faq-icon-circle {
          background-color: #ff544a;
          color: white;
        }

        /* Success Story card hover */
        .success-story-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .success-story-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
        }

        /* Footer link hover */
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
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
                        <img src={logo} alt="Empower Hopes Logo" style={{ width: "44px", height: "44px", borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <h4 style={{ fontSize: '18px', fontWeight: '800', color: '#162a35', margin: 0, letterSpacing: '0.5px' }}>EMPOWER HOPES</h4>
              <p style={{ fontSize: '10px', color: '#555', fontWeight: '600', margin: 0, letterSpacing: '1px' }}>HUMANITARIAN NETWORK</p>
            </div>
          </a>

          <div className="collapse navbar-collapse justify-content-end">
            <ul className="navbar-nav align-items-center gap-2">
              <li className="nav-item"><Link className="nav-link active" to="/" style={{ fontWeight: '600', color: '#e65c00' }}>Home</Link></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Causes</a></li>
              <li className="nav-item"><Link className="nav-link" to="/events" style={{ fontWeight: '600', color: '#333' }}>Events</Link></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Portfolio</a></li>
              <li className="nav-item"><Link className="nav-link" to="/about" style={{ fontWeight: '600', color: '#333' }}>About</Link></li>
              <li className="nav-item"><a className="nav-link" href="#" style={{ fontWeight: '600', color: '#333' }}>Blog</a></li>
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
            <Link to="/donate" style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', padding: '14px 32px', borderRadius: '5px', border: 'none', textDecoration: 'none', display: 'inline-block' }}>Donate Now</Link>
            <Link to="/contact" style={{ backgroundColor: '#ffb83b', color: 'white', fontWeight: '700', padding: '14px 32px', borderRadius: '5px', border: 'none', textDecoration: 'none', display: 'inline-block' }}>Contact Us</Link>
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
                <Link to="/donate" style={{ width: '100%', backgroundColor: '#ff544a', color: 'white', fontWeight: '700', fontSize: '13px', padding: '14px 10px', border: 'none', borderRadius: '5px', letterSpacing: '0.5px', position: 'relative', zIndex: 2, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
                  DONATION NOW
                </Link>
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
                    <Link to="/donate" style={{ width: '100%', padding: '12px 20px', fontSize: '13.5px', fontWeight: '700', color: 'white', backgroundColor: '#ffb83b', border: 'none', borderRadius: '4px', position: 'relative', zIndex: 2, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
                      DONATION NOW
                    </Link>
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
                    <Link to="/donate" style={{ width: '100%', padding: '12px 20px', fontSize: '13.5px', fontWeight: '700', color: 'white', backgroundColor: '#10b981', border: 'none', borderRadius: '4px', position: 'relative', zIndex: 2, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
                      DONATION NOW
                    </Link>
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
                    <Link to="/donate" style={{ width: '100%', padding: '12px 20px', fontSize: '13.5px', fontWeight: '700', color: 'white', backgroundColor: '#ff544a', border: 'none', borderRadius: '4px', position: 'relative', zIndex: 2, textDecoration: 'none', display: 'inline-block', textAlign: 'center' }}>
                      DONATION NOW
                    </Link>
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
                    style={{ width: '100%', height: '340px', objectFit: 'cover', display: 'block', cursor: 'pointer' }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <Link to="/events" style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', padding: '14px 35px', borderRadius: '5px', border: 'none', textDecoration: 'none', display: 'inline-block' }}>
              View All Events
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Become A Volunteer Section */}
      <section style={{ backgroundColor: '#161616', padding: '100px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', left: 0, top: 0, width: '55%', height: '100%',
          backgroundImage: "url('https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=800')",
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.06, zIndex: 0
        }}></div>

        <div className="container position-relative" style={{ zIndex: 1 }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
              <div style={{ position: 'relative', height: '500px' }}>
                <div style={{ position: 'absolute', left: 0, top: '160px', width: '17%', height: '150px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.35)', zIndex: 2 }}>
                  <img src={volunteerCollage.left.src} alt={volunteerCollage.left.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', left: '20%', top: '130px', width: '38%', height: '250px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.4)', zIndex: 3 }}>
                  <img src={volunteerCollage.main.src} alt={volunteerCollage.main.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', left: '61%', top: '130px', width: '18%', height: '110px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.35)', zIndex: 2 }}>
                  <img src={volunteerCollage.topRight.src} alt={volunteerCollage.topRight.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', left: '61%', top: '250px', width: '18%', height: '130px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.35)', zIndex: 2 }}>
                  <img src={volunteerCollage.midRight.src} alt={volunteerCollage.midRight.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', left: '57%', top: '155px', zIndex: 4 }}>
                  <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                    <path d="M16 27 C6 20, 2 14, 2 9 C2 4, 6 1, 10 2 C13 3, 15 6, 16 8 C17 6, 19 3, 22 2 C26 1, 30 4, 30 9 C30 14, 26 20, 16 27 Z" stroke="#ff544a" strokeWidth="2" fill="none" />
                  </svg>
                </div>
                <div style={{ position: 'absolute', left: 0, top: '385px', width: '20%', height: '105px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.35)', zIndex: 2 }}>
                  <img src={volunteerCollage.bottom1.src} alt={volunteerCollage.bottom1.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', left: '23%', top: '385px', width: '20%', height: '105px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.35)', zIndex: 2 }}>
                  <img src={volunteerCollage.bottom2.src} alt={volunteerCollage.bottom2.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', left: '46%', top: '385px', width: '20%', height: '105px', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 25px rgba(0,0,0,0.35)', zIndex: 2 }}>
                  <img src={volunteerCollage.bottom3.src} alt={volunteerCollage.bottom3.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>

            <div className="col-lg-6 text-white ps-lg-4">
              <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '30px', display: 'block' }}>
                Our Volunteer
              </span>
              <div className="d-inline-block position-relative mb-4">
                <h2 style={{ fontSize: '42px', fontWeight: '800', margin: 0 }}>
                  Become A Volunteer
                </h2>
                <div style={{ width: '70%', height: '8px', marginTop: '4px' }}>
                  <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                    <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <p style={{ fontSize: '14.5px', color: '#c9c9c9', lineHeight: '1.7', maxWidth: '520px' }} className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              </p>

              <form onSubmit={(e) => e.preventDefault()}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label style={{ fontSize: '13.5px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>Your Name</label>
                    <input type="text" className="volunteer-input" placeholder="Your Name" />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: '13.5px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>Your Email</label>
                    <input type="email" className="volunteer-input" placeholder="Email Address" />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: '13.5px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>Phone Number</label>
                    <input type="text" className="volunteer-input" placeholder="Phone Number" />
                  </div>
                  <div className="col-md-6">
                    <label style={{ fontSize: '13.5px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>Date Of Birth</label>
                    <input type="date" className="volunteer-input" placeholder="dd/mm/yyyy" />
                  </div>
                  <div className="col-12">
                    <label style={{ fontSize: '13.5px', fontWeight: '500', marginBottom: '8px', display: 'block' }}>Message</label>
                    <textarea className="volunteer-input" rows="4" placeholder="Write Your Messages"></textarea>
                  </div>
                  <div className="col-12 mt-2">
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                      <div style={{ position: 'absolute', left: '-4px', top: '4px', width: '100%', height: '100%', borderRadius: '5px', border: '2px dashed #ff544a', zIndex: 1 }}></div>
                      <button type="submit" style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', fontSize: '13px', padding: '14px 34px', border: 'none', borderRadius: '5px', letterSpacing: '0.5px', position: 'relative', zIndex: 2 }}>
                        SUBMIT NOW
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </div>
      </section>

      {/* 10. Meet With Volunteers Section */}
      <section style={{ padding: '90px 0 100px 0', backgroundColor: '#ffffff', position: 'relative', overflow: 'hidden' }} className="text-center">
        {/* Decorative Hand Icon Top Left */}
        <div style={{ position: 'absolute', left: '0px', top: '160px', opacity: 0.9 }}>
          <svg width="140" height="140" viewBox="0 0 140 140" fill="none">
            <path d="M10 130 C30 100, 45 90, 55 70 L60 20 C60 12, 68 12, 68 20 L68 60" stroke="#ffb83b" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M68 60 L70 22 C70 14, 78 14, 78 22 L78 60" stroke="#ffb83b" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M78 60 L80 25 C80 17, 88 17, 88 25 L88 62" stroke="#ffb83b" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <path d="M88 62 L89 32 C89 25, 96 25, 96 32 L96 75" stroke="#ffb83b" strokeWidth="3" strokeLinecap="round" fill="none"/>
            <rect x="18" y="95" width="30" height="14" rx="2" transform="rotate(-35 33 102)" fill="none" stroke="#ffb83b" strokeWidth="3"/>
          </svg>
        </div>

        {/* Decorative Hearts Top Right */}
        <div style={{ position: 'absolute', right: '60px', top: '150px' }}>
          <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
            <path d="M30 50 C10 35, 5 22, 12 14 C18 7, 28 10, 30 18 C32 10, 42 7, 48 14 C55 22, 50 35, 30 50 Z" fill="#3cd49b"/>
          </svg>
        </div>
        <div style={{ position: 'absolute', right: '20px', top: '195px' }}>
          <svg width="42" height="42" viewBox="0 0 42 42" fill="none">
            <path d="M21 36 C7 25, 4 16, 9 10 C13 5, 20 7, 21 13 C22 7, 29 5, 33 10 C38 16, 35 25, 21 36 Z" fill="#ff544a"/>
          </svg>
        </div>

        <div className="container">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>
            Our Volunteers
          </span>

          <div className="d-inline-block mb-3 position-relative">
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
              Meet <span>With Volunteers</span>
            </h2>
            <div style={{ width: '55%', height: '8px', margin: '4px auto 0 auto' }}>
              <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#7e7e7e', maxWidth: '680px', margin: '15px auto 55px auto', lineHeight: '1.7' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem voluptatem obcaecati consectetur adipisicing
          </p>

          <div className="row g-0">
            {teamVolunteers.map((member) => (
              <div className="col-lg-4 col-md-4" key={member.id}>
                <div style={{ position: 'relative' }}>
                  <img
                    src={member.src}
                    alt={member.alt}
                    style={{ width: '100%', height: '260px', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{ position: 'absolute', left: '20px', bottom: '20px', width: '48px', height: '48px', backgroundColor: member.color, borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '18px', boxShadow: '0 8px 20px rgba(0,0,0,0.25)' }}>
                    <FaShareAlt />
                  </div>
                </div>
                <div style={{ backgroundColor: member.color, backgroundImage: `repeating-linear-gradient(45deg, ${member.color}, ${member.color} 10px, rgba(255,255,255,0.06) 10px, rgba(255,255,255,0.06) 20px)`, padding: '22px 10px', textAlign: 'center' }}>
                  <h4 style={{ color: 'white', fontSize: '20px', fontWeight: '800', margin: 0 }}>{member.name}</h4>
                  <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '13px', margin: '4px 0 0 0' }}>{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10.5 FAQ Section ─── "How Can We Help You?" ─── */}
      <section style={{ padding: '90px 0 100px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row align-items-start g-5">

            {/* Photo Collage */}
            <div className="col-lg-6">
              <div style={{ position: 'relative' }}>
                <svg width="55" height="55" viewBox="0 0 60 60" fill="none" style={{ position: 'absolute', top: '-38px', left: '-8px', color: '#ff544a', transform: 'rotate(-8deg)', zIndex: 2 }}>
                  <path d="M5 5 Q30 0 35 25 Q40 45 55 40" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M45 32 L55 40 L44 44" stroke="currentColor" strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>

                <div className="row g-3">
                  <div className="col-6 d-flex flex-column gap-3">
                    <div style={{ borderRadius: '10px', overflow: 'hidden', height: '300px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}>
                      <img src={faqCollage.tall.src} alt={faqCollage.tall.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ borderRadius: '10px', overflow: 'hidden', height: '150px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}>
                      <img src={faqCollage.short.src} alt={faqCollage.short.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                  <div className="col-6 d-flex flex-column gap-3">
                    <div style={{ borderRadius: '10px', overflow: 'hidden', height: '150px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}>
                      <img src={faqCollage.mid.src} alt={faqCollage.mid.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ borderRadius: '10px', overflow: 'hidden', height: '135px', boxShadow: '0 15px 35px rgba(0,0,0,0.08)' }}>
                      <img src={faqCollage.wide.src} alt={faqCollage.wide.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Content + Accordion */}
            <div className="col-lg-6">
              <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>
                Faq
              </span>
              <div className="d-inline-block position-relative mb-4">
                <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
                  How Can We Help You?
                </h2>
                <div style={{ width: '75%', height: '8px', marginTop: '4px' }}>
                  <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                    <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
                  </svg>
                </div>
              </div>

              <p style={{ fontSize: '15px', color: '#7e7e7e', maxWidth: '480px', lineHeight: '1.7' }} className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem voluptatem obcaecati consectetur adipisicing
              </p>

              <div>
                {faqItems.map((item, index) => {
                  const isOpen = openFaqIndex === index;
                  return (
                    <div key={item.id} style={{ borderTop: '1px solid #e8e6e1', borderBottom: index === faqItems.length - 1 ? '1px solid #e8e6e1' : 'none', padding: '24px 0' }}>
                      <button
                        className="faq-q-btn"
                        onClick={() => toggleFaq(index)}
                        style={{ display: 'flex', alignItems: 'center', gap: '18px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                      >
                        <span
                          className="faq-icon-circle"
                          style={{
                            flexShrink: 0, width: '34px', height: '34px', borderRadius: '50%',
                            border: '1.5px solid #ff544a', color: isOpen ? 'white' : '#ff544a',
                            backgroundColor: isOpen ? '#ff544a' : 'transparent',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontSize: '20px', transition: 'all 0.2s ease'
                          }}
                        >
                          {isOpen ? '−' : '+'}
                        </span>
                        <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1c2d37', margin: 0 }}>{item.question}</h4>
                      </button>
                      <div className={`faq-answer-wrap ${isOpen ? 'open' : ''}`}>
                        <div className="faq-answer-inner">
                          <p style={{ color: '#7e7e7e', fontSize: '14.5px', lineHeight: '1.7', paddingLeft: '52px', marginTop: '14px', marginBottom: 0 }}>
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 11. Testimonial Section */}
      <section style={{ backgroundColor: '#1a1a1a', padding: '90px 0', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '18px 18px' }}></div>

        <div className="container position-relative">
          <div className="row align-items-center g-5">

            {/* Left Floating Avatars */}
            <div className="col-lg-6">
              <div style={{ position: 'relative', height: '380px' }}>
                <div style={{ position: 'absolute', left: '60px', top: '20px', width: '150px', height: '150px', borderRadius: '50%', padding: '5px', border: `4px solid ${testimonialAvatars[0].color}` }}>
                  <img src={testimonialAvatars[0].src} alt={testimonialAvatars[0].alt} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', left: '280px', top: '55px', width: '110px', height: '110px', borderRadius: '50%', padding: '4px', border: `4px solid ${testimonialAvatars[1].color}` }}>
                  <img src={testimonialAvatars[1].src} alt={testimonialAvatars[1].alt} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
                <div style={{ position: 'absolute', left: '130px', top: '180px', width: '190px', height: '190px', borderRadius: '50%', padding: '5px', border: `4px solid ${testimonialAvatars[2].color}` }}>
                  <img src={testimonialAvatars[2].src} alt={testimonialAvatars[2].alt} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                </div>
              </div>
            </div>

            {/* Right Quote Content */}
            <div className="col-lg-6 text-white">
              <svg width="60" height="45" viewBox="0 0 60 45" fill="none" className="mb-3">
                <path d="M0 45V27C0 12 9 2 24 0V9C15 11 11 17 11 24H24V45H0Z" fill="#3cd49b"/>
                <path d="M33 45V27C33 12 42 2 57 0V9C48 11 44 17 44 24H57V45H33Z" fill="#3cd49b"/>
              </svg>
              <p style={{ fontSize: '26px', fontStyle: 'italic', color: '#d6d6d6', lineHeight: '1.6', fontWeight: '300' }}>
                Randomised words whdon't look even htly believable Available, but the majority have suffered alteration soform, by injected humour, or you are going to use.
              </p>
              <h4 style={{ fontSize: '20px', fontWeight: '800', color: 'white', marginTop: '25px' }}>Ralph Alfred</h4>
            </div>

          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="success-stories" style={{ padding: '90px 0 100px 0', backgroundColor: '#fdfbf7' }} className="text-center">
        <div className="container">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>
            Real Impact
          </span>

          <div className="d-inline-block mb-3 position-relative">
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
              Our Success Stories
            </h2>
            <div style={{ width: '60%', height: '8px', margin: '4px auto 0 auto' }}>
              <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#7e7e7e', maxWidth: '680px', margin: '15px auto 55px auto', lineHeight: '1.7' }}>
            As a non-profit, every project you see here was made possible only because of generous donors. These are a few of the lives changed by that generosity.
          </p>

          <div className="row g-4 text-start">
            {successStories.map((s) => (
              <div className="col-lg-4 col-md-6" key={s.id}>
                <div className="success-story-card" style={{ background: 'white', borderRadius: '10px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.06)', height: '100%' }}>
                  <div style={{ position: 'relative' }}>
                    <img src={s.src} alt={s.alt} style={{ width: '100%', height: '230px', objectFit: 'cover', display: 'block' }} />
                    <div style={{ position: 'absolute', left: '20px', bottom: '-22px', width: '44px', height: '44px', borderRadius: '50%', backgroundColor: s.color, color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 20px rgba(0,0,0,0.25)' }}>
                      <FaQuoteLeft size={16} />
                    </div>
                  </div>
                  <div className="p-4 pt-5">
                    <h4 style={{ fontSize: '18px', fontWeight: '700', color: '#1c2d37', marginBottom: '4px' }}>{s.name}</h4>
                    <span style={{ fontSize: '13px', fontWeight: '600', color: s.color }}>{s.role}</span>
                    <p style={{ fontSize: '14px', color: '#777', lineHeight: '1.7', marginTop: '14px' }}>{s.story}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-5 text-center">
            <Link to="/success-stories" style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', padding: '14px 35px', borderRadius: '5px', border: 'none', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              View All Stories <FaArrowRight size={13} />
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
                {/* Success Stories footer link -> scrolls to the section above */}
                <a href="#success-stories" className="footer-link">Success Stories</a>
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

export default Home;