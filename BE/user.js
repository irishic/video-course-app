const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema(
  {
    login: String,
    password: String,
    firstName: String,
    lastName: String
  },
  { timestamps: true }
);

// TODO
// userSchema.pre("save", function(next) {
//   const user = this;
//   if (!user.isModified("password")) return next();

//   bcrypt.hash(user.password, 10).then(hashedPassword => {
//     user.password = hashedPassword;
//     next();
//   });
// });

userSchema.methods.emulatePreSave = function() {
  return bcrypt.hash(this.password, 10).then(hashedPassword => {
    this.password = hashedPassword;
    return this;
  });
};

userSchema.methods.checkPassword = function(passToCheck) {
  return bcrypt.compare(passToCheck, this.password);
};

module.exports = mongoose.model("user", userSchema);
