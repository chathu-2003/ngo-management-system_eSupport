const {
  Contact, Volunteer, Cause, Event, Donation, User,
  MarketplaceItem, Gallery, Blog, Newsletter, Task, LoanApplication, Inquiry, Partner, Testimonial,
} = require('../models');

exports.getStats = async (req, res, next) => {
  try {
    const [
      totalContacts, pendingContacts,
      totalVolunteers, pendingVolunteers, approvedVolunteers,
      totalCauses, totalEvents,
      totalDonations, totalUsers,
      totalGallery, totalMarketplace,
      totalBlogs, publishedBlogs,
      totalNewsletters, activeNewsletters,
      totalTasks, openTasks, completedTasks,
      totalLoans, pendingLoans, approvedLoans,
      totalInquiries, pendingInquiries,
      totalPartners, totalTestimonials,
    ] = await Promise.all([
      Contact.count(),
      Contact.count({ where: { status: 'pending' } }),
      Volunteer.count(),
      Volunteer.count({ where: { status: 'pending' } }),
      Volunteer.count({ where: { status: 'approved' } }),
      Cause.count({ where: { isActive: true } }),
      Event.count({ where: { isActive: true } }),
      Donation.count({ where: { status: 'completed' } }),
      User.count(),
      Gallery.count({ where: { isActive: true } }),
      MarketplaceItem.count({ where: { isAvailable: true } }),
      Blog.count(),
      Blog.count({ where: { status: 'published' } }),
      Newsletter.count(),
      Newsletter.count({ where: { isActive: true } }),
      Task.count({ where: { isActive: true } }),
      Task.count({ where: { status: 'open', isActive: true } }),
      Task.count({ where: { status: 'completed', isActive: true } }),
      LoanApplication.count(),
      LoanApplication.count({ where: { status: 'pending' } }),
      LoanApplication.count({ where: { status: 'approved' } }),
      Inquiry.count(),
      Inquiry.count({ where: { status: 'pending' } }),
      Partner.count({ where: { isActive: true } }),
      Testimonial.count({ where: { isActive: true } }),
    ]);

    const totalRaised = await Donation.sum('amount', { where: { status: 'completed' } });

    res.json({
      success: true,
      data: {
        contacts: { total: totalContacts, pending: pendingContacts },
        volunteers: { total: totalVolunteers, pending: pendingVolunteers, approved: approvedVolunteers },
        causes: { total: totalCauses },
        events: { total: totalEvents },
        donations: { total: totalDonations, totalRaised: totalRaised || 0 },
        users: { total: totalUsers },
        gallery: { total: totalGallery },
        marketplace: { total: totalMarketplace },
        blogs: { total: totalBlogs, published: publishedBlogs },
        newsletter: { total: totalNewsletters, active: activeNewsletters },
        tasks: { total: totalTasks, open: openTasks, completed: completedTasks },
        loans: { total: totalLoans, pending: pendingLoans, approved: approvedLoans },
        inquiries: { total: totalInquiries, pending: pendingInquiries },
        partners: { total: totalPartners },
        testimonials: { total: totalTestimonials },
      },
    });
  } catch (err) {
    next(err);
  }
};
