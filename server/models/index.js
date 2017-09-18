/**
  index.js is an import utility that grabs all models in the same folder,
  and instantiate a Sequelize object once for all models (instead of for each model).
  This is done by passing the single Sequelize object to each
  model as a reference, which each model then piggy-backs (sequelize.define())
  for creating a single db class model.

  This file is not supposed to be executed as a main class. Rather it is
  supposed to be imported (or 'required'). The actual creation of the db tables
  will be the job of the main startup code - [project_root]/bin/www by calling
  `models.sequelize.sync()` after importing from this index.js file
*/

const fs = require('fs'); // file system for grabbing files
const path = require('path'); // better than '\/..\/' for portability
const Sequelize = require('sequelize'); // Sequelize is a constructor


const env = process.env.NODE_ENV || 'development'; // use process environment
const config = require(path.join(__dirname, '..', 'config.js'))[env] // Use the .config.json file in the parent folder
const sequelize = new Sequelize(config.database, config.username, config.password, {
  dialect: config.dialect,
});

// Load each model file
const models = Object.assign({}, ...fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .map((file) => {
    const model = require(path.join(__dirname, file));
    // console.log(model.init(sequelize).tableName)
    // {[computed.key]: value}
    return { [model.name]: model.init(sequelize) }; })
);

// Load model associations
for (const model of Object.keys(models)) {
  typeof models[model].associate === 'function' && models[model].associate(models);
}

models.sequelize = sequelize; // delegate initialization to bootstrapping

module.exports = models;
