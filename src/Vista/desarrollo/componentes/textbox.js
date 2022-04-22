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
  color: "#fff",
  padding: "10px"
}
class Textbox extends Component
{
  constructor(props){
    super(props);
  }
  render()
  {
    return (
      <div style = {estiloDiv}>
        <label htmlFor = {this.props.name}>{this.props.etiqueta}</label>
        <input name = {this.props.name} placeholder = {this.props.placeholder} style = {estiloInput}></input>
      </div>
    )
  }
}
export default Textbox;
