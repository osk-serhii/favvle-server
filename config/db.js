const mongoose = require('mongoose');
 
exports.connectDb = () => {
  return mongoose.connect(process.env.DATABASE_URL);
};