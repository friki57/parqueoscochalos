module.exports = (arreglo,filtro)=>
{
//  console.log(arreglo);
  for (var atr in filtro) {
    if (filtro.hasOwnProperty(atr)) {
        switch (filtro[atr].tipo) {
          case 'rango':
            arreglo = arreglo.filter(ele => ele[atr] >= filtro[atr].min && ele[atr] <= filtro[atr].max);
            break;
          case 'fecha':
            arreglo = arreglo.filter(ele => filtroFecha(ele[atr], filtro[atr].ini, filtro[atr].fin));
            break;
          case 'dia':
            arreglo = arreglo.filter(ele => filtroDia(ele[atr], filtro[atr].dia));
            break;
          case 'igual':
            arreglo = arreglo.filter(ele => ele[atr] == filtro[atr].valor);
            break;
          case 'contieneString':
            arreglo = arreglo.filter(ele =>
              {
                if(ele[atr]!=undefined)
                 return ele[atr].includes(filtro[atr].valor)
              });
            break;
        }

    }
  }
  return arreglo;
}
function filtroFecha (fecha, ini, fin){
  fecha = new Date(fecha)//.toISOString().substring(0, 10);
  // console.log(fecha.toISOString().substring(0, 10), ini, fin)
  fecha.setHours(0, 0, 0, 0);
  fecha = new Date(fecha).getTime();
  ini = new Date(ini).getTime();
  fin = new Date(fin).getTime();
  // console.log(fecha, ini, fin, (fecha >= ini && fecha <= fin))
  return (fecha >= ini && fecha <=fin)
}
function filtroDia (fecha, dia){
  fecha = new Date(fecha)//.toISOString().substring(0, 10);
  let ini = dia;
  let fin = addDay(dia);
  fin = new Date(new Date(fin).getTime() - 1)
  // console.log(fecha.toISOString().substring(0, 10), ini, fin)
  fecha.setHours(0, 0, 0, 0);
  fecha = new Date(fecha).getTime();
  ini = new Date(ini).getTime();
  fin = new Date(fin).getTime();
  // console.log(fecha, ini, fin, (fecha >= ini && fecha <= fin))
  return (fecha >= ini && fecha <=fin)
}

function addDay(dateOr) {
  let date = new Date(dateOr);
  let next_date = new Date(date.setDate(date.getDate() + 1));
  return next_date.toISOString().substring(0, 10);
}