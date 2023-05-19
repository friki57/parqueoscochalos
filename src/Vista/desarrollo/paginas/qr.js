
import { Button, Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import SuperGeneradorFormularios3000 from './../componentes/superGeneradorFormularios3000.js'
import PiePagina from './../componentes/piePagina.js'
import Boton from './../componentes/boton.js'

class QR extends Component {
    constructor(){
        super()
        console.log("window.datos.usuario")
        console.log(window.datos)
    }
    render() {
        return (
            <div>
                <Cabecera></Cabecera>
                <div className="grilla" style={{ background: "url(/img/cochabamba.jpg)", backgroundSize: "100% 100%", color: "#fff" }}>
                    <div className="cuerpo flexV" style={{ background: "#0B313F88" }}>
                        <h1 className="text-3xl m-3">Recargar Saldo</h1>
                        <p>Ci: {window.datos.usuario.ci}</p>
                        <p>Placa: {window.datos.usuario.placa}</p>
                        <p>Saldo actual: {window.datos.usuario.saldo}</p>
                        <div className="bg-gray-600 bg-opacity-50 p-4 m-2">
                            <div className="flex w-full">
                                <form method="POST" action={window.datos.http.post.rutaCuenta.qr + "10"}>  
                                    <button className="rounded bg-green-600 text-white p-2 m-1 hover:no-underline hover:bg-green-700"> Recargar 10 bolivianos </button>
                                </form>
                                <form method="POST" action={window.datos.http.post.rutaCuenta.qr + "20"}>
                                    <button className="rounded bg-yellow-600 text-white p-2 m-1 hover:no-underline hover:bg-yellow-700"> Recargar 20 bolivianos </button>
                                </form>
                                <form method="POST" action={window.datos.http.post.rutaCuenta.qr + "50"}>
                                    <button className="rounded bg-red-600 text-white p-2 m-1 hover:no-underline hover:bg-red-700"> Recargar 50 bolivianos </button>
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
export default QR;
