import React from "react"
import { render } from "react-dom"

import MiCuenta from "./../paginas/miCuenta.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/general.css';
import './../css/cabecera.css';


render(<MiCuenta/>, document.getElementById("react"));
