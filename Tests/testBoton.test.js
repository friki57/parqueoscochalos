import React from 'react';
import ReactDom from 'react-dom';
import Boton from './../src/Vista/desarrollo/componentes/boton.js'
import SuperGeneradorFormularios3000 from './../src/Vista/desarrollo/componentes/superGeneradorFormularios3000.js'
import {render,cleanup} from '@testing-library/react'
import "@testing-library/jest-dom/extend-expect"
import renderer from "react-test-renderer";

// it("Jala el botoncito", ()=>
// {
//   const {getByTestId} = render(<Boton texto = 'apreta'/>)
//   expect(getByTestId('boton')).toHaveTextContent("apreta");
// });
afterEach(cleanup);

it("Test 1", ()=>{
  const tree= renderer.create(<Boton texto = "hola"/>).toJSON();
  expect(tree).toMatchSnapshot();
  });

visit("Super form 1", ()=>{
  window.datos = {
    SuperGeneradorFormularios3000:
      {
        titulo: "Iniciar sesión",
        method: 'post',
        action: '/inicioSesion',
        campos:
        [
          {
            name: 'correo',
            placeholder: 'Dirección de correo electrónico',
            value: '',
            label: 'Correo Electrónico: ',
            type: 'email'
          },
          {
            name: 'contra',
            placeholder: 'Contraseña',
            value: '',
            label: 'Contraseña',
            type: 'password'
          }
        ]
      }
    }


  const tree= renderer.create(<SuperGeneradorFormularios3000/>).toJSON();
  expect(tree).toMatchSnapshot();
  });
