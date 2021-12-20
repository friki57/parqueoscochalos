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
  ci:""
}
class Boton extends Component
{
  constructor(props){
    super(props);
    props.datos.calles = props.datos.calles.map(a=>{
      a.total = Buscar(props.datos.parqueos,{calle:{valor:a.key,tipo:"igual"}}).length
      return a;
    })
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
      datosfiltrados: Clonar(props.datos)
    }
    //console.log("eeeeeee",this.state.datos,this.state.datosfiltrados,props.datos,Clonar(props.datos));
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
    dat.calles = dat.calles.map((a)=>{a.callecompletau=a.callecompleta.toUpperCase(); return a})
    dat.calles = Buscar(dat.calles,{callecompletau:{valor:form.ci.toUpperCase(),tipo:"contieneString"}})
    var parq = [];
    dat.calles = dat.calles.map(a=>{
      a.total = Buscar(dat.parqueos,{calle:{valor:a.key,tipo:"igual"}}).length
      return a;
    })

    this.setState({datosfiltrados:dat})
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
        </div>
        <table className="table bg-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Calle</th>
              <th scope="col">Cantidad máxima de espacios</th>
              <th scope="col">Tipo</th>
              <th scope="col">Cantidad de usos</th>
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

// <a target = "blank" href = {this.props.enlace} style = {estilo} data-testid="boton">{this.props.children}</a>