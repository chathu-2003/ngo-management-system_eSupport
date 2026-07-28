require('dotenv').config();
const { sequelize, Cause, Event, Gallery, User, SiteSettings } = require('../models');

const seed = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });

    // Admin user
    const adminExists = await User.findOne({ where: { email: 'admin@esupport.lk' } });
    if (!adminExists) {
      await User.create({
        name: 'Admin',
        email: 'admin@esupport.lk',
        password: 'admin123',
        role: 'admin',
      });
      console.log('Admin user created: admin@esupport.lk / admin123');
    }

    // Sample Causes
    const causeCount = await Cause.count();
    if (causeCount === 0) {
      await Cause.bulkCreate([
        {
          title: 'Education for Children',
          description: 'Help provide quality education to underprivileged children across Sri Lanka.',
          goal: 500000,
          raised: 320000,
          color: '#ff544a',
        },
        {
          title: 'Clean Water Project',
          description: 'Providing safe and clean drinking water to rural communities.',
          goal: 750000,
          raised: 415000,
          color: '#ffb83b',
        },
        {
          title: 'Medical Aid Fund',
          description: 'Supporting families who cannot afford medical treatment.',
          goal: 1000000,
          raised: 680000,
          color: '#3cd49b',
        },
      ]);
      console.log('Sample causes seeded.');
    }

    // Sample Events
    const eventCount = await Event.count();
    if (eventCount === 0) {
      await Event.bulkCreate([
        {
          title: 'Annual Charity Run 2025',
          description: 'Join us for our annual charity run to raise funds for education.',
          date: new Date('2025-09-15'),
          location: 'Viharamahadevi Park, Colombo',
          attendees: 0,
        },
        {
          title: 'Community Health Camp',
          description: 'Free medical checkups and health awareness programs.',
          date: new Date('2025-10-05'),
          location: 'Gampaha District',
          attendees: 0,
        },
      ]);
      console.log('Sample events seeded.');
    }

    // Default Site Settings (singleton)
    const settingsExists = await SiteSettings.findByPk(1);
    if (!settingsExists) {
      await SiteSettings.create({
        id: 1,
        registrationNumber: 'PVT/NGO/0000/2020',
        legalStatus: 'Registered Non-Governmental Organization, Sri Lanka',
        missionStatement: 'To empower underprivileged communities through education, healthcare, and economic opportunity.',
        visionStatement: 'A Sri Lanka where every individual has the opportunity to thrive.',
        history: 'Empower Hopes Humanitarian Network was founded to bridge the gap between communities in need and the resources that can transform their lives.',
        foundedYear: 2020,
        address: 'Colombo, Sri Lanka',
        phone: '+94 11 234 5678',
        email: 'info@esupport.lk',
        whatsappNumber: '+94 77 123 4567',
        beneficiariesCount: 5000,
        privacyPolicy: 'We respect your privacy and are committed to protecting your personal data.',
        termsOfUse: 'By using this website, you agree to the following terms and conditions.',
        refundPolicy: 'Donations are generally non-refundable. Contact us within 7 days for exceptional circumstances.',
      });
      console.log('Default site settings seeded.');
    }

    console.log('Seed complete.');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
};

seed();
