var express = require('express');
var router = express.Router();

var facultyHelpers = require('../helpers/facultyHelpers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('index')
});

router.get('/login',(req,res)=>{
	if(req.session.loggedIn){
	  res.redirect('/')
	}else{
	  res.render('login',{'loginErr':req.session.loginErr})
	  req.session.loginErr=false
	}
	  
  })

router.post('/login',(req,res)=>{
	facultyHelpers.doLogin(req.body).then((response)=>{
	  if(response.status){
		// req.session.loggedIn=true
		// req.session.faculty=response.faculty
		res.redirect('/faculty')
	  }else{
		req.session.loginErr='Invalid email and password'
		res.redirect('login')
	  }
	})
})

module.exports = router;
