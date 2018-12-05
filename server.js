const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; //port configuration for heroku

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

// setting up the view engine Handlebarsjs
app.set('view engine', 'hbs');

//registering a middleware to save all of the log requests to server
app.use((req , res , next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    fs.appendFileSync('server log' , log + '\n' , (error) => {
        if (error){
            console.log("Unable to append to server.log")
        }
    }) ;
    next();
});

// middleware to be executed when website 
// is in mentainance mode

// app.use((req , res , next) => {
//     res.render('mentainance.hbs');
// });

app.use(express.static(__dirname + '/public'));


//Redirect Bootstrap JS and CSS
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js')); 

hbs.registerHelper('getcurrentyear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
});


app.get('/', (req ,res) => {
    // res.send ('<h1>Hello Express!</h1>');
        res.render('home.hbs',{
        welcome : 'Hello To My Page!',
        pagetitle: 'Home Page',
    });
});

app.get('/about', (req , res) => {
    res.render('about.hbs',{
        pagetitle: 'About Page',
    });
});

app.get('/projects', (req , res) => {
    res.render('projects.hbs',{
        pagetitle: 'Portfolio Page',
    });
});

app.listen(port, () => {
    console.log(`server is working on port ${port}!`);
});