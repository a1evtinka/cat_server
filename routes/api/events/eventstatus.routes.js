const eventStatusRouter = require('express').Router();
const { EventStatus } = require('../../../db/models');

eventStatusRouter.get('/', async (req, res) => {
  try {
    const eventStatuses = await EventStatus.findAll({ raw: true });
    res.status(200).json(eventStatuses);
  } catch (error) {
    res.redirect('/error');
  }
});

module.exports = eventStatusRouter;