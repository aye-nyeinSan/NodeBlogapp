
const  express=require( 'express');
const app= express();

//register ejs
app.set('view engine','ejs');


app.get('/', (resq,res) => {
    const blogs=[
        {title:'Covid 19 pandemic and job',snippet:'Blah Blah Blah Blah'},
        {title:'I Broke up with everything',snippet:'Blah Blah Blah Blah'},
        {title:'How to set up yourself with Korean Movie',snippet:'Blah Blah Blah Blah'},
        
    ] 
    res.render('index',{ title:'Home',blogs});

})

app.get('/about', (resq,res) => {
    res.render('about',{ title:'About'});

})
app.get('/about-us',(resq,res) => {
    res.render('about',{ title:'About'});

})

app.get('/blogs/create',(resq,res) => {
    res.render('create',{ title:'Create a new blog'});

})

app.use((req,res) => {
   res.status(404);
   res.render('404',{ title:'404'});
})


var port= process.env.PORT|| 5050
app.listen(port,()=>console.log(`listening on ${port}` ));