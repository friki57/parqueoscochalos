docentes = [
      {
        Oferta: "Día del Padre",
        ruta: "Día del Padre"
      },
      {
        Oferta: "Día del Mar",
        ruta: "Día del Mar"
      }
    ]
console.log(docentes)
docentes = docentes.map(doc=>
{//estoy creando otro vas a disculpar mi pobreza
  doc.img = "/img/usuario.png";

  //console.log(doc)
  return doc;
});
console.log(docentes)
