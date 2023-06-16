
const  express=require( 'express');
const app= express();



const bodyParser=require('body-parser');
const methodOverride=require('method-override');
const Blog = require('./models/blogschema');
const blogroute=require('./routes/blogroute');
require('dotenv').config()//env variable
//console.log(process.env);



///Connect with MangoDB
const mongoose=require('mongoose');//database
mongoose.set("strictQuery", false);

const mongodb="mongodb://ayeNyeinSan:test123@mongo:27017/blogs";
mongoose.connect(mongodb,{ useNewUrlParser: true ,useUnifiedTopology: true},{ useFindAndModify: false })
.then((result)=>console.log('connected to database...'))
.catch(error=>console.log(error));



//register ejs
app.set('view engine','ejs');
//incoming req as strings or arrays
app.use(express.urlencoded({extended:true}));//posting data to server (req.body)
app.use(express.static('views'));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


app.get('/', (req,res) => {
  
    console.log(req.url);
    res.status(200).redirect('/blogs');
   
})

app.get('/about', (req,res) => {
    res.render('about',{ title:'About'});

})
app.get('/about-us',(req,res) => {
    res.render('about',{ title:'About'});

})

app.get('/api/blogs',(req,res)=>{
    Blog.find({}, {title:1,snippet:1,body:1}).sort({createdAt:-1})
    .then((result)=>{ res.json(result)})
    .catch((err)=>{console.log(err);})

})
   
//blogRoute
app.use('/blogs',blogroute);

app.use((req,res) => {
   res.status(404);
   res.render('404',{ title:'404'});
})







//update 
//upload photo

//user=>user auth

var port= process.env.PORT|| 5050;
app.listen(port,()=>console.log(`listening on ${port}` ))
