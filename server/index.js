const express = require("express")
require("dotenv").config()
const mongoose = require('mongoose');
const UserRouter = require("./routes/user.route");
const AuthRouter = require("./routes/auth.route");
const cookieParser = require("cookie-parser")
const URL = process.env.MONGO_URL
const Port = process.env.PORT
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",AuthRouter)
app.use("/api/user", (UserRouter));


mongoose.connect(URL)
    .then(() => {

    app.listen(Port, () => {
        console.log('we are listening on port ' ,Port ,'& Connecting to Db')
})
    })
    .catch((err) => {
        console.log("The error is : " ,err)
    })


