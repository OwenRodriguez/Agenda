'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = Schema({
    name: String,
    lastname: String,
    email: String,
    password: String,
    phone: Number,
    contacts: []
})

 module.exports = mongoose.model('user', userSchema); 