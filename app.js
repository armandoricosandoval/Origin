const express = require( 'express' );
const morgan = require('morgan'); //middleware application logger
const nunjucks = require( 'nunjucks' );
const routes = require('./routes');
const tweetBank= require('./tweetBank')
var  bodyParser  =  require ( 'body-parser' )


const app = express(); // crea una instancia de una aplicación de express

// Configurando Nunjucks
app.set('view engine', 'html'); // hace que res.render funcione con archivos html
app.engine('html', nunjucks.render); // cuando le den archivos html a res.render, va a usar nunjucks
nunjucks.configure('views'); // apunta a nunjucks al directorio correcto para los templates

app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('tiny'))
app.use(express.static('./public'))
app.use('/', routes)


// parse application/json
app.use(bodyParser.json())

app.use(function (req, res) {
  res.setHeader('Content-Type', 'text/plain')
  res.write('you posted:\n')
  res.end(JSON.stringify(req.body, null, 2))
})


app.listen(3000, function(){
    console.log('Estas escuhando en el puerto 3000')
});