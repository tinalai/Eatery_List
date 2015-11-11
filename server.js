var app = require('./server/server-config.js');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var port = process.env.PORT || 8080;

var toeatSchema = new Schema({
  text: String,
  user: String,
  created_at: Date
});

var ToEat = mongoose.model('ToEat', toeatSchema);
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
  res.sendfile('/index.html'); // load the single page application
})



app.listen(port);

console.log('Server now listening on port ' + port);
