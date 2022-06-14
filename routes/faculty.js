var express = require('express');
var router = express.Router();

var facultyHelpers = require('../helpers/facultyHelpers')


title ="Hospitium"
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hospitium', faculty:true });
});

router.get('/faculty_reg',(req,res)=>{
    res.render('faculty/faculty_reg',{title,faculty:true});
})

router.post('/faculty_reg',(req,res)=>{
  facultyHelpers.doFSignup(req.body).then((data)=>{
    console.log(data);
    //req.session.loggedIn=true
    //req.session.faculty=response
    res.redirect('faculty')
  })
})





module.exports = router;
