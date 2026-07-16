import React from 'react';
import { FaFacebookF, FaTwitter, FaPinterestP, FaLinkedinIn, FaMapMarkerAlt, FaSearch, FaRegUser } from 'react-icons/fa';

const Home = () => {
  return (
    <div className="main-wrapper">
      
      {/* ─── internal CSS ටික මෙතන තියෙන්නේ ─── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap');

        .main-wrapper {
          font-family: 'Poppins', sans-serif;
        }

        /* Envato Top Bar */
        .envato-bar {
          background-color: #262626;
          font-size: 13px;
        }
        .envato-logo span {
          color: #82b440;
        }
        .btn-buy {
          background-color: #82b440;
          color: white;
          border: none;
          padding: 3px 12px;
          border-radius: 4px;
          font-weight: 600;
          font-size: 12px;
        }
        .btn-buy:hover {
          background-color: #6e9b35;
          color: white;
        }

        /* Info Sub Header Bar */
        .top-bar {
          background-color: #1a1a1a;
          color: #c5c5c5;
          font-size: 13px;
        }
        .text-highlight {
          color: #ff544a;
          font-weight: bold;
        }
        .social-links a {
          color: #8c8c8c;
          transition: color 0.3s;
        }
        .social-links a:hover {
          color: #ff544a;
        }

        /* Main Navigation Bar */
        .brand-text h4 {
          font-size: 22px;
          font-weight: 800;
          color: #111;
          margin: 0;
          letter-spacing: 1px;
        }
        .brand-text p {
          font-size: 10px;
          color: #777;
          font-weight: 600;
          margin: 0;
          letter-spacing: 2px;
        }
        .nav-link {
          color: #333 !important;
          font-weight: 600;
          font-size: 15px;
          margin-right: 15px;
          transition: color 0.3s;
        }
        .nav-link.active, .nav-link:hover {
          color: #ff544a !important;
        }
        .nav-icons .icon-btn {
          background: none;
          border: none;
          color: #333;
          font-size: 18px;
          margin-left: 15px;
          cursor: pointer;
          transition: color 0.2s;
        }
        .nav-icons .icon-btn:hover {
          color: #ff544a;
        }
        .btn-donate {
          background-color: #ff544a;
          color: white;
          font-weight: 700;
          font-size: 14px;
          padding: 10px 24px;
          border-radius: 5px;
          border: none;
          letter-spacing: 1px;
          transition: background 0.3s;
        }
        .btn-donate:hover {
          background-color: #e0433a;
        }

        /* Hero Section (Background Image & Overlay) */
        .hero-section {
          position: relative;
          background-image: linear-gradient(rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.75)), url('https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1920');
          background-size: cover;
          background-position: center;
          height: 550px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        .hero-title {
          font-size: 60px;
          font-weight: 800;
          line-height: 1.2;
        }
        .hero-highlight {
          position: relative;
          display: inline-block;
          color: #fff;
        }
        .hero-highlight::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 100%;
          height: 4px;
          background-color: #ffaa1d;
          border-radius: 2px;
        }
        .hero-desc {
          font-size: 16px;
          color: #e0e0e0;
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.6;
        }
      `}</style>

      {/* ─── HTML / JSX Structure ─── */}
      
      {/* Envato Market Top Bar */}
      <div className="envato-bar py-2 px-4 d-flex justify-content-between align-items-center text-white">
        <div className="envato-logo fw-bold">
          envato<span>market</span>
        </div>
        <button className="btn-buy">Buy now</button>
      </div>

      {/* Mini Header / Info Bar */}
      <div className="top-bar py-2 px-4 d-flex flex-wrap justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-3">
          <span>
            <span className="text-highlight">HI</span> , Good Afternoon Dude!
          </span>
          <span className="d-flex align-items-center gap-1 text-secondary">|</span>
          <span className="d-flex align-items-center gap-1">
            <FaMapMarkerAlt className="text-danger" /> Shiloh, Hawaii 81063
          </span>
        </div>
        
        <div className="d-flex align-items-center gap-3">
          <span>Follow Us -</span>
          <div className="social-links d-flex gap-3">
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaTwitter /></a>
            <a href="#"><FaPinterestP /></a>
            <a href="#"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white py-3 shadow-sm">
        <div className="container-fluid px-4">
          
          {/* Logo & Brand Text */}
          <a className="navbar-brand d-flex align-items-center gap-2" href="#">
            <div className="logo-icon d-flex align-items-center">
              <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="30" r="10" fill="#ff544a" />
                <path d="M30 45 C30 35, 45 25, 50 40 C55 25, 70 35, 70 45 C70 60, 50 75, 50 75 C50 75, 30 60, 30 45 Z" fill="#4caf50" opacity="0.8"/>
                <path d="M35 55 C25 65, 35 80, 50 80 C65 80, 75 65, 65 55" stroke="#ffaa1d" strokeWidth="6" strokeLinecap="round" fill="none"/>
              </svg>
            </div>
            <div className="brand-text">
              <h4>CHARITE</h4>
              <p>HELP THE POOR</p>
            </div>
          </a>

          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav align-items-center gap-2">
              <li className="nav-item"><a className="nav-link active" href="#">Home</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Causes</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Events</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Portfolio</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Pages</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Blog</a></li>
            </ul>

            <div className="nav-icons d-flex align-items-center ms-lg-4 mt-3 mt-lg-0">
              <button className="icon-btn"><FaSearch /></button>
              <span className="text-muted mx-2">|</span>
              <button className="icon-btn me-4"><FaRegUser /></button>
              <button className="btn-donate">DONATE NOW</button>
            </div>
          </div>

        </div>
      </nav>

      {/* Hero Content Section */}
      <section className="hero-section text-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              <h1 className="hero-title mb-4">
                Donations Even If It Is A Small Can <br />
                <span className="hero-highlight">Bring Bigger</span>
              </h1>
              <p className="hero-desc">
                Only when the society comes together and contributes it was popularised in the  
                we will be able to make an impact.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;