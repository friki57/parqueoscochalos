import React from "react"
import { render } from "react-dom"

import VerificarCuenta from "./../paginas/verificarCuenta.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/general.css';
import './../css/cabecera.css';


render(<VerificarCuenta/>, document.getElementById("react"));
