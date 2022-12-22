const express = require('express')
const connectToMongo = require('./db');

connectToMongo();

const app = express()
const port = 3000

app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/api/auth', require('./routes/auth'));
app.use('/api/links', require('./routes/links'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`linkshortner service listening on port ${port}`)
})