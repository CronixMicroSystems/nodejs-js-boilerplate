## nodejs-boilerplate

### Installation: 

1) install node modules:

first for server:

    npm install
    
then for api server:

    cd docs/
    npm install

2) create database:


    mysql -u[username] -p
    
    create database `nodejs_boilerplate`;
    
3) set up username and password in `config/index.js` to connect to database
    
4) run migrations and seeds:

in project root directory:

    npm run migrate
    npm run seed
    
or 

    NODE_ENV=[env] node_modules/sequelize-cli/bin/sequelize db:migrate
    NODE_ENV=[env] node_modules/sequelize-cli/bin/sequelize db:seed:all 
    
where [env] project environment (database by default)

### Usage:


in project root directory:

1) run server:

`npm run run`

server will be run on [http://localhost:3000/](http://localhost:3000/)
    
2) run api server:
 
 `npm run docs`
 
api server will be run on [http://localhost:4000/](http://localhost:4000/)

3) run all:

  `npm run all`

run both server and docs