'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Event }) {
      Comment.belongsTo(User, { foreignKey: 'userId' });
      Comment.belongsTo(Event, { foreignKey: 'eventId' });

      // define association here
    }
  }
  Comment.init({
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
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
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};