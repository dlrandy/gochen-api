var express = require('express'),
    Author = require('./author'),
    utils = require('../../util/jwt'),
    expressJwt = require('express-jwt');

var app = module.exports = express.Router();

//查询所有文章
app.get('/', function(req, res) {
  Author.findAll().then(function(authors) {
    if (!authors) {
      res.json({
        status: 'success',
        message:"oh, it's vergin "
      });
    } else {
       res.status(200).send(authors);
    }
   
  }).catch(function(error) {
    res.status(500).send(err);
  });
});


app.get('/:id', function(req, res) {
  Author.findOne({where:{id: req.params.id}}).then(function( author){
      if (!author) {
        res.status(404).json({
          status: 'success',
          message: 'not found the record'
        });
      } else {
        res.status(200).send(author);
      }
  }).catch(function(err){
    res.status(500).send(err);
  });
});

app.put('/:id',
   // expressJwt({secret: process.env.AUTH0_CLIENT_SECRET}),
  function(req, res) {

  Author.update({
    name: req.body.name,
    email: req.body.email,
    cellphone: req.body.cellphone,
    isAdmin: req.body.isAdmin,
    password: req.body.password
  },
  {
    where: {
      id: req.params.id
    }
  }).then(function(Author){
        res.status(200).send(req.body);
  }).catch(function(err){
    res.status(500).send(err);
  });
});

//todo :use transaction update posts table
app.delete('/:id',
   // expressJwt({secret: process.env.AUTH0_CLIENT_SECRET}),
   function(req, res) {
  Author.findById(req.params.id).then(function(Author){
      if (Author) {
            return Author.destroy()
            .then(function() {
                res.status(200).json({
                  status: 'success',
                  message: 'delete the catagory successfully'
                });
            }).catch(function(err){
              res.status(500).json(err);
            });
        }

        res.status(404).json({
          status: 'success',
          message: 'not found the record'
        });
  }).catch(function(err){
      res.status(500).json(err);
  });
});

app.post('/signup', function(req, res) {
    Author.create(req.body)
    .then(function(newAuthorCreated) {
        var token = utils.generateToken(newAuthorCreated);
        res.status(201).json({user:newAuthorCreated, token:token});
    }).catch(function(err){
      res.status(500).json(err);
    });
});

app.post('/signin', function(req, res){
    Author.findOne({where:{email:req.body.email,
      password:req.body.password}})
    .then(function(author) {
      if(!author){
        return res.status(404).json({
          status: 'sucess',
          message: 'Username or Password is Wrong'
        })
       }
       var token = utils.generateToken(author);
        res.status(201).json({user:author, token:token});
       
    }).catch(function(err){
      res.status(500).json(err);
    });
})

app.post('/', function(req, res) {
    Author.create(req.body)
    .then(function(newAuthorCreated) {
        res.status(201).send(newAuthorCreated);
    }).catch(function(err){
      res.status(500).json(err);
    });
});