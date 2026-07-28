const { validationResult } = require('express-validator');
const { Event, EventRegistration } = require('../models');
const { Op } = require('sequelize');

exports.getAll = async (req, res, next) => {
  try {
    const { upcoming } = req.query;
    const where = { isActive: true };
    if (upcoming === 'true') {
      where.date = { [Op.gte]: new Date() };
    }

    const events = await Event.findAll({
      where,
      order: [['date', 'ASC']],
    });

    res.json({ success: true, data: events });
  } catch (err) {
    next(err);
  }
};

exports.getOne = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event || !event.isActive) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }
    res.json({ success: true, data: event });
  } catch (err) {
    next(err);
  }
};

exports.register = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const event = await Event.findByPk(req.params.id);
    if (!event || !event.isActive) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    const { name, email, phone, guests } = req.body;
    const registration = await EventRegistration.create({
      eventId: event.id,
      name,
      email,
      phone,
      guests: guests || 1,
    });

    await event.increment('attendees', { by: registration.guests });

    res.status(201).json({
      success: true,
      message: 'You are registered for this event!',
      data: registration,
    });
  } catch (err) {
    next(err);
  }
};

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { title, description, date, location, attendees } = req.body;
    const image = req.file ? req.file.filename : null;

    const event = await Event.create({ title, description, date, location, image, attendees });
    res.status(201).json({ success: true, message: 'Event created.', data: event });
  } catch (err) {
    next(err);
  }
};

exports.update = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }

    const { title, description, date, location, attendees, isActive } = req.body;
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (date !== undefined) updateData.date = date;
    if (location !== undefined) updateData.location = location;
    if (attendees !== undefined) updateData.attendees = attendees;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (req.file) updateData.image = req.file.filename;

    await event.update(updateData);
    res.json({ success: true, message: 'Event updated.', data: event });
  } catch (err) {
    next(err);
  }
};

exports.remove = async (req, res, next) => {
  try {
    const event = await Event.findByPk(req.params.id);
    if (!event) {
      return res.status(404).json({ success: false, message: 'Event not found.' });
    }
    await event.update({ isActive: false });
    res.json({ success: true, message: 'Event removed.' });
  } catch (err) {
    next(err);
  }
};
