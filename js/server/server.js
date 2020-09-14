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

//Get changes that have to the use proflile
app.post('/editprofile', function (req, res) {
  const users = db.collection('Users');
  //find data of online user
  users.updateOne({
    'id': loggedInUser
  }, {
    //Set current values (replace previous val)
    $set: {
      'firstname': req.body.editfirstname,
      'lastname': req.body.editlastname,
      'password': req.body.password,
      'email': req.body.email
    }
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
  var o_id = new ObjectId(post.body.user);
  users.updateOne({
    '_id': o_id
  }, {
    $push: {
      'blogposts': post.body.id
    }
  });
  posts.insertOne(post.body, (err, succes) => {
    console.log(succes);
    console.log(err);
  });
});

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
  users.updateOne({
    '__id': o_id
  }, {
    $pull: {
      'blogposts': req.body.post
    }
  });
  posts.deleteOne({
    'id': req.body.post
  })
});

app.post('/editpost', (req, res) => {
  console.log(req.body)
  const posts = db.collection('Posts');
  posts.updateOne({
    'id': req.body.id
  }, {
    $set: req.body
  })
});

// app.get('/api/userimg', (req, res) => {
//   fs.readFile('userimg.json', function (err, data) {
//     let allImg = JSON.parse(data);
//     res.send(allImg);
//     console.log(data);
//     console.log(allImg);
//   });
// })

// app.post('/api/saveimg', function (req, res) {
//   fs.readFile('userimg.json', function (err, data) {
//     var allImg = JSON.parse(data);
//     allImg.push(req.body);
//     fs.writeFile('userimg.json', JSON.stringify(allImg), function (err) {
//       if (err) throw err;
//     });
//   });
// });

// //Get loggedin user data
// app.post('/api/deleteprofile', (req, res) => {
//   const users = db.collection('users');
//   //search for the online user and delete user
//   users.deleteOne({
//     'id': loggedInUser
//   });
// });