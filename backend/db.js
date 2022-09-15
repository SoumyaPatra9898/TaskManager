const mongoose = require('mongoose');
const mongoURI  = "mongodb+srv://nitishkumar0394:85345000@cluster0.o8i3gzr.mongodb.net/taskmanager?retryWrites=true&w=majority";

const connectToMongo = () => {
    mongoose.connect(mongoURI, ()=>{
        console.log("Connected to Mongo Successfully");
    })
}

module.exports = connectToMongo;