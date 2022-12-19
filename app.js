require('dotenv').config();
require('express-async-errors');
const express = require('express');
const { connectDB } = require("./db/connect");
const authRoutes = require("./routes/auth")
const jobRoutes = require("./routes/jobs")
const { auth} = require("./middleware/authentication")
const app = express();

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(connectDB);

app.use(express.json());
// extra packages
app.use('/api/v1/auth', authRoutes);

app.use('/api/v1/jobs', auth, jobRoutes);

// routes
app.get('/', (req, res) => {
  res.send('jobs api');
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    // await connectDB;
    // console.log("Connected to DB")
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
