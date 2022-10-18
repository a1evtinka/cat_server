const authRouter = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../../db/models');

authRouter.get('/user', async (req, res) => {
  const { user } = res.locals;
  if (user) {
    res.json({
      isLoggedIn: true,
      user: {
        id: user.id,
        firstName: user.firstName,
        type: user.userTypeId,
      },
    });
  } else {
    res.json({ isLoggedIn: false });
  }
});

authRouter.post('/register', async (req, res) => {
  const { firstName, lastName, genderId, birthday, countryId, email, password, passwordRepeat } =
    req.body;
  console.log(genderId, countryId);
  const existingUser = await User.findOne({ where: { email } });
  // проверяем есть ли уже такой пользователь в БД
  if (existingUser) {
    res.status(422).json({ error: 'Такой пользователь уже есть' });
    return;
  }

  // создаём нового пользователя
  const user = await User.create({
    firstName,
    lastName,
    genderId,
    birthday,
    countryId,
    email,
    // хэшируем пароль, чтобы не хранить в открытом виде в БД
    password: await bcrypt.hash(password, 10),
  });

  // кладём id нового пользователя в хранилище сессии (сразу логиним пользователя)
  req.session.userId = user.id;
  res.json({ id: user.id, firstName: user.firstName });
});

authRouter.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ where: { email } });

  // проверяем, что такой пользователь есть в БД и пароли совпадают
  if (existingUser && (await bcrypt.compare(password, existingUser.password))) {
    // кладём id нового пользователя в хранилище сессии (логиним пользователя)
    req.session.userId = existingUser.id;
    req.session.user = existingUser;
    res.json({ id: existingUser.id, firstName: existingUser.firstName });
  } else {
    res.status(401).json({ error: 'Такого пользователя нет либо пароли не совпадают' });
  }
});

authRouter.get('/logout', (req, res) => {
  console.log('==================');
  res.clearCookie('user_sid');
  req.session.destroy(() => {
    res.json({ success: true });
  });
});

module.exports = authRouter;
