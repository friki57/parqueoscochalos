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
    adicionarTiempo: "/Cuenta/AdicionarTiempo",
    adicionarSaldo: "/Administracion/Saldo",
    reportes: "/Administracion/Reportes"
  },
  post:
  {
    inicioSesion: '/IniciarSesion',
    crearCuenta: '/CrearCuenta',
    verificarCuenta:'/Cuenta/Verificar',
    reenviarConfirmacion: '/ReenviarConfirmacion',
    adicionarTiempo: '/AdicionarTiempo/',
    adicionarSaldo: "/Modificar/Saldo"
  },
  vista:
  {
    crearCuenta: 'crearCuenta',
    inicioSesion: 'iniciarSesion',
    miCuenta: 'cuentaVer',
    modificarCuenta: 'cuentaModificar',
    administrarPersonal: 'administrarPersonal',
    verificarCuenta: 'verificarCuenta',
    adicionarTiempo: "adicionarTiempo",
    adicionarSaldo: "aumentarSaldo",
    reportes: "reportes"
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
    adicionarTiempo: "verificar",
    adicionarSaldo: "verificarAdmin",
    reportes: "nada"
  }
};
