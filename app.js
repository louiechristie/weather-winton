var createError = require('http-errors');
var express = require ('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const fetch = require('node-fetch');
const dotenv = require('dotenv');

const getItemsFromMetOfficeJSON = require('./utilities/metOfficeWeatherUtils');
const log = require('./utilities/log');


var app = express();
dotenv.config();

const url = process.env.URL;
log(url);

const headers = {
  'accept': 'application/json',
  'x-ibm-client-id': process.env.CLIENT_ID,
  'x-ibm-client-secret': process.env.CLIENT_SECRET,
};

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build/')));

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   res.header('accept', 'application/json');
//   res.header('x-ibm-client-id', process.env.CLIENT_ID);
//   res.header('x-ibm-secret-id', process.env.CLIENT_SECRET),
//   next();
// });

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/', 'index.html'));
});

const getForecast = async (url) => {
  try {
    const response = await fetch(url, {
      headers
    });
    // const text = await response.text();
    // log('text: ' + text);
    log("response: " + response);
    const json = await response.json();
    if (!response) {
      throw new Error('No response from server.');
    }
    if (!response.ok) {
      throw new Error(JSON.stringify(response, null, '  '));
    }
    const items = getItemsFromMetOfficeJSON(json);
    return items;
  } catch (error) {
    throw error;
  }
};

app.get('/forecast', async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    try {
      const items = await getForecast(url);
      res.json(items);
    } catch (error) {
      log(error);
      res.send(JSON.stringify(error));
    }
  } else {
    const testData = [{ "date": "TomorroW", "description": "Cloudy", "icon": "https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/7.svg", "temperature": 8 }, { "date": "Tuesday", "description": "Overcast", "icon": "https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/8.svg", "temperature": 7 }, { "date": "Wednesday", "description": "Overcast", "icon": "https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/8.svg", "temperature": 6 }, { "date": "Thursday", "description": "Overcast", "icon": "https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/8.svg", "temperature": 7 }, { "date": "Friday", "description": "Light rain", "icon": "https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/12.svg", "temperature": 9 }, { "date": "Saturday", "description": "Partly cloudy (day)", "icon": "https://www.metoffice.gov.uk/webfiles/latest/images/icons/weather/3.svg", "temperature": 7 }]
    res.json(testData);
  }
});

const port = process.env.PORT || 5000;
app.listen(port);

log(`Listening on ${port}`);

module.exports = app;
