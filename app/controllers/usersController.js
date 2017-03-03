let Student = require('../models/student');
let portfolio = require('../models/portfolio');
let Project = require('../models/project');

let usersController = {

    createUser:function(req, res) {
        var s = req.body;
        console.log(s.username);
        console.log(s.password);
        console.log('sign up');
        if(!s.username || !s.password || s.username.length==0 || s.password==0) {
            console.log('Enter a valid username and password');
            res.sendfile('./views/register.html');
        }
        else {

            var newStudent = new Student({
                username: s.username,
                password: s.password
            });
            console.log(newStudent);
            console.log("!!!!");
            newStudent.save(function(err, student) {
                if(err){
                    console.log(student);
                    console.log(newStudent);
                    console.log('bateekha kbera');
                    res.sendfile('./views/registererror.html');
                }
                else {
                  console.log(student);
                  console.log("eh");
                  req.session.user = student;
                  res.sendfile("./views/registerprocess.html");
              }
            });
        }
    },

    logInUser:function(req, res) {
        var s = req.body;
        console.log(s.username);
        console.log(s.password);
        console.log('login');
        if(!s.username || !s.password) {
            res.send('enter a valid username and password');
            res.sendfile('./views/login.html');
        }
        else {

            var student = new Student({
                username: s.username,
                password: s.password
            });

            Student.findOne({username:s.username, password:s.password},
                function(err, student){
                    if(err){
                        res.send('cannot login');
                        console.log('batekha login');
                        res.sendfile('./views/login.html');
                        // res.status(500).send();
                    }else
                        if(!student){
                            console.log('not found');
                            res.sendfile('./views/loginerror.html');
                            return;
                           // res.status(404).send();
                        }
                        else {
                            console.log(student);
                            req.session.user = student;
                            res.sendfile("./views/loginprocess.html");
                        }
            });
        }
    },

    studentView:function(req, res) {
      student = req.session.user;

      console.log(student);
      portfolio.find(function(err, portfolios){
        if(err)
          res.send('error');
        else
        {
          portfolio.find({student:student._id}, function(err, myportfolios){
            if(err) res.sendfile('./views/login.html');
            else
            {
              console.log("ha?");
              console.log(student._id);
              console.log("!");
              console.log(myportfolios);
              Project.find(function(err, projects){
                if(err){
                  console.log("eshta");
                } else {
                  console.log(projects);
                  console.log('fasel');
                  console.log(portfolios);

                  var totalPortfolios = portfolios.length,
                    pageSize = 10,
                    pageCount = Math.ceil(totalPortfolios / pageSize),
                    currentPage = 1,
                    portfoliosArrays = [],
                    portfoliosList = [];
                  //split list into groups
                  while (portfolios.length > 0) {
                      portfoliosArrays.push(portfolios.splice(0, pageSize));
                  }
                  console.log(portfoliosArrays);
                  if (typeof req.query.page !== 'undefined') {
                		currentPage = +req.query.page;
                	}
                  portfoliosList = portfoliosArrays[+currentPage - 1];
                  if(typeof portfoliosList == 'undefined') portfoliosList = [];
                  console.log(portfoliosList);
                  res.render('profile', {
                    myportfolios:myportfolios,
                    projects: projects,
                    portfolios:portfoliosList,
                    pageSize:pageSize,
                    totalPortfolios:totalPortfolios,
                    pageCount:pageCount,
                    currentPage:currentPage
                  });
                  // res.render('profile', {student, projects, portfolios, myportfolios});
                }
              });
            }
          });
        }
      });
    },

    myprofile:function(req, res) {
      var student = req.session.user;

      portfolio.find({student:student._id}, function(err, myportfolios){
        if(err) res.sendfile('./views/error.html');
        else
        {
          console.log("ha?");
          console.log(student._id);
          console.log("!");
          console.log(myportfolios);
          Project.find({student:student._id}, function(err, projects){
            if(err){
              console.log("eshta");
            } else {
              console.log(projects);
              console.log('fasel');
              res.render('myP', {student, projects, myportfolios});
            }
          });
        }
      });
    }
}

module.exports = usersController;




























//
