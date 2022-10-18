const gendersRouter = require('express').Router();
const { Gender } = require('../../../db/models');

gendersRouter.get('/', async (req, res) => {
  try {
    const genders = await Gender.findAll({ raw: true });
    res.status(200).json(genders);
  } catch (error) {
    res.redirect('/error');
  }
});

module.exports = gendersRouter;