//==========IMPORTAMOS MODULOS Y DEMAS==========
const pg = require('pg');
const {database} = require('./keys');

//Variable que guarda la conexion a la bd
const pool = new pg.Pool(database);

//Verificar la conexion a la bd
pool.query('SELECT NOW()', (err, res) => {
    if (err) {
        console.error(err);
        pool.end(console.error('Coneccion Cerrada'));
    }
    if (res) {
        console.log('BD Conectada');
        return;
    }
})

//export
module.exports = pool;