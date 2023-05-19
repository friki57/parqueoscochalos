
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
          <a href = {window.datos.http.get.rutaCuenta.adicionarTiempo} className = "bg-green-600 text-white p-2 hover:no-underline hover:bg-green-700"> Aumentar Tiempo </a>
        </div>
      )
    }
  }
  controlCalles()
  {
    if(window.datos.usuario.tipo == 'Cajero')
    {
      return(
        <div className="flexV">
          <h1>Funciones de {window.datos.usuario.tipo}</h1>
          <div className = "flex">
            <a href = {window.datos.http.get.rutaCuenta.adicionarSaldo} className = "rounded flexV  bg-yellow-600 text-white lg:p-5 md:p-3 hover:no-underline hover:bg-yellow-700 m-2"> Cargar saldo </a>
          </div>
          <div className = "flex">
          </div>
        </div>
      )
      // <form  action="/descargar" method="post">
      //   <input className = 'btn btn-success' type="submit" name="" value="Descargar listado de calles"/>
      // </form>
    }
    if(window.datos.usuario.tipo == 'Administrador')
    {
      return(
        <div className="flexV">
          <h1>Funciones de {window.datos.usuario.tipo}</h1>
          <div className = "flex">
            <a href = {window.datos.http.get.rutaCuenta.adicionarSaldo} className = "rounded flexV  bg-yellow-600 text-white lg:p-5 md:p-3 sm:p-2 hover:no-underline hover:bg-yellow-700 m-2"> Cargar saldo </a>
            <a href = {window.datos.http.get.rutaCuenta.reportes} className = "rounded flexV  bg-green-600 text-white lg:p-5 md:p-3 sm:p-2 hover:no-underline hover:bg-green-700 m-2"> Reportes de uso </a>
            <a href = {window.datos.http.get.rutaCuenta.asignarCargo} className = 'rounded flexV  bg-blue-600 text-white lg:p-5 md:p-3 sm:p-2 hover:no-underline hover:bg-blue-700 m-2'>Asignación de Cargos</a>
          </div>
          <div className = "flex">
          </div>
        </div>
      )
    }
  }
  render()
  {
    return (
      <div>
        <Cabecera></Cabecera>
        <div className="grilla flexV" style = {{background: "url(/img/cochabamba.jpg)", backgroundSize:"100% 100%", color: "#fff"}}>
        {this.controlCalles()}
        <div className="cuerpo flexV" style = {{background: "#0B313F88"}}>
          <h1>Mi Cuenta</h1>
          <p>Ci: {window.datos.usuario.ci}</p>
          <p>Correo: {window.datos.usuario.correo}</p>
          <p>Nombre: {window.datos.usuario.nombre}</p>
          <p>Apellido: {window.datos.usuario.apellido}</p>
          <p>Placa: {window.datos.usuario.placa}</p>
          <p>Saldo actual: {window.datos.usuario.saldo}
              <a className='btn btn-success m-2' href={window.datos.http.get.rutaCuenta.qr}>+</a>
          </p> 
          
          {this.parqueoActual()}
          <a className = 'btn btn-danger' href={window.datos.http.get.rutaCuenta.cerrarSesion}>Cerrar Sesión</a>

        </div>
    </div>
    <PiePagina></PiePagina>
  </div>
    )
  }
}
export default MiCuenta;
