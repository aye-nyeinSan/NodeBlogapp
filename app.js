
const  express=require( 'express');

const app= express();
const mongoose=require('mongoose');
const methodOverride=require('method-override');
const Blog = require('./models/blogschema');
const blogroute=require('./routes/blogroute');

///Connect with MangoDB
const dbURI='mongodb+srv://ayenyeinsan:test1234@cluster0.ho942.mongodb.net/node-practice?retryWrites=true&w=majority'
mongoose.connect(dbURI,{ useNewUrlParser: true ,useUnifiedTopology: true},{ useFindAndModify: false })
.then((result)=>console.log('connected to database...'))
.catch(error=>console.log(error));



//register ejs
app.set('view engine','ejs');
//incoming req as strings or arrays
app.use(express.urlencoded({extended:true}));//posting data to server (req.body)<<<<<<
app.use(express.static('views'));

app.use(methodOverride('_method'));


app.use(express.static('views'))


app.get('/', (req,res) => {
    res.redirect('/blogs');

})

app.get('/about', (req,res) => {
    res.render('about',{ title:'About'});

})
app.get('/about-us',(req,res) => {
    res.render('about',{ title:'About'});

})


app.get('/blogs/:id/update',(req,res) => {
    const postid=req.params.id;
    Blog.findById(postid)
    .then(result=> {
        res.render('update',{title:'Edit post', blog:result})})
   .catch((err)=>{res.render('404')})
    
})

app.put('/blogs/:id',(req,res)=>{
    const postid=req.params.id;
    
    Blog.findByIdAndUpdate(postid,req.body)
    .then((result)=>   
        res.json({redirect:`/blogs/${postid}`})
      )
    .catch((err)=>console.log(err))
   
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