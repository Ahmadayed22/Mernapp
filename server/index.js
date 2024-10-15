const express = require("express");
require("dotenv").config();
const mongoose = require('mongoose');
const UserRouter = require("./routes/user.route");
const AuthRouter = require("./routes/auth.route");
const PostRouter = require("./routes/Post.route");
const CommentRouter = require("./routes/comment.route");
const cookieParser = require("cookie-parser");
const path = require('path');

const cors = require("cors");

const app = express();

app.use(cors({
    origin: 'http://localhost:5173', // Frontend origin
    credentials: true, // Enable cookies and other credentials in CORS
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter); // Removed extra parentheses
app.use("/api/post", PostRouter);
app.use("/api/comment", CommentRouter);

// Use __dirname directly without re-declaration
app.use(express.static(path.join(__dirname, 'Clint', 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'Clint', 'dist', 'index.html'));
});


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    app.listen( 3000 || process.env.PORT , () => {
      console.log('we are listening on port', process.env.PORT, '& Connecting to Db');
    });
  })
  .catch((err) => {
    console.log("The error is:", err);
  });
