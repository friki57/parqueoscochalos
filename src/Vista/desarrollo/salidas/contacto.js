import React from "react"
import { render } from "react-dom"

import Contacto from "./../paginas/contacto.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/general.css';
import './../css/cabecera.css';


render(<Contacto/>, document.getElementById("react"));
