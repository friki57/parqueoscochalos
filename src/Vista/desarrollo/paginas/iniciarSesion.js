

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
      <div className="grilla" style = {{background: "url(/img/cochabamba.jpg)", backgroundSize:"100% 100%"}}>
      <div style = {{background: "#0B313F88"}} className="cuerpo flexV">
        <SuperGeneradorFormularios3000></SuperGeneradorFormularios3000>
        <div className="bg-white m-2 rounded p-2">
          <span style = {{color:"#000"}}>¿No estás registrado en parqueos Cochalos?</span>
          <br/>
          <a href= {window.datos.http.get.rutaCuenta.crearCuenta}>Hazlo ahora.</a>
        </div>
      </div>
      </div>
      <PiePagina></PiePagina>
      </div>
    )
  }
}
export default Inicio;
