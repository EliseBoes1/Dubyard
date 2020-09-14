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
            // console.log(succes);
            // console.log(err);
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
          console.log('true')
        } else {
          res.send({
            'resp': 'false'
          });
          console.log('false');
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
  console.log(user.body.id);
  var o_id = new ObjectId(user.body.id);
  users.findOne({
    '_id': o_id
  }).then(result => {
    res.send(result);
  });
});

app.post('/addpost', function (req, res) {
  const posts = db.collection('Posts');
  const users = db.collection('Users');
  users.updateOne({
    'id': loggedInUser
  }, {
    //Set current values (replace previous val)
    $set: {
      'firstname': req.body.editfirstname
    },
    $push: {
      'blogposts': req.body.id
    }
  });
});

// app.post('/api/addsong', function (req, res) {
//   const users = db.collection('users');
//   //find saved tracks of user in database and push new track to this list
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $push: {
//       'savedTracks': {
//         'trackId': req.body.trackId
//       },
//       'activity': req.body.activity
//     }
//   });
// });

// app.post('/api/removetrack', function (req, res) {
//   const users = db.collection('users');
//   //find saved tracks of user in database and push new track to this list
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $pull: {
//       'savedTracks': {
//         'trackId': req.body.trackId
//       }
//     }
//   });
// });

// app.get('/api/userimg', (req, res) => {
//   fs.readFile('userimg.json', function (err, data) {
//     let allImg = JSON.parse(data);
//     res.send(allImg);
//     console.log(data);
//     console.log(allImg);
//   });
// })

// app.get('/api/allusers', (req, res) => {
//   const users = db.collection('users');
//   //search for the online user
//   users.find({}).toArray(function (err, docs) {
//     res.send(docs);
//   });
// });


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

// app.post('/api/createplaylist', (req, res) => {
//   const playlists = db.collection('playlists');
//   const users = db.collection('users');
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $push: {
//       'playlists': req.body.id
//     }
//   });
//   playlists.insertOne(req.body, (err, succes) => {
//     console.log(succes);
//     console.log(err);
//   });
// });

// app.post('/api/addtracktoplaylist', (req, res) => {
//   const playlists = db.collection('playlists');
//   playlists.updateOne({
//     'id': req.body.playlistId
//   }, {
//     $push: {
//       'tracks': req.body.trackId
//     }
//   });
// });

// app.get('/api/findallplaylists', (req, res) => {
//   const playlists = db.collection('playlists');
//   playlists.find({}).toArray(function (err, docs) {
//     res.send(docs);
//     console.log(err);
//   });
// });

// app.get('/api/finduserplaylists', (req, res) => {
//   const playlists = db.collection('playlists');
//   playlists.find({
//     'users': loggedInUsername
//   }).toArray(function (err, docs) {
//     res.send(docs);
//     console.log(err);
//   });
// });

// app.post('/api/tracksofplaylist', (req, res) => {
//   const playlists = db.collection('playlists');
//   playlists.findOne({
//     'id': req.body.id
//   }).then(result => {
//     res.send(result);
//   });;
// });

// app.post('/api/deleteplaylist', (playlistInf, res) => {
//   const users = db.collection('users');
//   const playlists = db.collection('playlists');
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $pull: {
//       'playlists': {
//         'id': playlistInf.body.id
//       }
//     }
//   });
//   playlists.deleteOne({
//     'id': playlistInf.body.id
//   })
// });

// app.post('/api/creategroup', (req, res) => {
//   const users = db.collection('users');
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $push: {
//       'groups': req.body
//     }
//   });
// });

// app.post('/api/deletegroup', (groupInf, res) => {
//   const users = db.collection('users');
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $pull: {
//       'groups': {
//         'id': groupInf.body.id
//       }
//     }
//   });
// });

// app.post('/api/addconnect', (req, res) => {
//   const users = db.collection('users');
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $push: {
//       'friends': req.body,
//       'activity': req.body.activity
//     }
//   });
// });

// app.post('/api/removeconnect', (req, res) => {
//   const users = db.collection('users');
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $pull: {
//       'friends': {
//         'username': req.body.username
//       }
//     }
//   });
// });

// app.post('/api/sendmessage', (req, res) => {
//   const users = db.collection('users');
//   const messages = db.collection('messages');
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $push: {
//       'messages': req.body.messageId
//     }
//   });
//   users.updateOne({
//     'id': req.body.receiverId
//   }, {
//     $push: {
//       'messages': req.body.messageId
//     }
//   });
//   messages.insertOne(req.body, (err, succes) => {
//     console.log(err);
//   });
// });

// app.post('/api/readmessage', (req, res) => {
//   const messages = db.collection('messages');
//   messages.updateOne({
//     'messageId': req.body.messageId
//   }, {
//     $set: {
//       'status': true
//     }
//   });
// });

// app.post('/api/removemessage', (req, res) => {
//   const users = db.collection('users');
//   const messages = db.collection('messages');
//   users.updateOne({
//     'id': loggedInUser
//   }, {
//     $pull: {
//       'messages': req.body.messageId
//     }
//   });
// });

// app.get('/api/findmessages', (req, res) => {
//   const messages = db.collection('messages');
//   const users = db.collection('users');
//   messages.find({}).toArray(function (err, docs) {
//     res.send(docs);
//     console.log(err);
//   });
// });
/*app.post('/api/connecttogroup', function (req, res) {
  const users = db.collection('users');
  users.updateOne({
    'username': loggedInUser
  }, {
    $pull: {
      'groups': {'id':req.body.username}
    }
  });
});*/

//find saved tracks of user in database and push new track to this list

// app.get('/otherprofile.', function (req, res) {
//   console.log(req.query);
//   });