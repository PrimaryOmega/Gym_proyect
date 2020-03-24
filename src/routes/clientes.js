const express = require('express');
const router = express.Router();

const Clientes = require('../models/nuevoCliente');
const {isAuthenticated} = require('../helpers/auth');

//registro
router.get('/clientes/registro',isAuthenticated,(req, res) => {
    res.render('partials/registro');
}); 

router.post('/clientes/nuevo',isAuthenticated,async(req, res) => {
  
    const{ Cedula, Nombre, Apellido, Num_telef, Correo }= req.body;
    const busq = await Clientes.findOne({Cedula: Cedula});
    const errors=[];


    if(busq){
        errors.push({text: 'El cliente ya se encuentra registrado'});
        res.render('partials/registro',{
            errors,
            Cedula
        });
    }else{

   const newCliente= new Clientes({Cedula, Nombre, Apellido, Correo, Num_telef});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
    await newCliente.save();
    req.flash('success_msg', 'Cliente registrado correctamente');
    res.redirect('/clientes/registro');

    }
    
    
});


//activar membresia
router.get('/clientes/busqueda',isAuthenticated,(req, res) => {
    res.render('partials/busquedaCli');

}); 

//?????
router.post('/actualiza',isAuthenticated,async(req, res ) => { 
    const{ cedula}= req.body;      
    const busq = await Clientes.findOne({Cedula: cedula});
    const errors=[];
    if(busq){
        var nombre = busq.Nombre;
        var apellido = busq.Apellido;
        var correo = busq.Correo;
        var Num_telef = busq.Num_telef;
        res.render('partials/actualizarCliente',{
            nombre,
            apellido,
            cedula,
            correo,
            Num_telef
        });
    }
    if(!busq){
    errors.push({text: 'El cliente no existe'});
    }
    if(errors.length > 0){
        res.render('partials/actualizarCliente',{
          errors
        });
    }

});


router.post('/elimina',isAuthenticated,async(req, res ) => { 
    const{ cedula}= req.body;      
    const busq = await Clientes.findOne({Cedula: cedula});
    const errors=[];
    if(busq){
        var nombre = busq.Nombre;
        var apellido = busq.Apellido;
        var correo = busq.Correo;
        var Num_telef = busq.Num_telef;
        res.render('partials/eliminaCliente',{
            nombre,
            apellido,
            cedula,
            correo,
            Num_telef
        });
    }
    if(!busq){
    errors.push({text: 'El cliente no existe'});
    }
    if(errors.length > 0){
        res.render('partials/eliminaCliente',{
          errors
        });
    }

});

router.post('/busqueda',isAuthenticated,async(req, res ) => { 
    const{ cedula}= req.body;      
    const busq = await Clientes.findOne({Cedula: cedula});
    const errors=[];
    if(busq){
        var nombre = busq.Nombre;
        var apellido = busq.Apellido;
        var correo = busq.Correo;
        var Num_telef = busq.Num_telef;
        var Estado = busq.Estado;
        var Ini_membresia = busq.Ini_membresia;
        var Fin_membresia = busq.Fin_membresia;
        res.render('partials/busquedaCli',{
            nombre,
            apellido,
            cedula,
            correo,
            Num_telef,
            Estado,
            Ini_membresia,
            Fin_membresia
        });
    }
    if(!busq){
    errors.push({text: 'El cliente no existe'});
    }
    if(errors.length > 0){
        res.render('partials/busquedaCli',{
          errors
        });
    }

});

router.post('/cliente/actMembresia',isAuthenticated,async(req, res)=>{
    const{ Cedula, membresiaInicio, membresiaFin, estado}= req.body; 
    const busq = await Clientes.findOne({Cedula: Cedula});
    const errors=[];
    if(busq){
    busq.Estado=estado;
    busq.Ini_membresia=membresiaInicio;
    busq.Fin_membresia=membresiaFin;
    await busq.save();
    req.flash('success_msg', 'Membresia activada');
    res.redirect('/clientes/busqueda');    
    }else{ errors.push({text: 'Error'});
        res.render('partials/busquedaCli',{
            errors
          }); 
    }
   
});


router.get('/clientes/actualizar',isAuthenticated,(req, res) => {
    res.render('partials/actualizarCliente');
}); 

router.post('/clientes/actualizar',isAuthenticated,async(req, res) => {
    const {Cedula,nombre,apellido,correo}= req.body;
    const errors=[];
    const busq = await Clientes.findOne({Cedula: Cedula});
    if(busq){
        await Clientes.update({Cedula: Cedula},{Cedula: Cedula, Nombre:nombre,Apellido:apellido, Correo:correo });
        req.flash('success_msg', 'Cliente actualizado exitosamente');
        res.redirect('/clientes/actualizar');    
    }else{ errors.push({text: 'Error'});
        res.render('partials/actualizarCliente',{
        errors
    }); 
}

}); 

router.get('/clientes/eliminar',isAuthenticated,(req, res) => {
    res.render('partials/eliminaCliente');
});

router.post('/clientes/eliminar',isAuthenticated,async(req, res) => {
    const {Cedula}= req.body;
    const errors=[];
    const busq = await Clientes.findOne({Cedula: Cedula});
    if(busq){
        await Clientes.deleteOne({Cedula: Cedula});
        req.flash('success_msg', 'Cliente eliminado correctamente');
        res.redirect('/clientes/eliminar');  
    }else{ errors.push({text: 'Error cliente no encontrado'});
        res.render('partials/eliminaCliente',{
        errors
    }); 
    }

});


module.exports = router;
 