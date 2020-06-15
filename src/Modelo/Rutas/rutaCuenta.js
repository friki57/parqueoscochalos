module.exports = {
  get:
  {
    crearCuenta: '/Cuenta/Crear',
    inicioSesion: '/IniciarSesion',
    miCuenta: '/Cuenta/Ver',
    modificarCuenta: '/Cuenta/Modificar',
    administrarPersonal: '/Administracion/Personal',
    cerrarSesion: '/CerrarSesion',
    verificarCuenta: '/Cuenta/Verificar',
    adicionarTiempo: "/Cuenta/AdicionarTiempo"
  },
  post:
  {
    inicioSesion: '/IniciarSesion',
    crearCuenta: '/CrearCuenta',
    verificarCuenta:'/Cuenta/Verificar',
    reenviarConfirmacion: '/ReenviarConfirmacion'
  },
  vista:
  {
    crearCuenta: 'crearCuenta',
    inicioSesion: 'iniciarSesion',
    miCuenta: 'cuentaVer',
    modificarCuenta: 'cuentaModificar',
    administrarPersonal: 'administrarPersonal',
    verificarCuenta: 'verificarCuenta',
    adicionarTiempo: "adicionarTiempo"
  },
  ver:
  {
    crearCuenta: 'nada',
    inicioSesion: 'nada',
    miCuenta: 'verificar',
    modificarCuenta: 'verificar',
    administrarPersonal: 'verificarAdmin',
    cerrarSesion: 'verificar',
    verificarCuenta: 'nada',
    adicionarTiempo: "verificar"
  }
};
