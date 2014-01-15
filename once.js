/**
 * angular-once - one time bindings for AngularJS
 * @version v0.1.5 - 2013-12-11
 * @link https://github.com/tadeuszwojcik/angular-once
 * @author Tadeusz Wójcik <tadeuszwojcik@gmail.com>
 * @license WTFPL License, https://github.com/tadeuszwojcik/angular-once/blob/master/LICENSE.txt
 */

(function (window, angular, undefined) {
  'use strict';

  function setOneTimeBinding($scope, element, attrs, bindingAttr, done) {
    var bindingValue = $scope.$eval(attrs[bindingAttr]);
    var canBeBoundImmediately = (attrs.onceWaitFor ? $scope.$eval(attrs.onceWaitFor) : bindingValue) !== undefined;
    if (canBeBoundImmediately) return done(element, bindingValue);

    var thingToWatch = attrs.onceWaitFor || attrs[bindingAttr];


    var watcherRemover = $scope.$watch(thingToWatch, function (newValue) {
      if (newValue == undefined) return;
      removeWatcher();

      return setOneTimeBinding($scope, element, attrs, bindingAttr, done);
    });

    function removeWatcher() {
      if (watcherRemover) {
        watcherRemover();
      }
    }

    $scope.$on("$destroy", removeWatcher);
  }

  var once = angular.module('once', []);

  function makeBindingDirective(definition) {
    once.directive(definition.name, function () {
      return function ($scope, element, attrs) {
        setOneTimeBinding($scope, element, attrs, definition.name, definition.binding);
      };
    });
  }

  var bindingsDefinitions = [
    {
      name: 'onceText',
      binding: function (element, value) {
        element.text(value);
      }
    },
    {
      name: 'onceHtml',
      binding: function (element, value) {
        element.html(value);
      }
    },
    {
      name: 'onceSrc',
      binding: function (element, value) {
        element.attr('src', value);
      }
    },
    {
      name: 'onceHref',
      binding: function (element, value) {
        element.attr('href', value);
      }
    },
    {
      name: 'onceTitle',
      binding: function (element, value) {
        element.attr('title', value);
      }
    },
    {
      name: 'onceAlt',
      binding: function (element, value) {
        element.attr('alt', value);
      }
    },
    {
      name: 'onceId',
      binding: function (element, value) {
        element.attr('id', value);
      }
    },
    {
      name: 'onceIf',
      binding: function (element, value) {
        if (!value) {
          element.remove();
        }
      }
    },
    {
      name: 'onceClass',
      binding: function (element, value) {
        if (angular.isObject(value) && !angular.isArray(value)) {
          var results = [];
          angular.forEach(value, function (val, index) {
            if (val) results.push(index);
          });
          value = results;
        }
        if (value) {
          element.addClass(angular.isArray(value) ? value.join(' ') : value);
        }
      }
    },
    {
      name: 'onceStyle',
      binding: function (element, value) {
        element.css(value);
      }
    },
    {
      name: 'onceShow',
      binding: function (element, value) {
        if (value) {
          element.css('display', '');
        } else {
          element.css('display', 'none');
        }
      }
    },
    {
      name: 'onceHide',
      binding: function (element, value) {
        if (value) {
          element.css('display', 'none');
        } else {
          element.css('display', '');
        }
      }
    }
  ];

  angular.forEach(bindingsDefinitions, makeBindingDirective);

  once.directive('once', function () {

    return function ($scope, element, attrs) {
      angular.forEach(attrs, function (attr, attrName) {

        if (!/^onceAttr[A-Z]/.test(attrName)) return;
        var bind = function (element, value) {
		  var dashedName = attrName.replace(/[A-Z]/g, function(match) { return '-'+match.toLowerCase(); });
          var name = dashedName.substr(10);
		  
          element.attr(name, value);
        }

        setOneTimeBinding($scope, element, attrs, attrName, bind);
      });
    };
  });

})(window, window.angular);
