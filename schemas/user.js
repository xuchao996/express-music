
var mongoose = require("mongoose");

// Schema
var userSchemas = new mongoose.Schema({
    username: String,
    password: String
})

// model
var User = mongoose.model('users', userSchemas);

module.exports = User