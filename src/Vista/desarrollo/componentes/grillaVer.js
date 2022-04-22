import React, { Component } from "react";

const grilla = {
  display: 'grid',
  gridTemplateColumns: "1fr repeat(12, 62px) 1fr",
  gridTemplateRows: "minmax(1em, auto) 1fr auto minmax(1em, auto)",
  gridColumnGap: '22px',
  position: 'fixed',
  top:'0px',
  left: '0px',
  width: '100vw',
  height: '100vh',
  background: '#0000',
  zIndex: '5000',
  overflowY:'hidden'
}
const barra =
{
  minHeight: '1000px',
  background: '#0905'
}
class GrillaVer extends Component
{
  render()
  {
    return (
      <div style = {grilla} id='GrillaVer'>
        <div></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div style = {barra}></div>
        <div></div>
      </div>

    )
  }
}
export default GrillaVer;
