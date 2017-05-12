'use strict';

describe('Controller: select group', function () {

  beforeEach(module('Group'));

  var controller;
  var scope;

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();
    controller = $controller('group', { $scope: scope });
  }));

  describe('On instance', function () {
    it('should set "controller_loaded" variable in scope', function () {
      expect(scope.controller_loaded).toContain('loaded');
    });

    it('should be able to multiply" variable in scope', function () {
      var response  = scope.multiply([4,5,6]);
      expect(response).toBe(4*5*6);

      var response  = scope.multiply([0]);
      expect(response).toBe(0);
    });
    
    iit('kata: count', function(){
      var arg = [[1000, 2000]];
      var result = scope.count(arg);
      expect(result).toEqual({1000: 1, 2000: 1});
      arg = [
        [100, 2000],
      ];
      result = scope.count(arg);
      expect(result).toBe(-1);
      arg = [
        [1000, 200],
      ];
      result = scope.count(arg);
      expect(result).toBe(-2);
    });

    iit('kata: handle errors', function(){
      var result;
      //First employee num incorrect
      var err1 = [
        [4000, 2011]
      ];
      result = scope.kata(err1);
      expect(result).toBe(-1);
      
      //Second employee num incorrect
      var err2 = [
        [1004, 300]
      ];
      result = scope.kata(err2);
      expect(result).toBe(-2);
    });
    iit('kata: real cases', function(){
      var result;
      var groups = [
        [1009, 2011],
        [1017, 2011]
      ];
      result = scope.kata(groups);
      expect(result).toEqual([2011]);

      var groups2 = [
        [1009, 2000],
        [1009, 2001],
        [1002, 2002],
        [1003, 2002]
      ];
      result = scope.kata(groups2);
      expect(result).toEqual([1009, 2002]);

      var groups3 = [
        [1002, 2008],
        [1006, 2008],
        [1002, 2008],
        [1002, 2080]
      ];
      result = scope.kata(groups3);
      expect(result).toEqual([2008 ,1002]);
    });
  });

  describe('when going to /group', function () {

    var route, location, rootScope, httpBackend;

    beforeEach(inject(function ($route, $location, $rootScope, $httpBackend) {
      route = $route;
      location = $location;
      rootScope = $rootScope;
      httpBackend = $httpBackend;

      httpBackend.when('GET', 'scripts/group/views/group.html').respond('<div></div>');
    }));

    afterEach(function () {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('should use minesweeper.html and controller', function () {
      expect(route.current).toBeUndefined();

      location.path('/group');

      httpBackend.flush();

      expect(route.current.templateUrl).toBe('scripts/group/views/group.html');
      expect(route.current.controller).toBe('group');
    });
  });

});
