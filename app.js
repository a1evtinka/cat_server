require('dotenv').config();

// не забудь установить babel:
// npm i @babel/core @babel/preset - env @babel/preset-react @babel/register
// также не забудь положить файл .babelrc в корень проекта
const express = require('express');
const path = require('path');
const expressConfig = require('./config/express');

// импортируем роутеры (там лежат наши ручки)
const taskApiRouter = require('./routes/api/tasks.routes');
const authRouter = require('./routes/api/auth.routes');
// импортируем роутеры связанные с ивентами непосредственно
const eventsRouter = require('./routes/api/events/events.routes')
const eventOptionsRouter = require('./routes/api/events/eventoptions.routes');
const apartsTypesRouter = require('./routes/api/events/apartstypes.routes');
const apartsRouter = require('./routes/api/events/aparts.routes');
const eventStatusRouter = require('./routes/api/events/eventstatus.routes');
// импортируем роутеры связанные с участниками евента Participants
const participantsRouter = require('./routes/api/participants/participants.routes')
const participantStatusRouter = require('./routes/api/participants/participantstatus.routes')
// импортируем роутеры связанные с Юзерами
const usersRouter = require('./routes/api/users/users.routes')
const gendersRouter = require('./routes/api/users/genders.routes')
const userTypesRouter = require('./routes/api/users/usertypes.routes')
const countriesRouter = require('./routes/api/users/countries.routes')
// импортируем роутер комментариев
const commentsRouter = require('./routes/api/comments.routes')
// импортируем роутер оплаты
const paymentRouter = require('./routes/api/payment.routes')
// импортируем роут обратной связи 
const feedbackRouter = require('./routes/api/nodemailer/nodemailer.routes')

const app = express();
const PORT = process.env.PORT ?? 3000;

// функция настройки экспресса
expressConfig(app);
app.use('/images', express.static(path.join(__dirname, 'images')));

// подключаем роутеры
app.use('/api/auth', authRouter);
app.use('/api/tasks', taskApiRouter); // роутер списка задач (все url начинаются с /api/tasks)

// роутеры связанные с ивентами непосредственно
app.use('/api/events', eventsRouter); // роутер со списком всех евентов
app.use('/api/eventOptions', eventOptionsRouter); // роутер с названиями мест куда можно поехать
app.use('/api/apartsTypes', apartsTypesRouter); // роутер с названием типов жилья
app.use('/api/aparts', apartsRouter); // роутер с бюджетом в зависимости от стоимости жилья
app.use('/api/eventStatus', eventStatusRouter); // роутер со статусом ивента

// роутеры связанные с участниками евента Participants
app.use('/api/participants', participantsRouter);
app.use('/api/participantStatus', participantStatusRouter);

// роутеры связанные с Юзерами
app.use('/api/users', usersRouter);
app.use('/api/genders', gendersRouter);
app.use('/api/userTypes', userTypesRouter);
app.use('/api/countries', countriesRouter);
// роутер оплаты 
app.use('/api/payment', paymentRouter);
app.use('/api/feedback', feedbackRouter);
// роутер комментариев
app.use('/api/comments', commentsRouter);
// для деплоя
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/cat_client/build/index.html'))
})

// eslint-disable-next-line no-unused-vars
app.use((error, req, res, _next) => {
  console.error('Произошла ошибка', error);
  res.status(500).json({
    success: false,
    message: 'Непредвиденная ошибка сервера, попробуйте зайти позже',
  });
});

// app.use('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '../frontend-rtk/public/index.html'));
// });

app.listen(PORT, () => console.log(`server started at ${PORT}`));
