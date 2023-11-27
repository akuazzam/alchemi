// models/Course.js
const mongoose = require('mongoose');
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  bookName: String,
  content: String,
  summary: String,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
ref: 'User'
  },
  Quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }],
  QuizAttempts: [{ type: Schema.Types.ObjectId, ref: 'QuizAttempt' }],
  Chapters: [{ type: Schema.Types.ObjectId, ref: 'Chapter' }]
});

const Course = mongoose.models.Course || mongoose.model('Course', courseSchema);
module.exports = Course;
