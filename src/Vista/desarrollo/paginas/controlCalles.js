

import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import FotoTexto from './../componentes/fotoTexto.js'
import PiePagina from './../componentes/piePagina.js'

import mapaOperador from './../scripts/mapaOperador.js'

const mapa = {
  minWidth:'100%',
  minHeight: '600px'
}

class Control extends Component
{

  constructor(props){
    super(props);

    this.state =
    {
      calles: 0
    }

  }
  iniciar()
  {

  }
  render()
  {
    return (
      <div>

        <Cabecera></Cabecera>

          {
            this.iniciar()
          }
          <div style = {{width: '100%',padding:'10px'}} className ='flex'>
            <h1>Mapas interactivos</h1>
          </div>
        <div className = 'flex'>

        <button className = 'btn btn-info' style = {{maxHeight:'50px'}}id="ubica">Mi Ubicación</button>
        </div>
      <div id ='mapa' style = {mapa}></div>
      <PiePagina></PiePagina>
      </div>

    )
  }
}
export default Control;
