var mongoose = require('mongoose');

var AsteroidSchema = mongoose.Schema({
  name: String
});

module.exports = mongoose.model('Asteroid', AsteroidSchema);
