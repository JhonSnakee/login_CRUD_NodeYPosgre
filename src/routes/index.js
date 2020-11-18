//==========IMPORTAMOS MODULOS Y DEMAS==========
const express = require('express');
const router = express.Router();

//ruta inicial
router.get('/', (req, res) => {
    res.render('index')
});

//exportamos
module.exports=router;
