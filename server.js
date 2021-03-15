const { response } = require("express");
const express = require("express");
const Datastore = require("nedb");
const fetch = require("node-fetch");
require("dotenv").config();

const app = express();
const db = new Datastore("database.db");
db.loadDatabase();

const port = process.env.PORT || 3000;
app.listen(port, (response) => {
  console.log(`listening on port ${port}`);
});

app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

app.post("/api", (req, res) => {
  const data = req.body;
  const timestamp = Date.now();
  data.timestamp = timestamp;
  db.insert(data);
  res.json(data);
});

app.get("/api", (req, res) => {
  db.find({}, (err, data) => {
    if (err) {
      res.end();
      return;
    }
    res.json(data);
  });
});

app.get("/weather/:latlon", async (req, res) => {
  const params = req.params.latlon.split(",");
  const lat = params[0];
  const lon = params[1];
  const weather_key = process.env.WEATHER_KEY;
  const api_url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${weather_key}`;
  const weather_response = await fetch(api_url);
  const weather_data = await weather_response.json();
  const aq_key = process.env.AQ_KEY;
  const aq_url = `http://api.airvisual.com/v2/nearest_city?lat=${lat}&lon=${lon}&key=${aq_key}`;
  const aq_response = await fetch(aq_url);
  const aq_data = await aq_response.json();

  const data = {
    weather: weather_data,
    aq: aq_data,
  };
  res.json(data);
});
