'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ParticipantStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ParticipantStatus.init({
    title: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'ParticipantStatus',
  });
  return ParticipantStatus;
};