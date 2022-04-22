

import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import FotoTexto from './../componentes/fotoTexto.js'
import DivisorTransito from './../componentes/divisorTransito.js'
import GrillaVer from './../componentes/grillaVer.js'
import PiePagina from './../componentes/piePagina.js'
import Boton from './../componentes/boton.js'


class Inicio extends Component
{
  render()
  {
    return (
      <div>
        <Cabecera></Cabecera>
        <FotoTexto foto = '/img/horarios.jpg' degrade = 'linear-gradient(90deg, rgba(0,0,0, 0.2), rgba(0,0,0, 0.5),rgba(0,0,0, 0.5), rgba(0,0,0, 0.2))'>
          <div style = {{color:'#fff'}}>
            <h1>Horarios de control</h1>
            <div className = "flex">
              <div style = {{background: "#D52F3D88", marginLeft: "auto", marginRight: "73pt", padding: "50px"}}>
                Calles prohibidas
                <br></br>
                <br></br>
                <br></br>
                  Lunes a viernes:<br></br>
                   8:00 am. a 10 pm.<br></br>
                  Sábado y domingo<br></br>

                   9:00 am. a 10 pm.

              </div>
              <div style = {{background: "#0B313F88",marginRight: "auto", marginLeft: "73pt", padding: "50px"}}>
                Calles tarifadas
                <br></br>
                <br></br>
                <br></br>
                  Lunes a viernes:<br></br>
                   8:00 am. a 10 pm.<br></br>
                  Sábado y domingo<br></br>
                9:00 am. a 18 pm.

              </div>

                  </div>
          </div>
        </FotoTexto>
        <DivisorTransito></DivisorTransito>
        <FotoTexto foto = '/img/soat.jpg'>
          <div style = {{color:'#fff',background: "#0B313F88",padding: "50px"}}>
            <h2>No olvides adquirir tu SOAT</h2>
            <div>
              El seguro universal de <br/>
              accidentes de tránsito debe <br/>
              ser adquirido por todo <br/>
              propietario de un vehículo <br/>
              motorizado para transitar <br/>
              por las vías públicas <br/>
            </div>
            <br/>
            <Boton enlace = "https://www.aps.gob.bo/index.php/atencion-al-ciudadano/soat/que-es-soat">Ver más</Boton>
          </div>
        </FotoTexto>
        <DivisorTransito></DivisorTransito>
        <FotoTexto foto = '/img/ruat.jpg'>
          <div style = {{color:'#fff',background: "#0B313F88",padding: "50px"}}>
            <h2>Consulta tus multas en RUAT</h2>
              En el sitio web oficial del <br/>
              registro único para la <br/>
              administración tributaria <br/>
              municipal es posible <br/>
              consultar las deudas <br/>
              actuales a tu matrícula. <br/>
              Además de otros servicios <br/>
              tributarios. <br/>
            <br/>
            <Boton enlace = "https://www.ruat.gob.bo/Principal.jsf">Visitar</Boton>
          </div>
        </FotoTexto>
        <DivisorTransito></DivisorTransito>
        <FotoTexto foto = '/img/aprende.jpg'>
          <div style = {{color:'#fff',background: "#0B313F88",padding: "50px"}}>
            <h2>¿Quieres aprender más?</h2>
            <div>
              Si deseas adquirir más<br/>
              información acerca de<br/>
              normativas de tránsito<br/>
              puedes ver el código<br/>
              nacional de tránsito<br/>
            </div>
            <br/>
            <Boton>Ver</Boton>
          </div>
        </FotoTexto>
        <PiePagina></PiePagina>
      </div>
    )
  }
}
export default Inicio;
