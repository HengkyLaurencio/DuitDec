const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const userRoutes = require('./features/user/userRoute');

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});   