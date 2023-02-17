const express = require("express");
const router = express.Router();
const resData = require("../util/restaurant-data");
const uuid = require("uuid"); //! to generate unique id (uniform unique id)

router.get("/confirm", (req, res) => {
  // const htmlFilePath = path.join(__dirname, "views", "confirm.html");
  // res.sendFile(htmlFilePath);
  res.render("confirm");
});

router.get("/recommend", (req, res) => {
  res.render("recommend");
});

router.post("/recommend", (req, res) => {
  const restaurant = req.body; // getting the data
  restaurant.id = uuid.v4();

  const restaurants = resData.getStoredRestaurant();
  restaurants.push(restaurant); // pushing the new data / writing data
  resData.storeRestaurants(restaurants); // writing back data into json //new method by  calling a function
  // fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
  // writing in file system at the file path

  res.redirect("/confirm");
  //sending back the response / redirecting the user to new page so that form resubmission doesnt happens
});

router.get("/restaurants", (req, res) => {
  let order = req.query.order;
  let nextOrder = "desc";
  if (order !== "asc" && order !== "desc") order = "asc";
    const storedRestaurants = resData.getStoredRestaurant();
    
    if (order === "desc") nextOrder = "asc";

  storedRestaurants.sort((A, B) => {
    if (
      (order === "asc" && A.name > B.name) ||
      (order === "desc" && A.name < B.name)
    )
      return 1;
    return -1;
  });

  res.render("restaurants", {
    numbersOfRestaurants: storedRestaurants.length,
    restaurants: storedRestaurants,
    order: nextOrder,
  });
});

router.get("/restaurant/:id", (req, res) => {
  const id = req.params.id;

  const storedRestaurants = resData.getStoredRestaurant();

  for (const restaurant of storedRestaurants) {
    if (restaurant.id === id) {
      return res.render("restaurant-detail", { restaurant: restaurant });
    }
    res.status(404).render("404");
  }
});

module.exports = router;
