import React, { Component } from "react";
import Textbox from "./textbox.js"


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
class SuperGeneradorFormularios3000 extends Component
{
  constructor() {
    super();
    console.log(window.datos.SuperGeneradorFormularios3000)
    this.state = {
      form: window.datos.SuperGeneradorFormularios3000
    };
  }
  render()
  {
    var campos = this.state.form.campos.map(campo => {
        switch (campo.type) {
          case 'combobox':
            return (
              <div>
                <label className={campo.color} htmlFor={campo.name}> {campo.label} </label>
                <br></br>
                <select name = {campo.name} required={campo.required} readOnly={campo.readonly}>
                  {
                    campo.contenido.map(option =>
                    {
                      return(
                        <option value = {option.valor} selected = {option.selected}>
                          {option.contenido}
                        </option>
                      )
                    })
                  }
                </select>
                <br></br>
              </div>
            )
            break;
          default:
          return (
            <div style = {estiloDiv}>
              <label htmlFor={campo.name}> {campo.label} </label>
              <br></br>
              <input style = {estiloInput} key={campo.name} name = {campo.name} type ={campo.type} required={campo.required} placeholder={campo.placeholder} defaultValue = {campo.value} readOnly={campo.readonly}></input>
              <br></br>
            </div>
          )
            break;
        }
      });
    return (
      <div>
      {
        <form action = {this.state.form.action} method = {this.state.form.method} encType={this.state.form.enctype}>
          <h1 style = {{color:"#fff"}}>{this.state.form.titulo}</h1>
          {campos}
          <br/>
          <button type='Submit' style = {estiloBoton}> Confirmar</button>
        </form>
      }
      </div>
    )
  }
}
export default SuperGeneradorFormularios3000;
