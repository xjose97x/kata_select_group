'use strict';

angular.module('Group')
    .controller('group', function($scope) {

        $scope.controller_loaded = 'Group loaded!';
        /**
         * Returns the result of the multiplication of the array.
         * @param {Array<Number>} nums
         * @return {Number} The result.
         */
        $scope.multiply = function(nums) {
            var result = 1;
            nums.forEach(function(num) {
                result *= num;
            });
            return result;
        };

        /**
         * Returns whether there's an error or not.
         * 
         * @param {Array<Number>} value Current Value
         * @return {Number} The error number.
         */
        function checkErrors(value) {
            if (!(value[0] >= 1000 && value[0] <= 1999)) {
                return -1;
            } else if (!(value[1] >= 2000 && value[1] <= 2999)) {
                return -2;
            }
            return 0;
        }
        /**
         * Counts how many elements are
         * @param {Array<Array<Number>>} arg
         * @return {Object} result
         */
        $scope.count = function(arg) {
            var repeatedValues = {},
                error;
            var result = arg.map(function(value) {
                error = checkErrors(value);
                if (error < 0) {
                    return error;
                }
                value.map(function(currVal) {
                    //Handling
                    if (repeatedValues[currVal] >= 0) {
                        repeatedValues[currVal]++;
                    } else {
                        repeatedValues[currVal] = 1;
                    }
                });
                return repeatedValues;
            });
            return result[0];
        };
        /**
         * Handles kata main functionality
         */
        $scope.kata = function(arg) {
            //Count
            var repeatedValues = $scope.count(arg);
            //Error
            if (repeatedValues < 0) {
                return repeatedValues;
            }
            var result = [];
            //Select 1 per team;
            arg.map(function(value) {
                var first = value[0],
                    second = value[1],
                    firstItem = repeatedValues[first],
                    secondItem = repeatedValues[second];
                if (firstItem > secondItem) {
                    if (result.indexOf(first) === -1) {
                        result.push(first);
                    }
                } else if (result.indexOf(second) === -1) {
                    result.push(second);
                }
            });
            return result;
        };

        $scope.employee = {
            //For ng-model to work it needs to be an array of objects          
            groups: [
                { 'first': '', 'second': '' }
            ],
            add: function() {
                this.groups.push({ 'first': '', 'second': '' });
            },
            remove: function(index) {
                this.groups.splice(index, 1);
            },
            process: function() {
                var result = [];
                this.groups.map(function(elem) {
                    result.push([elem.first, elem.second]);
                });
                $scope.result = $scope.kata(result);
            }
        };

    })
    .config(function($routeProvider) {
        $routeProvider
            .when('/group', {
                templateUrl: 'scripts/group/views/group.html',
                controller: 'group'
            });
    });