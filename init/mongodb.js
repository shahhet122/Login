const mongoose = require('mongoose');
const {connectionUrl} = require('../config/keys');

const connectMongodb = async () => {
  try {
    await mongoose.connect(connectionUrl);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection failed');
  }
}
module.exports = connectMongodb;