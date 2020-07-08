'use strinct'
var Contact = require ('../models/contact.model');
var User = require ('../models/user.model');

function saveContact (req, res){
    var contact = Contact();
    var params = req.body;

    if(
        params.name&&
        params.lastname&&
        params.phone){

            Contact.findOne({phone: params.phone},(err, contactFind)=>{
                if(err){
                    res.status(500).send({message:'Error general'})
                }else if(contactFind){
                    res.status(200).send({message:'Numero ya registrado'})
                }else{
                    contact.name = params.name;
                    contact.lastname = params.lastname;
                    contact.phone = params.phone;

                    contact.save((err, contactSaved)=>{
                        if(err){
                            res.status(500).send({message:'Error general'});
                        }else{
                        if(contactSaved){    
                            res.status(200).send({contactSaved});
                        }else{
                            res.status(200).send({message: 'Error guardar contacto'});
                        }
                        }
                    });
                }
            });
        }else{
            res.status(200).send({message: 'por favor ingrese los datos'});
        }

}

function listContacts(req, res){
    Contact.find({}).exec((err, contacts)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        }else{
            if(contacts){
                res.status(200).send({todosLosContactos:{contacts}});
                console.log(contacts);
            }else{
                res.status(200).send({message:'No se obtuvieron los datos'});
            }
        }
    });

}

function updateContact(req, res){
    let contactId= req.params.id;
    let update = req.body;

    Contact.findByIdAndUpdate(contactId, update,(err, contactUpdated)=>{
        if(err){
            res.status(500).send({message:'Error en el servidor'});
        }else{
            if(contactUpdated){
                res.status(200).send({contactoActualizado: contactUpdated});
            }else{
                res.status(200).send({message: 'Error al actualizar'});
            }
        }
    });
};

function deleteContact(req, res){
    let contactId = req.params.id;
    
    Contact.findByIdAndRemove(contactId, (err, contactDeleted)=>{
        if(err){
            res.status(200).send({message:'Error en el servidor'});
        }else if(contactDeleted){
            res.status(200).send({contactoEliminado: contactDeleted});
        }else{
            res.status(200).send({message:'Error al eliminar'});
        }
    });
};

function updateEmbContact(req, res){
    const userId = req.params.idU;
    var contactId = req.params.idC;
    var params = req.body;

    User.findById(userId,(err, userOK)=>{
        if(err){
            res.status(500).send({message: 'Error in the server'});
        }else if (userOK){
            User.findOneAndUpdate({_id:userId, "contacts._id":contactId},
            {
                "contacts.$.name": params.name,
                "contacts.$.lastname": params.lastname,
                "contacts.$.phone": params.phone}, {new:true}, (err, userUpdated)=>{
                    if(err){
                        res.status(500).send({message:'Error in the server'});
                    }else if(userUpdated){
                        res.send({users: userUpdated});
                    }else{
                        res.status(418).send({message: 'no se actualizo el contacto'});
                    }
            }
            );
        }else{
            res.status(418).send({message:'No existe el usuario'});
        }
    });
}

module.exports={
    saveContact,
    listContacts,
    updateContact,
    deleteContact,
    updateEmbContact
}






