const express=require('express')
const router=express.Router()
const { ensureAuth,ensureGuest }=require('../middleware/auth1') 
const Story=require('../modals/story')

//@desc Login/Landing Page
//@route GET/

router.get('/', ensureGuest,(req,res) =>{
    res.render('login',{
        layout:'login',
    })
})

//@desc dashboard Page
//@route GET/dashboard
router.get('/dashboard',ensureAuth,(req,res) =>{
    try {
        const stories=await Story.find({user:req.user.id}).lean()
        res.render('dashboard',{
            name:req.user.firstName,
            stories
        })
        
    } catch (error) {
        console.error(err)
        res.render('Error/500')
        
    }
    
   
})






module.exports=router