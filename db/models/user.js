'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ UserType, Gender, Countrie, Event, EventOption, ApartsVote, ApartsTypesVote, OptionVote }) {
      User.belongsTo(UserType, { foreignKey: 'userTypeId' });
      User.belongsTo(Gender, { foreignKey: 'genderId' });
      User.belongsTo(Countrie, { foreignKey: 'countryId' });
      User.belongsToMany(Event, { through: 'Comments', foreignKey: 'userId', otherKey: 'eventId' });
      User.hasMany(OptionVote, { foreignKey: 'userId' });
      User.hasMany(ApartsTypesVote, { foreignKey: 'userId' });
      User.hasMany(ApartsVote, { foreignKey: 'userId' });
      // define association here
    }
  }
  User.init({
    password: {
      type: DataTypes.TEXT
    },
    email: {
      type: DataTypes.TEXT
    },
    userTypeId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'UserTypes',
        key: 'id',
      },
    },
    firstName: {
      type: DataTypes.TEXT
    },
    lastName: {
      type: DataTypes.TEXT
    },
    photo: {
      type: DataTypes.TEXT
    },
    profession: {
      type: DataTypes.TEXT
    },
    birthday: {
      type: DataTypes.DATE
    },
    genderId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Genders',
        key: 'id',
      },
    },
    countryId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Countries',
        key: 'id',
      },
    },
    city: {
      type: DataTypes.TEXT
    },
    interests: {
      type: DataTypes.TEXT
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};