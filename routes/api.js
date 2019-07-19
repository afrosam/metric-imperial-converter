/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

var expect = require('chai').expect;
var ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  var convertHandler = new ConvertHandler();
  
  // works and returns 'test'
  // app.route('/test')
  //   .get(function(req, res){
  //     res.json("test");
  // });
  
  // responds with 'not found' from a 404 status I presume
  app.route('/api/convert')
    .get(function (req, res){
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    
      if (initNum == 'invalid number' && initUnit == 'invalid unit') {
        res.write('invalid number and unit');
        res.end();
      }
      //else if (initUnit == 'no unit given') { res.write('no unit given'); res.end(); }
      else if (initNum == 'invalid number') { res.write('invalid number'); res.end(); }
      else if (initUnit == 'invalid unit') { res.write('invalid unit'); res.end(); }
      else {
      //res.json
      res.json(convertHandler.spellOutUnit(initNum, initUnit, returnNum, returnUnit, toString));
      // res.end();
      }
    });
    
};
