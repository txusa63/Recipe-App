const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const recipesRouter = require("./routes/recipes");
const PORT = process.env.PORT || 3001;

require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/recipes", recipesRouter);

const db = process.env.LOCAL_DB;
mongoose.connect(db, {useNewUrlParser: true, useCreateIndex: true});

const connection = mongoose.connection;

connection.once("open", () => {
    console.log("Connection to MongoDB successful...");
});

app.listen(PORT, () => {
    console.log(`Server is connected on port ${PORT}`);
});
