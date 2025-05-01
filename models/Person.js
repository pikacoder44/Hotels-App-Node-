const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },

  password: {
    type: String,
    required: true,
  },
});

// BCrypt:

//       Hashing algo when saving user:
personSchema.pre("save", async function (next) {
  const person = this;

  //Hash only when it is new or modified
  if (!person.isModified("password")) return next();

  try {
    //Generating Salt:

    const salt = await bcrypt.genSalt(10);

    //hash password:
    const hashedPassword = await bcrypt.hash(person.password, salt);

    //Overwrite Plained pass to Hashed one
    person.password = hashedPassword;

    next();
  } catch (err) {
    return next(err);
  }
});

//   Compare Password
personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    // Use Bcrypt to compare the provided password with hashed pass:
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

// Create Person Model

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
