// initialize dependencies
const express = require('express'),
  path = require('path'),
  fs = require('fs'),
  router = require('./application/router'),
  bodyParser = require('body-Parser'),
  join = require('path').join,
  logger = require('express-logger'),
  models = join(__dirname, './application/model'),
  dbPath =  DATABASE_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/Shortster',
  mongoose = require('mongoose');



// Initializing express
var app = express();

// import the models
fs.readdirSync(models)
  .filter(file => ~file.search(/^[^.].*\.js$/))
  .forEach(file => require(join(models, file)));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(logger({path: "./logfile.txt"}));
app.use(bodyParser.urlencoded({extended: true  }));
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static(path.join(__dirname, 'public')));

//db connection
mongoose.connect(dbPath, function onMongooseError(err) {
    if (err) throw err;
});

//We connect routes
router(app);

//We start the server
app.listen(8080, () => {
  console.log('Listening on port 8080');
});