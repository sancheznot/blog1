const mongoose = require('mongoose');
const BlogPost = require('./models/BlogPost');
mongoose.connect('mongodb://localhost/my_database', {useNewUrlParser: true});

BlogPost.create({
    title: 'hola soy nuevo post aqui con ricardo', 
    body: 'Hola este nuevo post o entrada que estoy colocando hoy es para testear:'}, 
    (error, blogpost) => {
        console.log(error, blogpost);
    })