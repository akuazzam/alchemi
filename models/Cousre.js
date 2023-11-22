const mongoose = require('mongoose');
const { Schema } = mongoose;


const courseSchema = new Schema({
    title: { type: String, required: true },
    description: String,
    bookName: String,
    notesSummary: String,
    quizzes: [{ type: Schema.Types.ObjectId, ref: 'Quiz' }]
  });
  
  const Course = mongoose.model('Course', courseSchema);
  module.exports = Course;
  