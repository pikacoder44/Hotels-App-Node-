const express = require("express");
const router = express.Router();

const Person = require("../models/Person");

const { jwtAuthMiddleware, generateToken } = require("../jwt");

// Post route for Person
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; // Assuming req.body contains the new person data

    // Create a new person document using Mongoose model
    const newPerson = new Person(data);

    // Save the new person document to the database
    const response = await newPerson.save();
    console.log("Data Saved");

    const payload = {
      id: response.id,
      username: response.username,
    };
    console.log(JSON.stringify(payload));
    const token = generateToken(payload);
    console.log("Token is: ", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Login USer Route:
router.post("/login", async (req, res) => {
  try {
    // Extract username & Password from body:
    const { username, password } = req.body;

    // Find user by username:
    const user = await Person.findOne({ username: username });

    // If user doens't exist or password is not right:
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }
    // Generate Token:
    const payload = {
      id: user.id,
      username: user.username,
    };

    const token = generateToken(payload);

    // return token as response:
    res.json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Get method to get the person
router.get("/", jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await Person.find();
    console.log("Data Fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Profile Route:





//Search person by ID
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType; // Extract worktype from URL parameter

    if (workType == "chef" || workType == "manager" || workType == "waiter") {
      const response = await Person.find({ work: workType });
      console.log("response fetched");
      res.status(200).json(response);
    } else {
      res.status(500).json({ error: "Invalid Parameter work" });
    }
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Update Method:
router.put("/:id", async (req, res) => {
  try {
    const personId = req.params.id;
    const updatedPersonData = req.body;
    const response = await Person.findByIdAndUpdate(
      personId,
      updatedPersonData,
      {
        new: true, // Gives you updated document (in variable)
        runValidators: true, // Runs Validation checks to ensure data is given correctly
      }
    );

    if (!response) {
      res.status(404).json({ error: "Person not found!" });
    }
    console.log("Details Updated");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Delete method:

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const response = await Person.findByIdAndDelete({ _id: id });
    console.log("Person Deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log("Error: ", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
