

import { Button,Form } from 'react-bootstrap';
import React, { Component } from "react";

import Cabecera from './../componentes/cabecera.js'
import PiePagina from './../componentes/piePagina.js'
import Boton from './../componentes/boton.js'
import ReportesParqueos from './../componentes/reportesParqueos.js'
import ReportesSaldos from './../componentes/reportesSaldos.js'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


//data = [1,2,3,4,5,6,6,7,9]
const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    amt: 2210,
    pv: 1398,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

class Inicio extends Component
{
  constructor(props){
    super(props);

    this.state =
    {
      panel: "Parqueos"
    }
    this.CambiarReporte = this.CambiarReporte.bind(this)
  }
  CambiarCategoria(e)
  {
    console.log(e.target.value)
    console.log(window.datos)
  }
  CambiarReporte(e)
  {
    // console.log(e.target.name);
    this.setState({panel:e.target.name});
  }
  render()
  {
    return (
      <div>
        <Cabecera></Cabecera>
        <div className="flexV p-10" style = {{background: "#fffa"}}>
          <div className="p-10 w-3/4">
            <h3 className = "mx-auto">Reportes de uso del sistema</h3>
            <br></br>
            <button onClick={this.CambiarReporte} name="Parqueos" className="active:bg-blue-800 hover:bg-blue-700 hover:text-white rounded-full rounded-r-none my-5 mr-0 bg-blue-500 p-3" >Parqueos</button>
            <button onClick={this.CambiarReporte} name="Saldos" className="active:bg-yellow-800 hover:bg-yellow-700 hover:text-white rounded-full rounded-l-none my-5 ml-0 bg-yellow-500 p-3">Saldos</button>

            <br></br>

            {
              this.state.panel=="Parqueos"?
              <ReportesParqueos datos={window.datos}></ReportesParqueos>
              :
              <ReportesSaldos datos={window.datos}></ReportesSaldos>
            }

            <select onChange={this.CambiarCategoria}>
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
            </select>
            <LineChart
              width={400}
              height={400}
              data={data}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
              <XAxis dataKey="name" />
              <Tooltip />
              <CartesianGrid stroke="#f5f5f5" />
              <Line type="monotone" dataKey="amt" stroke="#ff7300" yAxisId={0} />
              <Line type="monotone" dataKey="pv" stroke="#387908" yAxisId={1} />
            </LineChart>
          </div>

        </div>
        <PiePagina></PiePagina>
      </div>
    )
  }
}
export default Inicio;
