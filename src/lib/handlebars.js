//==========IMPORTAMOS MODULOS Y DEMAS==========
const {format} = require('timeago.js');

//==========INICIALIZAMOS==========
const helpers = {};

//CONVERTIMOS EL TIMESTAMP A TIMEAGO
helpers.timeago = (timestamp) => {
    return format(timestamp)
}

//EXPORT
module.exports = helpers;