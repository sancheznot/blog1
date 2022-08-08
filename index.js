// Requires 
const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const newPostController = require('./controllers/newPost');
const homeController = require('./controllers/home');
const storePostController = require('./controllers/storePost');
const getPostController = require('./controllers/getPost');
const validateMiddleWare = require('./middleware/validationMiddleware');
const newUserController = require('./controllers/newUser');
const storeUserController = require('./controllers/storeUser');
const loginController = require('./controllers/login');
const loginUserController = require('./controllers/loginUser');
const authMiddleware = require('./middleware/authMiddleware');
const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
const logoutController = require('./controllers/logout');
const flash = require('connect-flash');

global.loggedIn = null;



// creando servidor
const app = new express();
// declarando puerto
const port = 3000;

const expressSession = require('express-session');

app.use(expressSession({
    name : 'codeil',
    secret : 'something',
    resave :false,
    saveUninitialized: true,
    cookie : {
            maxAge:(1000 * 60 * 100)
    }      
})); 
   

app.use('*', (req, res, next)=>{
    loggedIn = req.session.userId;
    next()
});
app.use(flash());
// haciendo conexion con el servidor
app.use(express.static('public'));// usando public
app.set('view engine', 'ejs');// usando el render de html
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());




app.listen(port,()=>{
    console.log(`App listening on port ${port}`);


app.use('/posts/store',validateMiddleWare);

  // Rutas
   
    app.get('/', homeController);
    app.get('/post/:id', getPostController);
    app.get('/posts/new', authMiddleware, newPostController);
    app.post('/posts/store', authMiddleware, storePostController);
    app.get('/auth/register',redirectIfAuthenticatedMiddleware, newUserController);
    app.post('/users/register',redirectIfAuthenticatedMiddleware, storeUserController);
    app.get('/auth/login',redirectIfAuthenticatedMiddleware, loginController);
    app.post('/users/login',redirectIfAuthenticatedMiddleware, loginUserController);
    app.get('/auth/logout', logoutController);
    app.use((req, res) => res.render('notfound'));
    
app.get('/about', (req, res)=>{
        //res.sendFile(path.resolve(__dirname, 'public/pages/about.html'));
        res.render('about');
    });
app.get('/contact', (req, res)=>{
        //res.sendFile(path.resolve(__dirname, 'public/pages/contact.html'));
        res.render('contact');
    });
     
});

mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});