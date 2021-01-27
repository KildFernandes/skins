// database.js

const Sequelize = require('sequelize');
const sequelize = new Sequelize("postgres://postgres:postgres@localhost/skinsdb", {
  dialect: 'postgres'
  // anything else you want to pass
})
const Skin = sequelize.define('Skin', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    tipo: {
        type: Sequelize.STRING,
        allowNull: true
    },
});
module.exports = {
    sequelize: sequelize,
    Skin: Skin
};