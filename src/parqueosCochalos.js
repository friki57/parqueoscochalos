const path = require("path");
const express = require('express');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const cookieParser = require('cookie-parser');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

var puerto = "4000";
// var puerto = process.env.PORT || "4000";

require('./Modelo/Autenticacion/local.js')(passport);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,"/public")));

app.use(cookieParser());

const FirebaseStore = require('connect-session-firebase')(session);
const database = require('./Modelo/BD/conexion.js');

var sessionStore = new FirebaseStore({database})

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  rolling: true,
  cookie: {
    path: '/',
    httpOnly: true,
    maxAge: 'COOKIE_TIMEOUT',
    maxAge: 1000 * 60 * 60 * 24 * 7
  },
  maxAge: 1000 * 60 * 60 * 24 * 7,
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}));

app.set("views", path.join(__dirname, "Vista/ejs"));
app.set("view engine", "ejs");

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  app.locals.confirm = req.flash("confirm");
  app.locals.error = req.flash("error");
  app.locals.usuario = req.user;
  console.log(app.locals.confirm)
  //console.log('usuario',app.locals.usuario,req.user)
  next();
});

var favicon = require('serve-favicon');
app.use(favicon(path.join(__dirname,'public','img','marca.ico')));

var rutas = require('./Controlador/HTTP/index.js');
app.use(rutas(passport,io));



app.listen(puerto, '83.229.39.60', ()=>
//server.listen(puerto, ()=>
{
  console.log("Servidor lanzado en el puerto:",puerto);
  // const = require('./Modelo/BD/conexion');
  // var ref = ref('calle');
  // ref.on('value', (data)=> {console.log(data.val());}
  //   , (err)=> {console.log(err);console.log("error")});

});
