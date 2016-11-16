var Sequelize = require('sequelize'),
  sequelize = require('../../config').db();

var Author = sequelize.define('author', {
  id: { type: Sequelize.INTEGER, 
      primaryKey: true,
      autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    field: 'javascript' // Will result in an attribute that is firstName when user facing but first_name in the database
  },
  email: {
    type: Sequelize.STRING,
    allowNull: true,
    unique: true
  },
  password: {
    type: Sequelize.STRING,
    allowNull: true
  },
  cellphone: {
    type: Sequelize.STRING
  },
  isAdmin: {
    type: Sequelize.BOOLEAN, 
    allowNull: true, 
    defaultValue: false
  },
  emailToken:{
    type: Sequelize.STRING,
    allowNull: true
  },
  emailTokenExpires:{
    type: Sequelize.STRING,
    allowNull: true
  }
},
{
  freezeTableName: true // Model tableName will be the same as the model name
});

Author.sync({force: true}).then(function () {
  // Table created
  return Author.create({
    name: 'zhazha',
    email: '1208484996@qq.com',
    cellphone:'15504256580',
    isAdmin: true,
    password: 111
  });
});


module.exports = Author;


