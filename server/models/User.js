/**
  User.js
  Class model that

  @param sequelize
  @param Sequelize

  CHANGED: removed salt because bcrypt already incorporates salt in the hash
*/

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
        // also email
        username: {
          type: Sequelize.STRING,
          allowNull: false,
          unique: true,
          validate: {
            isEmail: true,
          },
        },
        // hashed password
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        isActive: {
          type: Sequelize.BOOLEAN,
          defaultValue: false,
        },
      }, { sequelize });
    }

    static associate(models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.User);
      this.hasMany(models.Post, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false,
        },
      });

      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.User);
      this.hasMany(models.Comment, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false,
        },
      });
    }

    /**
    * @param {string} passport
    * @return {passwordhash}
    */
    static getPasswordHash(password) {
      return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
      // return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);
    }

    /**
    * @param {string} password
    * @return {boolean}
    */
    static isPasswordValid(passwordInput) {
      return bcrypt.compareSync(passwordInput, this.passwordhash);
      // return bCrypt.compareSync(password, userpass);
    }
  };
