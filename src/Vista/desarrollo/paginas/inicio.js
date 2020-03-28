

import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import FotoTexto from './../componentes/fotoTexto.js'
import DivisorTransito from './../componentes/divisorTransito.js'
import GrillaVer from './../componentes/grillaVer.js'
import PiePagina from './../componentes/piePagina.js'


class Inicio extends Component
{
  render()
  {
    return (
      <div>
        <Cabecera></Cabecera>
        <FotoTexto foto = '/img/QuienesSomos.jpeg' degrade = 'linear-gradient(90deg, rgba(0,0,0, 0.2), rgba(0,0,0, 0.5),rgba(0,0,0, 0.5), rgba(0,0,0, 0.2))'>
          <div style = {{color:'#fff'}}>
            <h1>Parqueos Cochalos</h1>
            <div>
            Este sitio web es una plataforma para el <br/>
            monitoreo de los espacios para <br/>
            estacionamiento en las calles controladas <br/>
            por el departamento de tránsito de ciudad <br/>
            de Cochabamba en Bolivia          <br/>
            </div>
          </div>
        </FotoTexto>
        <DivisorTransito></DivisorTransito>
        <FotoTexto foto = '/img/mapasInteractivos.png'>
          <div style = {{color:'#000'}}>
            <h1>¡Prueba ya los mapas interactivos!</h1>
            <div>
            Actualización en tiempo real<br/>
            </div>
          </div>
        </FotoTexto>
        <DivisorTransito></DivisorTransito>
        <FotoTexto foto = '/img/normativas.jpg' degrade = 'linear-gradient(90deg, rgba(0,0,0, 0.2), rgba(0,0,0, 0.5),rgba(0,0,0, 0.5), rgba(0,0,0, 0.2))'>
          <div style = {{color:'#fff'}}>
            <h1>NORMATIVAS</h1>
            <div>
            Informate acerca de las normativas de  <br/>
            tránsito, sanciones y multas.<br/>
            </div>
          </div>
        </FotoTexto>
        <DivisorTransito></DivisorTransito>
        <FotoTexto foto = '/img/contactanos.jpg' degrade = 'linear-gradient(90deg, rgba(0,0,0, 0.2), rgba(0,0,0, 0.5),rgba(0,0,0, 0.5), rgba(0,0,0, 0.2))'>
          <div style = {{color:'#fff'}}>
            <h1>Contáctanos</h1>
            <div>
            Comunícate con nuestro personal para <br/>
            obtención de infoemración y contacto <br/>
            con servicios de remolque.<br/>
            </div>
          </div>
        </FotoTexto>
        <PiePagina></PiePagina>
      </div>
    )
  }
}
export default Inicio;
