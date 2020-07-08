'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = 3300;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AgendaBV2020', {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>{
    console.log('Conexion a la bade de datos correctamente')
    //levantar servidor de express
    app.listen(port, ()=>{
            console.log('Servidor de express corriendo');
    })
})
.catch ((err)=>{
        console.log('error al conectarse, error', err);
})