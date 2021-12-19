

import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import SuperGeneradorFormularios3000 from './../componentes/superGeneradorFormularios3000.js'
import PiePagina from './../componentes/piePagina.js'
import FotoTexto from './../componentes/fotoTexto.js'

class Contacto extends Component
{
  render()
  {
    return (
      <div>
        <Cabecera></Cabecera>
      <div className="grilla" style = {{background: "url(/img/cochabamba.jpg)", backgroundSize:"100% 100%"}}>
      <div style = {{background: "#0B313F88"}} className="cuerpo flexV">
        <SuperGeneradorFormularios3000></SuperGeneradorFormularios3000>
      </div>
      </div>
      <PiePagina></PiePagina>
      </div>
    )
  }
}
export default Contacto;
