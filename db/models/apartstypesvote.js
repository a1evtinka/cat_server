'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ApartsTypesVote extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ ApartsType, User }) {
      ApartsTypesVote.belongsTo(ApartsType, { foreignKey: 'apartsTypesId' });
      ApartsTypesVote.belongsTo(User, { foreignKey: 'userId' });
      // define association here
    }
  }
  ApartsTypesVote.init(
    {
      apartsTypesId: {
        type: DataTypes.TEXT,
        references: {
          model: 'ApartsTypes',
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
    },
    {
      sequelize,
      modelName: 'ApartsTypesVote',
    },
  );
  return ApartsTypesVote;
};
