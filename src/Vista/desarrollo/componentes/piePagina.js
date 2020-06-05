import React, { Component } from "react";

const pie = {
  width: '100vw',
  height: '200px',
  background: 'black',
  color: 'white'
}
const icono = {
  margin: '0 5px',
  fontSize: '25px'
}
const firma =
{
  fontSize: '16px',
  letterSpacing: '2px'
}
class PiePagina extends Component
{
  render()
  {
    return (
      <div style = {pie} className='flexV'>
        <div>
          <i style = {icono} className="fa fa-facebook-square"></i>
          <i style = {icono} className="fa fa-whatsapp"></i>
          <i style = {icono} className="fa fa-instagram"></i>
          <i style = {icono} className="fa fa-twitter-square"></i>
        </div>
        <br></br>
        <div style = {firma}>COCHABAMBA - 2019</div>
      </div>
    )
  }
}
export default PiePagina;
