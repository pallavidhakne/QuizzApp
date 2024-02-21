const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://pmdhakne2002:quizz123@cluster0.xn2pkk7.mongodb.net/?retryWrites=true&w=majority");

const connection = mongoose.connection;

connection.on("connected", () => {
  console.log("MongoDB connection is successful");
});

connection.on("error", (error) => {
  console.log("Error in MongoDB connection", error);
});

module.exports = mongoose;