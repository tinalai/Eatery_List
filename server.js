var app = require('./server/server-config.js');
var express = require('express');
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var Schema = mongoose.Schema;
var port = process.env.PORT || 8080;
// var app = express();

// mongoose.connect('mongodb://tina:akatina@ds031892.mongolab.com:31892/eaterydb');

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended' : 'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(methodOverride());

var toeatSchema = new Schema({
  text: String,
  user: String,
  created_at: Date
});

var ToEat = mongoose.model('ToEat', toeatSchema);

// Routes ===============
// api
// get all toeats
app.get('/api/toeats', function(req, res) {
  ToEat.find(function(err, toeats) {
    if(err) {
      res.send(err);
      console.error(err);
    }
    res.json(toeats);
  });
});

// create toeat and send back all toeats after creation
app.post('api/toeats', function(req, res){
  // create toeat, info come from AJAX request from Angular
  ToEat.create({
    text: req.body.text,
    user: req.body.username,
  }, function(err, toeat){
    if(err){
      res.send(err);
      console.error(err);
    }
    // get and return all todos after creating another
    ToEat.find(function(err, toeats){
      if(err){
        res.send(err);
        console.error(err);
      }
      res.json(toeats);
    });
  });
});

// delete a toeat
app.delete('/api/toeats/:toeat_id', function(req, res){
  ToEat.remove({
    _id : req.params.toeat_id
  }, function(err, toeat) {
    if(err){
      res.send(err);
      console.error(err);
    }

    ToEat.find(function(err, toeats) {
      if(err){
        res.send(err);
        console.error(err);
      }
      res.json(toeats);
    });
  });
});


app.get('*', function(req, res) {
  res.sendfile('./public/index.html'); // load the single page application
  res.end();
})



app.listen(port);

console.log('Server now listening on port ' + port);
