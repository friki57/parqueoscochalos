
module.exports = (rutas, bd, ver, datos, http)=>
{
  rutas.get(http.get.rutaCuenta.inicioSesion,ver[http.ver.rutaCuenta.inicioSesion],(req,res)=>
  {
    if(req.isAuthenticated())
    {
      res.redirect(http.get.rutaCuenta.miCuenta);
    }
    else
    {
      datos.SuperGeneradorFormularios3000={
        titulo: "Iniciar sesión",
        method: 'post',
        action: http.post.iniciarSesion,
        campos:
        [
          {
            name: 'correo',
            placeholder: 'Dirección de correo electrónico',
            value: '',
            label: 'Correo Electrónico: ',
            type: 'email'
          },
          {
            name: 'contra',
            placeholder: 'Contraseña',
            value: '',
            label: 'Contraseña',
            type: 'password'
          }
        ]
      }
      res.render('inicio',{datos,pagina:http.vista.rutaCuenta.inicioSesion})
    }
  });
  rutas.get(http.get.rutaCuenta.miCuenta,ver[http.ver.rutaCuenta.miCuenta],(req,res)=>
  {
    datos.usuario = req.app.locals.usuario;
    delete datos.usuario.contra;
    delete datos.usuario.hash;
    res.render('inicio',{datos,pagina:http.vista.rutaCuenta.miCuenta})
    //console.log(req.app.locals.usuario)
    //res.send('ya está iniciada la sesión'+req.app.locals.usuario.nombre);
  });
  rutas.get(http.get.rutaCuenta.verificarCuenta,ver[http.ver.rutaCuenta.verificarCuenta],(req,res)=>
  {
    datos.SuperGeneradorFormularios3000={
      titulo: "Verificar Cuenta",
      method: 'post',
      action: http.post.rutaCuenta.verificarCuenta + '/' + req.app.locals.usuario.key,
      campos:
      [
        {
          name: 'hash',
          placeholder: 'Codigo de verificacion',
          value: '',
          label: 'Código de verificación de cuenta:',
          type: 'text'
        }
      ]
    }
    res.render('inicio',{datos,pagina:http.vista.rutaCuenta.verificarCuenta})
  });
  rutas.get(http.get.rutaCuenta.crearCuenta,ver[http.ver.rutaCuenta.crearCuenta],(req,res)=>
  {

    datos.SuperGeneradorFormularios3000={
      titulo: "Crear Cuenta",
      method: 'post',
      action: http.post.rutaCuenta.crearCuenta,
      campos:
      [
        {
          name: 'correo',
          placeholder: 'Dirección de correo electrónico',
          value: '',
          label: 'Correo Electrónico: ',
          type: 'email'
        },
        {
          name: 'contra',
          placeholder: 'Contraseña',
          value: '',
          label: 'Contraseña',
          type: 'password'
        },
        {
          name: 'ci',
          placeholder: 'CI',
          value: '',
          label: 'Carnet de Identidad',
          type: 'number'
        },
        {
          name: 'placa',
          placeholder: 'Placa',
          value: '',
          label: 'Placa de su vehiculo',
          type: 'text'
        },
        {
          name: 'nombre',
          placeholder: 'Nombre',
          value: '',
          label: 'Nombres',
          type: 'text'
        },
        {
          name: 'apellido',
          placeholder: 'Apellidos',
          value: '',
          label: 'Apellidos',
          type: 'text'
        }

      ]
    }
    res.render('inicio',{datos,pagina:http.vista.rutaCuenta.crearCuenta})
  });
  rutas.get(http.get.rutaCuenta.cerrarSesion,ver[http.ver.rutaCuenta.miCuenta],(req,res)=>
  {
    req.logout();
    req.session.destroy();
    res.redirect(http.get.rutaInformacion.inicio);
  });
}
