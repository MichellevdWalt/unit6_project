//require express
const express = require("express");

//require data form data.json file
const {projects} = require("./data.json");

const app = express();

//Use pug as view engine
app.set('view engine', 'pug');

//Use all static files found in the public folder
app.use('/static', express.static('public'));

//Route home page
app.get('/', (req, res) => {
    res.render('index', {projects});
})

//Route about page
app.get('/about', (req, res) => {
    res.render('about', {projects});
})

//route project page according to project selection and send data to pug file to render. 
//If statement checks for valid route for one of the projects, if not next(error is returned).
app.get('/project/:id', (req, res, next) =>{
   if (req.params.id < 5) {
       res.render('project',{
        project: projects[req.params.id]
       }) }else {
           const error = new Error(`Oops, that page doesn't exist`);
           error.status = 404;
           console.log (`Error: ${error}`);
           return next(error);
       }    
})

//All other pages that are not routed, creates custom error.
app.use((req, res, next) =>{
    const error = new Error(`Oops, this page doesn't exist`);
    error.status = 404;
    console.log(`Something went wrong: ${error}`);
    return next(error);
});

//Create error message and render error.pug
app.use((error, req, res, next) => {
    res.locals.error = error;
    res.status(error.status);
    res.render(`error`);
});

//Listen port 3000, write to the console if successful.
app.listen(3000, () => {
     console.log('The application is running on localhost:3000');
 })