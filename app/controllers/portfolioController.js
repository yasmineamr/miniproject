let Portfolio = require('../models/portfolio');
let Project = require('../models/project');

let portfolioController = {

    getAllPortfolios:function(req, res){

        Portfolio.find(function(err, portfolios){

            if(err){
              res.send(err.message);
            }else
            {
              Project.find(function(err, projects){
                if(err){
                  console.log("error");
                  res.sendfile('./views/error.html');
                } else {
                  // console.log(projects);
                  // console.log('fasel');
                  // console.log(portfolios);
                  // console.log("---");
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
                  // console.log(portfoliosList);
                  // console.log(projects);
                  res.render('index', {
                    projects: projects,
                    portfolios:portfoliosList,
                    pageSize:pageSize,
                    totalPortfolios:totalPortfolios,
                    pageCount:pageCount,
                    currentPage:currentPage
                  });
                  // res.render('index', {projects, portfolios});
                }
              });
              // res.render('index', {portfolios});
            }
        });
    },

    addProject:function(req, res) {
      var s = req.body;
      var student = req.session.user;
      var f = req.file;

      // console.log(f);

      var project = new Project({
        title: s.title
      });
      var flag = 'true';
      if( s.URL.length == 0 && typeof f == 'undefined') {
        flag = 'false';
        res.render("createProject", {student});
        // console.log("feen work ha?");
      }
      else
      if( s.URL.length != 0 && typeof f != 'undefined') {
        project.URL =  s.URL;
        project.img = f.filename;
        // console.log("both");
      }
      else
      if (s.URL.length != 0 && typeof f == 'undefined') {
        project.URL = s.URL;
        project.img = "default.png";
        // console.log("url");
      }
      else
      if (s.URL.length == 0 && typeof f != 'undefined') {
        project.img = f.filename;
        project.URL = 'false';
        // console.log("img");
      }

      if(flag == 'true') {
        project.student = student;

        // console.log(project.title);
        // console.log(project.URL);
        // console.log(project.img);
        // console.log(project.student);

        project.save(function(err, project) {
          if(err){
            console.log('error occurred');
            res.sendfile('./views/error.html');
          }
          else
          {
            console.log('project created');
            res.render('createProject', {student});
          }
        });
      }
    },

    createPortfolio:function(req, res) {
      var s = req.body;
      var student = req.session.user;
      var f = req.file;

      // console.log(f);
      // console.log(s.URL);
      var project = new Project({
        title: s.title
      });

      var flag = 'true';

      if( s.URL.length == 0 && typeof f == 'undefined') {
        flag = 'false';
        // console.log("feen work ha?");
        console.log("add work please");
        res.render('createProject',{student});
      }
      else
      if( s.URL.length != 0 && typeof f != 'undefined') {
        project.URL =  s.URL;
        project.img = f.filename;
        // console.log("both");
      }
      else
      if (s.URL.length != 0 && typeof f == 'undefined') {
        project.URL = s.URL;
        project.img = "default.png";
        // console.log("url");
      }
      else
      if (s.URL.length == 0 && typeof f != 'undefined') {
        project.img = f.filename;
        project.URL = 'false';
        // console.log("img");
      }

      if(flag == 'true') {
        project.student = student;

        // console.log(project.title);
        // console.log(project.URL);
        // console.log(project.img);
        // console.log(project.student);

        project.save(function(err, project) {
          if(err){
            console.log('erro at creating the project');
            res.sendfile('./views/error.html');
          }
          else
          {
            console.log('project created successfully');
            res.render('createPortfolio', {student});
          }
        });
      }
    },

    createPortfolioFinal:function(req, res) {
      var s = req.body;
      var student = req.session.user;
      var f = req.file;

      Project.find({student: req.session.user}, function(err, projects) {
          if(err)
            res.send(err.message);
          else {
            // console.log(projects);
            var portfolio = new Portfolio({
              name:s.name
              // description:s.description
              // profilePic:s.profilePic
            });
            if(s.description.length!=0) {
              portfolio.description = s.description;
            }
            else {
              portfolio.description = "no description";
            }
            if(typeof f != 'undefined'){
              portfolio.profilePic = f.filename;
            }else {
              portfolio.profilePic = "default.png";
            }

            portfolio.student = student;
            portfolio.works = projects;

            portfolio.save(function(err, portfolio) {
              if(err){
                // console.log('msh awy');
                res.sendfile('./views/error.html');
              }
              else
              {
                // console.log('hanet hanet');
                // console.log(portfolio);
                // console.log("fasel");

                res.sendfile("./views/createportfolioprocess.html");
              }
            });
          }
      });
    },

    updatePortfolio:function(req, res) {
      var s = req.body;
      var student = req.session.user;
      var f = req.file;

      // console.log(f);

      var project = new Project({
        title: s.title
      });

      var flag = 'true';

      if( s.URL.length == 0 && typeof f == 'undefined') {
        flag = 'false';
        // res.send("feen el work?");
        // console.log("feen work ha?");
      }
      else
      if( s.URL.length != 0 && typeof f != 'undefined') {
        project.URL =  s.URL;
        project.img = f.filename;
        // console.log("both");
      }
      else
      if (s.URL.length != 0 && typeof f == 'undefined') {
        project.URL = s.URL;
        project.img = "default.png";
        // console.log("url");
      }
      else
      if (s.URL.length == 0 && typeof f != 'undefined') {
        project.img = f.filename;
        project.URL = 'false';
        // console.log("img");
      }
      if(flag == 'true') {
        project.student = student;

        project.save(function(err, project) {
          if(err) {
            // console.log("ya allaaahhh");
            res.sendfile('./views/error.html');
          }
          else {
            // console.log(project);
            Portfolio.findOne({student:student._id}, function(err, myportfolio) {
              if(err) {
                // console.log("sorry");
                res.sendfile('./views/error.html');
              } else {
                myportfolio.works.push(project);

                myportfolio.save(function(err, portfolio) {
                  if(err) {
                    // console.log("hanet bgd");
                    res.sendfile('./views/error.html');
                  } else {
                    // console.log(portfolio);
                    res.sendfile("./views/projectaddedprocess.html");
                  }
                });
              }
            });
          }
        });
      }
    },

    changeImg:function(req, res) {
      var s = req.session.user;
      // var id = req.param('id');
      var id = req.query.id;
      var f = req.file;

      // console.log(f);
      // console.log(id);
      Project.findByIdAndUpdate(id,
        {$set:
        {img: f.filename}}, function(err, project) {
          if(err) {
            // console.log("sorry");
            res.sendfile('./views/error.html');
          } else {
            project.img = f.filename;
            // console.log(project);
            res.sendfile("./views/editimageprocess.html");
          }
      });
    },

    changeURL:function(req, res) {
      var s = req.session.user;
      var id = req.query.id;
      var f = req.body;
      // console.log(f.URL);
      // console.log(id);
      // console.log(s);
      Project.findByIdAndUpdate(id,
        {$set:
        {URL: f.URL}}, function(err, project) {
          if(err) {
            // console.log("sorry");
            res.sendfile('./views/error.html');
          } else {
            // project.URL = f.URL;
            // console.log(project);
            res.sendfile("./views/editimageprocess.html");
          }
      });
    },

    changeTitle:function(req, res) {
      var s = req.session.user;
      var id = req.query.id;
      var f = req.body;
      // var c = req.query.title;
      // console.log("tuttnfj");
      // console.log(f.title);
      // console.log(c);
      // console.log("titles");
      Project.findByIdAndUpdate(id,
        {$set:
        {title: f.title}}, function(err, project) {
          if(err) {
            console.log("sorry");
            res.sendfile('./views/error.html');
          } else {
            // project.title = f.title;
            // console.log(project);
            // console.log("yasmine");
            res.sendfile("./views/editimageprocess.html");
          }
      });
    },
    deleteProject:function(req, res) {
      var s = req.session.user;
      var id = req.query.id;

      Portfolio.findOne({student:s._id}, function(err, myportfolio) {
        if(err){
          // console.log("err");
          res.sendfile('./views/error.html');
        }else {
          // console.log(myportfolio);
          if(myportfolio.works.length == 1) {
            console.log("cannot delete project");
            res.sendfile("./views/errordeleted.html");
          }
          else {
            Project.remove({_id:id}, function(err) {
              if(err) {
                // console.log("err");
                res.sendfile('./views/error.html');
            }
              else {
                res.sendfile("./views/deleted.html");
              }
            });
          }
        }
      });
    },

    detailedPortfolio:function(req, res) {
      var id = req.query.id;

      Portfolio.find({student:id}, function(err, portfolio){
        if(err) res.sendfile('./views/error.html');
        else
        {
          // console.log("ha?");
          // console.log(id);
          // console.log("!");
          // console.log(portfolio);
          Project.find({student:id}, function(err, projects){
            if(err){
              // console.log("eshta");
              res.sendfile('./views/error.html');
            } else {
              // console.log(projects);
              // console.log('fasel');
              res.render('viewPortfolio', {projects, portfolio});
            }
          });
        }
      });
    },

    detailedPortfolioP:function(req, res) {
      var id = req.query.id;

      Portfolio.find({student:id}, function(err, portfolio){
        if(err) res.sendfile('./views/error.html');
        else
        {
        //   console.log("ha?");
        //   console.log(id);
        //   console.log("!");
        //   console.log(portfolio);
          Project.find({student:id}, function(err, projects){
            if(err){
              // console.log("eshta");
              res.sendfile('./views/error.html');
            } else {
              // console.log(projects);
              // console.log('fasel');
              res.render('viewPortfolioWhenLoggedIn', {projects, portfolio});
            }
          });
        }
      });
    }
 }

module.exports = portfolioController;






























//
