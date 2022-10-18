'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApartsVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ Apart, User }) {
      ApartsVote.belongsTo(Apart, { foreignKey: 'apartsId' });
      ApartsVote.belongsTo(User, { foreignKey: 'userId' });
      // define association here
    }
  }
  ApartsVote.init({
    apartsId: {
      type: DataTypes.TEXT,
      references: {
        model: 'Aparts',
        key: 'id',
      },
    },
    userId: {
      type: DataTypes.TEXT,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    sequelize,
    modelName: 'ApartsVote',
  });
  return ApartsVote;
};