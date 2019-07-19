/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      var input = '3.2kg';
      assert.equal(convertHandler.getNum(input), 3.2);
      done();
    });
    
    test('Fractional Input', function(done) {
      var input = '2/3kg';
      assert.equal(convertHandler.getNum(input), 0.6666666666666666);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      var input = '3/30.3kg';
      assert.equal(convertHandler.getNum(input), 0.099009900990099);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      var input  = '2/3/40kg';
      assert.equal(convertHandler.getNum(input), 'invalid input');
      done();
    });
    
    test('No Numerical Input', function(done) {
      var input = 'lbs';
      // should default to 1 if no number is given according to instructions.
      assert.equal(convertHandler.getNum(input), 1)
      done();
    });
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        //assert
        assert.notEqual(convertHandler.getUnit(ele), 'invalid unit')
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      let input = ['keg', 'kim', 'kaz', 'lb', 'mii', 'li'];
      input.forEach(function(ele) {
        assert.equal(convertHandler.getUnit(ele), 'invalid unit')
      });
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      let input = ['gal','l','mi','km','lbs','kg'];
      let expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      //see above example for hint
      let input = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
      let expect = [
        { initNum: 1, initUnit: "gal", returnNum: "3.78541", returnUnit: "L", string: "1 gallons converts to 3.78541 Liters"},
        { initNum: 1, initUnit: "l", returnNum: "0.26417", returnUnit: "gal", string: "1 liters converts to 0.26417 gallons"},
        { initNum: 1, initUnit: "mi", returnNum: "1.60934", returnUnit: "km", string: "1 miles converts to 1.60934 kilometers"},
        { initNum: 1, initUnit: "km", returnNum: "0.62137", returnUnit: "mi", string: "1 kilometers converts to 0.62137 miles"},
        { initNum: 1, initUnit: "lbs", returnNum: "0.45359", returnUnit: "kg", string: "1 pounds converts to 0.45359 kilograms"},
        { initNum: 1, initUnit: "kg", returnNum: "2.20462", returnUnit: "lbs", string: "1 kilograms converts to 2.20462 pounds"},
      ];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      let input = [5, 'gal'];
      let expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      let input = [5, 'l'];
      let expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0], input[1]),expected,0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      let input = [5, 'mi'];
      let expected = 8.04670;
      assert.approximately(convertHandler.convert(input[0], input[1]),expected,0.1);
      done();
    });
    
    test('Km to Mi', function(done) {
      let input = [5, 'km'];
      let expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0], input[1]),expected,0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      let input = [5, 'lbs'];
      let expected = 2.26796;
      assert.approximately(convertHandler.convert(input[0], input[1]),expected,0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      let input = [5, 'kg'];
      let expected = 11.02312;
      assert.approximately(convertHandler.convert(input[0], input[1]),expected,0.1);
      done();
    });
    
  });

});