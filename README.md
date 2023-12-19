# Fx

Fx is light full-stack social network.

## Tech stack
Front-end: 
* React
* Redux
* RTK
* RTK Query
* react-hook-form
* react-router-dom

Back-end: 
* Node.js
* Express
* Sequelize
* JWT

## Installation and usage 

### Server
To setup server, run following commands in project directory
```
cd server
npm install 
npm run start
```
Also you need to change values in .env file in server directory to your own values

To run migrations and seeds you need to run following commands in server directory 
```
npm install --save-dev sequelize-cli
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### Client
To setup client, run following commands in project directory
```
cd client 
npm install 
npm run build
npm preview
```

And then client will be available at http://localhost:4173


