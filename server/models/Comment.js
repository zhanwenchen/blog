/**
  Comment.js
  Class model that

  @param sequelize
  @param Sequelize
*/

'use strict';

const Sequelize = require('sequelize');

module.exports =
  class Comment extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        title: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        body: {
          type: Sequelize.TEXT,
          allowNull: false,
        }
      }, { sequelize })
    };

    static associate(models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Comment);
      this.belongsTo(models.User, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });

      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Comment);
      this.belongsTo(models.Post, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    }
  }
