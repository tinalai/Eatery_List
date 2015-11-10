var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var toeatSchema = new Schema({
  text: String;
  user: String;
  created_at: Date
});

var NewToEat = mongoose.model('NewToEat', toeatSchema);

module.exports = NewToEat;
