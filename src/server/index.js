const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const bodyParser = require('body-parser');

// import Mongoose and the User model
const mongoose = require('mongoose');
const Lecturer = require('./models/Lecturer');
const Module = require('./models/Module');

const server = express();
const dbname = 'lecturer-modules'; // change to match your database name

// serve files from the dist directory
server.use(express.static('dist'));

// URL to our DB - will be loaded from an env variable or will use local DB
const mongo_uri = process.env.MONGODB_URL || `mongodb://localhost:27017/${dbname}`;

let db;

mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

// bodyParser, parses the request body to be a readable json format
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());

// define the various endpoints

// retrieve all user objects from DB
server.get('/api/lecturers', (req, res) => {
  Lecturer.find({}, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// retrieve user with specific ID from DB
server.get('/api/lecturers/:id', (req, res) => {
  Lecturer.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});


server.get('/api/lecturers/:id/modules', (req, res) => {
  Lecturer.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    Module.find({lecturer_id: result._id}, (err, modules) => {
      if (err) throw err;

      res.send(modules);
    });
  });
});


// create new user based on info supplied in request body
server.post('/api/modules', (req, res) => {
  // create a new user object using the Mongoose model and the data sent in the POST
  const module = new Module(req.body);
  // save this object to the DB
  module.save((err, result) => {
    if (err) throw err;

    console.log('created in database');
    res.redirect('/');
  });
});

// update modules based on info supplied in request body
server.put('/api/modules', (req, res) => {
  // get the ID of the user to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a user matching this ID and update their details
  Module.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});

server.get('/api/modules', (req, res) => {
  Module.find({}, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

server.get('/api/modules/:id', (req, res) => {
  Module.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    res.send(result);
  });
});

// delete user with specific ID from DB
server.delete('/api/modules', (req, res) => {
  Module.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

server.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
