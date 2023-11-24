const mongoose = require('mongoose');
const { Schema } = mongoose;

const chapterSchema = new Schema({
  title: { type: String, required: true },
  summary: String,
  total_questions_asked: { type: Number, default: 0 },
  total_correct_answers: { type: Number, default: 0 },
  accuracy: {
    type: Number,
    default: function () {
      return this.total_questions_asked > 0
        ? (this.total_correct_answers / this.total_questions_asked) * 100
        : 0;
    },
  },
});

const Chapter = mongoose.models.Chapter ||mongoose.model('Chapter', chapterSchema);

module.exports = Chapter;
