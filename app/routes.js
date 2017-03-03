var express = require('express');
var multer = require('multer');
var router = express.Router(); // to separate out routes from our main index.js file, we'll use express.Router
var usersController = require('./controllers/usersController');
var portfolioController = require('./controllers/portfolioController');
var upload = multer({ dest: 'public/uploads/' });

router.get('/', portfolioController.getAllPortfolios);

router.get('/logout', portfolioController.getAllPortfolios);

router.get('/redirect', usersController.studentView);

router.get('/myprofile', usersController.myprofile);
// router.get('/', function(req, res) {
//   res.sendfile('./views/test.html');
// //   res.sendfile('./views/register.html');
// });
// /editImg
router.get('/editImg', function(req, res) {
	// res.sendfile('./views/editIm')
	var id = req.query.id;
	// req.session.id = id;
	console.log(id);
	console.log("yasmine");
	res.render('editImg',{id});
});
router.post('/updatedImg', upload.single('image'), portfolioController.changeImg);
// /editURL
router.get('/editURL', function(req, res) {
	var id = req.query.id;
	res.render('editURL', {id});
});
router.post('/updatedURL', portfolioController.changeURL);
// /editTitle
router.get('/editTitle', function(req, res) {
	var id = req.query.id;
	res.render('editTitle', {id});
});
router.post('/updatedTitle', portfolioController.changeTitle);
// /deleteProject
router.get('/deleteProject', portfolioController.deleteProject);

router.get('/detailedPortfolio', portfolioController.detailedPortfolio);
router.get('/detailedPortfolioP', portfolioController.detailedPortfolioP);
router.get('/register', function(req, res) {
	// res.sendfile('./views/register.html');
	res.render('register',{});
});


router.get('/login', function(req, res) {
	res.sendfile('./views/login.html');
	console.log("hey?");
});

router.get('/create', function(req, res) {
	var student = req.session.user;
	console.log(student);
	res.render('createProject', {student});
});

router.get('/addwork', function(req, res) {
	var student = req.session.user;
	console.log(student);
	res.render('updatework', {student});
});

router.post('/signup', usersController.createUser);

router.post('/profile', usersController.logInUser);

router.post('/createProj', upload.single('image'), portfolioController.addProject);

router.post('/createPort', upload.single('image'), portfolioController.createPortfolio);

router.post('/done', upload.single('image'), portfolioController.createPortfolioFinal);

router.post('/addmoreprojects', upload.single('image'), portfolioController.updatePortfolio);

//export this router to use in our index.js
module.exports = router;




























//
