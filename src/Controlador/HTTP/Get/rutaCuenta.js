const fechas = require('./../Utiles/fechas');
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
    // console.log('------------------------------------------',req.user,req.app.locals.usuario)
    datos.usuario = req.user;
    delete datos.usuario.contra;
    delete datos.usuario.hash;
    bd.cruds.crudParqueo.buscar({usuario:{valor:datos.usuario.key,tipo:"igual"}},(parqueo)=>{
      parqueo = parqueo.filter(a=>
        {
          const final = (new Date(a.fecha)).getTime() + 1000 * 60 * a.tiempo;
          const ahora = (Date.now());
          if(ahora<final)
          {
            a.fecha = fechas((new Date(a.fecha)))
            a.fechaFinal = fechas(new Date(final))
            return a
          }
        }
      )
      if(parqueo.length>0)
      {
        parqueo = parqueo[0];
        bd.cruds.crudCalle.buscar({key: {valor:parqueo.calle, tipo:"igual"}},(calles)=>{
          calles = calles[0]
          parqueo.calle = [" ",calles.calle, " entre ", calles.c1, " y ", calles.c2].join("")
          console.log(parqueo)
          datos.usuario.parqueoActual = parqueo;
          res.render('inicio',{datos,pagina:http.vista.rutaCuenta.miCuenta})
        });
      }
      else {
        datos.usuario.parqueoActual = 0;
        res.render('inicio',{datos,pagina:http.vista.rutaCuenta.miCuenta})
      }
    });
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
  rutas.get(http.get.rutaCuenta.adicionarTiempo,ver[http.ver.rutaCuenta.adicionarTiempo],(req,res)=>
  {
    // console.log('------------------------------------------',req.user,req.app.locals.usuario)
    datos.usuario = req.user;
    delete datos.usuario.contra;
    delete datos.usuario.hash;
    bd.cruds.crudParqueo.buscar({usuario:{valor:datos.usuario.key,tipo:"igual"}},(parqueo)=>{
      parqueo = parqueo.filter(a=>
        {
          const final = (new Date(a.fecha)).getTime() + 1000 * 60 * a.tiempo;
          const ahora = (Date.now());
          if(ahora<final)
          {
            a.fecha = fechas((new Date(a.fecha)))
            a.fechaFinal = fechas(new Date(final))
            return a
          }
        }
      )
      if(parqueo.length>0)
      {
        parqueo = parqueo[0];
        bd.cruds.crudCalle.buscar({key: {valor:parqueo.calle, tipo:"igual"}},(calles)=>{
          calles = calles[0]
          parqueo.calle = [" ",calles.calle, " entre ", calles.c1, " y ", calles.c2].join("")
          console.log(parqueo)
          datos.usuario.parqueoActual = parqueo;
          res.render('inicio',{datos,pagina:http.vista.rutaCuenta.adicionarTiempo})
        });
      }
      else {

        res.redirect(http.get.rutaCuenta.miCuenta)
      }
    });
  });
  rutas.get(http.get.rutaCuenta.cerrarSesion,ver[http.ver.rutaCuenta.miCuenta],(req,res)=>
  {
    req.logout();
    req.session.destroy();
    res.redirect(http.get.rutaInformacion.inicio);
  });
  rutas.get(http.get.rutaCuenta.adicionarSaldo,ver[http.ver.rutaCuenta.adicionarSaldo],(req,res)=>
  {
    datos.SuperGeneradorFormularios3000={
      titulo: "Agregar Saldo",
      method: 'post',
      action: http.post.adicionarSaldo,
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
          name: 'monto',
          placeholder: 'Monto',
          value: '',
          label: 'Monto a añadir',
          type: 'number'
        }
      ]
    }
    res.render('inicio',{datos,pagina:http.vista.rutaCuenta.adicionarSaldo})
  });
  rutas.post(http.get.rutaCuenta.adicionarSaldo,ver[http.ver.rutaCuenta.adicionarSaldo],(req,res)=>
  {
    console.log(req.body)
    bd.cruds.crudUsuario.buscar({correo:{valor:req.body.correo,tipo:"igual"}},(usuario)=>{
      usuario = usuario[0];
      bd.cruds.crudUsuario.modificar(usuario.key,{"saldo":(usuario.saldo+parseInt(req.body.monto,10))},()=>{

        res.redirect(http.get.rutaCuenta.adicionarSaldo)
      });
    })
  });
}
