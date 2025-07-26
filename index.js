// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

// date
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;
  // If dateParam is empty, use current date
  if (!dateParam) {
    date = new Date();
  } else if (!isNaN(dateParam)) {
    // If it's a number, treat it as a timestamp
    date = new Date(parseInt(dateParam));
  } else {
    // Otherwise, treat it as a date string
    date = new Date(dateParam);
  }

  // If the date is invalid, return an error
  if (isNaN(date.getTime())) {
    return res.json({ error: "Invalid Date" });
  }
  // Return the date in the specified format
  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
})


// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
