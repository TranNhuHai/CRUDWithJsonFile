const express = require('express');
const app = express();
const port = 8080;
const fs = require('fs');


app.listen(port, () => console.log(`Server starting at ${port}`));
app.set('view engine', 'pug')

const data = JSON.parse(fs.readFileSync('./data.json', {encoding: 'utf8'}));

