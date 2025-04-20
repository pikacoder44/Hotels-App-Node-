const express = require("express");
const router = express.Router();
const Menu = require("../models/menu");

// Post method for menu:
router.post("/", async (req, res) => {
  try {
    let menuData = req.body;

    const newItem = new Menu(menuData);
    const resm = await newItem.save();
    res.status(200).json(resm);
    console.log("Item added in menu");
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get method for menu:
router.get("/", async (req, res) => {
  try {
    let menuData = await Menu.find();
    console.log("Data Fetched");
    res.status(200).json(menuData);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Search menu by Taste:
router.get("/:tasteType", async (req, res) => {
  try {
    const menuItems = req.params.tasteType;

    if (menuItems == "Sour" || menuItems == "Bitter" || menuItems == "Sweet") {
      const response = await Menu.find({ taste: menuItems });
      console.log("Response Fetched");
      res.status(200).json(response);
    } else {
      console.log("Invalid Taste type");
      res.status(500).json({ error: "Invalid taste type" });
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//                                <--- Home Work --->

//Update Method:

// Get item by id
// Get data from user
// Update Data to DB
// Show updated data to user

router.put("/:id", async (req, res) => {
  try {
    let itemid = req.params.id;
    let updateData = req.body;

    let response = await Menu.findByIdAndUpdate(itemid, updateData, {
      new: true,
      runValidators: true,
    });
    if (!response) {
      res.status(404).json("Item not found!");
    }
    console.log("Item Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Delete Method:

// Get item
// Delete item

router.delete("/:id", async (req, res) => {
  try {
    const itemID = req.params.id;

    const response = await Menu.findByIdAndDelete(itemID);
    console.log("Item Deleted Successfully");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//                                    <--- DONE --->

// Comment Added for testing purpose
module.exports = router;
