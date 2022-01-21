const { Sequelize } = require("sequelize")

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: "./sqlite/proiecte.db"
});

sequelize.sync().then(() => {
    console.log("All models were syncronized");
})

module.exports = sequelize;