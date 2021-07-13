'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Comments.init({
    userId: DataTypes.INTEGER,
    text: DataTypes.STRING,
    responseId: DataTypes.INTEGER,
    date: DataTypes.DATE,
    productId: DataTypes.INTEGER,
	updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Comments',
  });
  return Comments;
};