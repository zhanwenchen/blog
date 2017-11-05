// TODO: add username in addition to email in server/models/User.js, client/src/containers/SignupPage.jsx, client/src/components/SignupForm.jsx
/** @file User.js - Sequelize class model for user */

const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 10;

module.exports =
  /** @class User */
  class User extends Sequelize.Model {
    /**
     * @function init -
     * @param {Object} sequelize - the sequelize instance
     */
    static init(sequelize) {
      return super.init(
        {
          firstName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          lastName: {
            type: Sequelize.STRING,
            allowNull: false,
          },
          // username is really an email address
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
        },
        { sequelize,
          hooks: {
            // NOTE that creating and updating require options.sequelize
            beforeCreate: this.hashPasswordBeforeSave,
            beforeUpdate: this.hashPasswordBeforeSave,
          },
        },
      );
    }

    /**
     * @function hashPasswordBeforeSave
     */
    static async hashPasswordBeforeSave(user, options) {
      try {
        const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
        return user.setDataValue('password', hash);
      } catch (error) {
        return options.sequelize.Promise.reject(error);
      }
    }

    /**
    * @param {string} password
    * @return {Promise(boolean)} whether a passport matches the hash
    */
    async isPasswordValid(passwordInput) {
      return bcrypt.compare(passwordInput, this.passwordhash);
    }
  };
