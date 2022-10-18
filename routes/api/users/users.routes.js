const usersRouter = require('express').Router();
const { User } = require('../../../db/models');
const fileMiddleWare = require('../../../middlewares/file')

usersRouter
  .get('/', async (req, res) => {
    try {
      const users = await User.findAll({ 
        attributes: [
          'id', 'firstName', 'lastName', 'photo', 
          'profession', 'birthday', 'genderId', 
          'countryId', 'city', 'interests'],
        raw: true 
      });
      res.status(200).json(users);
    } catch (error) {
      res.redirect('/error');
    }
  })
  .put('/:id/edit', async (req, res) => {
    console.log('1111111111');
    try {
      const { 
        userId, 
        // password,
        // email,
        // userTypeId, // возможно не нужно менять
        firstName,
        lastName,
        photo,
        profession,
        birthday,
        genderId,
        countryId,
        city,
        interests,
      } = req.body;

      await User.update({
        firstName: firstName,
        lastName,
        photo,
        profession,
        birthday,
        genderId,
        countryId,
        city,
        interests,
      },
      {
        where: {
          id: req.session.userId,
        }
      })
    } catch (error) {
      res.redirect('/error');
    }
  })
  .put('/:id/photo', fileMiddleWare.single('profilePhoto'), async (req, res) => {
    const userId = req.params.id
    if(req.file) {
      await User.update({
        photo: req.file.path
      },{ where: {
        id: userId,
      }})
      res.json(req.file.path)
    }
  })


module.exports = usersRouter;
