'use strict';

angular.module('Group')
.controller('group', function ($scope) {

  $scope.controller_loaded = 'Group loaded!';
  $scope.multiply = function(nums){
    var result = 1;
    for(var i = 0; i < nums.length; i++){
      result *= nums[i];
    }
    return result;
  };

  /**
   * Returns whether there's an error or not.
   * 
   * @param {Array<Number>} value Current Value
   * @return {Number} The error number.
   */
  function checkErrors(value){
    if(!(value[0] >= 1000 && value[0] <= 1999)){
      return -1;
    }
    else if(!(value[1] >= 2000 && value[1] <= 2999)){
      return -2;
    }
    return 0;
  }
  $scope.count = function(arg){
    var repeatedValues = {},
        error;
    var result = arg.map(function(value, index){
      error = checkErrors(value);
      if(error< 0){
        return error;
      }
      value.map(function(currVal, i){
        //Handling
        if(repeatedValues[currVal] >= 0){
          repeatedValues[currVal]++;
        }
        else{
          repeatedValues[currVal] = 1;
        }
      });
      return repeatedValues;
    });
    return result[0];
  }

  $scope.kata = function(arg){
    //Count
    var repeatedValues = $scope.count(arg);
    //Error
    if(repeatedValues < 0){
      return repeatedValues;
    }

    var result = [];
    
    //Select 1 per team;
    for(var i = 0; i < arg.length; i++){
      var first = arg[i][0],
          second = arg[i][1];
      var firstItem =repeatedValues[first],
          secondItem = repeatedValues[second]; 
      
      if(firstItem > secondItem){
        if(result.indexOf(first) == -1){          
          result.push(first);          
        }
      }
      else if(result.indexOf(second) == -1){
        result.push(second);
      }
    }
    return result;
  };
  
})
.config(function ($routeProvider) {
  $routeProvider
  .when('/group', {
    templateUrl: 'scripts/group/views/group.html',
    controller: 'group'
  });
});
