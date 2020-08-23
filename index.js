const express = require("express");
const routes = require("./routes/index");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
// set up express body parser:
app.use(express.json());

// connect to database:
const DBURI = process.env.DBURI;
mongoose.connect(DBURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => console.log("successfuly connected to database ✔"))
    .catch(err => console.error(err));

// set up basic express app(routes, server):
app.use("/api", routes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, err => {
    if (err) throw err;
    console.log(`listening on port ${PORT} ✔`);
});