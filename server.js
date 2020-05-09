var app = require('./app');
var port = 8086;
var cors = require('cors')
app.use(cors())

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // allow requests from any other server
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE'); // allow these verbs
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
  next();
});

var server = app.listen(port, function() {
  console.log('Express server listening on port ' + port);
});