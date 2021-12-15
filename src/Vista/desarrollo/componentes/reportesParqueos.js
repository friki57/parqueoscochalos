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
    // dat.usuarios = Buscar(this.state.datos.usuarios, {ci:form.ci,tipo:"contieneString"})
    // dat.usuarios = dat.usuarios.filter(ele =>
    //   {
    //     if(ele["ci"]!=undefined)
    //      return ele["ci"].includes(form["ci"])
    //   });
    dat.usuarios = Buscar(dat.usuarios,{placa:{valor:form.ci,tipo:"contieneString"}})
    var parq = [];
    dat.usuarios.map(a=>{
      parq = parq.concat(Buscar(dat.parqueos,{usuario:{valor:a.key,tipo:"igual"}}))
    })
    dat.parqueos = parq;
    // dat.parqueos = Buscar(dat.usuarios,{placa:{valor:form.ci,tipo:"contieneString"}})
    this.setState({datosfiltrados:dat})
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
        </div>
        <table className="table bg-white">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Calle</th>
              <th scope="col">Placa</th>
              <th scope="col">Fecha</th>
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
export default Boton;

// <a target = "blank" href = {this.props.enlace} style = {estilo} data-testid="boton">{this.props.children}</a>
