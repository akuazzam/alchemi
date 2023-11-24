const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({
  text: { type: String, required: true },
  options: {
    type: Map,
    of: String,
  },
  correct_option: { type: String, required: true },
  chapter_id: { type: Schema.Types.ObjectId, ref: 'Chapter' },
});

const Question = mongoose.models.Question ||mongoose.model('Question', questionSchema);

module.exports = Question;
