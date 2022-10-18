'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Participant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, User, ParticipantStatus, }) {
      Participant.belongsTo(Event, { foreignKey: 'eventId' });
      Participant.belongsTo(User, { foreignKey: 'userId' });
      Participant.belongsTo(ParticipantStatus, { foreignKey: 'statusId' });
      // define association here
    }
  }
  Participant.init({
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    statusId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'ParticipantStatuses',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'Participant',
  });
  return Participant;
};