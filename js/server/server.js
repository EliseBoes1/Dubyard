const express = require('express');
const app = express();
const port = 12345;
const bodyParser = require('body-parser');
const fs = require('fs');
var bcrypt = require('bcryptjs');
const MongoClient = require('mongodb').MongoClient;
const user = 'Elise';
const password = 'qckkln3tCjkGuxFt';
const url = `mongodb+srv://Elise:Dub2020Yard@dubyard.whehk.gcp.mongodb.net/Dubyard?retryWrites=true&w=majority`;
const client = new MongoClient(url);
const dbName = 'Dubyard';
let loggedInUser;
let loggedInUsername;
let db;
const appId = 'dubyard-jygvc';
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
var uniqid = require('uniqid');

app.use(cors())

MongoClient.connect(url, (err, database) => {
  if (err) return console.log(err);
  db = database.db(dbName);
  app.listen(port, () => console.log(`Example app listening on port ${port}!`));
});

app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/signup', (user, res) => {
  const users = db.collection('Users');
  users.findOne({
    'email': user.body.email
  }).then(result => {
    if (result == null) {
      const pwToHash = user.body.password;
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(pwToHash, salt, function (err, hash) {
          user.body.password = hash;
          users.insertOne(user.body, (err, succes) => {
            console.log(succes);
            console.log(err);
          });
        });
      });
      res.send(user.body);
    } else {
      res.send({
        'resp': 'false'
      });
    }
  });
});

app.post('/login', function (loggedInUserData, res) {
  const users = db.collection('Users');
  if (loggedInUserData.body != null) {
    users.findOne({
      'email': loggedInUserData.body.email
    }).then(result => {
      bcrypt.compare(loggedInUserData.body.password, result.password).then((check) => {
        if (check == true) {
          loggedInUser = result.id;
          loggedInEmail = result.email;
          res.send(result);
        } else {
          res.send({
            'resp': 'false'
          });
        }
      });
    });
  }
});

app.post('/editprofile', function (req, res) {
  console.log(req.body)
  const users = db.collection('Users');
  var o_id = new ObjectId(req.body.id);
  bcrypt.genSalt(10, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      users.updateOne({
        '_id': o_id
      }, {
        $set: {
          'firstname': req.body.firstname,
          'lastname': req.body.lastname,
          'password': hash,
          'email': req.body.email
        }
      })
      users.findOne({
        '_id': o_id
      }).then(result =>{
        res.send(result);
      })
    });
  });
});


app.post('/getUser', (user, res) => {
  const users = db.collection('Users');
  var o_id = new ObjectId(user.body.id);
  users.findOne({
    '_id': o_id
  }).then(result => {
    res.send(result);
  });
});

app.post('/addpost', function (post, res) {
  const posts = db.collection('Posts');
  const users = db.collection('Users');
  post.body.id = uniqid();
  // console.log(post.body);
  var o_id = new ObjectId(post.body.user);
  try{
  users.updateOne({
    '_id': o_id
  }, {
    $push: {
      'blogposts': {
        'id': post.body.id
      }
    }
  });
}catch(e){
  console.log(e);
}
 try{ 
  posts.insertOne(post.body).then(result=> res.send(result));
}catch(e){
  console.log(e);
}});

app.post('/getposts', function (id, res) {
  const posts = db.collection('Posts');
  posts.find({
    'user': id.body.id
  }).toArray().then(result => {
    res.send(result);
  });
});

app.post('/removepost', function (req, res) {
  const users = db.collection('Users');
  const posts = db.collection('Posts');
  var o_id = new ObjectId(req.body.user);
  users.findOneAndUpdate({
    '__id': o_id
  }, {
    $pull: {
      'blogposts': {
        'id': req.body.post
      }
    }
  });
  posts.deleteOne({
    'id': req.body.post
  }).then(result =>{
    res.send(result);
  });
});

app.post('/getpost', function (id, res) {
  const posts = db.collection('Posts');
  posts.findOne({
    'id': id.body.id
  }).then(result => {
    res.send(result);
  });
});


app.post('/editpost', (req, res) => {
  console.log(req.body);
  const posts = db.collection('Posts');
  posts.updateOne({
    'id': req.body.id
  }, {
    $set: req.body
  }).then(result =>{
    res.send(result);
  });
});

app.get('/allposts', function (req, res, next) {
  const posts = db.collection('Posts');
  posts.find({}).toArray().then(result => {
    res.send(result);
  });
});

app.post('/getpostperpage', (req, res) => {
  const posts = db.collection('Posts');
  posts.find({
    tags: req.body.tag
  }).toArray().then(result => {
    res.send(result);
  });
});