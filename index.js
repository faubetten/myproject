/* Importes */
require('dotenv').config(); /* Importar variaveis de ambiente do .env */
var express = require('express'); /* Importar modulo express */
var path = require('path');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
      
var app = express(); /* Criar aplicação */
      
/* Configuração da aplicação */
app.use(morgan('dev')); /* Print para cada request */
app.use(express.json()); /* Parses qualquer JSON no corpo do request */
app.use(express.urlencoded({ extended: false })); /* Parses qualquer info urlencoded no corpo do request */
app.use(cookieParser(process.env.COOKIE_SECRET)); /* Configura-se com o COOKIE_SECRET do .env */
app.use(express.static(path.join(__dirname, 'public'))); /* Define-se "public" a pasta dos ficheiros estaticos */
const usersRouter = require("./routes/usersRoutes");
app.use("/api/users",usersRouter);
const port = parseInt(process.env.port || '8080'); /* Port pode ser mudado ao adicionar variável ao .env */

/* Correr aplicação */
app.listen(port,function() {
    console.log("Server running at http://localhost:"+port);
});