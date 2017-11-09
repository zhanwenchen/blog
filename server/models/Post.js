/**
  Post.js
  Class model that

  @param sequelize
*/

const Sequelize = require('sequelize');

module.exports =
  class Post extends Sequelize.Model {
    static init(sequelize) {
      return super.init({
        string_id: {
          type: Sequelize.STRING,
          allowNull: true,
          // allowNull: false,
          unique: true,
        },
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
          allowNull: true,
        },
      }, {
        sequelize,
        hooks: {
          // TODO: {blog post} beforeValidate instead of beforeCreate, because beforeValidate runs before beforeCreate.
          beforeValidate: (post) => {
            post.string_id = post.title.replace(/\s+/g, '-').toLowerCase();
          },
        },
      });
    }

    static associate(models) {
      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Post);
      // this.hasMany(models.Comment, {
      //   onDelete: 'CASCADE',
      //   foreignKey: {
      //     allowNull: false,
      //   },
      // });

      // Using additional options like CASCADE etc for demonstration
      // Can also simply do Task.belongsTo(models.Post);
      this.belongsTo(models.User, {
        onDelete: 'CASCADE',
        foreignKey: {
          allowNull: false,
        },
      });
    }
  };
