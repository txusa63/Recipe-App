const express = require("express");
const request = require('request')
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const PORT = process.env.PORT || 3001;

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());

app.use(cors({origin: ['http://localhost:3000'], credentials: true}));

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, (err) => {
    if(err) {
        return console.error(err);
    }
    console.log('Connection to MongoDB established');
});

app.use("/recipes", require('./routes/recipes'));
app.use('/users', require('./routes/users'))

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
});
