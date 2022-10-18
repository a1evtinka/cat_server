const apartsRouter = require('express').Router();
const { Apart, ApartsVote } = require('../../../db/models');
const { Op } = require("sequelize");

apartsRouter
  .get('/', async (req, res) => {
    try {
      const aparts = await Apart.findAll({ raw: true });
      res.status(200).json(aparts);
    } catch (error) {
      res.redirect('/error');
    }
  })
  .post('/add', async (req, res) => {
    try {
      const { id, options } = req.body;

      options.map(async (el) => {
        await Apart.create({
          title: el.title,
          photo: el.photo,
          type: el.type,
          description: el.description,
          budget: el.budget,
          eventId: id,
          votes: 0,
          winner: false,
        });
      });

      res.status(200).json({ status: 'ok' });
    } catch (error) {
      res.redirect('/error');
    }
  })
  .post('/:id/votes', async (req, res) => {
    const { id } = req.params;
    const { userId, optionId, eventId } = req.body;
    try {
      const aparts = await ApartsVote.findAll({
        where: {
          userId,
        },
        include: [{ model: Apart }],
        raw: true,
      });
      const usersOptions = aparts.find((votes) => votes['Apart.eventId'] === eventId);
      if (!usersOptions) {
        await ApartsVote.create({
          userId,
          apartsId: optionId,
        });
        await Apart.increment('votes', {
          by: 1,
          where: {
            id: optionId
          }
        })
      } else {
        const destroyed = await ApartsVote.findOne({
          where: {
            id: usersOptions.id,
          },
        });
        await ApartsVote.destroy({
          where: {
            id: usersOptions.id,
          },
        });
        await Apart.decrement('votes', {
          by: 1,
          where: {
            id: destroyed.apartsId,
          },
        });
        await ApartsVote.create({
          userId,
          apartsId: optionId,
        });
        await Apart.increment('votes', {
          by: 1,
          where: {
            id: optionId,
          },
        });
      }
      const options = await Apart.findAll({
        where: {
          eventId: id,
        },
        include: [{ model: ApartsVote }],
      });
      const allOptions = await Apart.findAll({
        where: {
          eventId,
        },
        include: [{ model: ApartsVote }],
      });
      const winner = allOptions.map((el) => el.votes).sort((a, b) => b - a)[0];
      console.log(winner);
      await Apart.update(
        {
          winner: true,
        },
        {
          where: {
            votes: winner,
          },
        },
      );
      await Apart.update(
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
      res.json(options);
    } catch (error) {
      res.redirect('/error');
      console.log(error, '=========');
    }
  })
  .get('/:id/votes', async (req, res) => {
    const { id } = req.params;
    try {
      const aparts = await Apart.findAll({
        where: {
          eventId: id,
        },
        include: [{ model: ApartsVote }],
      });
      res.json(aparts);
    } catch (error) {
      console.log(error);
    }
  })
  .put('/put', async (req, res) => {
    // console.log("🚀 ~ file: aparts.routes.js ~ line 83 ~ .put ~ req", req.body)
    try {
      const { id, options } = req.body;

      options.map(async (el) => {
        await Apart.update(
          {
            title: el.title,
            photo: el.photo,
            type: el.type,
            description: el.description,
            budget: el.budget,
          },
          {
            where: {
              id: el.apId,
              eventId: id,
            },
          },
        );
      });
      res.json(options);
      res.status(200).json({ status: 'ok' });
    } catch (error) {
      console.log(error.message);
      res.redirect('/error');
      res.status(100).json({ status: 'neok' });
    }
  });

module.exports = apartsRouter;
