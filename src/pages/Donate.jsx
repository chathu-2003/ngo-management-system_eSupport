 import React, { useState, useEffect } from 'react';

// NOTE: paste your existing base64 logo string back in here — omitted for length.
const LOGO_SRC = "/src/assets/logo.jpeg";

const CATEGORIES = [
  'Education',
  'Healthcare',
  'Women Empowerment',
  'Emergency Relief',
  'Environmental Projects',
  'Animal Welfare',
  'Small Business Support',
  'General Fund'
];

const RECOGNITION_TIERS = [
  { key: 'gold', label: 'Gold', min: 300, color: '#d4a017' },
  { key: 'silver', label: 'Silver', min: 100, color: '#9aa0a6' },
  { key: 'bronze', label: 'Bronze', min: 50, color: '#b56a3a' },
  { key: 'anonymous', label: 'Anonymous', min: 0, color: '#8b8b96' }
];

const PAYMENT_METHODS = [
  { key: 'visa', label: 'Visa', icon: 'fa-brands fa-cc-visa' },
  { key: 'mastercard', label: 'Mastercard', icon: 'fa-brands fa-cc-mastercard' },
  { key: 'amex', label: 'Amex', icon: 'fa-brands fa-cc-amex' },
  { key: 'paypal', label: 'PayPal', icon: 'fa-brands fa-cc-paypal' },
  { key: 'bank', label: 'Bank Transfer', icon: 'fa-solid fa-building-columns' }
];

function suggestedTier(amount) {
  if (amount >= RECOGNITION_TIERS[0].min) return 'gold';
  if (amount >= RECOGNITION_TIERS[1].min) return 'silver';
  if (amount >= RECOGNITION_TIERS[2].min) return 'bronze';
  return 'bronze';
}

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);

  // One-Time vs Recurring, with a sub-frequency for recurring
  const [donationType, setDonationType] = useState('One Time'); // 'One Time' | 'Recurring'
  const [recurringFrequency, setRecurringFrequency] = useState('Monthly'); // Monthly | Quarterly | Yearly

  const [category, setCategory] = useState(CATEGORIES[CATEGORIES.length - 1]);
  const [paymentMethod, setPaymentMethod] = useState('visa');

  const [sendReceipt, setSendReceipt] = useState(true);
  const [sendThankYou, setSendThankYou] = useState(true);

  const [recognitionTier, setRecognitionTier] = useState('bronze');
  const [tierTouched, setTierTouched] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cardNumber: '',
    cvc: '',
    cardholderName: '',
    expiration: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [causes, setCauses] = useState([]);
  const [selectedCauseId, setSelectedCauseId] = useState(null);
  const [donateMsg, setDonateMsg] = useState('');

  const amounts = [50, 100, 200, 300, 400];

  // Auto-suggest a recognition tier as the amount changes, unless the donor picked one manually
  useEffect(() => {
    if (!tierTouched) {
      setRecognitionTier(suggestedTier(selectedAmount || 0));
    }
  }, [selectedAmount, tierTouched]);

  const handleAmountClick = (amt) => {
    setSelectedAmount(amt);
    setIsCustom(false);
    setCustomAmount('');
  };

  const handleCustomFocus = () => {
    setIsCustom(true);
  };

  const handleCustomChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomAmount(val);
    setSelectedAmount(val ? Number(val) : 0);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleTierPick = (key) => {
    setRecognitionTier(key);
    setTierTouched(true);
  };

  useEffect(() => {
    getCauses().then(res => {
      setCauses(res.data || []);
      if (res.data && res.data.length > 0) setSelectedCauseId(res.data[0].id);
    }).catch(() => {});
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Donation Submitted:', { ...formData, amount: selectedAmount, frequency, paymentMethod });
    alert(`Thank you for your generous donation of $${selectedAmount}!`);
  };

  // Load Font Awesome so all icons actually render
  useEffect(() => {
    const existing = document.getElementById('fa-icons-cdn');
    if (!existing) {
      const link = document.createElement('link');
      link.id = 'fa-icons-cdn';
      link.rel = 'stylesheet';
      link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css';
      document.head.appendChild(link);
    }
  }, []);

  const recentCauses = [
    {
      title: 'Clothes For Everyone',
      raised: 23785,
      goal: 87563,
      img: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=200'
    },
    {
      title: 'New Kindergarten',
      raised: 45210,
      goal: 20898,
      img: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=200'
    },
    {
      title: 'Food for Children',
      raised: 30635,
      goal: 50658,
      img: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=200'
    }
  ];

  // Demo data for the Donor Recognition Wall preview
  const recognitionWallDonors = [
    { name: 'Anonymous', tier: 'gold' },
    { name: 'S. Perera', tier: 'gold' },
    { name: 'N. Fernando', tier: 'silver' },
    { name: 'Anonymous', tier: 'silver' },
    { name: 'K. Jayasuriya', tier: 'bronze' },
    { name: 'D. Wickramasinghe', tier: 'bronze' }
  ];

  const tags = ['Charity', 'African people', 'Community', 'Food', 'Clean Water', 'Education', 'Health', 'Volunteers', 'Homeless child'];

  return (
    <div style={styles.bodyWrapper}>
      {/* --- INLINE RESPONSIVE CSS & HOVER OVERRIDES --- */}
      <style>{`
        @media (max-width: 992px) {
          .nav-links { display: none !important; }
          .donate-layout { grid-template-columns: 1fr !important; }
          .amount-grid { grid-template-columns: repeat(3, 1fr) !important; }
          .footer-inner { grid-template-columns: repeat(2, 1fr) !important; gap: 40px !important; }
        }
        @media (max-width: 600px) {
          .form-grid-2 { grid-template-columns: 1fr !important; }
          .amount-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .payment-methods-row { flex-direction: column !important; gap: 12px !important; }
          .payment-card-row { grid-template-columns: repeat(2, 1fr) !important; }
          .footer-inner { grid-template-columns: 1fr !important; }
          .footer-bottom-inner { flex-direction: column !important; gap: 15px !important; text-align: center; }
        }
        .social-link-item:hover {
          background-color: #e64a19 !important;
          color: #ffffff !important;
        }
        .tag-pill:hover {
          background-color: #e64a19 !important;
          color: #ffffff !important;
        }
        .amount-btn:hover {
          border-color: #e64a19 !important;
        }
        .payment-card:hover {
          border-color: #e64a19 !important;
        }
        .tier-pill:hover {
          border-color: #e64a19 !important;
        }
      `}</style>

      {/* --- HEADER NAVIGATION --- */}
      <header style={styles.header}>
        <div style={styles.navContainer}>
          <Link to="/" style={styles.logoArea}>
            <div style={styles.logoCircleWrapper}>
              <img src={LOGO_SRC} alt="Empower Hopes Logo" style={styles.logoImg} />
            </div>
            <div style={styles.logoText}>
              <span style={styles.logoTitle}>EMPOWER HOPES</span>
              <span style={styles.logoSubtitle}>HUMANITARIAN NETWORK</span>
            </div>
          </Link>

          <nav className="nav-links">
            <ul style={styles.navUl}>
              <li><Link to="/" style={styles.navLink}>Home</Link></li>
              <li><Link to="/causes" style={styles.navLink}>Causes</Link></li>
              <li><Link to="/events" style={styles.navLink}>Events</Link></li>
              <li><Link to="/gallery" style={styles.navLink}>Portfolio</Link></li>
              <li><Link to="/about" style={styles.navLink}>About</Link></li>
              <li><Link to="/blog" style={styles.navLink}>Blog</Link></li>
            </ul>
          </nav>

          <div style={styles.navRight}>
            <i className="fa-solid fa-magnifying-glass" style={styles.navIcon}></i>
            <i className="fa-solid fa-user" style={styles.navIcon}></i>
            <Link to="/donate" style={styles.btnDonate}>DONATE NOW</Link>
          </div>
        </div>
      </header>

      {/* --- MAIN DONATE LAYOUT --- */}
      <section className="donate-layout" style={styles.donateLayout}>
        {/* ---------- LEFT: DONATION FORM ---------- */}
        <div style={styles.formCard}>
          <form onSubmit={handleSubmit}>

            {/* ---- Category selection ---- */}
            <h2 style={styles.sectionTitle}>Choose a Cause</h2>
            <div style={styles.formGroup}>
              <label style={styles.label} htmlFor="category">Donation Category</label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                style={styles.select}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* ---- Amount ---- */}
            <h2 style={{ ...styles.sectionTitle, marginTop: '30px' }}>How Much Would You Like To Donate ?</h2>
            <div className="amount-grid" style={styles.amountGrid}>
              {amounts.map((amt) => (
                <button
                  type="button"
                  key={amt}
                  className="amount-btn"
                  onClick={() => handleAmountClick(amt)}
                  style={{
                    ...styles.amountBtn,
                    ...(selectedAmount === amt && !isCustom ? styles.amountBtnActive : {})
                  }}
                >
                  {amt}$
                </button>
              ))}
              <input
                type="text"
                placeholder="Other your amount$"
                value={customAmount}
                onFocus={handleCustomFocus}
                onChange={handleCustomChange}
                style={{
                  ...styles.amountBtn,
                  ...styles.customAmountInput,
                  ...(isCustom ? styles.amountBtnActive : {})
                }}
              />
            </div>

            {/* ---- One-Time / Recurring ---- */}
            <h3 style={styles.subHeading}>I want to make this a</h3>
            <div style={styles.radioRow}>
              {['One Time', 'Recurring'].map((type) => (
                <label key={type} style={styles.radioLabel}>
                  <span
                    style={{
                      ...styles.radioCircle,
                      ...(donationType === type ? styles.radioCircleActive : {})
                    }}
                    onClick={() => setDonationType(type)}
                  >
                    {donationType === type && <span style={styles.radioDot}></span>}
                  </span>
                  <span onClick={() => setDonationType(type)} style={{ cursor: 'pointer' }}>{type} Donation</span>
                </label>
              ))}
            </div>

            {donationType === 'Recurring' && (
              <div style={{ ...styles.radioRow, marginTop: '14px' }}>
                {['Monthly', 'Quarterly', 'Yearly'].map((freq) => (
                  <label key={freq} style={styles.radioLabel}>
                    <span
                      style={{
                        ...styles.radioCircle,
                        ...(recurringFrequency === freq ? styles.radioCircleActive : {})
                      }}
                      onClick={() => setRecurringFrequency(freq)}
                    >
                      {recurringFrequency === freq && <span style={styles.radioDot}></span>}
                    </span>
                    <span onClick={() => setRecurringFrequency(freq)} style={{ cursor: 'pointer' }}>{freq}</span>
                  </label>
                ))}
              </div>
            )}

            {/* ---- Personal info ---- */}
            <h3 style={styles.subHeading}>Personal Info</h3>
            <div className="form-grid-2" style={styles.formGrid2}>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" placeholder="Your First Name" value={formData.firstName} onChange={handleChange} required style={styles.input} />
              </div>
              <div style={styles.formGroup}>
                <label style={styles.label} htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" placeholder="Your Last Name" value={formData.lastName} onChange={handleChange} required style={styles.input} />
              </div>
              <div style={{ ...styles.formGroup, gridColumn: 'span 2' }}>
                <label style={styles.label} htmlFor="email">Email Address</label>
                <input type="email" id="email" placeholder="Your Email Address" value={formData.email} onChange={handleChange} required style={styles.input} />
              </div>
            </div>

            {/* ---- Payment methods ---- */}
            <h3 style={styles.subHeading}>Select Payment Method</h3>
            <div className="payment-card-row" style={styles.paymentCardRow}>
              {PAYMENT_METHODS.map((method) => (
                <div
                  key={method.key}
                  className="payment-card"
                  onClick={() => setPaymentMethod(method.key)}
                  style={{
                    ...styles.paymentCard,
                    ...(paymentMethod === method.key ? styles.paymentCardActive : {})
                  }}
                >
                  <i className={method.icon} style={styles.paymentCardIcon}></i>
                  <span style={styles.paymentCardLabel}>{method.label}</span>
                </div>
              ))}
            </div>

            {paymentMethod === 'visa' || paymentMethod === 'mastercard' || paymentMethod === 'amex' ? (
              <>
                <h3 style={styles.subHeading}>Card Info</h3>
                <div className="form-grid-2" style={styles.formGrid2}>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="cardNumber">Card Number</label>
                    <input type="text" id="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="cvc">CVC</label>
                    <input type="text" id="cvc" placeholder="CVC" value={formData.cvc} onChange={handleChange} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="cardholderName">Cardholder Name</label>
                    <input type="text" id="cardholderName" placeholder="Cardholder Name" value={formData.cardholderName} onChange={handleChange} style={styles.input} />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.label} htmlFor="expiration">Expiration</label>
                    <input type="date" id="expiration" value={formData.expiration} onChange={handleChange} style={styles.input} />
                  </div>
                </div>
              </>
            ) : paymentMethod === 'bank' ? (
              <p style={styles.helperText}>You'll receive our bank account details by email once you submit this form.</p>
            ) : (
              <p style={styles.helperText}>You'll be redirected to PayPal to complete your donation securely.</p>
            )}

            {/* ---- Receipt / thank-you preferences ---- */}
            <h3 style={styles.subHeading}>Confirmation</h3>
            <div style={styles.checkboxCol}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={sendReceipt}
                  onChange={(e) => setSendReceipt(e.target.checked)}
                  style={styles.checkboxInput}
                />
                Email me an automatic donation receipt
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={sendThankYou}
                  onChange={(e) => setSendThankYou(e.target.checked)}
                  style={styles.checkboxInput}
                />
                Send me a thank-you email
              </label>
            </div>

            {/* ---- Donor recognition wall ---- */}
            <h3 style={styles.subHeading}>Donor Recognition Wall</h3>
            <p style={styles.helperText}>Choose how you'd like to appear on our public donor wall. Based on your amount, we suggest <strong style={{ textTransform: 'capitalize' }}>{suggestedTier(selectedAmount || 0)}</strong>.</p>
            <div style={styles.tierRow}>
              {RECOGNITION_TIERS.map((tier) => (
                <div
                  key={tier.key}
                  className="tier-pill"
                  onClick={() => handleTierPick(tier.key)}
                  style={{
                    ...styles.tierPill,
                    ...(recognitionTier === tier.key ? { ...styles.tierPillActive, borderColor: tier.color } : {})
                  }}
                >
                  <span style={{ ...styles.tierDot, backgroundColor: tier.color }}></span>
                  {tier.label}
                </div>
              ))}
            </div>

            <div style={styles.totalRow}>
              <div>
                <div style={styles.totalLabel}>Total donation</div>
                <div style={styles.totalAmount}>${selectedAmount || 0}</div>
                {donationType === 'Recurring' && (
                  <div style={styles.totalSub}>billed {recurringFrequency.toLowerCase()}</div>
                )}
              </div>
              {donateMsg && (
                <p style={{ color: donateMsg.includes('success') || donateMsg.includes('Thank') ? '#3cd49b' : '#ff544a', margin: '10px 0', fontWeight: 600 }}>{donateMsg}</p>
              )}
              <button type="submit" style={styles.btnDonationNow}>DONATION NOW</button>
            </div>
          </form>
        </div>

        {/* ---------- RIGHT: SIDEBAR ---------- */}
        <aside style={styles.sidebar}>
          <div style={styles.sidebarBlock}>
            <h3 style={styles.sidebarHeading}><span style={styles.sidebarBar}></span>Search Causes</h3>
            <div style={styles.searchBox}>
              <input
                type="text"
                placeholder="Search key word"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={styles.searchInput}
              />
              <button style={styles.searchBtn}><i className="fa-solid fa-magnifying-glass"></i></button>
            </div>
          </div>

          <div style={styles.sidebarBlock}>
            <h3 style={styles.sidebarHeading}><span style={styles.sidebarBar}></span>Recent Causes</h3>
            {recentCauses.map((cause, i) => {
              const pct = Math.min(100, Math.round((cause.raised / cause.goal) * 100));
              return (
                <div key={i} style={styles.causeItem}>
                  <img src={cause.img} alt={cause.title} style={styles.causeImg} />
                  <div style={{ flex: 1 }}>
                    <div style={styles.causeTitle}>{cause.title}</div>
                    <div style={styles.causeStat}><i className="fa-solid fa-chart-line" style={styles.causeIconGreen}></i> Raised : ${cause.raised.toLocaleString()}</div>
                    <div style={styles.causeStat}><i className="fa-solid fa-bullseye" style={styles.causeIconRed}></i> Goal : ${cause.goal.toLocaleString()}</div>
                    <div style={styles.progressTrack}>
                      <div style={{ ...styles.progressFill, width: `${pct}%` }}></div>
                    </div>
                    <div style={styles.progressPct}>{pct}% funded</div>
                  </div>
                </div>
              );
            })}
          </div>

          <div style={styles.sidebarBlock}>
            <h3 style={styles.sidebarHeading}><span style={styles.sidebarBar}></span>Donor Recognition Wall</h3>
            {['gold', 'silver', 'bronze'].map((tierKey) => {
              const tier = RECOGNITION_TIERS.find((t) => t.key === tierKey);
              const donors = recognitionWallDonors.filter((d) => d.tier === tierKey);
              if (!donors.length) return null;
              return (
                <div key={tierKey} style={{ marginBottom: '16px' }}>
                  <div style={styles.wallTierHeading}>
                    <span style={{ ...styles.tierDot, backgroundColor: tier.color }}></span>
                    {tier.label} Donors
                  </div>
                  <ul style={styles.wallList}>
                    {donors.map((d, i) => (
                      <li key={i} style={styles.wallListItem}>{d.name}</li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>

          <div style={styles.sidebarBlock}>
            <h3 style={styles.sidebarHeading}><span style={styles.sidebarBar}></span>Tags</h3>
            <div style={styles.tagsWrap}>
              {tags.map((tag) => (
                <span key={tag} className="tag-pill" style={styles.tagPill}>{tag}</span>
              ))}
            </div>
          </div>

          <div style={styles.ctaBanner}>
            <p style={styles.ctaText}>We have provided financial help to 5 million people</p>
            <Link to="/causes" style={styles.ctaBtn}>DONATE NOW</Link>
          </div>
        </aside>
      </section>

      {/* --- GLOBAL FOOTER --- */}
      <footer style={styles.footer}>
        <div className="footer-inner" style={styles.footerInner}>
          <div style={styles.footerBrand}>
            <div style={{ ...styles.logoArea, padding: 0, marginBottom: '20px' }}>
              <div style={styles.logoCircleWrapper}>
                <img src={LOGO_SRC} alt="Empower Hopes Logo" style={styles.logoImg} />
              </div>
              <div style={styles.logoText}>
                <span style={{ ...styles.logoTitle, color: '#ffffff' }}>EMPOWER HOPES</span>
                <span style={{ ...styles.logoSubtitle, color: '#a0aec0' }}>HUMANITARIAN NETWORK</span>
              </div>
            </div>
            <p style={styles.footerBrandText}>Wimply dummy text of the priatype industry orem Ipsum has Maecenas quis eros at ante lacinia efficitur.</p>
            <div style={styles.socialLinks}>
              <a href="#" className="social-link-item" style={styles.socialIcon}><i className="fa-brands fa-facebook-f"></i></a>
              <a href="#" className="social-link-item" style={styles.socialIcon}><i className="fa-brands fa-twitter"></i></a>
              <a href="#" className="social-link-item" style={styles.socialIcon}><i className="fa-brands fa-google-plus-g"></i></a>
              <a href="#" className="social-link-item" style={styles.socialIcon}><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerColHeading}>About</h4>
            <ul style={styles.footerUl}>
              <li><Link to="/" style={styles.footerLink}>Home</Link></li>
              <li><Link to="/donate" style={styles.footerLink}>Donation</Link></li>
              <li><Link to="/about" style={styles.footerLink}>About us</Link></li>
              <li><Link to="/events" style={styles.footerLink}>Event</Link></li>
              <li><Link to="/marketplace" style={styles.footerLink}>Features</Link></li>
            </ul>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerColHeading}>Quick links</h4>
            <ul style={styles.footerUl}>
              <li><Link to="/causes" style={styles.footerLink}>Causes</Link></li>
              <li><Link to="/about" style={styles.footerLink}>About</Link></li>
              <li><Link to="/causes" style={styles.footerLink}>New campaign</Link></li>
              <li><Link to="/" style={styles.footerLink}>Site map</Link></li>
              <li><Link to="/blog" style={styles.footerLink}>Stories</Link></li>
            </ul>
          </div>

          <div style={styles.footerCol}>
            <h4 style={styles.footerColHeading}>Explore</h4>
            <ul style={styles.footerUl}>
              <li><Link to="/donate" style={styles.footerLink}>Donate</Link></li>
              <li><Link to="/causes" style={styles.footerLink}>Campaigns</Link></li>
              <li><Link to="/donate" style={styles.footerLink}>Fundraise</Link></li>
              <li><Link to="/register" style={styles.footerLink}>Volunteers</Link></li>
              <li><Link to="/causes" style={styles.footerLink}>Sponsors</Link></li>
            </ul>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <div className="footer-bottom-inner" style={styles.footerBottomInner}>
            <div style={styles.paymentMethods}>
              <span style={{ marginRight: '10px' }}>Donate by :</span>
              <i className="fa-brands fa-cc-visa" style={styles.paymentIcon}></i>
              <i className="fa-brands fa-cc-mastercard" style={styles.paymentIcon}></i>
              <i className="fa-brands fa-cc-amex" style={styles.paymentIcon}></i>
              <i className="fa-brands fa-cc-paypal" style={styles.paymentIcon}></i>
              <i className="fa-solid fa-building-columns" style={styles.paymentIcon}></i>
            </div>
            <p style={{ margin: 0 }}>Copyright 2026 All Right Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* --- STYLING OBJECTS --- */
const styles = {
  bodyWrapper: {
    color: '#1f2238',
    backgroundColor: '#ffffff',
    lineHeight: '1.6',
    boxSizing: 'border-box'
  },
  header: {
    background: '#ffffff',
    boxShadow: '0 2px 15px rgba(0,0,0,0.03)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    padding: '5px 0'
  },
  navContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px'
  },
  logoArea: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    textDecoration: 'none'
  },
  logoCircleWrapper: {
    width: '52px',
    height: '52px',
    borderRadius: '50%',
    overflow: 'hidden',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#ffffff',
    border: '1px solid #f0f0f0'
  },
  logoImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  logoText: {
    display: 'flex',
    flexDirection: 'column'
  },
  logoTitle: {
    fontWeight: '800',
    fontSize: '18px',
    color: '#082446',
    letterSpacing: '0.3px',
    lineHeight: '1.1'
  },
  logoSubtitle: {
    fontSize: '10.5px',
    color: '#606f7b',
    fontWeight: '700',
    letterSpacing: '0.8px',
    marginTop: '2px'
  },
  navUl: {
    display: 'flex',
    listStyle: 'none',
    gap: '32px',
    padding: 0,
    margin: 0
  },
  navLink: {
    textDecoration: 'none',
    color: '#082446',
    fontWeight: '700',
    fontSize: '15.5px',
    transition: 'color 0.25s ease'
  },
  navLinkActive: {
    color: '#e64a19'
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
    gap: '24px'
  },
  navIcon: {
    color: '#082446',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'color 0.25s ease'
  },
  btnDonate: {
    backgroundColor: '#e64a19',
    color: '#ffffff',
    padding: '12px 28px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '14px',
    letterSpacing: '0.5px',
    boxShadow: '0 4px 14px rgba(230, 74, 25, 0.3)',
    transition: 'transform 0.2s ease, background 0.2s ease'
  },
  donateLayout: {
    maxWidth: '1200px',
    margin: '50px auto',
    padding: '0 20px',
    display: 'grid',
    gridTemplateColumns: '65% 35%',
    gap: '40px',
    alignItems: 'start'
  },
  formCard: {
    backgroundColor: '#fdf6f5',
    padding: '45px',
    borderRadius: '15px'
  },
  sectionTitle: {
    fontSize: '24px',
    fontWeight: '800',
    color: '#1f2238',
    marginBottom: '20px'
  },
  subHeading: {
    fontSize: '19px',
    fontWeight: '800',
    color: '#1f2238',
    margin: '30px 0 16px 0'
  },
  amountGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '12px'
  },
  amountBtn: {
    padding: '14px 8px',
    textAlign: 'center',
    borderRadius: '8px',
    border: '1px solid #e8dedd',
    backgroundColor: '#ffffff',
    fontWeight: '700',
    fontSize: '14px',
    color: '#1f2238',
    cursor: 'pointer',
    outline: 'none'
  },
  amountBtnActive: {
    backgroundColor: '#e64a19',
    color: '#ffffff',
    borderColor: '#e64a19'
  },
  customAmountInput: {
    gridColumn: 'span 2',
    fontWeight: '600'
  },
  radioRow: {
    display: 'flex',
    gap: '30px',
    flexWrap: 'wrap'
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#1f2238'
  },
  radioCircle: {
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    border: '2px solid #cfc3c1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    flexShrink: 0
  },
  radioCircleActive: {
    borderColor: '#e64a19'
  },
  radioDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    backgroundColor: '#e64a19'
  },
  formGrid2: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '20px'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
  },
  label: {
    fontWeight: '600',
    fontSize: '14px',
    color: '#1f2238'
  },
  input: {
    width: '100%',
    padding: '14px 18px',
    border: '1px solid transparent',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box'
  },
  select: {
    width: '100%',
    padding: '14px 18px',
    border: '1px solid transparent',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    fontSize: '14px',
    outline: 'none',
    boxSizing: 'border-box',
    fontWeight: '600',
    color: '#1f2238',
    cursor: 'pointer'
  },
  helperText: {
    fontSize: '13.5px',
    color: '#666666',
    margin: '0 0 6px 0'
  },
  paymentCardRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, 1fr)',
    gap: '12px'
  },
  paymentCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '16px 8px',
    borderRadius: '8px',
    border: '1px solid #e8dedd',
    backgroundColor: '#ffffff',
    cursor: 'pointer'
  },
  paymentCardActive: {
    borderColor: '#e64a19',
    backgroundColor: '#fff0eb'
  },
  paymentCardIcon: {
    fontSize: '26px',
    color: '#1f2238'
  },
  paymentCardLabel: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#1f2238',
    textAlign: 'center'
  },
  checkboxCol: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  checkboxLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '14.5px',
    fontWeight: '600',
    color: '#1f2238',
    cursor: 'pointer'
  },
  checkboxInput: {
    width: '18px',
    height: '18px',
    accentColor: '#e64a19',
    cursor: 'pointer'
  },
  tierRow: {
    display: 'flex',
    gap: '12px',
    flexWrap: 'wrap'
  },
  tierPill: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 18px',
    borderRadius: '999px',
    border: '1.5px solid #e8dedd',
    backgroundColor: '#ffffff',
    fontSize: '14px',
    fontWeight: '700',
    color: '#1f2238',
    cursor: 'pointer'
  },
  tierPillActive: {
    backgroundColor: '#fff0eb'
  },
  tierDot: {
    width: '10px',
    height: '10px',
    borderRadius: '50%',
    display: 'inline-block'
  },
  totalRow: {
    marginTop: '35px',
    paddingTop: '25px',
    borderTop: '1px solid #e8dedd',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '20px'
  },
  totalLabel: {
    fontSize: '15px',
    fontWeight: '600',
    color: '#666666'
  },
  totalAmount: {
    fontSize: '30px',
    fontWeight: '800',
    color: '#e64a19'
  },
  totalSub: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#666666',
    marginTop: '2px'
  },
  btnDonationNow: {
    backgroundColor: '#e64a19',
    color: '#ffffff',
    border: '2px dashed #ffffff',
    outline: '2px solid #e64a19',
    outlineOffset: '-6px',
    padding: '16px 35px',
    fontSize: '15px',
    fontWeight: '700',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  sidebar: {
    display: 'flex',
    flexDirection: 'column',
    gap: '35px'
  },
  sidebarBlock: {},
  sidebarHeading: {
    fontSize: '20px',
    fontWeight: '800',
    color: '#1f2238',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  sidebarBar: {
    width: '4px',
    height: '20px',
    backgroundColor: '#e64a19',
    display: 'inline-block',
    borderRadius: '2px'
  },
  searchBox: {
    display: 'flex',
    borderRadius: '6px',
    overflow: 'hidden'
  },
  searchInput: {
    flex: 1,
    padding: '14px 18px',
    border: 'none',
    backgroundColor: '#f7f5f5',
    fontSize: '14px',
    outline: 'none'
  },
  searchBtn: {
    backgroundColor: '#e64a19',
    color: '#ffffff',
    border: 'none',
    padding: '0 20px',
    cursor: 'pointer',
    fontSize: '15px'
  },
  causeItem: {
    display: 'flex',
    gap: '14px',
    alignItems: 'flex-start',
    marginBottom: '22px'
  },
  causeImg: {
    width: '70px',
    height: '70px',
    borderRadius: '8px',
    objectFit: 'cover',
    flexShrink: 0
  },
  causeTitle: {
    fontSize: '15.5px',
    fontWeight: '700',
    color: '#1f2238',
    marginBottom: '6px'
  },
  causeStat: {
    fontSize: '13px',
    color: '#666666',
    marginBottom: '2px'
  },
  causeIconGreen: {
    color: '#10b981',
    marginRight: '4px'
  },
  causeIconRed: {
    color: '#ef4444',
    marginRight: '4px'
  },
  progressTrack: {
    width: '100%',
    height: '7px',
    backgroundColor: '#eee2e0',
    borderRadius: '999px',
    overflow: 'hidden',
    marginTop: '8px'
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#e64a19',
    borderRadius: '999px'
  },
  progressPct: {
    fontSize: '12px',
    fontWeight: '700',
    color: '#e64a19',
    marginTop: '4px'
  },
  wallTierHeading: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    fontWeight: '800',
    color: '#1f2238',
    marginBottom: '8px'
  },
  wallList: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  wallListItem: {
    fontSize: '13.5px',
    color: '#444444',
    padding: '5px 0',
    borderBottom: '1px dashed #eee2e0'
  },
  tagsWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '10px'
  },
  tagPill: {
    padding: '8px 16px',
    backgroundColor: '#f7f5f5',
    borderRadius: '4px',
    fontSize: '13px',
    fontWeight: '600',
    color: '#1f2238',
    cursor: 'pointer',
    transition: 'all 0.2s ease'
  },
  ctaBanner: {
    position: 'relative',
    borderRadius: '10px',
    overflow: 'hidden',
    padding: '35px 25px',
    minHeight: '220px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: '18px',
    backgroundImage: 'linear-gradient(rgba(20,20,23,0.55), rgba(20,20,23,0.75)), url(https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=500)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  },
  ctaText: {
    color: '#ffffff',
    fontSize: '20px',
    fontWeight: '700',
    lineHeight: '1.4',
    margin: 0
  },
  ctaBtn: {
    backgroundColor: '#e64a19',
    color: '#ffffff',
    padding: '14px 28px',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: '700',
    fontSize: '14px',
    letterSpacing: '0.5px',
    alignSelf: 'flex-start'
  },
  footer: {
    backgroundColor: '#141417',
    color: '#b5b5be',
    padding: '80px 0 0 0',
    fontSize: '14px'
  },
  footerInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 20px 60px 20px',
    display: 'grid',
    gridTemplateColumns: '34% 22% 22% 22%',
    gap: '30px'
  },
  footerColHeading: {
    color: '#ffffff',
    fontSize: '16px',
    fontWeight: '700',
    marginBottom: '25px'
  },
  footerBrand: {
    display: 'flex',
    flexDirection: 'column'
  },
  footerBrandText: {
    margin: '20px 0',
    lineHeight: '1.6'
  },
  socialLinks: {
    display: 'flex',
    gap: '15px'
  },
  socialIcon: {
    width: '42px',
    height: '42px',
    background: '#242427',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#8b8b96',
    textDecoration: 'none',
    fontSize: '16px',
    transition: 'all 0.25s ease'
  },
  footerUl: {
    listStyle: 'none',
    padding: 0,
    margin: 0
  },
  footerLink: {
    color: '#b5b5be',
    textDecoration: 'none',
    display: 'inline-block',
    marginBottom: '12px'
  },
  footerBottom: {
    borderTop: '1px solid rgba(255,255,255,0.05)',
    padding: '25px 20px'
  },
  footerBottomInner: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  paymentMethods: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  paymentIcon: {
    fontSize: '24px',
    color: '#b5b5be'
  }
};