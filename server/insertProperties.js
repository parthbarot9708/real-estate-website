const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();
const Property = require('./models/Property');

// MongoDB Connection
const MONGO_URI = 'mongodb+srv://admin:admin@pbarot3556.4xluzyh.mongodb.net/real-estate';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));

const properties = JSON.parse(fs.readFileSync('./properties.json', 'utf-8')).properties;

Property.insertMany(properties)
  .then(() => {
    console.log('Properties inserted successfully');
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error('Error inserting properties:', error);
    mongoose.connection.close();
  });
