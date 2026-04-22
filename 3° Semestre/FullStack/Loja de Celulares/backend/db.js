const mysql = require('mysql2');

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'loja_celulares'
});

conexao.connect(err => {
    if (err) {
        console.error('Erro ao conectar:', err);
    } else {
        console.log('Servidor Rodando na porta 3000!');
    }
});

module.exports = conexao;