

// Require
var postmark = require("postmark");

// Example request
var client = new postmark.Client("339ec1e8-af06-4967-8ae1-1ab4d068d15b");

client.sendEmail({
    "From": "service@gochen.cc",
    "To": "1208484996@qq.com",
    "Subject": "Test", 
    "TextBody": "Hello from Postmark!"
});