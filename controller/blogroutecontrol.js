const express=require('express');
//blogindex,blogcreate,blogcreate_post,blogdelete,blogdetails
const Blog=require('../models/blogschema');

const blogindex=(req,res)=>{
    Blog.find().sort({createdAt: -1})
    .then((result)=>{res.render('index',{title:'All Blogs',blogs:result})})
     .catch((err)=>{console.log(err)})
}

const blogcreate=(req,res)=>{
    const blog=new Blog(req.body);
    blog.save()
    .then((result)=>res.redirect('/blogs'))
    .catch((err)=>{console.log(err);})
    
}

const blogcreate_post=(req,res)=>{
    res.render('create',{ title:'Create a new blog'});

}

const blogdetails=(req,res)=>{
    const postid=req.params.id;
    Blog.findById(postid)
    .then(result=> res.render('post',{title:'Blogpost', blog:result}))
   .catch((err)=>{res.status(404).render('404',{title:'No Blog'})})
}

const blogdelete=(req,res)=>{
    const postid=req.params.id;

    Blog.findByIdAndDelete(postid)
    .then(result=>{
     return   res.json({redirect:'/blogs'})
    })
    .catch((err)=>{console.log(err);})
}

module.exports  = {
    blogindex,
    blogcreate,
    blogcreate_post,
    blogdetails,
    blogdelete
}