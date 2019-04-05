const Module = require('../models/Module.js');
const mongoose = require('mongoose');

const ModuleSchema = mongoose.Schema({
  name: String,
  time: Number,
  level: String,
  lecturer_id : { type: mongoose.Schema.Types.ObjectId, ref: 'Lecturer' }
});

module.exports = mongoose.model('Module', ModuleSchema);
