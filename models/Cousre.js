// models/Course.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  bookName: String,
  Content: String,
  quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
  quizAttempts: [{ type: Schema.Types.ObjectId, ref: 'QuizAttempt' }],
  chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }]
});

const Course = mongoose.model('Course', courseSchema);
module.exports = Course;
