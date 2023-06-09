const connectToMongo =require('./db');
connectToMongo();

const express = require('express')
const app = express()
const port = 4000
var cors = require('cors');

app.use(cors())
app.use(express.json());
app.get('/', (req, res) => {
  res.send('yes u did it!!')
})
app.use('/api/auth',require('./Routs/auth'));
app.use('/api/notes',require('./Routs/notes'));


app.listen(port, () => {
  console.log(`iNotebook backend listening at https://localhost: ${port}`)
})