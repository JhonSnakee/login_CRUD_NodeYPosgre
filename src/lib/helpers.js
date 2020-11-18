//==========IMPORTAMOS MODULOS Y DEMAS==========
const bcrypt = require('bcryptjs');
const helpers = {};

//ENCRIPTAMOS CONTRASENA
helpers.encryptPass = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

//COMPARAMOS CONTRASENA
helpers.matchPass = async(password, savepassword) => {
    try {
        return await bcrypt.compare(password, savepassword);
    } catch (err) {
        console.log(err);
    }
}

//EXPORT
module.exports = helpers;