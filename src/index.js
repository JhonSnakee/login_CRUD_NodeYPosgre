//==========IMPORTAMOS MODULOS Y DEMAS==========
const express = require('express');
const morgan = require('morgan');
const expresshbs = require('express-handlebars');
const path = require('path');
const flash = require('connect-flash');
const session = require('express-session');
const pgStore = require('express-pg-session')(session);
const passport = require('passport');
const {database} = require('./keys');

//==========INICIALIZAMOS==========
const app = express();
require('./lib/passport');

//==========CONFIGURACION==========
//definimos el puerto
app.set('port', process.env.PORT || 4000);

//definimos donde estan las vistas que se muestran al usuario handlebars
app.set('views', path.join(__dirname, 'views')); //direccion del archivo que se ejecuta
app.engine('.hbs', expresshbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars'),
}));
app.set('view engine', '.hbs');//utilizamos la funcion

//==========MIDDLEWARES========== //Se ejecutan cada vez que un usuario o app-cliente envia una peticion
app.use(session({
    secret: 'faztpgnodepg',
    resave: false,
    saveUninitialized: false,
    // store: new pgStore(database)
}));
//mensajes de exito y error
app.use(flash());

//monstramos los logs
app.use(morgan('dev'));

//aceptar la data que envia los usuarios a la app
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//iniciamos passport
app.use(passport.initialize());
//guardamos los datos de la sesion
app.use(passport.session());

//==========VARIABLES GLOBALES==========
app.use((req, res, next) => {
    app.locals.success = req.flash('success');
    app.locals.message = req.flash('message');
    app.locals.user = req.user;
    next();
})

//==========RUTAS==========
//Definimos las url's del servidor
app.use(require('./routes/index'));
app.use(require('./routes/autentication'));
app.use('/links', require('./routes/links'));

//==========PUBLIC==========
app.use(express.static(path.join(__dirname, 'public')));

//==========INICIAMOS SERVIDOR==========
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'));
})