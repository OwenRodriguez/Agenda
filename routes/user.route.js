'use strict'

var express = require('express');
var userController = require ('../controllers/user.controller');

var api = express.Router();
api.get('/pruebaControlador', userController.prueba);
api.post('/saveUser/', userController.saveUser);
api.get('/listUsers', userController.listUsers);
api.put('/updateUser/:id', userController.updateUser);
api.delete('/deleteUser/:id', userController.deleteUser);
api.put('/setContact/:id',userController.setContact);
api.delete('/removeEmbContact/:id',userController.removeEmbContact);
module.exports= api;
