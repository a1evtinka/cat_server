'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OptionVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate({ EventOption, User }) {
       OptionVote.belongsTo(User, { foreignKey: 'userId' });
       OptionVote.belongsTo(EventOption, { foreignKey: 'optionId' });
      // define association here
    }
  }
  OptionVote.init({
    optionId: {
      type: DataTypes.TEXT,
      references: {
        model: 'EventOptions',
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
    modelName: 'OptionVote',
  });
  return OptionVote;
};