const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  major: String,
  school: String,
  coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

const User = mongoose.models.User ||mongoose.model('User', userSchema);

module.exports = User;
