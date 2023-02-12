const path = require("path"); // to set path variables
const fs = require("fs"); // file system to read and write in files
const express = require("express"); // to create server
const app = express();

//! for using templates ///// after installing ejs package
//set method allow us to set some options
app.set("views", path.join(__dirname, "views")); //setting the path where to look for the templets
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// app.get("/", (req, res) => {
//   res.send("<h1>Hello ji</h1>");
// });
app.get("/", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "index.html");
  // res.sendFile(htmlFilePath);
  res.render("index");
});

app.get("/about", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "about.html");
  // res.sendFile(htmlFilePath);
  res.render("about");
});

app.get("/confirm", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);
  res.render("confirm");
});

app.get("/recommend", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "recommend.html");
  // res.sendFile(htmlFilePath);
  res.render("recommend");
});

app.post("/recommend", (req, res) => {
  const restaurant = req.body; // getting the data
  const filePath = path.join(__dirname, "data", "restaurant.json"); // setting up the file path

  const fileData = fs.readFileSync(filePath); // first read the data from the file by passing the filePath to fs
  const storedRestaurants = JSON.parse(fileData); // parsing the file data

  storedRestaurants.push(restaurant); // pushing the new data / writing data
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  // writing in file system at the file path

  res.redirect("/confirm");
  //sending back the response / redirecting the user to new page so that form resubmission doesnt happens
});

app.get("/restaurants", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "restaurants.html");
  // res.sendFile(htmlFilePath);
  res.render("restaurants");
});

app.listen(3000); // so that the server can listen our requests
