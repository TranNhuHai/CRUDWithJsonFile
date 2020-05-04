const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');


app.listen(port, () => console.log(`Server starting at ${port}`));
app.set('view engine', 'pug')
app.set('views', './views');

const data = fs.readFileSync('./data.json', {
  encoding: 'utf8'
});
const lists = JSON.parse(data);


app.get('/', function (req, res) {
  res.render('index');
});
app.get('/list', function (req, res) {
  res.render('list/index', {
    lists
  });
});
app.get('/list/add', function (req, res) {
  res.render('list/add');
});
app.post('/list/add', function(req, res) {

});