//==========IMPORTAMOS MODULOS Y DEMAS==========
const { response } = require('express');
const express = require('express');
const router = express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/auth');

//ANADIMOS UN LINK
//ventana para anadir
router.get('/add', isLoggedIn, (req, res) => {
    res.render('links/add');
});
//consulta para anadir
router.post('/add', isLoggedIn, async(req, res) => {
    const {title, url, description} = req.body;

    const consulta = `INSERT INTO public.links(title, url, descripcion, user_id) VALUES ($1, $2, $3, $4)`;
    const values = [title,url,description,req.user.id];

    await pool.query(consulta, values);
    req.flash('success', 'Enlace guardado satisfactoriamente');
    res.redirect('/links');
});

//MOSTRAMOS LOS LINKS DEL USUARIO
router.get('/', isLoggedIn, async(req, res) => {
    const consulta = `SELECT * FROM public.links WHERE user_id = $1;`;
    const values = [req.user.id];

    const links = await pool.query(consulta,values);
    res.render('links/list', {links:links.rows});
});

//ELIMINAMOS UN LINK
router.get('/delete/:id', isLoggedIn, async(req, res) => {
    const {id} = req.params;

    const consulta = `DELETE FROM public.links WHERE id = $1;`;
    const values = [id];

    await pool.query(consulta, values);
    req.flash('success', 'Enlace removido satisfactoriamente');
    res.redirect('/links');
})

//EDITAMOS UN LINK
//ventana de edicion
router.get('/edit/:id', isLoggedIn, async(req, res) => {
    const {id} = req.params;

    const consulta = `SELECT * FROM public.links WHERE id = $1;`;
    const values = [id];

    const links = await pool.query(consulta, values);
    res.render('links/edit', {links:links.rows[0]})
})
//consulta de edicion
router.post('/edit/:id', isLoggedIn, async(req, res) => {
    const {id} = req.params;
    const {title, url, description} = req.body;

    const consulta = `UPDATE public.links SET title=$1, url=$2, descripcion=$3 WHERE id = $4;`;
    const values = [title,url,description,id];

    await pool.query(consulta, values);
    req.flash('success', 'Enlace actualizado satisfactoriamente');
    res.redirect('/links');
});


//EXPORT
module.exports=router;