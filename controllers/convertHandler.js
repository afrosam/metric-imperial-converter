/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {
  
  this.getNum = function(input) {
    // establish function variables
    var regex = /[\d\/.]+(?=\w+)/g;
    var result;
    let emptyInp = ['l', 'mi', 'kg', 'lbs', 'gal', 'km'];
    // check is input starts with a letter instead of a digit
    if (isNaN(input[0])) {
      // if so, test if FULL input is within list of predefined units.
      let x = input.toLowerCase();
      if (emptyInp.indexOf(x) != -1) {
        // number input is empty but contains proper unit and should default to 1
        result = 1;
        // otherwise the input is invalid :\
      } else if (emptyInp.indexOf(x) == -1) {
        result = 'invalid number'
      }
    // and finally, if the input is not invalid or should be defaulted to 1 then parse it with regex;
    } else {
        result = input.match(regex)[0];
        // input contains fraction?
        if (result.includes('/')) {
          // convert input to array and get count of numbers seperated by '/'s.
          var resSplit = result.split('/');
          // no double fractions mang. you're outta here.
          if (resSplit.length > 2) {
            result = 'invalid number';
          // otherwise, we cool. settle the fraction for the double followed by parsefloat.
          } else {
            result = resSplit[0] / resSplit[1];
          }
        };
      }
    
    parseFloat(result);
    
    return result;
  };
  
  this.getUnit = function(input) {
    var regex = /[^\d\/.]+/g;
    var result;
    if (input == '') { console.log('no input given.'); return }
    // number given but no unit =\
    if (input.match(regex) == null) {
      result = 'invalid unit';
      console.log(result);
      return
    } else {
      result = input.slice(-3).match(regex).toString().toLowerCase()
      var validUnits = ['km', 'kg', 'gal', 'lbs', 'l', 'mi'];
      if (validUnits.indexOf(result) == -1) { result = 'invalid unit' }
    }
    
    //console.log("the unit val is: " + result);
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    var result;
    switch(initUnit) {
      case('km'):
        result = 'mi';
        break;
      case('mi'):
        result = 'km';
        break;
      case('gal'):
        result = 'L';
        break;
      // lowercase l since I .toLowerCase() it previously
      case('l'):
        result = 'gal';
        break;
      case('lbs'):
        result = 'kg';
        break;
      case('kg'):
        result = 'lbs';
        break;
    }    
    //console.log("the return unit val is: " + result);
    return result;
  };
//EXAMPLE RETURN
//{initNum: 3.1, initUnit: 'mi', returnNum: 5.0000008, returnUnit: 'km', string: '3.1 miles converts to 5.00002 kilometers'}
  this.spellOutUnit = function(initNum, initUnit, returnNum, returnUnit, getString) {
    var result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: getString
    };
    //console.log(result);
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let floatNum = parseFloat(initNum);
    var result;
    console.log(initUnit);
    
    // invalid num checker;
    if (initNum == 'invalid number') {
      result = 'invalid number';
      return result
    } else if (initUnit == 'invalid unit' || initUnit == undefined) {
      result = 'invalid unit';
      return result
    } else if (initUnit == 'invalid unit' && initNum == 'invalid number') {
      result = 'invalid number and unit';
      return result;
    } else {
    
    // define functions for multiplication and division
    function imperial(val, unitType) {
       // find the unitType to figure out what value to multiply
      // **********
      // set Metric to w/e the proper metric is
      var Metric;
      if (unitType == 'gal') { Metric = galToL };
      if (unitType == 'lbs') { Metric = lbsToKg };
      if (unitType == 'mi') { Metric = miToKm };
      
      var converted = val * Metric;
      return converted;
    }
    function metric(val, unitType) {
      // same as above but backwards
      var Imperial;
      if (unitType == 'l') { Imperial = galToL };
      if (unitType == 'kg') { Imperial = lbsToKg };
      if (unitType == 'km') { Imperial = miToKm };
      
      var converted = val / Imperial;
      return converted;
    }
    
    if (initUnit == 'gal' || initUnit == 'lbs' || initUnit == 'mi') {
       result = imperial(floatNum, initUnit)
    } else if (initUnit == 'l' || initUnit == 'kg' || initUnit == 'km') {
       result = metric(floatNum, initUnit)
    }
    result = result.toFixed(5);
    //console.log("the converted val is: " + result);
    return result;
   };
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    
    switch(initUnit) {
        case('mi'):
          initUnit = ' miles'
          break;
        case('l'):
          initUnit = ' liters'
          break;
        case('kg'):
          initUnit = ' kilograms'
          break;
        case('km'):
          initUnit = ' kilometers'
          break;
        case('gal'):
          initUnit = ' gallons'
          break;
        case('lbs'):
          initUnit = ' pounds'
          break;
    }
    
    switch(returnUnit) {
        case('L'):
          returnUnit = ' liters';
          break;
        case('kg'):
          returnUnit = ' kilograms';
          break;
        case('km'):
          returnUnit = ' kilometers';
          break;
        case('lbs'):
          returnUnit = ' pounds';
          break;
        case('mi'):
          returnUnit = ' miles';
          break;
        case('gal'):
          returnUnit = ' gallons';
          break;
    }
    
    var result = initNum + initUnit + " converts to " + returnNum + returnUnit;
    return result;
  };
  
}

module.exports = ConvertHandler;
