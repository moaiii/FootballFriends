var CompanyModel = require('../src/models/company.model');


exports.remove_token = function(req, res) {
  req.company.removeToken(req.token)
    .then(() => {
      res.status(200).redirect('/');
    }, () => {
      res.status(400).send();
    })
};


/**
 * FROM -> app.post('/company/login', companyRoute.login);
 * @param {object} req 
 * @param {object} res 
 */
exports.login = function(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  CompanyModel.findByCredentials(email, password)
    .then((company) => {
      company.generateAuthToken()
        .then((object) => {
          localStorage.setItem(FF_TOKEN, object.token);
          localStorage.setItem(TOKEN_TYPE, 'company');

          res
            .header('x-auth', object.token)
            .render('company', {
              me: object.company
            });
        })
    })
    .catch((e) => {
      // cant find company
      res.status(400).send(e);
    })
};


/**
 * FROM -> app.post('/company', company_route.create_company);
 * @param {object} req 
 * @param {object} res 
 */
exports.create_company = function(req, res) {
  
  var company = new CompanyModel({
    email: req.body.email,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    postCode: req.body.postCode
  });

  company.save()
    .then(() => {
      return company.generateAuthToken();

    }).then((object) => {
      res
        .header('x-auth', object.token)
        .render('company', {
          me: object.company
        });
    }).catch((e) => {
      res.status(400).send(e);
    });
};


/**
 * FROM -> app.get('/company/me', authenticate, company_route.get_me);
 * @param {object} req 
 * @param {object} res 
 */
exports.get_me = function(req, res) {
  // the company object patch on to the request 
  // by the authentication middleware
  res.render('company', {
    company: req.company
  });
};