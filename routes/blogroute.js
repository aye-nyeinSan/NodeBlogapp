const express=require('express');
const { blogindex, blogcreate, blogcreate_post, 
    blogdetails, blogdelete,blogedit,blogupdate } = require('../controller/blogroutecontrol');
const router= express.Router();
const Blog=require('../models/blogschema');



router.get('/',blogindex)
    
router.post('/',blogcreate)

router.get('/create',blogcreate_post)

//get post from id
router.get('/:id', blogdetails)

//delete post from id
router.delete('/:id',blogdelete)
//editpost 
router.get('/:id/update',blogedit)
//updatepost
router.put('/:id',blogupdate)



module.exports  = router;