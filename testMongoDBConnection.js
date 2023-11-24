const { pingDatabase } = require('./src/app/utils/mongodb_config');

pingDatabase()
  .then(success => {
    if (success) {
      console.log('MongoDB connection successful.');
      process.exit(0);
    } else {
      console.log('MongoDB connection failed.');
      process.exit(1);
    }
  })
  .catch(err => {
    console.error('Error during MongoDB connection test:', err);
    process.exit(1);
  });
