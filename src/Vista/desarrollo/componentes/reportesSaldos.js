import React, { Component } from "react";
import Buscar from "../../../Controlador/CRUDS/buscar.js"
import Fechas from "../../../Controlador/HTTP/Utiles/fechas0.js"
import Clonar from "../../../Controlador/HTTP/Utiles/Clonar.js"

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
  cajero:""
}
class Boton extends Component
{
  constructor(props){
    super(props);
    this.state = {
      datos: Clonar(props.datos),
      datosfiltrados: Clonar(props.datos)
    }
    this.buscar = this.buscar.bind(this)
    this.cambiosInput = this.cambiosInput.bind(this)
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
    // var sald = [];
    // dat.usuarios.map(a=>{
    //   sald = sald.concat(Buscar(dat.saldos,{usuario:{valor:a.key,tipo:"igual"}}))
    // })
    // dat.saldos = sald;
    // dat.parqueos = Buscar(dat.usuarios,{placa:{valor:form.ci,tipo:"contieneString"}})
    this.setState({datosfiltrados:dat})
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
        <button onClick={this.buscar} style = {estiloBoton} className="hover:bg-red-500"> Buscar</button>
      </div>
    )
  }
}
export default Boton;
