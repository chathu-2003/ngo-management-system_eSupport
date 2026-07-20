import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';
import { 
  FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaMapMarkerAlt, 
  FaSearch, FaRegUser, FaChevronUp, FaQuoteLeft, FaArrowRight,
  FaEnvelope, FaPhoneAlt, FaYoutube
} from 'react-icons/fa';

const Stories = () => {

  // Full list of success stories (donation-impact based, tied to the NGO's causes)
  const allStories = [
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
    },
    {
      id: 4,
      name: "Kavindu Rathnayake",
      role: "Protecting Children Cause",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
      alt: "Young boy who was supported through a child protection programme",
      story: "Kavindu was referred to us through a local school after facing a difficult home situation. Donor-funded counselling and a safe temporary shelter gave him the stability he needed. He's now back in school and thriving.",
      color: "#10b981"
    },
    {
      id: 5,
      name: "Dilani Wickramasinghe",
      role: "Education Fund Graduate",
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600",
      alt: "Young woman who completed her studies through an education fund",
      story: "A full scholarship from our Education Fund allowed Dilani to complete her teaching diploma. She now teaches at the same rural school she once attended as a child, inspiring the next generation of students.",
      color: "#ff544a"
    },
    {
      id: 6,
      name: "Community of Ambewela",
      role: "Water For All Children Project",
      src: "https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600",
      alt: "Children from a village that received a clean water project",
      story: "Before our well project reached Ambewela, children were missing school to fetch water each morning. Now, thanks to donor contributions, that time goes back into their education and play.",
      color: "#3cd49b"
    },
    {
      id: 7,
      name: "Chathura Bandara",
      role: "Small Livelihood Grant Recipient",
      src: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=600",
      alt: "Man who received a small livelihood grant",
      story: "A small livelihood grant helped Chathura start a modest carpentry workshop. He now supports his family independently and has taken on two young apprentices from his neighbourhood.",
      color: "#ffb83b"
    },
    {
      id: 8,
      name: "Nadeesha Perera",
      role: "The Rights Of Children Cause",
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=600",
      alt: "Young woman advocating for children's rights in her community",
      story: "After being supported through our child-rights programme as a teenager, Nadeesha now volunteers with us part-time, helping identify and support other vulnerable children in her district.",
      color: "#10b981"
    }
  ];

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: '#fcfbf9', position: 'relative' }}>

      {/* Google Fonts & Custom CSS Rules (same as Home) */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@700&display=swap');

        .success-story-card {
          transition: transform 0.35s ease, box-shadow 0.35s ease;
        }
        .success-story-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.12);
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

      {/* 3. Sticky Main Navigation Bar (same as Home, "Home" not active here) */}
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
              <li className="nav-item"><Link className="nav-link active" to="/success-stories" style={{ fontWeight: '600', color: '#e65c00' }}>Success Stories</Link></li>
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

      {/* 4. Page Header / Banner */}
      <section style={{ backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920')", backgroundSize: 'cover', backgroundPosition: 'center', height: '320px' }} className="d-flex align-items-center justify-content-center text-center text-white">
        <div className="container">
          <h1 style={{ fontSize: '42px', fontWeight: '800' }} className="mb-2">
            Our Success Stories
          </h1>
          <p style={{ fontSize: '15px', color: '#e0e0e0' }}>
            <Link to="/" style={{ color: '#ffb83b', textDecoration: 'none' }}>Home</Link> / Success Stories
          </p>
        </div>
      </section>

      {/* 5. All Success Stories Grid */}
      <section style={{ padding: '90px 0 100px 0', backgroundColor: '#fdfbf7' }} className="text-center">
        <div className="container">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#ff544a', fontSize: '32px', display: 'block' }}>
            Real Impact
          </span>

          <div className="d-inline-block mb-3 position-relative">
            <h2 style={{ fontSize: '42px', fontWeight: '800', color: '#1c2d37', margin: 0 }}>
              Lives Changed By Your Support
            </h2>
            <div style={{ width: '60%', height: '8px', margin: '4px auto 0 auto' }}>
              <svg viewBox="0 0 100 10" width="100%" height="100%" preserveAspectRatio="none">
                <path d="M0,5 Q25,0 50,5 T100,5" fill="none" stroke="#ffb83b" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
          </div>

          <p style={{ fontSize: '15px', color: '#7e7e7e', maxWidth: '680px', margin: '15px auto 55px auto', lineHeight: '1.7' }}>
            As a non-profit, every project you see here was made possible only because of generous donors. These are the stories of the people whose lives were changed by that generosity.
          </p>

          <div className="row g-4 text-start">
            {allStories.map((s) => (
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
            <Link to="/donate" style={{ backgroundColor: '#ff544a', color: 'white', fontWeight: '700', padding: '14px 35px', borderRadius: '5px', border: 'none', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              Become Part Of The Next Story <FaArrowRight size={13} />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer (same as Home) */}
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
                <Link to="/success-stories" className="footer-link">Success Stories</Link>
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

export default Stories;