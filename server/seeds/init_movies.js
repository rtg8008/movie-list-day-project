/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('movies').del()
  await knex('movies').insert([
    {title: 'Mean Girls', isWatched: false},
    {title: 'Hackers', isWatched: false},
    {title: 'The Grey', isWatched: false},
    {title: 'Sunshine', isWatched: true},
    {title: 'Ex Machina', isWatched: false},
  ]);
};
