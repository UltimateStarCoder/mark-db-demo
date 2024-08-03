const express = require('express');
const cores = require('cors');
const app = express();
const port = 8080
const knex = require('knex')(require('./knexfile.js')['development']);

app.use(express.json())
app.use(cores())

//the lines above this will be the same for any express app that uses knex

app.get('/', (req, res) => {
    res.send('You have reached an endpoint that accepts GET requests. You reading this is proof that you successfully made a GET request to this endpoint.\n\nTry making a POST request to /post_to_me with the following json: { "name": "your name", "email": "your email", "favorite_number": your favorite number }, then make a GET request to /get_from_me to see the data you posted to the database.\n\n You can even make a DELETE request to /delete_from_me with the following json: { "name": "your name" } to delete the data you posted to the database.')
})

app.post('/post_to_me', (req, res) => {
    const { name, email, favorite_number } = req.body
    knex('some_table_name').insert({ name, email, favorite_number }).then(() => {
        res.send('Successfully added to database')
    }).catch((err) => {
        res.send('Failed to add to database')
    })
})

app.get('/get_from_me', (req, res) => {
    knex('some_table_name').select().then((data) => {
        res.send(data)
    }).catch((err) => {
        res.send('Failed to get data from database')
    })
})

app.delete('/delete_from_me', (req, res) => {
    const { name } = req.body
    knex('some_table_name').where({ name }).del().then(() => {
        res.send('Successfully deleted from database')
    }).catch((err) => {
        res.send('Failed to delete from database')
    })
})

//the lines below this will be the same for any express app that uses knex. Lines between this comment and the previous one are the only ones that will change from app to app

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})