

import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import FotoTexto from './../componentes/fotoTexto.js'
import PiePagina from './../componentes/piePagina.js'

import funcionesMapa from './../scripts/funcionesMapa.js'

const mapa = {
  minWidth:'80%',
  minHeight: '600px',
  float:"left"
}

class Inicio extends Component
{

  constructor(props){
    super(props);

    this.state =
    {
      calles: 0
    }

  }
  render()
  {
    return (
      <div>
        <Cabecera></Cabecera>

          <div style = {{width: '100%',padding:'10px'}} className ='flex'>
            <h1>Mapas interactivos</h1>
          </div>
        <div className = "" style = {{width: "100%"}}>
          <div className = 'flexV' style = {{width: "20%", float: "left", background: "#0B313F88", color:"#fff", height:"600px", padding: "30px"}}>
            <div>
              <div >
                <h3>Guía de colores:</h3>
                <ul>
                  <li id ="lisp">Rojo: Calle prohibida</li> <div style = {{display: "block",width:"20px",height:"20px", background: "#cc1122"}}></div>
                  <li id ="list">verde: Calle tarifada disponible</li> <div style = {{display: "block",width:"20px",height:"20px", background: "#22aa88"}}></div>
                  <li id ="lint">Azul: Calle tarifada no disponible</li> <div style = {{display: "block",width:"20px",height:"20px", background: "#335599"}}></div>

                </ul>
              </div>

            </div>
          <button className = 'btn btn-info' style = {{maxHeight:'50px'}} id="ubica">Mi Ubicación</button>
          </div>
        <div id ='mapa' style = {mapa}></div>
        </div>
      <PiePagina></PiePagina>
      </div>

    )
  }
}
export default Inicio;
