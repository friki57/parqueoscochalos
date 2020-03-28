function backgroundResponsiveImagen() {
  var divs = document.getElementsByClassName("imagenResponsive");
  console.log(divs)
  console.log(divs.length.toString())
  console.log(divs[0])
  for (var i = 0; i < divs.length; i++) {
    console.log(i)
    div = divs[i];
    var imageSrc = div.style.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
    var image = new Image();
    image.src = imageSrc;
    var dimensiones =
    {
      ancho : image.width,
      alto : image.height
    }
    console.log(div)
  }
}
// setTimeout(()=>
// {
//   backgroundResponsiveImagen();
// },1000);
