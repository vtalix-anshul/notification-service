const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const {errorHandler} = require("./middlewares/errorHandler");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// connect to db
const testConnection = async ()=>{
    try{
        await sequelize.authenticate();
        console.log("connected to db");
    }
    catch(err){
        console.log("error in db connect: ",err);
        throw new Error("Internal Server Error");
    }
}
testConnection();


app.use("/api/v1/notification", require("./routes/v1/index"));

app.use(errorHandler)

module.exports = app;
