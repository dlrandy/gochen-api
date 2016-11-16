var Sequelize = require('sequelize'),
	sequelize = require('../../config').db(),
	Category = require('../categories/category'),
  Author = require('../authors/author');

var Post = sequelize.define('post', {
  id: { type: Sequelize.INTEGER, 
  		primaryKey: true,
  		autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,
    field: 'new-post' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  description: {
    type: Sequelize.TEXT
  },
  content: {
  	type: Sequelize.TEXT
  },
  postDate: {
  	type: Sequelize.DATE,
  	defaultValue: Sequelize.NOW
  },
  category_id: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Category,

     // This is the column name of the referenced model
     key: 'id',

     // This declares when to check the foreign key constraint. PostgreSQL only.
     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
   }
 },
 author_id: {
   type: Sequelize.INTEGER,

   references: {
     // This is a reference to another model
     model: Author,

     // This is the column name of the referenced model
     key: 'id',

     // This declares when to check the foreign key constraint. PostgreSQL only.
     deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
   }
 },
},
{
  freezeTableName: true // Model tableName will be the same as the model name
});

Post.sync({force: true}).then(function () {
  //Table created
  return Post.create({
    title: 'test title',
    description: 'desc',
    content: 'test content',
    author_id: 1,
    category_id: 1

  });
});


module.exports = Post;


