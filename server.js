const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000; //port configuration for heroku

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req , res , next) => {
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`;

    fs.appendFileSync('server log' , log + '\n') ;
    next();
});

/*app.use((req , res , next) => {
    res.render('mentainance.hbs');
});*/

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getcurrentyear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamit', (text) => {
    return text.toUpperCase();
});


app.get('/', (req ,res) => {
    //res.send ('<h1>Hello Express!</h1>');
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

app.listen(port, () => {
    console.log(`server is working on port ${port}!`);
});