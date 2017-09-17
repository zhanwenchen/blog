/**
  User.js
  Class model that

  @param sequelize
  @param Sequelize

  TODO: this.password a good idea?
*/

'use strict';

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

module.exports =
  class User extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        firstName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        lastName: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true
        },
        passwordhash: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        salt: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true
          }
        },
        isActive: {
          type: Sequelize.BOOLEAN
          defaultValue: false,
        }
      }, { sequelize })
    };

    static associate(models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.User);
      this.hasMany(models.Post, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });

      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.User);
      this.hasMany(models.Comment, {
        onDelete: "CASCADE",
        foreignKey: {
          allowNull: false
        }
      });
    };

    /**
    * @param {string} passport
    * @return {passwordhash}
    */
    getPasswordHash(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      // return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    };

    /**
    * @param {string} password
    * @return {boolean}
    */
    isPasswordValid(passwordInput) {
      return bcrypt.compareSync(passwordInput, this.passwordhash);
      // return bCrypt.compareSync(password, userpass);
    };

  }
