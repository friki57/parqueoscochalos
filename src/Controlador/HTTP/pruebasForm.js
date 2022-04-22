rutas.get('/f',(req,res)=>
{
  bd.cruds.crudCalle.buscar(
    {
      c1:
      {
        valor:'san mart',
        tipo: 'contieneString'
      }
    },
    (calles)=>
    {
      res.send(calles)
    });
});
rutas.get(get.normativas,(req,res)=>
{
  res.render(vista.inicio,{
    datos:
    {
      nombres:
      [
        'erick',
        'brian'
      ],
      perros:
      {
        grandes:
        [
          'rocky',
          'killer'
        ],
        pequeños:
        [
          'chinchin',
          'bruno'
        ]
      },
      SuperGeneradorFormularios3000:
      {
        titulo: "Pruba SuperGeneradorFormularios3000",
        method: 'post',
        action: '/probar',
        campos:
        [
          {
            name: 'Uno',
            placeholder: 'Uno',
            value: 'Uno',
            readonly: true,
            label: 'Uno: ',
            type: 'number'
          },
          {
            name: 'Dos',
            placeholder: 'Dos',
            value: 'Dos',
            readonly: false,
            label: 'Dos: '
          },
          {
            name: 'Tres',
            placeholder: 'Tres',
            value: 'Tres',
            label: 'Tres'
          },
          {
            name: 'select',
            label: 'combobox',
            type: 'combobox',
            contenido: [
              {
                valor: 1,
                contenido: 'uno'
              },
              {
                valor: 2,
                contenido: 'dos',
                selected: true
              },
              {
                valor: 3,
                contenido: 'tres'
              }
            ]
          }
        ]
      }
    }
  });
});
rutas.post(post.prueba, (req,res)=>
{
  res.json(
    {
      hola: "hola",
      nombre: "erick"
    }
  );
});
