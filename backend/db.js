const  mongoose  = require("mongoose");

const mongoURI = "mongodb+srv://guptabhi40:9871@cluster0.cknuxmq.mongodb.net/?retryWrites=true&w=majority";
// const mongoURI="mongodb+srv://guptabhi40:#6Abhishek@cluster0.ypjz1fo.mongodb.net/test"

const connectToMongo = () => {
  mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("connected successfully")})
};

module.exports = connectToMongo;
