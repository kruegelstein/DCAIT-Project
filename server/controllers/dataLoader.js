
// exports.getCars = function(req, res, next){
//     res.send({success:'true'});
// }

const User = require('../models/user')

exports.getCarNames = function(req, res, next){
  User.find({}, { name: 1}, function(err, result) {
    if(err) {
      return next(err)
    }

    res.send(result)
  })
}

exports.buildSeries = function(req, res, next){
  console.log('req.body', req.body);
  const name = req.body.carName
  const form = req.body.form
  console.log('name', name);
  console.log('form', form);
  // User.find({name: name}, {name: 1, timestamps: 1}, function(err, result){
  //   if(err){
  //     return next(err)
  //   }
  //   res.send(result)
  // })
}
