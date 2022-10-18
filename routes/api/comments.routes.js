const commentsRouter = require('express').Router();
const { Comment } = require('../../db/models');

commentsRouter
  .get('/:eventId', async (req, res) => {
    try {
      const {eventId} = req.params;
      const comments = await Comment.findAll({
        where: {eventId: eventId},
        raw: true,
      });
      res.status(200).json(comments);
    } catch (error) {
      res.redirect('/error');
    }
  })
  .post('/add', async (req, res) => {
    try {
      const {
        userId,
        description,
        eventId,
      } = req.body;

      const comment = await Comment.create({
        userId,
        description,
        eventId,
      });
      res.status(200).json(comment);
    } catch (error) {
      res.redirect('/error');
    }
  })

module.exports = commentsRouter;