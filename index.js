const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');
const bodyParser = require('body-parser');


app.listen(port, () => console.log(`Server starting at ${port}`));
app.set('view engine', 'pug')
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let lists ;
function loadData(){
  const data = fs.readFileSync('./data.json', {
    encoding: 'utf8'
  });
  lists = JSON.parse(data);
}

function saveList() {
  const data2 = JSON.stringify(lists);
  fs.writeFileSync('./data.json', data2);
}

app.get('/', function (req, res) {
  res.render('index');
});
app.get('/list', function (req, res) {
  loadData();
  res.render('list/index', {
    lists
  });
});
app.get('/list/add', function (req, res) {
  res.render('list/add');
});
app.post('/list/add', function(req, res) {
  loadData();
  const list = {
    id: lists[lists.length - 1].id + 1,
    name: req.body.name
  };
  lists.push(list);
  saveList();
  loadData();
  res.redirect('/list');
});

app.get('/list/update', function (req, res) {
  loadData();
  res.render('list/update');
});

app.post('/list/update', function (req, res) {
  loadData()
  const index = lists.findIndex((list) => list.name == req.body.old_name);
  if(index >= 0) {
    lists[index].name = req.body.new_name;
  }
  saveList();
  res.redirect('/list');
});