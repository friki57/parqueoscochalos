
import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import SuperGeneradorFormularios3000 from './../componentes/superGeneradorFormularios3000.js'
import PiePagina from './../componentes/piePagina.js'

class MiCuenta extends Component
{
  controlCalles()
  {
    if(window.datos.usuario.tipo == 'Operador' || window.datos.usuario.tipo == 'Administrador')
    {
      return(
        <div>
          <a className = 'btn btn-info' href={window.datos.http.get.rutaMapas.administracionCalles}>Ir a control de calles</a>
          <br></br>
          <form  action="/descargar" method="post">
            <br></br>
            <input className = 'btn btn-success' type="submit" name="" value="Descargar listado de calles"/>
          </form>
        </div>
      )
    }
    if(window.datos.usuario.tipo == 'Administrador')
    {
      return(
        <div>
          <br></br>
          <br></br>
          <a className = 'btn btn-info' href={window.datos.http.get.rutaCuenta.administrarPersonal}>Ir a administracion de personal</a>
        </div>
      )
    }
  }
  render()
  {
    return (
      <div>
        <Cabecera></Cabecera>
        <div className="grilla" style = {{background: "url(/img/cochabamba.jpg)", backgroundSize:"100% 100%", color: "#fff"}}>
        <div className="cuerpo flexV" style = {{background: "#0B313F88"}}>
        <h1>Mi Cuenta</h1>
        <p>Ci: {window.datos.usuario.ci}</p>
        <p>Correo: {window.datos.usuario.correo}</p>
        <p>Nombre: {window.datos.usuario.nombre}</p>
        <p>Apellido: {window.datos.usuario.apellido}</p>

        <a className = 'btn btn-danger' href={window.datos.http.get.rutaCuenta.cerrarSesion}>Cerrar Sesión</a>
        {this.controlCalles()}
      </div>
    </div>
    <PiePagina></PiePagina>
  </div>
    )
  }
}
export default MiCuenta;
