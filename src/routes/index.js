const express = require('express');
const router = express.Router();
const Usser = require('../models/User');
const passport = require('passport');
const {isAuthenticated} = require('../helpers/auth');

router.post('/iniciarsesion',
passport.authenticate('local', { 
    successRedirect: '/home',
    failureRedirect: '/',
    failureFlash: true })
);
router.get('/cerrarsesion', (req, res) =>{
req.logOut();
res.redirect('/');
});

router.get('/',(req, res) => {
    res.render('partials/login');
});


router.get('/home',isAuthenticated,(req, res) => {
    res.render('partials/home');
});

router.get('/usuarios/registro',isAuthenticated,(req, res) => {
    res.render('partials/registroDeUsuario');
}); 

router.post('/usuarios/registro',isAuthenticated, async(req, res) => {
    const{username,email,password,date,rol,nombre,apellido,telefono,cedula} = req.body;
    const busq = await Usser.findOne({cedula: cedula});
    const errors = [];
        
    if(password.length < 8){
        errors.push({text:'La contraseña debe de tener mas de 8 caracteres'});
    }

    if(errors.length>0){
        res.render('partials/registroDeUsuario',
                    {errors,username,email,password,date,nombre,apellido,telefono,cedula});
    }
    if(busq){
        errors.push({text: 'El usuario ya se encuentra registrado'});
        res.render('partials/registroDeUsuario',{
            errors,
            cedula            
        });
    }
    else{
       const newUsuario = new Usser({username,email,password,date,rol,nombre,apellido,telefono,cedula});
       newUsuario.password = await newUsuario.encryptPassword(password);
       await newUsuario.save();
       req.flash('success_msg', 'Empleado registrado correctamente');
       res.redirect('/usuarios/registro');
    }
    
});

router.post('/usuarios/buscar',isAuthenticated, async(req, res)=>{
    const{ cedula}= req.body;      
    const busq = await Usser.findOne({cedula: cedula});
    const errors=[];
    if(busq){
        var nombre = busq.nombre;
        var apellido = busq.apellido;
        var correo = busq.email;
        res.render('partials/actualizarUsuario',{
            nombre,
            apellido,
            cedula,
            correo
        });
    }
    if(!busq){
    errors.push({text: 'El usuario no existe'});
    }
    if(errors.length > 0){
        res.render('partials/actualizarUsuario',{
          errors
        });
    }


});
router.post('/usuarios/buscarE',isAuthenticated, async(req, res)=>{
    const{ cedula}= req.body;      
    const busq = await Usser.findOne({cedula: cedula});
    const errors=[];
    if(busq){
        var nombre = busq.nombre;
        var apellido = busq.apellido;
        var correo = busq.email;
        res.render('partials/eliminaUsuario',{
            nombre,
            apellido,
            cedula,
            correo
        });
    }
    if(!busq){
    errors.push({text: 'El usuario no existe'});
    }
    if(errors.length > 0){
        res.render('partials/eliminaUsuario',{
          errors
        });
    }


});


router.get('/usuarios/actualizar',isAuthenticated,(req, res) => {
    res.render('partials/actualizarUsuario');
}); 

router.post('/usuarios/actualizar',isAuthenticated,async(req, res) => {
    const {Cedula,nombre,apellido,correo}= req.body;
    const errors=[];
    const busq = await Usser.findOne({cedula: Cedula});
    if(busq){
        await Usser.update({cedula: Cedula},{nombre:nombre, apellido:apellido, email:correo});
        req.flash('success_msg', 'Usuario actualizado exitosamente');
        res.redirect('/usuarios/actualizar');    
    }else{ errors.push({text: 'Error'});
        res.render('partials/actualizarUsuario',{
        errors
    }); 
}
}); 


router.get('/usuarios/eliminar',isAuthenticated,(req, res) => {
    res.render('partials/eliminaUsuario');
}); 

router.post('/usuarios/eliminar',isAuthenticated,async(req, res) => {
    const {Cedula}= req.body;
    const errors=[];
    const busq = await Usser.findOne({cedula: Cedula});
    if(busq){
        await Usser.deleteOne({cedula: Cedula});
          req.flash('success_msg', 'Usuario eliminado exitosamente');
        res.redirect('/usuarios/eliminar');    
    }else{ errors.push({text: 'Error'});
        res.render('partials/eliminaUsuario',{
        errors
    }); 
    }

}); 

module.exports = router;
