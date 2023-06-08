const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Recipe extends Model {}

Recipe.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      recipe_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
      ingredients: {
        type: DataTypes.JSON, //We can parse the JSON data and turn it into an array apparently
        allowNull: false,
      },
      steps: {
        type: DataTypes.JSON, //We can parse the JSON data and turn it into an array apparently
        allowNull: false,
      },
      totalTime: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'user',
          key: 'id',
        },
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'recipe',
    }
  );

module.exports = Recipe;
