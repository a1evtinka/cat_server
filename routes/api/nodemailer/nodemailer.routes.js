const feedbackRouter = require('express').Router();
require('dotenv').config();
const nodemailer = require('nodemailer');

feedbackRouter
  .post(`/:id`, async (req, res) => {
    const {
      SMTP_TO_EMAIL,
      SMTP_TO_PASSWORD
    } = process.env;


    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.mail.ru",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: 'elbrus-test@mail.ru', // generated ethereal user
        pass: '4xHbxgRpNpn5kP1G6brK', // generated ethereal password
      },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: "elbrus-test <elbrus-test@mail.ru>", // sender address
      to: "a1evtina@list.ru", // list of receivers
      subject: `Сообщение от ${req.session.user.firstName} с почтой пользователя ${req.session.user.email}.`, // Subject line
     // text: `${req.body?.text}`, // plain text body
      html: `<b>${req.body?.text}</b>`, 
    });
    console.log(req.session)
    console.log(req.body.text)
    console.log("Message sent: %s", info.messageId);
  })

module.exports = feedbackRouter;
