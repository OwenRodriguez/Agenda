'use strict'
var User = require('../models/user.model');
var Contact = require('../models/contact.model');

function prueba(req, res){
    res.status(200).send({messahe: 'Ruta de prueba'});
}

function saveUser(req, res){
    var user = User();
    var params = req.body;

    if( params.name &&
        params.lastname && 
        params.email &&
        params.password &&
        params.phone){

            User.findOne({email: params.email},(err, userFind)=>{
                if(err){
                    res.staus(500).send({message:'Error genereal' })
                }else if(userFind){
                    res.status(200).send({message:'Correo ya utilizado'})
                }else{
                    user.name = params.name;
                    user.lastname = params.lastname;
                    user.email = params.email;
                    user.password = params.password;
                    user.phone = params.phone;

                    user.save((err, userSaved)=>{
                        if(err){
                            res.status(500).send({message:'Error general'});
                        }else{
                        if(userSaved){
                            res.status(200).send({user: userSaved});
                        }else{
                            res.status(200).send({message: 'Error guardar usuario'});
                        }
                }
            });
                }
            });
        }else{
            res.status(200).send({message: 'Por favor ingrese los datos'});
        }
}

function listUsers(req, res){
    User.find({}).exec((err, users)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        }else{
            if(users){
                res.status(200).send({todosLosUsuarios:{users}});
                console.log(users);
            }else{
                res.status(200).send({message:'No se obtuvieron datos'});
            }
        }
    });
}


function updateUser(req, res){
    let userId= req.params.id;
    let update= req.body;

    User.findByIdAndUpdate(userId,update,(err, userUpdated)=>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(userUpdated){
                res.status(200).send({usuarioActualizado: userUpdated});
            }else{
                res.status(200).send({message:'Error al actualizar'});
            }
        }
    });
}

function deleteUser(req, res){
    let userId= req.params.id;

    User.findByIdAndRemove(userId,(err, userDelete)=>{
        if(err){
            res.status(200).send({message: 'Error en el servidor'});
        }else  if(userDelete){
                res.status(200).send({usuarioEliminado: {userDelete}});
            }else{
                res.status(200).send({message: 'Error al eliminar'});
            }
    });
}

function setContact(req, res){
    let userId = req.params.id;
    let params = req.body;
    let contact = new Contact();

    if (params.name && params.phone){

        User.findById(userId,(err, userFind)=>{
            if(err){
                res.status(500).send({message:'error general'});
            }else if (userFind){
                contact.name = params.name;
                contact.lastname = params.lastname;
                contact.phone = params.phone;

                User.findByIdAndUpdate(userId, {$push:{contacts: contact}}, {new: true},(err,userUpdated)=>{
                if(err){
                    res.status(500).send({message: 'error general'});
                }else if(userUpdated){
                    res.status(200).send({userUpdates:userUpdated});
                }else{
                    res.status(418).send({message: 'Error al actualiar'})
                }
            });
            }else{
                res.status(418).send({message:'USUARIO NO ENCONTRADO'})
            }
        });   
    }else{
        res.status(200).send({message:'faltan datos'});
    }
}

function removeEmbContact (req, res){
    let  userId = req.params.idU;
    let contactId = req.params.idC;

    User.findOneAndUpdate({_id:userId, "contacts._id": contactId}, 
    {$pull:{contacts:{_id:contactId}}}, {new:true}, 
    (err, contactRemoved)=>{
        if(err){
            res.status(500).send({message: 'Error general'});
        }else if(contactRemoved){
            res.send({user: contactRemoved});
        }else{
            res.status(418).send({message: 'Contacto no eliminado'});
        }
    });
} 

module.exports ={     
    prueba,
    saveUser,
    listUsers,
    updateUser,
    deleteUser,
    setContact,
    removeEmbContact
}
