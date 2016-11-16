var postmark = require("postmark").Client(process.env.POSTMARK_CLIENT);
var async = require('async');
var crypto = require('crypto');

if (!process.env.FROM_EMAIL) {
    console.log('FROM_EMAIL environment variable.')
    process.exit();
}

function sendWelcomeEmail(user, host, finalCB) {

    async.waterfall([
        function(done) {
            crypto.randomBytes(15, function(err, buf) {
                var toekn = buf.toString('hex');
                done(err, token);
            })
        },
        function(token, done) {
            user.emailToken = token;
            user.emailTokenExpires = Date.now() + 3600000 * 24;
            user.update({
         		emailToken:user.emailToken,
         		emailTokenExpires: user.emailTokenExpires
            }, {
                where: {
                    email: user.email,
                }
            }).then(function(Author) {
               done(undefined, user);
            }).catch(function(err) {
               done(err, user);
            });
        },
        function(user, done) {
        	postmark.sendEmailWithTemplate({
        	  	"From": process.env.FROM_EMAIL,
        	  	"To": user.email,
        	  	"TemplateId": 1026321,
        	  	"TemplateModel": {
        	    	"product_name": "欢迎入驻 gochen 博客",
        	    	"name": user.name,
        	    	"action_url": host + '/validateEmail/' + user.verifyEmailToken,
        	    	"username": user.name,
        	    	"sender_name": "gochen Team",
        	    	"product_address_line1": "One Market",
        	    	"product_address_line2": "San Francisco"
        	  	}
        	}, done);
        }
    ], function(err) {
        if (err) {
            console.log('Could not send welcome email to: ' + user.email);
            console.error(err);
            if (finalCB) {
                finalCB({
                    message: 'Could not send welcome email to: ' + user.email
                });
            }
        } else {
            if (finalCB) {
                finalCB();
            }
        }
    })
}

module.exports = {
    sendWelcomeEmail: sendWelcomeEmail
}
