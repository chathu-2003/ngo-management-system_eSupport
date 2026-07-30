import React, { useState } from 'react';
import { submitVolunteer } from '../services/api';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

import {
  FaHeart, FaEye,
  FaArrowUp,
  FaMinus, FaPlus, FaHandsHelping, FaDonate, FaUserPlus,
  FaBullseye, FaHistory, FaUserTie, FaFileContract, FaCertificate, FaBuilding, FaClock
} from 'react-icons/fa';

const About = () => {
  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const features = [
    {
      id: 1,
      title: "Become an volunteer",
      desc: "Lorem ipsum dolor sit amet consect cingo eiusmod tempor sentence structures to generate Lorem Ipsum",
      icon: <FaUserPlus />
    },
    {
      id: 2,
      title: "Quick Fundraising",
      desc: "Lorem ipsum dolor sit amet consect cingo eiusmod tempor sentence structures to generate Lorem Ipsum",
      icon: <FaHandsHelping />
    },
    {
      id: 3,
      title: "Start Donating",
      desc: "Lorem ipsum dolor sit amet consect cingo eiusmod tempor sentence structures to generate Lorem Ipsum",
      icon: <FaDonate />
    }
  ];

  const causes = [
    {
      id: 1,
      title: "Water For All Children",
      desc: "Every child deserves a future. Every last child.",
      raised: "$87,689",
      goal: "$87,689",
      img: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?q=80&w=400"
    },
    {
      id: 2,
      title: "Protecting Children",
      desc: "Every child deserves a future. Every last child.",
      raised: "$89,679",
      goal: "$89,286",
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=400"
    },
    {
      id: 3,
      title: "The Rights of Children",
      desc: "Every child deserves a future. Every last child.",
      raised: "$97,679",
      goal: "$97,679",
      img: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=400"
    }
  ];

  const team = [
    {
      name: "Robart Jonson",
      role: "Volunteer",
      img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
    },
    {
      name: "Leslie Alexander",
      role: "Volunteer",
      img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400"
    },
    {
      name: "Kristin Watson",
      role: "Volunteer",
      img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400"
    }
  ];

  const faqs = [
    {
      question: "How Can I Get Help?",
      answer: "Lorem ipsum dolor sit amet, vix an natum labitur eleifnd, mel am laoreet menandri. Ei justo complectitur duo. Ei mundi solet ut soletu possit quo."
    },
    {
      question: "How Do I Become A Volunteer?",
      answer: "You can fill out the volunteer application form on our website or visit our head office to register directly."
    },
    {
      question: "Where Do My Donations Go?",
      answer: "100% of public donations directly fund our humanitarian programs including clean water, education, and health."
    },
    {
      question: "Is My Contribution Tax Deductible?",
      answer: "Yes, all donations made to Empower Hopes are tax-deductible under section 501(c)(3)."
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

  // ====== Vision / Mission / History data ======
  const orgPillars = [
    {
      id: 1,
      title: "Our Vision",
      icon: <FaEye />,
      color: '#ffb83b',
      text: "To build compassionate, resilient, and self-sustaining communities where every individual has equal opportunities to thrive with dignity, hope, and purpose."
    },
    {
      id: 2,
      title: "Our Mission",
      icon: <FaBullseye />,
      color: '#e65100',
      text: "Empower Hopes Humanitarian Network exists to improve lives through humanitarian action, community development, economic empowerment, education, environmental stewardship, mental wellbeing, and collaborative partnerships while promoting equality, inclusion, and sustainable social impact."
    },
    {
      id: 3,
      title: "Our History",
      icon: <FaHistory />,
      color: '#3cd49b',
      text: "Empower Hopes Humanitarian Network was founded to bridge gaps in humanitarian assistance by bringing together professionals, volunteers, community leaders, and partners committed to creating sustainable solutions for vulnerable populations. The organization believes that meaningful social change is achieved through collaboration, innovation, compassion, and community-led development."
    }
  ];
  // ====== END ======

  // ====== Leadership Team data (names, photos & bios pending) ======
  const leadershipTeam = [
    { id: 1, role: "Chairperson / Founder" },
    { id: 2, role: "Director of Projects & Programs" },
    { id: 3, role: "Director of Community & Rural Development" },
    { id: 4, role: "Director of Wellbeing & Mental Health" },
    { id: 5, role: "Director of Environment & Sustainability" },
    { id: 6, role: "Director of Communications & Marketing" },
    { id: 7, role: "Director of Equity, Diversity & Inclusion" },
    { id: 8, role: "Director of Children & Women's Affairs" },
    { id: 9, role: "Director of External Relations & Partnerships" },
    { id: 10, role: "Director of Monitoring & Evaluation" }
  ];
  // ====== END ======

  // ====== Registration Details data ======
  const registrationDetails = [
    { id: 1, label: "Registration Number", value: "To be confirmed", pending: true },
    { id: 2, label: "Date of Incorporation", value: "To be confirmed", pending: true },
    { id: 3, label: "Registration Certificate", value: "To be confirmed", pending: true }
  ];
  // ====== END ======

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        .feature-card {
          transition: all 0.3s ease;
          border: 1px solid #f0f0f0;
        }
        .feature-card:hover {
          background: #ffffff;
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
          transform: translateY(-5px);
        }
        .team-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .team-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.1) !important;
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
        .custom-input {
          width: 100%;
          padding: 14px 18px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
          background-color: #f8fafc;
          outline: none;
          font-size: 14px;
        }
        .custom-input:focus {
          border-color: #e65100;
          background-color: #fff;
        }

        /* Pillar card (Vision / Mission / History) hover */
        .pillar-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .pillar-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.08);
        }

        /* Leadership placeholder card hover */
        .leader-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .leader-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 12px 26px rgba(0,0,0,0.07);
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
          .experience-badge {
            position: relative !important;
            top: 0 !important;
            left: 0 !important;
            margin-bottom: 15px;
            display: inline-block;
          }
          .cta-banner h2 {
            font-size: 24px !important;
          }
        }
      `}</style>

      <Navbar active="about" />

      {/* ----------------- 3. HERO BANNER SECTION ----------------- */}
      <section 
        className="hero-section"
        style={{ 
          backgroundImage: "linear-gradient(rgba(19, 40, 50, 0.8), rgba(19, 40, 50, 0.8)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920')", 
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
                Child Education Help
              </span>
              <h1 className="hero-title" style={{ fontSize: '52px', fontWeight: '800', lineHeight: 1.2, margin: '20px 0' }}>
                Donations Even If It Is A Small Can Bring Bigger Impact
              </h1>
              <p style={{ fontSize: '16px', color: '#e2e8f0', marginBottom: '35px', maxWidth: '650px', lineHeight: '1.6' }}>
                Only when the society comes together and contributes we will be able to make an impact. Your little help can make million children smile.
              </p>
              <div className="d-flex flex-wrap gap-3">
                <Link to="/donate" style={{ backgroundColor: '#e65100', color: 'white', padding: '14px 28px', borderRadius: '6px', fontWeight: '700', textDecoration: 'none' }}>
                  Donate Now
                </Link>
                <Link to="/contact" style={{ backgroundColor: 'transparent', border: '2px solid white', color: 'white', padding: '14px 28px', borderRadius: '6px', fontWeight: '700', textDecoration: 'none' }}>
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 4. FEATURES SECTION ----------------- */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Our Features</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>How Could You Help?</h2>
          <p style={{ color: '#666', maxWidth: '600px', margin: '15px auto 0', fontSize: '15px' }}>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem autem voluptatem obcaecati consectetur adipisicing elit.
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            {features.map((item) => (
              <div className="col-lg-4 col-md-6" key={item.id}>
                <div className="feature-card p-4 rounded-3 text-center h-100" style={{ backgroundColor: '#fafafa' }}>
                  <div style={{ width: '70px', height: '70px', borderRadius: '50%', backgroundColor: '#fff3ec', color: '#e65100', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                    {item.icon}
                  </div>
                  <h4 style={{ fontWeight: '700', color: '#132832', fontSize: '20px' }}>{item.title}</h4>
                  <p style={{ fontSize: '14px', color: '#777', marginTop: '10px' }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 5. OUR CAUSES SECTION ----------------- */}
      <section style={{ padding: '80px 0', backgroundColor: '#fcfaf5' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Our Causes</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>Our Latest Causes</h2>
        </div>

        <div className="container">
          <div className="row g-4">
            {causes.map((cause) => (
              <div className="col-lg-4 col-md-6" key={cause.id}>
                <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 5px 20px rgba(0,0,0,0.05)', background: '#fff' }} className="h-100 d-flex flex-column justify-content-between">
                  <div>
                    <img src={cause.img} alt={cause.title} style={{ width: '100%', height: '220px', objectFit: 'cover' }} />
                    <div className="p-4">
                      <h4 style={{ fontWeight: '700', color: '#132832', fontSize: '20px' }}>{cause.title}</h4>
                      <p style={{ fontSize: '14px', color: '#666', margin: '10px 0 20px' }}>{cause.desc}</p>
                      
                      <div className="d-flex justify-content-between text-muted" style={{ fontSize: '13px', fontWeight: '600' }}>
                        <span>Raised : <strong style={{ color: '#e65100' }}>{cause.raised}</strong></span>
                        <span>Goal : <strong style={{ color: '#132832' }}>{cause.goal}</strong></span>
                      </div>
                    </div>
                  </div>

                  <div className="px-4 pb-4">
                    <Link to="/donate" style={{ display: 'block', backgroundColor: '#e65100', color: 'white', padding: '12px', borderRadius: '6px', fontWeight: '700', textDecoration: 'none', textAlign: 'center' }}>
                      DONATION NOW
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 6. ABOUT US EXPERIENCES ----------------- */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="row align-items-center g-4 g-lg-5">
            
            <div className="col-lg-6">
              <div style={{ position: 'relative' }}>
                <img 
                  src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800" 
                  alt="25 Years Experience" 
                  style={{ width: '100%', maxHeight: '480px', objectFit: 'cover', borderRadius: '15px' }} 
                />
                <div className="experience-badge" style={{ position: 'absolute', top: '20px', left: '20px', backgroundColor: '#e65100', color: 'white', padding: '15px 25px', borderRadius: '12px', textAlign: 'center' }}>
                  <h2 style={{ fontSize: '36px', fontWeight: '800', margin: 0 }}>25</h2>
                  <p style={{ margin: 0, fontSize: '13px', fontWeight: '600' }}>Years Experiences</p>
                </div>
              </div>
            </div>

            <div className="col-lg-6">
              <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>About us</span>
              <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }} className="mb-3">
                Check What Makes Us Different
              </h2>
              <p style={{ color: '#666', lineHeight: '1.8', fontSize: '15px' }}>
                There are many variations of passages of lorem Ipsum available, but the majority have suffered alteration in some form.
              </p>
              <p style={{ color: '#444', lineHeight: '1.8', fontWeight: '600', marginTop: '12px', fontSize: '15px' }}>
                About us: Empower Hopes is committed to building sustainable support for communities in need.
              </p>

              <div className="my-4 p-4" style={{ backgroundColor: '#fff7ed', borderRadius: '10px', borderLeft: '4px solid #e65100' }}>
                <h3 style={{ fontSize: '28px', fontWeight: '800', color: '#e65100', margin: 0 }}>$876,000</h3>
                <p style={{ margin: 0, fontWeight: '600', color: '#132832', fontSize: '14px' }}>Raised by 78,000 people in one year</p>
              </div>

              <Link to="/causes" style={{ backgroundColor: '#132832', color: 'white', padding: '12px 28px', borderRadius: '6px', textDecoration: 'none', fontWeight: '700', display: 'inline-block' }}>
                Discover More
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ----------------- 6.5 OUR VISION, MISSION & HISTORY ----------------- */}
      <section style={{ padding: '80px 0', backgroundColor: '#fcfaf5' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Who We Are</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>Vision, Mission &amp; History</h2>
          <p style={{ color: '#666', maxWidth: '650px', margin: '15px auto 0', fontSize: '15px' }}>
            The purpose and story that guide every programme we run.
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            {orgPillars.map((pillar) => (
              <div className="col-lg-4 col-md-6" key={pillar.id}>
                <div className="pillar-card p-4 rounded-3 h-100" style={{ backgroundColor: '#ffffff', border: '1px solid #f0f0f0' }}>
                  <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: `${pillar.color}1a`, color: pillar.color, fontSize: '26px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>
                    {pillar.icon}
                  </div>
                  <h4 style={{ fontWeight: '700', color: '#132832', fontSize: '20px', marginBottom: '12px' }}>{pillar.title}</h4>
                  <p style={{ fontSize: '14px', color: '#666', lineHeight: '1.75', margin: 0 }}>{pillar.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 7. VOLUNTEER FORM SECTION ----------------- */}
      <section id="volunteer" style={{ padding: '80px 0', backgroundColor: '#132832', color: 'white' }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8 text-center mb-4 mb-md-5">
              <span style={{ color: '#ffb83b', fontFamily: "'Caveat', cursive", fontSize: '30px' }}>Our Volunteer</span>
              <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Become A Volunteer</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px' }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt</p>
            </div>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              <form className="row g-3" onSubmit={async (e) => {
                e.preventDefault();
                setVLoading(true); setVMsg('');
                try {
                  const res = await submitVolunteer(vForm);
                  setVMsg(res.message || 'Registration successful!');
                  setVForm({ name: '', email: '', phone: '', dateOfBirth: '', message: '' });
                } catch (err) {
                  setVMsg(err.message || 'Registration failed. Please try again.');
                } finally { setVLoading(false); }
              }}>
                <div className="col-md-6">
                  <input type="text" placeholder="Your Name" className="custom-input" value={vForm.name} onChange={e => setVForm({...vForm, name: e.target.value})} required />
                </div>
                <div className="col-md-6">
                  <input type="email" placeholder="Your Email" className="custom-input" value={vForm.email} onChange={e => setVForm({...vForm, email: e.target.value})} required />
                </div>
                <div className="col-md-6">
                  <input type="text" placeholder="Phone Number" className="custom-input" />
                </div>
                <div className="col-md-6">
                  <input type="date" className="custom-input" />
                </div>
                <div className="col-12">
                  <textarea rows="4" placeholder="Message" className="custom-input" value={vForm.message} onChange={e => setVForm({...vForm, message: e.target.value})}></textarea>
                </div>
                <div className="col-12 text-center mt-4">
                  {vMsg && <p style={{ color: vMsg.includes('success') || vMsg.includes('Registered') ? '#3cd49b' : '#ff544a', marginBottom: '12px', fontWeight: 600 }}>{vMsg}</p>}
                  <button type="submit" disabled={vLoading} style={{ backgroundColor: '#e65100', color: 'white', border: 'none', padding: '14px 40px', fontWeight: '700', borderRadius: '6px', cursor: 'pointer', width: '100%', maxWidth: '250px', opacity: vLoading ? 0.7 : 1 }}>
                    {vLoading ? 'Submitting...' : 'SUBMIT NOW'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 8. VOLUNTEERS LIST ----------------- */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Our Volunteers</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>Meet With Volunteers</h2>
        </div>

        <div className="container">
          <div className="row g-4">
            {team.map((member, index) => (
              <div className="col-lg-4 col-md-6" key={index}>
                <div className="card team-card" style={{ border: 'none', background: 'white', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
                  <div style={{ height: '320px', overflow: 'hidden' }}>
                    <img src={member.img} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="card-body p-4 text-center">
                    <h4 style={{ fontSize: '20px', fontWeight: '700', color: '#132832', margin: 0 }}>{member.name}</h4>
                    <p style={{ color: '#e65100', fontSize: '14px', fontWeight: '600', margin: '5px 0 0' }}>{member.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 8.5 LEADERSHIP TEAM (Names, Photos & Bios Pending) ----------------- */}
      <section style={{ padding: '80px 0', backgroundColor: '#fdfbf7' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Our Team</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>Leadership Team</h2>
          <p style={{ color: '#666', maxWidth: '650px', margin: '15px auto 0', fontSize: '15px' }}>
            Meet the people steering Empower Hopes. Names, photos, and full bios will be added soon.
          </p>
        </div>

        <div className="container">
          <div className="row g-4">
            {leadershipTeam.map((leader) => (
              <div className="col-lg-3 col-md-4 col-6" key={leader.id}>
                <div className="leader-card text-center h-100 p-4" style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #f0f0f0' }}>
                  <div style={{ width: '72px', height: '72px', borderRadius: '50%', backgroundColor: '#fff3ec', color: '#e65100', fontSize: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px' }}>
                    <FaUserTie />
                  </div>
                  <h4 style={{ fontSize: '15px', fontWeight: '700', color: '#132832', margin: 0, lineHeight: '1.4' }}>{leader.role}</h4>
                  <p style={{ color: '#a4a4a4', fontSize: '12px', fontWeight: '600', margin: '10px 0 0', letterSpacing: '0.5px', textTransform: 'uppercase' }}>
                    Photo &amp; Bio Coming Soon
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ----------------- 8.7 REGISTRATION DETAILS ----------------- */}
      <section style={{ padding: '80px 0', backgroundColor: '#ffffff' }}>
        <div className="container text-center mb-5">
          <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Legal Standing</span>
          <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>Registration Details</h2>
        </div>

        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="d-flex align-items-start gap-3 p-4 mb-4" style={{ backgroundColor: '#fff7ed', borderRadius: '10px', borderLeft: '4px solid #e65100' }}>
                <div style={{ fontSize: '24px', color: '#e65100', flexShrink: 0 }}>
                  <FaBuilding />
                </div>
                <div>
                  <h4 style={{ fontSize: '16px', fontWeight: '700', color: '#132832', margin: '0 0 6px' }}>Current Registration</h4>
                  <p style={{ fontSize: '14px', color: '#666', margin: 0, lineHeight: '1.7' }}>
                    Company Limited by Guarantee under the Companies Act No. 7 of 2007.
                  </p>
                </div>
              </div>

              <div className="row g-3">
                {registrationDetails.map((detail) => (
                  <div className="col-md-4" key={detail.id}>
                    <div className="d-flex align-items-start gap-3 p-4 h-100" style={{ backgroundColor: '#fafafa', borderRadius: '10px', border: '1px dashed #e2e8f0' }}>
                      <div style={{ fontSize: '18px', color: '#ffb83b', flexShrink: 0 }}>
                        {detail.id === 1 && <FaFileContract />}
                        {detail.id === 2 && <FaClock />}
                        {detail.id === 3 && <FaCertificate />}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#132832', margin: '0 0 4px' }}>{detail.label}</h4>
                        <p style={{ fontSize: '13px', color: '#999', margin: 0, fontStyle: 'italic' }}>{detail.value}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 9. FAQ ACCORDION SECTION ----------------- */}
      <section style={{ padding: '80px 0 100px 0', backgroundColor: '#fdfbf7' }}>
        <div className="container">
          <div className="text-center mb-5">
            <span style={{ fontFamily: "'Caveat', cursive", color: '#e65100', fontSize: '32px' }}>Faq</span>
            <h2 style={{ fontSize: '32px', fontWeight: '800', color: '#132832' }}>How Can We Help You?</h2>
          </div>

          <div className="row justify-content-center">
            <div className="col-lg-8">
              {faqs.map((faq, i) => (
                <div key={i} className="mb-3" style={{ background: 'white', borderRadius: '8px', border: '1px solid #eee', overflow: 'hidden' }}>
                  <button 
                    onClick={() => toggleFaq(i)}
                    style={{
                      width: '100%',
                      padding: '18px 24px',
                      display: 'flex',
                      justify: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      fontWeight: '700',
                      color: '#132832',
                      fontSize: '15px',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <span>{faq.question}</span>
                    <span style={{ color: '#e65100', marginLeft: '10px' }}>
                      {openFaq === i ? <FaMinus /> : <FaPlus />}
                    </span>
                  </button>
                  {openFaq === i && (
                    <div style={{ padding: '0 24px 20px', color: '#666', fontSize: '14px', lineHeight: '1.7' }}>
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 10. FOOTER BANNER SECTION (NEW CTA) ----------------- */}
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
                  href="#volunteer" 
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

      {/* ----------------- 11. FOOTER SECTION ----------------- */}
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
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/donate" className="footer-link">Donation</Link>
              <Link to="/about" className="footer-link">About us</Link>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Quick links</h4>
              <Link to="/causes" className="footer-link">Causes</Link>
              <Link to="/about" className="footer-link">About</Link>
              <Link to="/blog" className="footer-link">Stories</Link>
            </div>

            <div className="col-lg-2 col-md-6 col-6">
              <h4 style={{ fontSize: '16px', fontWeight: '700', marginBottom: '20px' }}>Explore</h4>
              <Link to="/donate" className="footer-link">Donate</Link>
              <Link to="/causes" className="footer-link">Campaigns</Link>
              <a href="#volunteer" className="footer-link">Volunteers</a>
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

export default About;