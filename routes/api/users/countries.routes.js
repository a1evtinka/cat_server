const countriesRouter = require('express').Router();
const { Countrie } = require('../../../db/models');

countriesRouter.get('/', async (req, res) => {
  try {
    const countries = await Countrie.findAll({ raw: true });
    res.status(200).json(countries);
  } catch (error) {
    res.redirect('/error');
  }
});

module.exports = countriesRouter;