const express = require("express");
const app = express();
const path = require('path');
const cors = require('cors')
const bodyParser = require('body-parser')
const routes = require('./routes');
const models = require('./models');
const dotenv = require('dotenv');
dotenv.config();
global.__basedir = __dirname + "/.";


const port = process.env.PORT || 3001;

app.set('port', port);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/v1', routes);


// force: true will drop the table if it already exists

models.sequelize.sync({ force: false })
  .then(() => {
    console.log('Drop and Resync with { force: true }');
  })
  .catch(err => console.log('Error by models : ' + err))

app.listen(app.get('port'), () => {
  console.log('Server Started', port);
});
