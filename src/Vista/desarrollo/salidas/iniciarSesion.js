import React from "react"
import { render } from "react-dom"

import IniciarSesion from "./../paginas/iniciarSesion.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/general.css';
import './../css/cabecera.css';


render(<IniciarSesion/>, document.getElementById("react"));
