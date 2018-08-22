const bodyParser   = require('body-parser');
const cookieParser = require('cookie-parser');
const express      = require('express');
const favicon      = require('serve-favicon');
const hbs          = require('hbs');
const mongoose     = require('mongoose');
const logger       = require('morgan');
const path         = require('path');
const passport     = require('./helpers/passport');
const cors         = require('cors');
require('dotenv').config();

mongoose.Promise = Promise;
mongoose
  .connect('mongodb://zonanabeto:beto@clusterz-shard-00-00-htlnp.mongodb.net:27017,clusterz-shard-00-01-htlnp.mongodb.net:27017,clusterz-shard-00-02-htlnp.mongodb.net:27017/allende?ssl=true&replicaSet=ClusterZ-shard-0&authSource=admin&retryWrites=true', {useMongoClient: true})
  .then(() => {
    console.log('Connected to Mongo!')
  }).catch(err => {
    console.error('Error connecting to mongo', err)
  });

const app_name = require('./package.json').name;
const debug = require('debug')(`${app_name}:${path.basename(__filename).split('.')[0]}`);

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(require('node-sass-middleware')({
  src:  path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  sourceMap: true
}));

app.use(passport.initialize());
app.use(passport.session());
      
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));

app.locals.title = 'Express - Generated with IronGenerator';

const index    = require('./routes/index');
const auth     = require('./routes/auth');
const products = require('./routes/products');
const distribuidores = require('./routes/dist')
app.use('/', index);
app.use('/', auth);
app.use('/', products);
app.use('/', distribuidores);

module.exports = app;