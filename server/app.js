const express = require('express');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const app = express();
app.use(express.json());

app.get("/movies", async (req, res) => {
  let result = await knex('movies')
    .select("*");

  res.status(200).json(result)
})


module.exports = app;