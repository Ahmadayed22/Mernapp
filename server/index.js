const express = require("express")
require("dotenv").config()
const mongoose = require('mongoose');
const URL = process.env.MONGO_URL
const Port = process.env.PORT

const app = express()
mongoose.connect(URL)
    .then(() => {

    app.listen(Port, () => {
        console.log('we are listening on port ' ,Port ,'& Connecting to Db')
})
    })
    .catch((err) => {
        console.log("The error is : " ,err)
    })


