const participantStatusRouter = require('express').Router();
const { ParticipantStatus } = require('../../../db/models');

participantStatusRouter.get('/', async (req, res) => {
  try {
    const participantStatuses = await ParticipantStatus.findAll({ raw: true });
    res.status(200).json(participantStatuses);
  } catch (error) {
    res.redirect('/error');
  }
});

module.exports = participantStatusRouter;
