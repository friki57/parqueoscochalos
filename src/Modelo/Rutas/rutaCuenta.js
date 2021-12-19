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
    reportes: "/Administracion/Reportes",
    asignarCargo: "/Administracion/Cargos"
  },
  post:
  {
    inicioSesion: '/IniciarSesion',
    crearCuenta: '/CrearCuenta',
    verificarCuenta:'/Cuenta/Verificar',
    reenviarConfirmacion: '/ReenviarConfirmacion',
    adicionarTiempo: '/AdicionarTiempo/',
    adicionarSaldo: "/Modificar/Saldo",
    asignarCargo: "/Administracion/Cargos"
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
    reportes: "reportes",
    asignarCargo: "asignarCargo"
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
    adicionarSaldo: "verificarOperador",
    reportes: "verificarAdmin",
    asignarCargo: "verificarAdmin"
  }
};
