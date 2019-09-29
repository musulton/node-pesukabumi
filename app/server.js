const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT;
const Constants = require('./constants/constants');

require('./configs/db');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const userRoutes = require('./routes/users');
userRoutes(app);

app.listen(port, () => {
    console.log(`${Constants.SERVER.RUNNING} ${port}`)
});