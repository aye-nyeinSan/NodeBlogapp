
const  express=require( 'express');
const app= express();
const mongoose=require('mongoose');
const Blog=require('./views/models/blogschema');

///Connect with MangoDB
const dbURI='mongodb+srv://ayenyeinsan:test1234@cluster0.ho942.mongodb.net/node-practice?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true ,useUnifiedTopology: true})
.then((result)=>console.log('connected to database...'))
.catch(error=>console.log(error));



//register ejs
app.set('view engine','ejs');
app.use(express.urlencoded({extended:true}));


app.get('/', (resq,res) => {
    res.redirect('/blogs');
    

})

app.get('/about', (resq,res) => {
    res.render('about',{ title:'About'});

})
app.get('/about-us',(resq,res) => {
    res.render('about',{ title:'About'});

})


app.get('/blogs',(resq,res)=>{
Blog.find()
.then((result)=>{res.render('index',{title:'All Blogs',blogs:result})})
 .catch((err)=>{console.log(err)})
})
app.post('/blogs',(req,res)=>{
    const blog=new Blog(req.body);
    blog.save().then((result)=>res.redirect('/blogs')).catch((err)=>{console.log(err);})
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