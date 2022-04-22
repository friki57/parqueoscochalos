

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
      <div className="grilla">
      <div className="cuerpo flexV" style = {{background: "#0B313F88"}}>
        <h3 style ={{color: "#fff"}}>Su cuenta no está verificada, por favor ingrese el código de verificación que fue enviado a su correo electrónico</h3>
        <br></br>
        <br></br>
        <br></br>
        <SuperGeneradorFormularios3000></SuperGeneradorFormularios3000>
          <br></br>
          <br></br>
          <br></br>
        <form action="/ReenviarConfirmacion" method="post">
          <input className= "btn btn-info" type="submit" name="" value="Volver a enviar código de confirmacion"/>
        </form>
      </div>
      </div>
      <PiePagina></PiePagina>
      </div>
    )
  }
}
export default Inicio;
