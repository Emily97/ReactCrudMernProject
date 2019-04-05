const mongoose = require('mongoose');

const LecturerSchema = mongoose.Schema({
  name: String,
  image: String,
  email: String,
  region: String
});

module.exports = mongoose.model('Lecturer', LecturerSchema);
