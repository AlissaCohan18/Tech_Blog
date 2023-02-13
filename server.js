const express = require('express');


const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require('./config/connection');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(require('./controllers'));

// turn on connection to db and server
// 'force: true' & npm start to reset db (drop & recreate tables). return to false
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });
  