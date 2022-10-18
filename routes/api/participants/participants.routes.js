const participantsRouter = require('express').Router();
const { Participant } = require('../../../db/models');

participantsRouter.get('/', async (req, res) => {
  try {
    const participants = await Participant.findAll({ raw: true });
    res.status(200).json(participants);
  } catch (error) {
    res.redirect('/error');
  }
});

// добавление участника мероприятия
participantsRouter.post('/', async (req, res) => {
  const { userId, eventId } = req.body;
  console.log(req.body, '=================');

  const existingParticipant = await Participant.findOne({ where: { eventId, userId } });
  // проверяем есть ли уже такой участник в мероприятии в БД
  if (existingParticipant) {
    res.status(422).json({ error: 'Такой участник уже есть' });
    return;
  }

  // создаём нового участника
  const paricipant = await Participant.create({
    statusId: 2,
    userId,
    eventId
  });

  //достаем всех участников с новым и отправляем обратно
  const newParticipants = await Participant.findAll({ raw: true });

  res.json(newParticipants);
});

module.exports = participantsRouter;
