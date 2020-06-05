import React from "react"
import { render } from "react-dom"

import Mapas from "./../paginas/mapasInteractivos.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import './../css/general.css';
import './../css/cabecera.css';


render(<Mapas/>, document.getElementById("react"));
