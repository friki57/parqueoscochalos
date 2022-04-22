import React from "react"
import { render } from "react-dom"

import CrearCuenta from "./../paginas/crearCuenta.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/general.css';
import './../css/cabecera.css';


render(<CrearCuenta/>, document.getElementById("react"));
