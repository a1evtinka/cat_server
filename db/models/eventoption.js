'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class EventOption extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Countrie, Event, OptionVote }) {
      EventOption.belongsTo(Countrie, { foreignKey: 'countryId' });
      EventOption.belongsTo(Event, { foreignKey: 'eventId' });
      EventOption.hasMany(OptionVote, { foreignKey: 'optionId'});

      // define association here
    }
  }
  EventOption.init({
    photo: {
      type: DataTypes.TEXT
    },
    countryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Countries',
        key: 'id',
      },
    },
    title: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    votes: {
      type: DataTypes.INTEGER,
    },
    winner: {
      type: DataTypes.BOOLEAN
    },
    budget: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'EventOption',
  });
  return EventOption;
};