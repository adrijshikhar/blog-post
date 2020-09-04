const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect('mongodb://mongo:9000/app',
  // mongo config when working with docker
  { useNewUrlParser: true }
)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

const Item = require('./models/Item');

app.get('/', (req, res) => {
  console.log("hit home route");
  
  Item.find()
    .then(items => res.render('index', { items }))
    .catch(err => res.status(404).json({ msg: 'No items found', err}));
});

app.post('/item/add', (req, res) => {

  const { name, post } = req.body;

  if (name === "" || post === "")
    res.status(401).json({ msg: 'Wrong input' }); 

  const newItem = new Item({
    name,
    post
  });

  newItem.save().then(() => res.redirect('/'));
});

const port = 3000

// which port is the node server listening on?

app.listen(port, () => console.log('I will not run', port));
