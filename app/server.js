const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const Constants = require('./constants/constants');

require('./configs/db');

app.use(express.static('uploads'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require('./routes/users');
userRoutes(app);

const geoRoutes = require('./routes/geoLocations');
geoRoutes(app);

app.listen(port, () => {
    console.log(`${Constants.SERVER.RUNNING} ${port}`)
});