const eventOptionsRouter = require('express').Router();
const { EventOption } = require('../../../db/models');
const { OptionVote } = require('../../../db/models');
const { Op } = require("sequelize");

eventOptionsRouter
  .get('/', async (req, res) => {
    try {
      const eventOptions = await EventOption.findAll({
        include: [{ model: OptionVote }],
      });
      res.json(eventOptions);
    } catch (error) {
      res.redirect('/error');
    }
  })
  .post('/add', async (req, res) => {
    try {
      const { photo, countryId, title, description, eventId, eventOptionBudget } = req.body;

      await EventOption.create({
        photo,
        countryId,
        title,
        description,
        eventId,
        votes: 0,
        winner: false,
        eventOptionBudget,
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
      const eventOptions = await OptionVote.findAll({
        where: {
          userId,
        },
        include: [{ model: EventOption }],
        raw: true,
      });
      const usersOptions = eventOptions.find((votes) => votes['EventOption.eventId'] === eventId);
      console.log(usersOptions);
      if (!usersOptions) {
        await OptionVote.create({
          userId,
          optionId,
        });
        await EventOption.increment('votes', {
          by: 1,
          where: {
            id: optionId,
          },
        });
      } else {
        const destroyed = await OptionVote.findOne({
          where: {
            id: usersOptions.id,
          },
        });
        await OptionVote.destroy({
          where: {
            id: usersOptions.id,
          },
        });
        await EventOption.decrement('votes', {
          by: 1,
          where: {
            id: destroyed.optionId,
          },
        });
        await OptionVote.create({
          userId,
          optionId,
        });
        await EventOption.increment('votes', {
          by: 1,
          where: {
            id: optionId,
          },
        });
      }
      const options = await EventOption.findAll({
        where: {
          eventId: id,
        },
        include: [{ model: OptionVote }],
      });
      const allOptions = await EventOption.findAll({
        where: {
          eventId,
        },
        include: [{ model: OptionVote }],
      });
      const winner = allOptions.map((el) => el.votes).sort((a, b) => b - a)[0];
      console.log(winner);
      await EventOption.update(
        {
          winner: true,
        },
        {
          where: {
            votes: winner,
          },
        },
      );
      await EventOption.update(
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
      // console.log(error, '=========');
    }
  })
  .get('/:id/votes', async (req, res) => {
    const { id } = req.params;
    try {
      const options = await EventOption.findAll({
        where: {
          eventId: id,
        },
        include: [{ model: OptionVote }],
      });
      console.log(options, 'get votes');
      res.json(options);
    } catch (error) {
      console.log(error);
    }
  });

module.exports = eventOptionsRouter;
