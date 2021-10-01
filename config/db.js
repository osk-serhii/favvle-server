const mongoose = require('mongoose');
 
// Connect Production Database
exports.connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};

// Connect Test Database
exports.connectTestDb = () => {
  return mongoose.connect(process.env.TEST_DATABASE_URL);
};