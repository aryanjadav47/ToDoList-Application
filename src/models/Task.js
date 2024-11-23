const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true },
  description: { type: String, default: '' },
  isCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('Task', taskSchema);
