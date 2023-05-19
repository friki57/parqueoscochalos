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
  ci: "",
  ini: "",
  fin: ""
}
class reporteParqueo extends Component
{
  constructor(props){
    super(props);
    this.state = {
      datos: Clonar(props.datos),
      datosfiltrados: Clonar(props.datos),
      parqueoGrafico: []
    }
    //console.log("eeeeeee",this.state.datos,this.state.datosfiltrados,props.datos,Clonar(props.datos));
    this.buscar = this.buscar.bind(this)
    this.cambiosInput = this.cambiosInput.bind(this)
  }
  componentWillMount() {
    setTimeout(()=>this.buscar(),1000);
  }
  cambiosInput(e){
    form[e.target.name]=e.target.value;
    // console.log(form);
    this.buscar()
  }
  buscar(){
    var dat = Clonar(this.state.datos);
    // dat.usuarios = Buscar(this.state.datos.usuarios, {ci:form.ci,tipo:"contieneString"})
    // dat.usuarios = dat.usuarios.filter(ele =>
    //   {
    //     if(ele["ci"]!=undefined)
    //      return ele["ci"].includes(form["ci"])
    //   });
    dat.usuarios = Buscar(dat.usuarios,{placa:{valor:form.ci.toUpperCase(),tipo:"contieneString"}})
    var parq = [];
    dat.usuarios.map(a=>{
      parq = parq.concat(Buscar(dat.parqueos,{usuario:{valor:a.key,tipo:"igual"}}))
    })
    dat.parqueos = Buscar(parq, { fecha: { ini: form.ini, fin: form.fin, tipo: "fecha" } });
    // dat.parqueos = Buscar(dat.usuarios,{placa:{valor:form.ci,tipo:"contieneString"}})
    const fechas = ListaFechas(form.ini, form.fin);
    let parqueoGrafico = {
      x: fechas,
      y: fechas.map(f => {
        const pardia = Buscar(dat.parqueos, { fecha: { dia: f, tipo: "dia" } })
        console.log(f, pardia, dat.parqueos)
        return pardia.reduce((a, b) => a + 1, 0)
      })
    }
    parqueoGrafico = parqueoGrafico.x.map((x, i) => ({ Fecha: x, name: x, Uso: parqueoGrafico.y[i], Uso1: parqueoGrafico.y[i] }));
    console.log("Parqueo Grafico", parqueoGrafico)
    this.setState({ datosfiltrados: dat, parqueoGrafico })
    console.log(form,dat.usuarios,parq);
  }
  render()
  {
    return (
      <div className="rounded w-full p-5 mb-5" style={{background:"#0B313F"}}>
        <div style = {estiloDiv}>
          <label htmlFor="ci"> Número de placa </label>
          <br></br>
          <input onChange={this.cambiosInput} style = {estiloInput} key="ci" name = "ci" type = "text" defaultValue = {""}></input>
          <br></br>
          <FiltroFecha form={form} buscar={this.buscar}></FiltroFecha>
          <div>
            <h3>Resultados:</h3>
            Cantidad de parqueos totales: {this.state.datosfiltrados.parqueos.reduce((a, b) => a + 1, 0)} <br></br>
            Parqueos marcados con Sensor: {this.state.datosfiltrados.parqueos.reduce((a, b) => (b.medio !== "QR") ? a + 1 : a, 0)} <br></br>
            Parqueos marcados con QR: {this.state.datosfiltrados.parqueos.reduce((a, b) => (b.medio === "QR") ? a + 1 : a, 0)} <br></br>
          </div>
          <br></br>
          <LineChart
            width={800}
            height={600}
            data={this.state.parqueoGrafico}
            margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            className="bg-white"
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />

            {/* <Tooltip
              content={(props) => (
                <div style={{
                  border: '#bbb 1.5px solid',
                }}>
                  <p style={{
                    margin: '0 0',
                    padding: '3px 7.5px',
                    backgroundColor: 'white',
                    color: '#000',
                  }}>
                    {props.payload[0].value}
                  </p>
                  <p style={{
                    margin: '0 0',
                    padding: '3px 7.5px',
                    backgroundColor: 'white',
                    color: '#007AFF',
                  }}>
                    Read:
                    {' '}
                    coom
                  </p>
                </div>
              )}
            /> */}
            <CartesianGrid stroke="#333" />
            <Line type="monotone" dataKey="Uso" stroke="#0B313F" yAxisId={0} />
          </LineChart>
          <br></br>
        </div>
        <table className="table bg-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Calle</th>
              <th scope="col">Placa</th>
              <th scope="col">Fecha</th>
              <th scope="col">Medio</th>
              <th scope="col">Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.datosfiltrados.parqueos.map((a,i)=>{
                return (
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{Buscar(this.state.datos.calles,{key:{valor:a.calle,tipo:"igual"}})[0].callecompleta}</td>
                    <td>{Buscar(this.state.datos.usuarios,{key:{valor:a.usuario,tipo:"igual"}})[0].placa}</td>
                    <td>{Fechas((new Date(a.fecha)))}</td>
                    <td>{a.medio?a.medio:'Sensor'}</td>
                    <td>{a.tiempo}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <button onClick={this.buscar} style = {estiloBoton} className="hover:bg-red-500"> Buscar</button>
      </div>
    )
  }
}
export default reporteParqueo;

