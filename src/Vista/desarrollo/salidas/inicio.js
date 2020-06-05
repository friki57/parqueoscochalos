import React from "react"
import { render } from "react-dom"

import Inicio from "./../paginas/inicio.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/general.css';
import './../css/cabecera.css';


render(<Inicio/>, document.getElementById("react"));
