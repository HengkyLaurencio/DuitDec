const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

const userRoutes = require('./features/user/userRoute');
const authRoutes = require('./features/authentication/authRoute');
const accRoutes = require('./features/accounts/accRoute');

//cors
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user/accounts', accRoutes);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});   