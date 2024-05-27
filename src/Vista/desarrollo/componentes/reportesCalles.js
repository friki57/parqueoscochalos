import React, { Component } from "react";
import Buscar from "../../../Controlador/CRUDS/buscar.js"
import Fechas from "../../../Controlador/HTTP/Utiles/fechas0.js"
import Clonar from "../../../Controlador/HTTP/Utiles/Clonar.js"
import FiltroFecha from "./filtroFecha.js";
import TotalCard from "./totalCard.js";
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
  ini: "",
  fin: ""
}
class Boton extends Component
{
  constructor(props){
    super(props);
    // props.datos.calles = props.datos.calles.map(a=>{
    //   const usos = Buscar(props.datos.parqueos, { calle: { valor: a.key, tipo: "igual" } });
    //   console.log("usos", a.callecompleta, usos, usos.reduce((acc, x) => acc + Math.ceil(x.tiempo / 30) * 2, 0));
    //   a.total = usos.length;
    //   a.costoTotal = 0;
    //   a.costoTotal = usos.reduce((acc, x) => acc + Math.ceil(x.tiempo / 30) * 2, 0);
    //   return a;
    // })
    props.datos.calles = props.datos.calles.sort((a,b)=>b.total-a.total);
    // props.datos.calles = props.datos.calles.sort(function(a, b) {
    //   if (a.total > b.total) {
    //     return -1;
    //   }
    //   if (a.total < b.total) {
    //     return 1;
    //   }
    //   return 0;
    // });
    this.state = {
      datos: Clonar(props.datos),
      datosfiltrados: Clonar(props.datos),
      calleFecha: []
    }
    //console.log("eeeeeee",this.state.datos,this.state.datosfiltrados,props.datos,Clonar(props.datos));
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
    dat.calles = dat.calles.map((a)=>{a.callecompletau=a.callecompleta.toUpperCase(); return a})
    dat.calles = Buscar(dat.calles,{callecompletau:{valor:form.ci.toUpperCase(),tipo:"contieneString"}})
    var parq = [];
    dat.calles = dat.calles.map(a=>{
      const parqueosFiltrados = Buscar(dat.parqueos, { fecha: { ini: form.ini, fin: form.fin, tipo: "fecha" } });
      const usos = Buscar(parqueosFiltrados, { calle: { valor: a.key, tipo: "igual" } });
      a.total = usos.length;
      a.costoTotal = usos.reduce((acc, x) => acc + Math.ceil(x.tiempo / 30) * 2, 0);
      a.tiempoTotal = usos.reduce((acc, x) => acc + parseInt(x.tiempo), 0);
      return a;
    })
    let calleFecha = {
      x: dat.calles.map(x=>x.callecompleta),
      y: dat.calles.map(x => x.total),
    }
    calleFecha = calleFecha.x.map((x, i) => ({ Fecha: x, name: x, Uso: calleFecha.y[i] }));
    console.log("CalleFecha", calleFecha)
    this.setState({ datosfiltrados: dat, calleFecha })
    console.log(form,dat.calles);
  }
  render()
  {
    return (
      <div className="rounded w-full p-5 mb-5 bg-green-600">
        <div style = {estiloDiv}>
          <label htmlFor="ci"> Nombre calle</label>
          <br></br>
          <input onChange={this.cambiosInput} style = {estiloInput} key="ci" name = "ci" type = "text" defaultValue = {""}></input>
          <br></br>
          <FiltroFecha form = {form} buscar={this.buscar}></FiltroFecha>
        </div>
        <div>
          <h3 className="text-white">Resultados:</h3>
          <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between gap-2 w-full">
              <TotalCard titulo="Cantidad de calles:" cantidad={this.state.datosfiltrados.calles.length + ' Calles'} />
              <TotalCard titulo="Usos totales:" cantidad={this.state.datosfiltrados.calles.reduce((a, b) => a + parseFloat(b.total), 0) + ' Usos'} />
            </div>
            <div className="flex justify-between gap-2 w-full">
              <TotalCard titulo="Ganancias totales:" cantidad={this.state.datosfiltrados.calles.reduce((a, b) => a + parseFloat(b.costoTotal), 0) + ' Bs.'} />
              <TotalCard titulo="Tiempo de uso total:" cantidad={`${this.state.datosfiltrados.calles.reduce((a, b) => a + parseFloat(b.tiempoTotal), 0)} Min. ~ ${Math.ceil(this.state.datosfiltrados.calles.reduce((a, b) => a + parseFloat(b.tiempoTotal), 0) / 60)} Hrs.`} />
            </div>
          </div>

          {/* Cantidad de calles: {this.state.datosfiltrados.calles.length} <br></br>
          Usos totales: {this.state.datosfiltrados.calles.reduce((a, b) => a + parseFloat(b.total), 0)} <br></br>
          Ganancias totales: {this.state.datosfiltrados.calles.reduce((a, b) => a + parseFloat(b.costoTotal), 0)} Bs. <br></br>
          Tiempo de uso total: {this.state.datosfiltrados.calles.reduce((a, b) => a + parseFloat(b.tiempoTotal), 0)} Min. ~ {Math.ceil(this.state.datosfiltrados.calles.reduce((a, b) => a + parseFloat(b.tiempoTotal), 0) / 60)} Hrs. <br></br> */}
        </div>
        <br></br>
        <LineChart
          width={800}
          height={600}
          data={this.state.calleFecha}
          margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
          className="bg-white"
        >
          <XAxis dataKey="Fecha" />
          <Tooltip />
          <CartesianGrid stroke="#333" />
          <Line type="monotone" dataKey="Uso" stroke="#4ade80" yAxisId={0} />
        </LineChart>
        <br></br>
        <table className="table bg-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Calle</th>
              <th scope="col">Cantidad máxima de espacios</th>
              <th scope="col">Tipo</th>
              <th scope="col">Cantidad de usos</th>
              <th scope="col">Total de tiempo</th>
              <th scope="col">Total en Bolivianos</th>
            </tr>
          </thead>
          <tbody>
            {
              this.state.datosfiltrados.calles.map((a,i)=>{
                return (
                  <tr key={i}>
                    <th scope="row">{i+1}</th>
                    <td>{a.callecompleta}</td>
                    <td>{a.espaciosMaximo}</td>
                    <td>{a.pago?"tarifada":"prohibida"}</td>
                    <td>{a.total}</td>
                    <td>{a.tiempoTotal} Min.</td>
                    <td>{a.costoTotal} Bs.</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        {/* <button onClick={this.buscar} style = {estiloBoton} className="hover:bg-red-500"> Buscar</button> */}
      </div>
    )
  }
}
export default Boton;

// <a target = "blank" href = {this.props.enlace} style = {estilo} data-testid="boton">{this.props.children}</a>
