//==========IMPORTAMOS MODULOS Y DEMAS==========
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

//========USUARIO SE LOGUEA========
passport.use('local.signin', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    console.log(req.body);
    const consulta = `SELECT * FROM public.users WHERE username = $1;`
    const values = [username];
    const result = await pool.query(consulta, values);

    if (result.rows.length > 0) {
        const user = result.rows[0];
        const validPass = await helpers.matchPass(password, user.password);
        if (validPass) {
            done(null, user, req.flash('success', `Bienvenido ${user.username}`));
        }else{
            done(null, false, req.flash('message', 'La contraseña es incorrecta'));
        }
    }else{
        return done(null, false, req.flash('message', 'El Usuario ingresado no existe'));
    }
}));

//========USUARIO SE REGISTRA=========
passport.use('local.signup', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username, password, done) => {
    const {fullname} = req.body;
    let passworden = await helpers.encryptPass(password)

    const consulta = `INSERT INTO public.users(username, password, fullname)VALUES ($1, $2, $3)`;
    const values = [username,passworden,fullname];
    await pool.query(consulta, values);

    const consulta2 = `SELECT * FROM public.users ORDER BY id DESC LIMIT 1;`;
    const result = await pool.query(consulta2);

    const newUser = {
        id: result.rows[0].id,
        username: result.rows[0].username,
        password: result.rows[0].password,
        fullname: result.rows[0].fullname
    };
    return done(null, newUser);

}));

//SERIALIZACION
//guardo el id del usuario en el servidor
passport.serializeUser((user, done) => {
    done(null, user.id)
});

//DESERIALIZACION
//tomo el id almacenado para volver a obtener los datos 'Doble autenticacion'
passport.deserializeUser( async(id, done) => {
    const result = await pool.query(`SELECT * FROM public.users WHERE id = ${id}`);
    done(null, result.rows[0]);
});
