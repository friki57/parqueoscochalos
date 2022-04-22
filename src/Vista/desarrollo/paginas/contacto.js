

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
          <FotoTexto foto = '/img/Información.jpg' degrade = 'linear-gradient(90deg, rgba(0,0,0, 0.2), rgba(0,0,0, 0.7),rgba(0,0,0, 0.5), rgba(0,0,0, 0.2))'>
            <div style = {{color:'#fff'}}>

              <h1>Información de Contacto</h1>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <br></br>
              <div className= "flex">
                <div style = {{marginLeft: "auto", marginRight: "84pt"}}>
                  Nuestra línea gratuita
                  <br></br>
                  <h3>8-41431-8493-1034</h3>
                </div>
                <div style = {{marginLeft: "auto", marginRight: "auto"}}>
                  <b>Oficina Centro</b>
                  <br></br>
                  Calle heroínas esq Lanza <br/>
                  Edificio Juan de Dios. Piso 2. <br/>
                  OF 3. <br/>
                  Cel: 78490342 <br/>
                  Tel: 4492076 <br/>
                  4284098 <br/>
                </div>
                <div style = {{marginLeft: "84pt", marginRight: "auto"}}>
                  <b>Oficina Zona Sud</b>
                  <br></br>
                  Avenida Petrolera km 6 num <br/>
                  562# <br/>
                  Cel: 72348098 <br/>
                  Tel: 43990231 <br/>
                  4884020 <br/>
                </div>

              </div>
            </div>
          </FotoTexto>


      <PiePagina></PiePagina>
      </div>
    )
  }
}
export default Contacto;
