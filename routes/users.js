const mongoose = require('mongoose');
const plm = require('passport-local-mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/calendardata");

const userSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  location: String,
  industry: String,
  role: String,
  empCode: String,
  UserType: {
    type: String,
    default: "nUser"
  },
  contact: Number,
  dates:{
    type: Array,
    default: []
  }
})
userSchema.plugin(plm, {usernameField: 'email'});
module.exports = mongoose.model("user", userSchema);