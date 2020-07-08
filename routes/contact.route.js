'use strict'

var express = require('express');
var contactController = require('../controllers/contact.controller');

var api = express.Router();
api.post('/saveContact',contactController.saveContact);
api.get('/listContacts', contactController.listContacts);
api.put('/updateContact/:id', contactController.updateContact);
api.delete('/deleteContact/:id',contactController.deleteContact);
api.put('/updateEmbContact/:id', contactController.updateEmbContact);

module.exports=api;