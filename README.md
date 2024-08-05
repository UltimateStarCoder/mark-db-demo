# pt 1 op A: building from scratch
- this is the totorial to get exactly what I have here if you want to make it from scratch, and are using this as a tutorial
- skip to pt 1 op B: "running from a clone of this" if you want to skip the tutorial on how all this was built and just want to run it as is instead of from scratch
## Frontend
1. create generic app
`mkdir client`
`cd client`
`npx create-react-app`
2. test the app
`npm run start` 
- check port 3000 for the react app.
- Close it with `Ctrl+C` (click those buttons, don't type them)
- btw this is the default react app, and will not actually interact with the backend. We just have it to prove that we can have a front end. If you were unable to run the few lines so far, you need to do some debugging first. We will edit the frontend later to interact with the backend
3. create a Dockerfile
- not important yet, but it will be a dependancy for part 5 of backend so it can be tested
`touch Dockerfile`
- fill it out similar to the /client/Dockerfile I have
## backend
1. initialize for databases
`cd ../`
`mkdir backend`
`cd backend`
`npm init -y`
`npm i express pg knex dotenv cors nodemon`
`npx knex init`
- open the knexfile.js, and change the content within `development:{}` to what I have, and add `require('dotenv').config()` to the beginning of the document.
- It will have an error because `.env` doesn't exist yet, so lets create one with the DB_CONNECTION_STRING I referenced to. `touch .env` and fill it will what mine has
- add the following line to package.json, to the beginning of `"scripts": {}`
`"start": "knex migrate:rollback && knex migrate:latest && knex seed:run && node ./app/index.js",`
2. build the table migrator and seeder
- make some tables to live on a database
`npx knex migrate:make some_table_name`
`npx knex migrate:make another_table`
- IF your table has starting info (not strictly to be fed by `app.post()`'s), you will need to seed it
`npx knex seed:make some_table_name` creates the seeder for the first table. we will assume the other table doesn't need seeding
- lets set up those two recently generated files! In migrations/YYYYMMDDHHMMSS_some_table_name.js add some `exports.up()` and `exports.down()` code. See what I put in _both_ migrations tables. Do a similar thing for seeds/some_table_name.js and change the name of the table in `await knex()` to match as well. *If you use table.increments('some_key_such_as_id') in the migration js, make sure that key is not used in the seeder. For example, I used `table.increments('id')` in the migrations, so I removed `id: #` from `.insert()`.* Fill out the seeder with all of the keys to match the migrations.
3. create an app that will use those tables
`mkdir app && cd app && touch index.js` 
- this is where the server will listen. Look at the one I made for an idea on how it should look
4. build a docker image
`cd ../`
`touch Dockerfile` 
- fill it using the principles outlined in the doc in my comments there
`docker build -t tag_aka_name_for_the_image .`
- (to view of delete images later, use `docker images` and `docker rmi image_name` respectively)
5. run docker-compose containers
`cd ../`
- you might need to `docker login`, depending on how you have docker set up, otherwise
`touch docker-compose.yaml`
- fill it out. You need to have a service for the db, the api that interacts with the db, and the apui (client) that interacts with the api
6. test the database
`docker-compose up` 
- include the flag `--build` if you make changes to something and want to rerun `docker-compose up` otherwise it might just rerun the old, non-functional image
- since you put the frontend and backend in the docker-compose (which is good practice), you can also check it again since we used a different method to run it. Check localhost:3000 again to check that the frontend is running again
- localhost:8080 should also be working
`Ctrl+C` and `docker-compose down` to shut down your servers
<!-- not done bc backend isn't showing anything -->
# pt 1 op B: running from a clone of this
this is assuming you don't want to learn how to make this proj on your own. 
<!-- 1. install dependancies -->
1. set up your docker
`docker-compose up --build`
- check that it is runnings on ports 8080 and 3000
<!-- stuff to get it working right off the bat -->
# pt 2: if ur gonna publish
- create a .dockerignore and/or .gitignore as applicable. exposing 'secrets' is a big no-no. for example, the username and password to the databases are in clear view inside knexfile.js. If you use hashing, etc. you are gonna want to hide your salt. Also ignore node_modules. Lots to add to the ignore files if you actually publish something. be thorough
- I also moved the README.md from ./client to ./ and change the content in it from the default react text to this
- and moved .gitignore so I can push without issues