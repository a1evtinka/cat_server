const userTypesRouter = require('express').Router();
const { UserType } = require('../../../db/models');

userTypesRouter.get('/', async (req, res) => {
  try {
    const userTypes = await UserType.findAll({ raw: true });
    res.status(200).json(userTypes);
  } catch (error) {
    res.redirect('/error');
  }
});

module.exports = userTypesRouter;