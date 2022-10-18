const eventRouter = require('express').Router();
const e = require('express');
const { Event } = require('../../../db/models');
const { EventOption } = require('../../../db/models');

eventRouter
  .get('/', async (req, res) => {
    try {
      const events = await Event.findAll({ raw:true });
      res.status(200).json(events);
    } catch (error) {
      res.redirect('/error');
    }
  })
  .post('/add', async (req, res) => {
  
  try {
      let {
        userId,
        startDate,
        endDate,
        maxParticipants,
        eventTitle,
        description,
        statusId,
        options,
        eventBudget,
      } = req.body;
     
      const newEvent = await Event.create({
        round: 1,
        userId,
        statusId,
        startDate,
        endDate,
        maxParticipants,
        eventTitle,
        description,
        eventBudget,
      });

      options.map( async (el)  => {
        await EventOption.create({
          photo: el.photo,  
          title: el.title,
          description: el.description,
          eventId: newEvent.id,
          countryId: el.countryId,
          eventOptionBudget: el.budget,
        })
        
      })

      res.status(200).json({status: 'ok'});
    } catch (error) {
      console.log(error.message);
      res.redirect('/error');
      res.status(100).json({status: 'neok'});
    }
  })
  .put('/changeRound', async (req, res) => {
  
    try {       
        const { id, round } = req.body
        console.log(id);
        await Event.update(
          { round: round +1 },
          { where: { id } }
        )  
        res.status(200).json({status: 'ok', round: round + 1, id});
      } catch (error) {
        console.log(error.message);
        res.redirect('/error');
        res.status(100).json({status: 'neok'});
      }
    })

  .put('/put', async (req, res) => {
    // console.log("🚀 ~ file: events.routes.js ~ line 62 ~ .put ~ req", req.body)
    try {
      let {
        id,
        userId,
        startDate,
        endDate,
        maxParticipants,
        eventTitle,
        description,
        statusId,
        options,
        eventBudget,
      } = req.body;

      const event = await Event.update({
        startDate,
        endDate,
        maxParticipants,
        eventTitle,
        description,
        eventBudget,
      }, {
        where:{
          id: id,
        }
      });
      options.map( async (el)  => {
        await EventOption.update({
          photo: el.photo,  
          title: el.title,
          description: el.description,
          countryId: el.countryId,
          eventOptionBudget: el.budget,
        },{
          where:{
            id: el.optionId,
            eventId: id,
          }
        })
        
      })
    } catch (error) {
      console.log(error.message);
      res.redirect('/error');
      res.status(100).json({status: 'neok'});
    }
  })

module.exports = eventRouter;