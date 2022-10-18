'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApartsType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, ApartsTypesVote }) {
      ApartsType.belongsTo(Event, { foreignKey: 'eventId' });
      ApartsType.hasMany(ApartsTypesVote, {foreignKey: 'apartsTypesId'})
      // define association here
    }
  }
  ApartsType.init({
    photo: {
      type: DataTypes.TEXT
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
      type: DataTypes.INTEGER
    },
    winner: {
      type: DataTypes.BOOLEAN
    },
  }, {
    sequelize,
    modelName: 'ApartsType',
  });
  return ApartsType;
};