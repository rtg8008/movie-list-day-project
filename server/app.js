const express = require('express');
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const app = express();
app.use(express.json());

app.get("/movies", async (req, res) => {
  let result = await knex('movies')
    .select("*");

  res.status(200).json(result)
})

app.post("/movies", async (req, res) => {
  console.log(req.body)

  if(req.body.title === undefined || req.body.isWatched)
  {
    res.status(400).json('not a valid request');
    return;
  }
  
  await knex('movies')
  .insert(req.body)

  let result = await knex('movies')
    .select("*");
  res.status(201).json(result);
})

app.delete('/movies/:id', async (req, res) => {
  console.log(`deleting movie at id: ${req.params.id}`);

  await knex('movies')
  .del()
  .where({id: req.params.id})

  let result = await knex('movies')
  .select("*");

  res.status(201).json(result);

})

app.patch(`/movies/:id`, async (req, res) => {
  console.log(`patching movie at id: ${req.params.id}, ${req.body}`)
  if (req.body.title === undefined && req.body.isWatched === undefined)
  {
    res.status(400).json('not a valid request');
    return;
  }
  await knex('movies')
  .update(req.body)
  .where({id: req.params.id})

  let result = await knex('movies')
  .select("*");

  res.status(201).json(result);

})


module.exports = app;