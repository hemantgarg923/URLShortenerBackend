const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/linkshortner";

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log("connected to linkshortner database");
    })
}

module.exports = connectToMongo;