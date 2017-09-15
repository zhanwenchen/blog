/**
  Post.js
  Class model that

  @param sequelize
  @param Sequelize
*/

'use strict';

const Sequelize = require('sequelize');

module.exports =
// (sequelize) =>
  class Post extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        body: {
          type: Sequelize.TEXT,
          allowNull: false,
        },
        assets: {
          type: Sequelize.JSON,
          allowNull: true
        },
      }, { sequelize })
    };

    static associate(models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Post);
      this.hasMany(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });

      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Post);
      this.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    }
  }
