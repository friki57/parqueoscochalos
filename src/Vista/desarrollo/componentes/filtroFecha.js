import React, { Component } from "react";


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
class FiltroFecha extends Component
{
  constructor(props){
    super(props);
    const hoy = new Date();
    const mes = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    this.state = {
      hoy, mes
    }
    this.props.form.ini = mes.toISOString().substring(0,10);
    this.props.form.fin = hoy.toISOString().substring(0,10);
    this.cambiosInput = this.cambiosInput.bind(this)
  }
  cambiosInput(e) {
    this.props.form[e.target.name] = e.target.value;
    this.props.buscar();
    // this.buscar()
  }
  render()
  {
    return (
      <div>
        <div style={estiloDiv}>
          <label htmlFor="ini"> Fecha Inicial</label>
          <br></br>
          <input onChange={this.cambiosInput} style={estiloInput} key="ini" name="ini" type="date" defaultValue={this.state.mes.toISOString().substring(0,10)}></input>
          <br></br>
        </div>
        <div style={estiloDiv}>
          <label htmlFor="fin"> Fecha Final</label> 
          <br></br>
          <input onChange={this.cambiosInput} style={estiloInput} key="fin" name="fin" type="date" defaultValue={this.state.hoy.toISOString().substring(0,10)}></input>
          <br></br>
        </div>
      </div>
    )
  }
}
export default FiltroFecha;
