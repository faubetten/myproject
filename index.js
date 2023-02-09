/* Importes */
require('dotenv').config(); /* Importar variaveis de ambiente do .env */
var express = require('express'); /* Importar modulo express */
var path = require('path'); /* Importar modulo path */
var cookieParser = require('cookie-parser'); /* Importar modulo cookies */
var morgan = require('morgan'); /* Importar modulo morgan */
const usersRouter = require("./routes/usersRoutes"); /* Conecta route users a App */
const cardsRouter = require("./routes/cardsRoutes"); /* Conecta route cards a App */
      
var app = express(); /* Criar aplicação */
      
/* Configuração da aplicação */
app.use(morgan('dev')); /* Print para cada request */
app.use(express.json()); /* Parses qualquer JSON no corpo do request */
app.use(express.urlencoded({ extended: false })); /* Parses qualquer info urlencoded no corpo do request */
app.use(cookieParser(process.env.COOKIE_SECRET)); /* Configura-se com o COOKIE_SECRET do .env */
app.use(express.static(path.join(__dirname, 'public'))); /* Define-se "public" a pasta dos ficheiros estaticos */
app.use("/api/users",usersRouter); /* Define Endpoint para users */
app.use("/api/cards",cardsRouter); /* Define Endpoint para cards */
const port = parseInt(process.env.port || '8080'); /* Port pode ser mudado ao adicionar variável ao .env */

/* Correr aplicação */
app.listen(port,function() {
    console.log("Server running at http://localhost:"+port);
});