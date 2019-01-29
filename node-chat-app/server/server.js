const path = require('path');
const express = require('express');

const app = express();

var publicPath = path.join(__dirname, '../public');
app.use(express.static(publicPath));

//console.log(publicPath);

app.get('/', (req, res) => {
  res.render('index.html');
})

app.listen(3000, () => console.log('server running on port 3000!'));