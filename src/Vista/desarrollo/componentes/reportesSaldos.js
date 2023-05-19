import React, { Component } from "react";
import Buscar from "../../../Controlador/CRUDS/buscar.js"
import Fechas from "../../../Controlador/HTTP/Utiles/fechas0.js"
import Clonar from "../../../Controlador/HTTP/Utiles/Clonar.js"
import FiltroFecha from "./filtroFecha.js";
import ListaFechas from "../../../Controlador/HTTP/Utiles/ListaFechas.js";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';


const estiloDiv =
{
  color: "#fff",
  width: "360pt",
  border: "none",
  textAlign: "left"
}
const estiloInput =
{
  display: "block",
  background: "#fff6",
  color: "#000",
  padding: "10px",
  width: "100%",
  border: "none",
  borderRadius: "15px"
}
const estiloBoton =
{
  color: "#fff",
  background: "#D53F3D",
  width: "146pt",
  padding: "10px 50px",
  textTransform: "uppercase",
  border: "none"
}
var form = {
  fecha:"",
  ci:"",
  usuario:"",
  cajero: "",
  ini: "",
  fin: ""
}
class Boton extends Component
{
  constructor(props){
    super(props);
    this.state = {
      datos: Clonar(props.datos),
      datosfiltrados: Clonar(props.datos),
      montoFecha: []
    }
    this.buscar = this.buscar.bind(this)
    this.cambiosInput = this.cambiosInput.bind(this)
  }
  componentWillMount() {
    setTimeout(() => this.buscar(), 1000);
  }
  cambiosInput(e){
    form[e.target.name]=e.target.value;
    // console.log(form);
    this.buscar()
  }
  buscar(){
    var dat = Clonar(this.state.datos);
    console.log(dat.saldos);
    dat.saldos = Buscar(dat.saldos,{usuario:{valor:form.usuario.toUpperCase(),tipo:"contieneString"}})
    dat.saldos = Buscar(dat.saldos,{cajero:{valor:form.cajero,tipo:"contieneString"}})
    dat.saldos = Buscar(dat.saldos, { fecha: { ini: form.ini, fin: form.fin, tipo: "fecha" } })
    // var sald = [];
    // dat.usuarios.map(a=>{
    //   sald = sald.concat(Buscar(dat.saldos,{usuario:{valor:a.key,tipo:"igual"}}))
    // })
    // dat.saldos = sald;
    // dat.parqueos = Buscar(dat.usuarios,{placa:{valor:form.ci,tipo:"contieneString"}})
    const fechas = ListaFechas(form.ini, form.fin);
    let montoFecha = {
      x: fechas,
      y: fechas.map(f => {
        const saldia = Buscar(dat.saldos, { fecha: { dia: f, tipo: "dia" } })
        console.log(f, saldia, dat.saldos)
        return saldia.reduce((a, b) => a + parseFloat(b.monto), 0)
      })
    }
    montoFecha = montoFecha.x.map((x, i) => ({ Fecha: x, name: x, Monto: montoFecha.y[i]}));
    console.log("MontoFEcha", montoFecha)
    this.setState({datosfiltrados:dat, montoFecha})
    console.log(form,dat.saldos);
  }
  render()
  {
    return (
      <div className="rounded w-full bg-yellow-50 p-5 mb-5" style={{background:"#E79A32"}}>
        <div style = {estiloDiv}>
          <label htmlFor="placa"> Número de placa </label>
          <br></br>
          <input onChange={this.cambiosInput} style = {estiloInput} key="usuario" name = "usuario" type = "text" defaultValue = {""}></input>
          <br></br>
          <label htmlFor="ci"> Carnet de Identidad </label>
          <br></br>
          <input onChange={this.cambiosInput} style = {estiloInput} key="cajero" name = "cajero" type = "text" defaultValue = {""}></input>
          <br></br>
          <FiltroFecha form={form} buscar={this.buscar}></FiltroFecha>
          <div>
            <h3>Resultados:</h3> 
            Monto total: {this.state.datosfiltrados.saldos.reduce((a, b) => a + parseFloat(b.monto), 0) } <br></br>
            Recargas por cajero: {this.state.datosfiltrados.saldos.reduce((a, b) => (b.cajero!=="Recarga QR")?a + 1:a, 0) } <br></br>
            Recargas por QR: {this.state.datosfiltrados.saldos.reduce((a, b) => (b.cajero==="Recarga QR")?a + 1:a, 0) } <br></br>
          </div>
          <br></br>
          <LineChart
            width={800}
            height={600}
            data={this.state.montoFecha}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            className="bg-white"
          >
            <XAxis dataKey="Fecha" />
            <Tooltip />
            <CartesianGrid stroke="#333" />
            <Line type="monotone" dataKey="Monto" stroke="#ff7300" yAxisId={0} />
          </LineChart>
          <br></br>
        </div>
        <table className="table bg-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Placa</th>
              <th scope="col">Monto</th>
              <th scope="col">Fecha</th>
              <th scope="col">Cajero</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.datosfiltrados.saldos.map((a,i)=>{
                return (
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{a.usuario}</td>
                    <td>{a.monto}</td>
                    <td>{Fechas((new Date(a.fecha)))}</td>
                    <td>{a.cajero}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    )
  }
}
export default Boton;
