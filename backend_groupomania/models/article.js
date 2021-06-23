'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Article.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      }),
      models.Article.hasMany(models.Comment)
    }
  };
  Article.init({
   url: DataTypes.STRING,
   file: DataTypes.STRING,
   description: DataTypes.STRING,
   comments: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};