const apartsTypesRouter = require('express').Router();
const { ApartsType, ApartsTypesVote } = require('../../../db/models');
const { Op } = require("sequelize");

apartsTypesRouter
  .get('/', async (req, res) => {
    try {
      const apartsTypes = await ApartsType.findAll({ raw: true });
      res.status(200).json(apartsTypes);
    } catch (error) {
      res.redirect('/error');
    }
  })
  .post('/add', async (req, res) => {
    try {
      const {
        id,
        options,
      } = req.body;

      options.map( async (el) => {
        await ApartsType.create({
          title: el.title,
          photo: el.photo,
          description: el.description,
          eventId: id,
          votes: 0,
          winner: false
        })
      })
      res.status(200).json({status: 'ok'});
    } catch (error) {
      res.redirect('/error');
    }
  })
  .put('/put', async (req, res)=> {
    console.log("🚀 ~ file: apartstypes.routes.js ~ line 34 ~ .put ~ req", req.body)
    try {
      const {
        id,
        options,
      } = req.body;

      options.map( async (el) => {
        await ApartsType.update({
          title: el.title,
          photo: el.photo,
          description: el.description,
        },{
          where:{
            id: el.ATId,
            eventId: id,
          }
        })
      })

      res.status(200).json({status: 'ok'});

    } catch (error) {
      console.log(error.message);
      res.redirect('/error');
      res.status(100).json({status: 'neok'});
    }
  })
  .post('/:id/votes', async (req, res) => {
    const { id } = req.params;
    const { userId, optionId, eventId } = req.body;
    try {
      const apartsTypes = await ApartsTypesVote.findAll({
        where: {
          userId,
        },
        include: [{ model: ApartsType }],
        raw: true,
      });
      const usersOptions = apartsTypes.find((votes) => votes['ApartsType.eventId'] === eventId )
      if (!usersOptions) {
        await ApartsTypesVote.create({
          userId,
          apartsTypesId: optionId,
        });
        await ApartsType.increment('votes', {
          by: 1,
          where: {
            id: optionId
          }
        })
      } else {
        const destroyed = await ApartsTypesVote.findOne({
          where: {
            id: usersOptions.id,
          },
        });
        await ApartsTypesVote.destroy({
          where: {
            id: usersOptions.id,
          },
        });
        await ApartsType.decrement('votes', {
          by: 1,
          where: {
            id: destroyed.apartsTypesId,
          },
        });
        await ApartsTypesVote.create({
          userId,
          apartsTypesId: optionId,
        });
        await ApartsType.increment('votes', {
          by: 1,
          where: {
            id: optionId,
          },
        });
      }
      const options = await ApartsType.findAll({
        where: {
          eventId: id,
        },
        include: [{ model: ApartsTypesVote }],
      });
      const allOptions = await ApartsType.findAll({
        where: {
          eventId,
        },
        include: [{ model: ApartsTypesVote }],
      });
      const winner = allOptions.map((el) => el.votes).sort((a, b) => b - a)[0];
      console.log(winner);
      await ApartsType.update(
        {
          winner: true,
        },
        {
          where: {
            votes: winner,
          },
        },
      );
      await ApartsType.update(
        {
          winner: false,
        },
        {
          where: {
            eventId: id,
            votes:{
              [Op.not] : winner
            },
          },
        },
      );
      console.log(options);
      res.json(options);
    } catch (error) {
      res.redirect('/error');
      // console.log(error, '=========');
    }
  })
  .get('/:id/votes', async (req, res) => {
    const { id } = req.params;
    try {
      const apartTypes = await ApartsType.findAll({
        where: {
          eventId: id,
        },
        include: [{ model: ApartsTypesVote }],
      });
      res.json(apartTypes);
    } catch (error) {
      console.log(error);
    }
  });
  
  module.exports = apartsTypesRouter;
  
  // .post('/add', async (req, res) => {
  //   try {
  //     const { photo, countryId, title, description, eventId, eventOptionBudget } = req.body;

  //     await EventOption.create({
  //       photo,
  //       countryId,
  //       title,
  //       description,
  //       eventId,
  //       votes: 0,
  //       winner: false,
  //       eventOptionBudget,
  //     });
  //     res.status(200).json({ status: 'ok' });
  //   } catch (error) {
  //     res.redirect('/error');
  //   }
  // })