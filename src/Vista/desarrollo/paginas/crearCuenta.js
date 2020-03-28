

import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import SuperGeneradorFormularios3000 from './../componentes/superGeneradorFormularios3000.js'
import PiePagina from './../componentes/piePagina.js'

class Inicio extends Component
{
  render()
  {
    return (
      <div>
        <Cabecera></Cabecera>
      <div className="grilla"  style = {{background: "url(/img/cochabamba.jpg)", backgroundSize:"100% 100%"}}>
      <div className="cuerpo flexV" style = {{background: "#0B313F88"}}>
          <SuperGeneradorFormularios3000></SuperGeneradorFormularios3000>
          <span style = {{color:"#fff"}}> ¿Ya estás registrado en parqueos Cochalos?</span>
           <a href= {window.datos.http.get.rutaCuenta.inicioSesion}>Inicia sesión</a>
             <span style = {{color:"#fff"}}> en tu cuenta </span>
        </div>
      </div>
      <PiePagina></PiePagina>
      </div>
    )
  }
}
export default Inicio;
