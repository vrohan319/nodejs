
const fs = require("fs");
const path = require("path");

const filePath = path.join(__dirname,"..", "data", "restaurant.json");
const getStoredRestaurant = () => {
    const fileData = fs.readFileSync(filePath);
    const storedRestaurants = JSON.parse(fileData);

    return storedRestaurants;
}

const storeRestaurants = (storedRestaurants) => {
  fs.writeFileSync(filePath, JSON.stringify(storedRestaurants));
};

module.exports = {
  getStoredRestaurant: getStoredRestaurant,
  storeRestaurants: storeRestaurants,
};