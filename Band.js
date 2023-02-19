const {Sequelize, sequelize} = require('./db');

// TODO - define the Band model
const Band = sequelize.define("Band", {
    //Keys
    name: Sequelize.STRING,
    genre: Sequelize.STRING,
    showCount: Sequelize.NUMBER
});

module.exports = {
    Band
};