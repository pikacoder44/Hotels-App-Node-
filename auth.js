const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Person = require("./models/Person");
// Establishing Local Strategy:
passport.use(
  new LocalStrategy(async (USERNAME, password, done) => {
    //   Authentication logic here

    try {
      //   console.log("Received Credentials: ", USERNAME, password);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) {
        //Syntax:    done(error,user,info)
        //         here we got:    error = null ,  user = false and message as we want

        return done(null, false, { message: "Incorrect Username" });
      }

      const isPasswordMatch = user.comparePassword(password);

      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password don't match" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

module.exports = passport;
