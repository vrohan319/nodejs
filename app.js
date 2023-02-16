const path = require("path"); // to set path variables
const express = require("express"); // to create server
const app = express();

const defaultRoutes = require("./routes/default");
const restaurantRoutes = require("./routes/restaurant");

//! for using templates ///// after installing ejs package
//set method allow us to set some options
app.set("views", path.join(__dirname, "views")); //setting the path where to look for the templets
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.use("/", defaultRoutes);

app.use("/", restaurantRoutes);

app.use((req, res) => {
  res.status(404).render("404");
});

app.use((error, req, res, next) => {
  res.status(500).render("500");
});

app.listen(3000); // so that the server can listen our requests
