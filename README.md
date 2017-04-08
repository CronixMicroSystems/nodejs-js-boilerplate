## nodejs-js-boilerplate

### Installation: 

1) install node modules:

first for server:

    yarn install
    
then for api-docs server:

    cd docs/
    yarn install

2) Create database:


    mysql -u[username] -p[password]
    
    create database `nodejs_boilerplate`;
    
3) Add username and password in `config/index.js` to connect to database
    
4) Run migrations and seeds:

in project root directory:

    yarn run migrate
    yarn run seed
    
or 

    NODE_ENV=[env] node_modules/sequelize-cli/bin/sequelize db:migrate
    NODE_ENV=[env] node_modules/sequelize-cli/bin/sequelize db:seed:all 
    
where [env] project environment (database by default)

### Usage:

in project root directory:

1) run server:

`yarn run run`

server will be run on [http://localhost:5000/](http://localhost:5000/)
    
2) run api server:
 
 `yarn run docs`
 
api server will be run on [http://localhost:4000/](http://localhost:4000/)

3) run all:

  `yarn run all`

run both server and docs