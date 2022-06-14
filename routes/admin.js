var express = require('express');
var router = express.Router();
title='Hospitium'
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('admin/hospital_list', { title, admin: true});;
});


module.exports = router;
