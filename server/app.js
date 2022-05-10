const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/connectDB');

connectDB();

const app = express();

const PORT = process.env.PORT;

var whitelist = ['http://localhost:3000']
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded());

app.use('/auth', authRoutes);
app.use('/task', taskRoutes);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../','client', 'build', 'index.html'));
  });
}

app.listen(PORT, () => console.log(`server started at port ${PORT}`));