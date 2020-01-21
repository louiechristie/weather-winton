const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const fetch = require("node-fetch");
const dotenv = require("dotenv");

const getItemsFromMetOfficeJSON = require("./utilities/metOfficeWeatherUtils");
const log = require("./utilities/log");

const mockMetOfficeJSON = require("./tests/mockMetOfficeJSON");

const app = express();
dotenv.config();

const metOfficeAPIUrl = process.env.URL;

const headers = {
  accept: "application/json",
  "x-ibm-client-id": process.env.CLIENT_ID,
  "x-ibm-client-secret": process.env.CLIENT_SECRET
};

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "client/build/")));

app.get("/", (req, res) => {
  try {
    res.sendFile(path.join(__dirname, "/client/build/", "index.html"));
  } catch (error) {
    log(error);
    res.send(JSON.stringify(error));
  }
});

const getForecast = async url => {
  log(`url: ${url}`);

  const response = await fetch(url, {
    headers
  });
  // const text = await response.text();
  // log('text: ' + text);
  log(`response: ${response}`);
  const json = await response.json();
  if (!response) {
    throw new Error("No response from server.");
  }
  if (!response.ok) {
    throw new Error(JSON.stringify(response, null, "  "));
  }
  const items = getItemsFromMetOfficeJSON(json);
  return items;
};

const getMockForecast = async () => {
  log("getMockForecast");
  return getItemsFromMetOfficeJSON(mockMetOfficeJSON());
};

app.get("/forecast", async (req, res) => {
  if (process.env.NODE_ENV === "production") {
    try {
      const items = await getForecast(metOfficeAPIUrl);
      res.json(items);
    } catch (error) {
      log(error);
      res.send(JSON.stringify(error));
    }
  } else {
    try {
      const items = await getMockForecast();
      res.json(items);
    } catch (error) {
      log(error);
      res.send(JSON.stringify(error));
    }
  }
});

const port = process.env.PORT || 5000;
app.listen(port);

log(`Listening on ${port}`);

module.exports = app;
