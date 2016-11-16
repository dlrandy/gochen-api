var jwt = require('jsonwebtoken');
module.exports.generateToken = function (user) {
	var u = {
		name: user.name,
		email: user.email,
		password: user.password,
		cellphone: user.cellphone,
		isAdmin: user.isAdmin
	};
	return jwt.sign(u, process.env.AUTH0_CLIENT_SECRET, {
		expiresIn: 60 * 60 * 6
	})
}