'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, ApartsVote }) {
      Apart.belongsTo(Event, { foreignKey: 'eventId' });
      Apart.hasMany(ApartsVote, {foreignKey: 'apartsId'})
      // define association here
    }
  }
  Apart.init({
    photo: {
      type: DataTypes.TEXT
    },
    title: {
      type: DataTypes.TEXT
    },
    type: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    budget: {
      type: DataTypes.INTEGER
    },
    eventId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id',
      },
    },
    votes: {
      type: DataTypes.INTEGER
    },
    winner: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'Apart',
  });
  return Apart;
};