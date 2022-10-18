require('dotenv').config();
var iconv = require('iconv-lite');
var crypto = require('crypto');
const paymentRouter = require('express').Router();
const { Participant } = require('../../db/models');

const mainUrl = 'https://udalenka-elbrus.herokuapp.com'
const keySec = '484e5a6468544c52504a755e7b7a6e756d667c68575971786e414a'

paymentRouter
  .post('/', async (req, res) => {
    try {
      const {
        userId,
        eventId,
      } = req.body;


      console.log(req.body, 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAA')

      // расчет времени окончания оплаты, +15 минут от времени нажатия на кнопку
      const endPaymentDate = new Date(new Date().setMinutes(new Date().getMinutes()+15)).toISOString().slice(0, -5);
      console.log(endPaymentDate, 'BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB');
      // кодирование описания оплаты
      const payDescription = `BASE64:${Buffer.from(`Предоплата от юзера с id${userId} за евент с id${eventId}`).toString('base64')}`
      console.log(payDescription, 'CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC')

      // формируем объект запроса, где ключи уже отсортированы по возрастанию
      const paymentInfo = {
        WMI_CURRENCY_ID: '643',
        WMI_DESCRIPTION: payDescription, // кодировано в BASE64
        WMI_EXPIRED_DATE: endPaymentDate,
        WMI_FAIL_URL: `${mainUrl}/payerror`,
        WMI_MERCHANT_ID: '174830698753',
        WMI_PAYMENT_AMOUNT: '2000.00',
        WMI_PAYMENT_NO: `${userId}-${eventId}`,
        WMI_PTENABLED: 'OnlineBank',
        WMI_SUCCESS_URL: `${mainUrl}/event/${eventId}`,
        // WMI_SIGNATURE: , // секретный код, рассчитать и добавить
      }
      
      // складывание всех значений полей, для дальнейшего кодирования
      let sumAllKeys = '';
      for (let key in paymentInfo) {
        sumAllKeys += paymentInfo[key];
      }
      console.log(sumAllKeys, 'DDDDDDDDDDDDDDDDDDDDDDDDDDD');
      console.log(keySec, '++++++++++++++++++++++++');

      // Формирование значения параметра WMI_SIGNATURE, путем
      // вычисления отпечатка, сформированного выше сообщения,
      // по алгоритму MD5 и представление его в Base64
      // (кодирование секретного запроса, состоит из секретного ключа магазина и суммы всех полей объекта paymentInfo)
      const secretKey = crypto.createHash('md5').update(iconv.encode(sumAllKeys + keySec, 'win1251')).digest('base64');
      console.log(secretKey, 'EEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');

      // новый объект с полной инфой для запроса на оплату, с закодированным секретным ключом
      const unicSecretPayInfo = {
        WMI_CURRENCY_ID: '643',
        WMI_DESCRIPTION: payDescription, // кодировано в BASE64
        WMI_EXPIRED_DATE: endPaymentDate,
        WMI_FAIL_URL: `${mainUrl}/payerror`,
        WMI_MERCHANT_ID: '174830698753',
        WMI_PAYMENT_AMOUNT: '2000.00',
        WMI_PAYMENT_NO: `${userId}-${eventId}`,
        WMI_PTENABLED: 'OnlineBank',
        WMI_SUCCESS_URL: `${mainUrl}/event/${eventId}`,
        WMI_SIGNATURE: secretKey, // секретный код, рассчитать и добавить
      }

      console.log(unicSecretPayInfo, 'FFFFFFFFFFFFFFFFFFFFFFFFFF')

      // отправляем запрос в платежную систему, ответ придет 
      // на другой роут POST запросом от платежной системы (адрес роута указать в ЛК платежной системы)
      fetch('https://wl.walletone.com/checkout/checkout/Index', {
        method: 'POST',
        body: JSON.stringify(unicSecretPayInfo),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
       })

      } catch (error) {
        res.redirect('/error');
      }
      })


//=================================================================
//======| Ниже часть кода, для:
//======| - получения ответа от платежной системы
//======| - смены статуса участника в базе!===
//======| - ВОЗМОЖНО НУЖНО ПРОПИСАТЬ И ЗАПИСЬ ЮЗЕРА В БД
//=================================================================
  .post('/result', async (req, res) => {
    try {
      // const {
      //   WMI_COMMISSION_AMOUNT, //	Сумма удержанной комиссии
      //   WMI_TO_USER_ID, //	Двенадцатизначный номер кошелька плательщика.
      //   WMI_PAYMENT_NO, // Идентификатор заказа в системе учета интернет-магазина
      //   WMI_ORDER_ID, //	Идентификатор заказа в системе учета Единой кассы.
      //   WMI_INVOICE_OPERATIONS, // скоп инфы в json массиве
      //   WMI_ORDER_STATE, //	Состояние оплаты заказа: Accepted  — заказ оплачен;
      //   WMI_SIGNATURE, //	Подпись уведомления об оплате,
      // } = req.body;
      console.log(req.body, '++++++++++++++++++++')
      // функция сортировки
      let comparator = function(a, b){
        a = a.toLowerCase();
        b = b.toLowerCase();
        return a > b ? 1 : a < b ? -1 : 0;
      };
      let sumAllKeys = '';

    // задаем короткую переменную для объекта req.body
      const fields = {...req.body};
    // Формирование сообщения, путем объединения значений формы,
    // отсортированных по именам ключей в порядке возрастания
    Object.keys(fields).sort(comparator).forEach(function(name){
      if (fields[name] !== "WMI_SIGNATURE") {
        let value = fields[name];
        if (Array.isArray(value)) {
          sumAllKeys += value.sort(comparator).join('');
        }
        else {
          sumAllKeys += value;
        }
      }
    });

    // (кодирование секретного запроса, состоит из секретного ключа магазина и суммы всех полей объекта paymentInfo)
    const secretKey = crypto.createHash('md5').update(iconv.encode(sumAllKeys + KEY, 'win1251')).digest('base64');
    if (secretKey === req.body.WMI_SIGNATURE) {
      //меняем статус участника на оплачено
      const changeParticipanttatus = await Participant.update(
        { statusId: 2 },
        { where: { 
          userId: userId,
          eventId: eventId
        } }
      );
      // если статус участника поменялся на оплаченный, отправляе
      if (changeParticipanttatus) {
        res.send('WMI_RESULT=OK')
      } else {res.send('WMI_RESULT=RETRY&WMI_DESCRIPTION=Server not ok')}
    } else {res.send('WMI_RESULT=RETRY&WMI_DESCRIPTION=Server not ok')}

      
    } catch (error) {
      res.redirect('/error');
    }
  })

  .post('/status', async (req, res) => {
    try {
      const {
        userId,
        eventId,
      } = req.body;

      const changeParticipanttatus = await Participant.update(
        { statusId: 2 },
        { where: { 
          userId: userId,
          eventId: eventId
        } }
      );
      if (changeParticipanttatus) {
        res.status(200).json(changeParticipanttatus)
      }
      
    } catch (error) {
      res.redirect('/error');
    }
  })


module.exports = paymentRouter;