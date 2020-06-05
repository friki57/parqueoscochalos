import React, { Component } from "react";
import { Navbar,Nav,NavDropdown } from 'react-bootstrap';


class Cabecera extends Component
{
  render()
  {
    return (
      <div className = 'barraNavegacion flex'>
        <div className = "enlaces flex">
            <a href={window.datos.http.get.rutaInformacion.inicio}><img className = "mt-2" src = '/img/marca.svg' width ='100px' height ='100px' style = {{marginTop: '-25px'}}></img></a>
            <a className="enlaceCabecera" href={window.datos.http.get.rutaInformacion.inicio}>Inicio</a>
            <a className="enlaceCabecera" href={window.datos.http.get.rutaMapas.mapasInteractivos}>Mapas</a>
            <a className="enlaceCabecera" href={window.datos.http.get.rutaInformacion.normativas}>Normativas</a>
            <a className="enlaceCabecera" href={window.datos.http.get.rutaInformacion.contacto}>Contacto</a>
            <a className="enlaceCabecera" href={window.datos.http.get.rutaCuenta.inicioSesion}><i className="fa fa-user"></i></a>
        </div>
      </div>

    )
  }
}
export default Cabecera;
