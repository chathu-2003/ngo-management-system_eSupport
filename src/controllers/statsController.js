const { Donation, Volunteer, Cause, Event, SiteSettings } = require('../models');

exports.getImpact = async (req, res, next) => {
  try {
    const [totalRaised, totalVolunteers, totalCauses, totalEvents, settings] = await Promise.all([
      Donation.sum('amount', { where: { status: 'completed' } }),
      Volunteer.count({ where: { status: 'approved' } }),
      Cause.count({ where: { isActive: true } }),
      Event.count({ where: { isActive: true } }),
      SiteSettings.findByPk(1),
    ]);

    res.json({
      success: true,
      data: {
        totalRaised: totalRaised || 0,
        totalVolunteers,
        totalProjects: totalCauses,
        totalEvents,
        totalBeneficiaries: settings ? settings.beneficiariesCount : 0,
      },
    });
  } catch (err) {
    next(err);
  }
};
