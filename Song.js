const {Sequelize, sequelize} = require('./db');

const Song =  sequelize.define('Song', {
    title: Sequelize.STRING,
    year: Sequelize.NUMBER
})

module.exports = {
    Song
};