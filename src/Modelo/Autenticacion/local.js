module.exports = (passport)=>
{
  var bcrypt = require('bcryptjs');

  var bd = require('./../BD/bd.js');
  bd.iniciar();

    const LocalStrategy = require('passport-local').Strategy;

    passport.serializeUser((user,done)=>
    {
    //  console.log("serializando usuario",user);
      done(null, user.key);
    });
    passport.deserializeUser((id, done) => {
      bd.cruds.crudUsuario.buscar({key: {tipo:'igual',valor: id}},(usuario)=>
      {
        console.log('desserializando',usuario);
        if((usuario.length>0))
        {
          done(null, usuario[0]);
        }
        else
        {
          done(null, false);
          console.log("no hay este usuario");
        }
      });
    });
    passport.use("registrarse", new LocalStrategy({
      usernameField: 'correo',
      passwordField: 'contra',
      passReqToCallback: true
    },(req,correo,contra,done)=>
    {
      var bcrypt = require('bcryptjs');

      bd.cruds.crudUsuario.buscar({correo:{tipo: 'igual',valor: correo}},(res)=>
      {
        if(res.length>0)
        {
          return done(null, false, req.flash('error', 'El correo '+ correo + ' ya fue registrado'));
        }
        else
        {
          bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(contra, salt, function(err, contraEncriptado) {
              var datos = {
                nombre: req.body.nombre,
                apellido: req.body.apellido,
                ci: req.body.ci,
                correo,
                contra: contraEncriptado,
                tipo: 'Usuario',
                placa: req.body.placa,
                saldo: 0
              };
              bd.cruds.crudUsuario.ingresar(datos,(res)=>
              {
                const confirmacion = require('./../ConfirmacionEmail/Funciones.js');
                confirmacion(correo,bd,res);
                datos.key = res;
                console.log('ingresó: ',res);
                return done(null, datos);
              });
            });
          });
        }
      });
    }));

    passport.use('iniciar sesion', new LocalStrategy({
       usernameField : 'correo',
       passwordField: 'contra',
       passReqToCallback: true
     }, (req, correo, contra, done)=> {
       bd.cruds.crudUsuario.buscar({correo:{tipo: 'igual',valor: correo}}, (usuario)=>{
        if((usuario.length<=0)){
         return done(null, false, req.flash('error', 'El correo '+ correo + ' no está registrado'));
        }
        else
        {
          console.log('contra:',contra, usuario[0].contra)
          bcrypt.compare(contra, usuario[0].contra, function(err, resp) {
            if(err) console.log(err);
              if(resp==true)
              {
                req.session.usuario = usuario[0];
                return done(null, usuario[0], req.flash("confirm", "Bienvenido de nuevo " + usuario[0].nombre+" "+usuario[0].apellido));
              }
              else
              {
                return done(null, false, req.flash('error', 'Contraseña incorrecta'));
              }
          });
        }
       });
      })
    );


}
