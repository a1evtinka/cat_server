'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, EventStatus }) {
      Event.belongsTo(User, { foreignKey: 'userId' });
      Event.belongsTo(EventStatus, { foreignKey: 'statusId' });
      Event.belongsToMany(User, { through: 'Comments', foreignKey: 'eventId', otherKey: 'userId' });
      Event.belongsToMany(User, { through: 'Participants', foreignKey: 'eventId', otherKey: 'userId' });
      // define association here
    }
  }
  Event.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    startDate: {
      type: DataTypes.DATE
    },
    endDate: {
      type: DataTypes.DATE
    },
    maxParticipants: {
      type: DataTypes.INTEGER
    },
    round: {
      type: DataTypes.INTEGER
    },
    eventTitle: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'EventStatuses',
        key: 'id',
      },
    },
    budget: {
      type: DataTypes.INTEGER
    },
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};