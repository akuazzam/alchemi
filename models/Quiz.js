const mongoose = require('mongoose');
const { Schema } = mongoose;

const quizSchema = new Schema({
  title: { type: String, required: true },
  questions: [{ type: Schema.Types.ObjectId, ref: 'Question' }],
});

const Quiz = mongoose.models.Quiz ||mongoose.model('Quiz', quizSchema);


module.exports = Quiz;
