var express    = require('express'),
    _          = require('lodash'),
    Category      = require('./category'),
    expressJwt = require('express-jwt');

var app = module.exports = express.Router();

//查询所有文章
app.get('/', function(req, res) {
  Category.findAll().then(function(categorys) {
    if (categorys.length <=0) {
      res.json({
        status: 'success',
        message:"oh, it's vergin "
      });
    } else {
       res.status(200).send(categorys);
    }
   
  }).catch(function(error) {
    res.status(500).send(err);
  });
});


app.get('/:id', function(req, res) {
  Category.findOne({where:{id: req.params.id}}).then(function( category){
      if (!category) {
        res.status(404).json({
          status: 'success',
          message: 'not found the record'
        });
      } else {
        res.status(200).send(category);
      }
  }).catch(function(err){
    res.status(500).send(err);
  });
});

app.put('/:id',
 expressJwt({secret: process.env.AUTH0_CLIENT_SECRET}), 
 function(req, res) {

  Category.update({
    title: req.body.title,
    hot: req.body.hot
  },
  {
    where: {
      id: req.params.id
    }
  }).then(function(category){
        res.status(200).send(req.body);
  }).catch(function(err){
    res.status(500).send(err);
  });
});

//todo :use transaction update posts table
app.delete('/:id',
 expressJwt({secret: process.env.AUTH0_CLIENT_SECRET}),
  function(req, res) {
  Category.findById(req.params.id).then(function(category){
      if (category) {
            return category.destroy()
            .then(function() {
                return res.status(200).json({
                  status: 'success',
                  message: 'delete the catagory successfully'
                });
            }).catch(function(err){
              return res.status(500).json(err);
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

app.post('/', function(req, res) {
    Category.create(req.body)
    .then(function(newCategoryCreated) {
        res.status(201).send(newCategoryCreated);
    }).catch(function(err){
      res.status(500).json(err);
    });
});