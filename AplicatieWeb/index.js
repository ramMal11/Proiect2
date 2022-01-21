"use strict";

//Express Initialization
const express = require('express')
const app = express();
//Sequelize Initialization
const sequelize = require('./config/sequelize')

//Express middleware
app.use(
    express.urlencoded({
      extended: true,
    })
  );
  app.use(express.json());

  // Project routes
  app.use("/api", require("./routes/allRoutes"));

  //Middleware for 500 status error
  app.use((err, req, res, next) => {
    res.status(500).json({error: "Something broke!"});
  });

  //Start the application
app.listen(7001, async() => {
    console.log("Server started on http://localhost:7001");
    try{
        await sequelize.authenticate();
        console.log("Connection has been established");
    } catch(err){
        console.error("Unable to connect to the database:", err);
    }
})

