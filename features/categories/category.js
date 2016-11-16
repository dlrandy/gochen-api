var Sequelize = require('sequelize'),
  sequelize = require('../../config').db();

var Category = sequelize.define('category', {
  id: { type: Sequelize.INTEGER, 
      primaryKey: true,
      autoIncrement: true
  },
  title: {
    type: Sequelize.STRING,// Will result in an attribute that is firstName when user facing but first_name in the database
  },
  hot: {
    type: Sequelize.INTEGER
  }
 

},
{
  freezeTableName: true // Model tableName will be the same as the model name
});

Category.sync({force: true}).then(function () {
  // Table created
  return Category.create({
    title: 'es6',
    hot: 6
  });
});


module.exports = Category;


