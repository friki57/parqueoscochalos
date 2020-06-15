
import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import SuperGeneradorFormularios3000 from './../componentes/superGeneradorFormularios3000.js'
import PiePagina from './../componentes/piePagina.js'
import Boton from './../componentes/boton.js'

class MiCuenta extends Component
{
  parqueoActual(){
    if(window.datos.usuario.parqueoActual != 0)
    {
      return (
        <div className = "bg-gray-600 bg-opacity-50 p-4 m-2">
          <h3 className = "mx-auto">Parqueo Actual</h3>
          <p className = "mw-3/4 mx-auto">
            Actulamente estacionado en:
            {window.datos.usuario.parqueoActual.calle.toString()} <br/>
            Desde las {window.datos.usuario.parqueoActual.fecha.toString()}
            Con tiempo limite hasta las {window.datos.usuario.parqueoActual.fechaFinal.toString()}
          </p>
          <a href = {window.datos.http.get.rutaCuenta.adicionarTiempo} className = "bg-green-600 text-white p-2 hover:no-underline hover:bg-green-500 hover:font-bold"> Modificar tiempo. </a>
        </div>
      )
    }
  }
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
        <p>Placa: {window.datos.usuario.placa}</p>
        <p>Saldo actual: {window.datos.usuario.saldo}</p>
        {this.parqueoActual()}
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
