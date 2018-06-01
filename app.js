// On importe les modules dont on a besoin (modules tiers)
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let mongoose = require('mongoose');

// On importe les differents routeurs (les modules à nous (pour le routage))
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
let productCreationRouter = require('./routes/product-creation');

// On créé notre application avec Express
let app = express();

// Definition du moteur de templates vues
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//Middleware de base
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//Rendre des assets statiques : CSS/JS/IMG/FONTS
app.use(express.static(path.join(__dirname, 'public')));
app.use('/dist', express.static(path.join(__dirname,'node_modules/jquery/dist')));
app.use('/dist', express.static(path.join(__dirname,'node_modules/bootstrap/dist')));

//Mongoose
console.log("version de mongoose " +mongoose.version);
mongoose.connect('mongodb://localhost/food');
let database = mongoose.connection;
database.on('error' , (err)=>{
  console.log("Erreur avec Mongoose");
  console.log(err);
});

database.once('open', () => console.log('Connexion réussie avec MongoDB'));



//Système de routage
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/produit', productCreationRouter);

//Création d'une page de contact avec la route qui va avec
app.get('/contact',(req, res) =>{
  res.send('<h1>Bienvenue sur la page de contact</h1>')
});

/** Routes definies à la main
 * ##todo Exporter les routes
 */
app.get('/api/products', (req, res)=>{
  const monObjet = {"name" : "hamac"};
  res.json(monObjet);
});

app.get(/(ba)+r+$/, (req, res)=>{
  res.send('URL catched !');
});

//Au cas ou la route demandée n'existe pas => Gestion de l'erreur 404 : Not Found 
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// Middleware d'erreurs : executé quand il ya une erreur
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
