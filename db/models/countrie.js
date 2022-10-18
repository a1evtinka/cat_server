'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Countrie extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Countrie.init({
    country: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Countrie',
  });
  return Countrie;
};