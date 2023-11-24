const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  Email: { type: String, required: true },
  Name: { type: String, required: true },
  Major: String,
  School: String,
  coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

const User = mongoose.models.User ||mongoose.model('User', userSchema);

module.exports = User;
