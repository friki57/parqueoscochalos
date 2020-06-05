var entrada = "./src/Vista/desarrollo/salidas/";
var salida = "/src/public/reactScripts/";
var fs = require('fs');
var paginas = fs.readdirSync(entrada);
var entry = {};
console.log('compilando:', paginas)
paginas.map((pagina)=>
{
    entry[pagina.split('.')[0]]= entrada+pagina;
});
module.exports =
{
  entry,
  output:
  {
    path: __dirname + salida,
    filename: '[name].js'
  },
  module:
  {
    rules:
    [
      {
        use: "babel-loader",
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};
