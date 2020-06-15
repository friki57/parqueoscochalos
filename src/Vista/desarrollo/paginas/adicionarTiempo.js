
import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import SuperGeneradorFormularios3000 from './../componentes/superGeneradorFormularios3000.js'
import PiePagina from './../componentes/piePagina.js'
import Boton from './../componentes/boton.js'

class AdicionarTiempo extends Component
{
  render()
  {
    return (
      <div>
        <Cabecera></Cabecera>
        <div className="grilla" style = {{background: "url(/img/cochabamba.jpg)", backgroundSize:"100% 100%", color: "#fff"}}>
          <div className="cuerpo flexV" style = {{background: "#0B313F88"}}>
            <h1 className="text-3xl m-3">Aumentar tiempo de estacionamiento</h1>
            <p>Ci: {window.datos.usuario.ci}</p>
            <p>Placa: {window.datos.usuario.placa}</p>
            <p>Saldo actual: {window.datos.usuario.saldo}</p>
            <div className = "bg-gray-600 bg-opacity-50 p-4 m-2">
              <h3 className = "mx-auto text-xl m-3">Parqueo Actual</h3>
              <p className = "mw-3/4 mx-auto mb-3">
                Actulamente estacionado en:
                {window.datos.usuario.parqueoActual.calle.toString()} <br/>
                Desde las {window.datos.usuario.parqueoActual.fecha.toString()}
                Con tiempo limite hasta las {window.datos.usuario.parqueoActual.fechaFinal.toString()}
              </p>
              <div className = "flex w-full">
                <form method="POST" action={window.datos.http.post.rutaCuenta.adicionarTiempo + "30"}>
                  <button className = "rounded bg-green-600 text-white p-2 m-1 hover:no-underline hover:bg-green-700"> Añadir 30 minutos </button>
                </form>
                <form method="POST" action={window.datos.http.post.rutaCuenta.adicionarTiempo + "60"}>
                  <button className = "rounded bg-yellow-600 text-white p-2 m-1 hover:no-underline hover:bg-yellow-700"> Añadir 1 hora </button>
                </form>
                <form method="POST" action={window.datos.http.post.rutaCuenta.adicionarTiempo + "120"}>
                  <button className = "rounded bg-red-600 text-white p-2 m-1 hover:no-underline hover:bg-red-700"> Añadir 2 horas </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <PiePagina></PiePagina>
      </div>
    )
  }
}
export default AdicionarTiempo;
