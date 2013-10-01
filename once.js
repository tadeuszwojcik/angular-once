/**
 * angular-once - one time bindings for AngularJS
 * @version v0.1.0 - 2013-10-01
 * @link https://github.com/tadeuszwojcik/angular-once
 * @author Tadeusz Wójcik <tadeuszwojcik@gmail.com>
 * @license WTFPL License, https://github.com/tadeuszwojcik/angular-once/blob/master/LICENSE.txt
 */

(function(window, angular, undefined) {
  'use strict';

  function setOneTimeBinding($scope, element, thingToWatch, done) {
    var value = $scope.$eval(thingToWatch);

    if (value !== undefined) return done(element, value);

    var watcherRemover = $scope.$watch(thingToWatch, function(newValue) {
      if (newValue == undefined) return;

      removeWatcher();
      return done(element, newValue);
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
    once.directive(definition.name, function() {
      return function($scope, element, attrs) {
        setOneTimeBinding($scope, element, attrs[definition.name], definition.binding);
      };
    });
  }

  var bindingsDefinitions = [
    {
      name: 'onceText',
      binding: function(element, value) {
        element.text(value);
      }
    },
    {
      name: 'onceHtml',
      binding: function(element, value) {
        element.html(value);
      }
    },
    {
      name: 'onceSrc',
      binding: function(element, value) {
        element.attr('src', value);
      }
    },
    {
      name: 'onceHref',
      binding: function(element, value) {
        element.attr('href', value);
      }
    },
    {
      name: 'onceTitle',
      binding: function(element, value) {
        element.attr('title', value);
      }
    },
    {
      name: 'onceAlt',
      binding: function(element, value) {
        element.attr('alt', value);
      }
    },
    {
      name: 'onceId',
      binding: function(element, value) {
        element.attr('id', value);
      }
    },
    {
      name: 'onceIf',
      binding: function(element, value) {
        if (value) {
          element.replaceWith(element.children());

        } else {
          element.replaceWith(' ');
        }
      }
    },
    {
      name: 'onceClass',
      binding: function(element, value) {
        if (angular.isObject(value) && !angular.isArray(value)) {
          var results = [];
          angular.forEach(value, function(val, index) {
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
      binding: function(element, value) {
        element.css(value);
      }
    },
    {
      name: 'onceShow',
      binding: function(element, value) {
        if (value) {
          element.css('display', '');
        } else {
          element.css('display', 'none');
        }
      }
    },
    {
      name: 'onceHide',
      binding: function(element, value) {
        if (value) {
          element.css('display', 'none');
        } else {
          element.css('display', '');
        }
      }
    }
  ];

  bindingsDefinitions.forEach(makeBindingDirective);
  
})(window, window.angular);