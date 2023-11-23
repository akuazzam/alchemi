const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
const Question = require('../models/Question'); // Adjust the path accordingly

const { expect } = chai;
chai.use(chaiHttp);

// Replace 'mongodb://localhost:27017/your_database_name' with your actual MongoDB connection string
const mongoURI = 'mongodb://localhost:27017/alchemi-jpihv';

before(async function () {
    this.timeout(10000); // Increase the timeout to 10 seconds
  
    try {
      console.log('Connecting to MongoDB...');
      await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  
      console.log('Dropping the database...');
      await mongoose.connection.db.dropDatabase();
  
      console.log('Database drop complete.');
    } catch (error) {
      console.error('Error during setup:', error);
      throw error; // Rethrow the error to fail the test setup
    }
  });
  

describe('Question Model', function () {
  it('Should add a question to the database', async function () {
    const newQuestion = new Question({
      text: 'What is the capital of Country Y?',
      options: {
        A: 'Option A',
        B: 'Option B',
        C: 'Option C',
        D: 'Option D',
      },
      correct_option: 'B',
      chapter_id: mongoose.Types.ObjectId(),
    });

    const savedQuestion = await newQuestion.save();

    expect(savedQuestion).to.have.property('text').to.equal('What is the capital of Country Y?');
    expect(savedQuestion).to.have.property('correct_option').to.equal('B');
    expect(savedQuestion).to.have.property('chapter_id');
  });

  it('Should find the added question in the database', async function () {
    const foundQuestion = await Question.findOne({ text: 'What is the capital of Country Y?' });

    expect(foundQuestion).to.exist;
    expect(foundQuestion).to.have.property('text').to.equal('What is the capital of Country Y?');
    expect(foundQuestion).to.have.property('correct_option').to.equal('B');
    expect(foundQuestion).to.have.property('chapter_id');
  });
});

after(async function () {
    this.timeout(5000); // Increase the timeout for the "after all" hook
  
    try {
      console.log('Disconnecting from MongoDB...');
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB.');
    } catch (error) {
      console.error('Error during teardown:', error);
      throw error; // Rethrow the error to fail the test teardown
    } finally {
      console.log('Finally block executed.');
    }
  });
  