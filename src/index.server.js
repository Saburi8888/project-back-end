const express = require('express');
const env = require('dotenv');
const app= express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');

//environment variable or constants
env.config();



//mongodb connection
//mongodb+srv://<username>:<password>@cluster0.4qkjf.mongodb.net/<dbname>?retryWrites=true&w=majority
mongoose.
  connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.4qkjf.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
  }
).then(() => {
  console.log('Database connected.');
});

// Middleware
app.use(bodyParser.urlencoded({
  extended: true
}));


app.use(express.json());

app.use('/api', authRoutes);
app.use('/api', adminRoutes);
app.use('/api', categoryRoutes);


app.get('/',(req, res, next) => {
  res.status(200).json({
    message:'Hello from server'
  });
});

//sample test code..
app.post('/data',(req, res, next) => {
  res.status(200).json({
    message:req.body
  });
});
// listening app on server.
app.listen(process.env.PORT,() => {
  console.log(`server is running on port ${process.env.PORT}`);
});


