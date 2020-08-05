const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = 3000;

const app = express();
const router = express.Router();


app.use(bodyParser.urlencoded({
    extended: true
}));


// Database
const dbConfig = require('./config/database.config')
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Banco de dados conectado com sucesso');
}).catch(err => {
    console.log('Erro ao conectar ao banco de dados. Saindo agora...');
    process.exit();
});


app.listen(port, () => {
    console.log(`Servidor executando na porta ${port}`);
});