var express    = require('express'),
    _          = require('lodash'),
    Post      = require('./post'),
    expressJwt = require('express-jwt');

var app = module.exports = express.Router();

//查询所有文章
app.get('/', function(req, res) {
  Post.findAll().then(function(posts) {
    if (!posts) {
      res.json({
        status: 'success',
        message:"oh, it's vergin "
      });
    } else {
       res.status(200).send(posts);
    }
   
  }).catch(function(error) {
    res.status(500).send(err);
  });
});

//查询某个类别下的所有文章
app.get('/categories/:categoryId', function(req, res) {
  Post.findAll({where:{category_id:req.params.categoryId}})
  .then(function(posts) {
    if (posts == null) {
      rse.json({
        status: 'success',
        message: 'not found the records'
      });
    } else {
      res.status(200).send(posts);
    }

  }).catch(function(err) {
    res.status(500).send(err);
  });
});
//查询某个用户的所有文章
app.get('/users/:userId', function(req, res) {
  Post.findAll({where:{author_id: req.params.id}})
  .then(function(posts) {
    if (posts == null) {
      rse.json({
        status: 'success',
        message: 'not found the records'
      });
    } else {
      res.status(200).send(posts);
    }
  }).catch(function(err) {
    res.status(500).send(err);
  });
});

// 找某一个特定文章
app.get('/:id', function(req, res) {
  Post.findOne({where:{id: req.params.id}}).then(function( post){
      if (!post) {
        res.status(404).json({
          status: 'success',
          message: 'not found the record'
        });
      } else {
        res.status(200).send(post);
      }
  }).catch(function(err){
    res.status(500).send(err);
  });
});

app.put('/:id',
 // expressJwt({secret: process.env.AUTH0_CLIENT_SECRET}),
  function(req, res) {

  Post.update({
    title: req.body.title,
    description: req.body.description,
    content: req.body.content,
    postDate: req.body.postDate,
    category_id: req.body.category_id,
    author_id: req.body.author_id
  },
  {
    where: {
      id: req.params.id
    }
  }).then(function(post){
        res.status(200).send(req.body);
  }).catch(function(err){
    res.status(500).send(err);
  });
});

app.delete('/:id',
 // expressJwt({secret: process.env.AUTH0_CLIENT_SECRET}), 
 function(req, res) {
  Post.findById(req.params.id).then(function(post){
      if (post) {
            return post.destroy()
            .then(function() {
                res.status(200).json({
                  status: 'success',
                  message: '成功删除该文章',
                  post: post
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

app.post('/', function(req, res) {
    Post.create(req.body)
    .then(function(newPostCreated) {
        res.status(201).send(newPostCreated);
    }).catch(function(err){
      res.status(500).json(err);
    });
});