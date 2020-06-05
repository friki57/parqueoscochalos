var nodemailer = require('nodemailer');
const crypto = require('crypto');

module.exports = (email,bd,id)=>
{
  const auth = require('./autenticacion.js');
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: auth
  });
  // import generateHash from 'random-hash';
  // const hash =  generateHash({ length: 6 });
  var hash = crypto.randomBytes(3).toString('hex');
  console.log(hash)
  var mailOptions = {
    from: auth.user,
    to: email,
    subject: 'Confirma tu cuenta en Parqueos Cochalos',
    text: 'Gracias por elegirnos. \nSolo estás a un paso para finalizar la creación de tu cuenta en Parqueos Cochalos.\n Ingresa el siguiente código en el sitio para confirmar tu cuenta: ' + hash
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      bd.cruds.crudUsuario.modificar(id,{hash},()=>
      {
          console.log('hash ingresado:' + hash)
      });
    }
  });

}
