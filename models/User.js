const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String, required: true },
  coursesEnrolled: [{ type: Schema.Types.ObjectId, ref: 'Course' }]
});

const User = mongoose.models.User ||mongoose.model('User', userSchema);

module.exports = User;
