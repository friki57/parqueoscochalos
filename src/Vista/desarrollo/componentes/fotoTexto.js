import React, { Component } from "react";

class FotoTexto extends Component
{
  constructor(props){
    super(props);
    var deg = props.degrade == undefined ? 'linear-gradient(#0000,#0000)' : props.degrade;

    this.state =
    {
      alto:10,
      ruta:props.foto,
      degrade: deg
    }
    const dis=this;
    var img = new Image();
    img.onload = function(i) {
      var ancho = window.innerWidth;
      var razon = ancho / this.width;
    //  console.log('ancho',ancho)
    //  console.log('razon',razon)
      dis.setState({alto:this.height*razon})
    }
    img.src = dis.state.ruta;
  }
  render()
  {

    /*<div className = 'gradiente img-fluid flexV' id="fotoTexto">
    <h1 className="img">Parqueos Cochalos</h1>
    <div>
    Este sitio web es una plataforma para el <br/>
    monitoreo de los espacios para <br/>
    estacionamiento en las calles controladas <br/>
    por el departamento de tránsito de ciudad <br/>
    de Cochabamba en Bolivia          <br/>
    </div>
    </div>
    <Image id="fondo" src='/img/QuienesSomos.jpeg' style={{visibility:'hidden'}} fluid />


    <Image src='/img/QuienesSomos.jpeg' className="responsivo" fluid />
    */

    var estilos = {
      backgroundImage: this.state.degrade+',url("'+this.state.ruta+'")',
      width:'100%',
      height:this.state.alto,
      backgroundSize:'cover'
    };
    
    return(
      <div>
        <div className ='flexV' style={estilos} >
          {this.props.children}
        </div>
      </div>

    )
  }
}
export default FotoTexto;
