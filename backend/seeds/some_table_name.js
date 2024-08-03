/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('table_name').del()
  await knex('table_name').insert([
    {name: 'alec', email: 'name@domain.com', favorite_number: 1},
    {name: 'bane', email: 'name@domain.com', favorite_number: 1},
    {name: 'chad', email: 'name@domain.com', favorite_number: 1},
  ]);
};
