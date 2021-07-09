const express=require('express');
const router= express.Router();
const Blog=require('../models/blogschema');



router.get('/',(resq,res)=>{
    
    Blog.find().sort({createdAt: -1})
    .then((result)=>{res.render('index',{title:'All Blogs',blogs:result})})
     .catch((err)=>{console.log(err)})
    })


router.post('/',(req,res)=>{
        const blog=new Blog(req.body);
        blog.save()
        .then((result)=>res.redirect('/blogs'))
        .catch((err)=>{console.log(err);})
    })

router.get('/create',(resq,res) => {
    
        res.render('create',{ title:'Create a new blog'});
    
    })

//get post from id
router.get('/:id',(req,res)=>{
    const postid=req.params.id;
    Blog.findById(postid)
    .then(result=> res.render('post',{title:'Blogpost', blog:result}))
   .catch((err)=>{console.log(err);})
})



//delete post from id
router.delete('/:id',(req,res)=>{
    const postid=req.params.id;

    Blog.findByIdAndDelete(postid)
    .then(result=>{
     return   res.json({redirect:'/blogs'})
    })
    .catch((err)=>{console.log(err);})
})



module.exports  = router;