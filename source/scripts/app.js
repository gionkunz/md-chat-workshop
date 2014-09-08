(function (window, $, undefined) {
  'use strict';

  // Our main application module
  angular.module('chatApp', ['firebase'])
    // Store firebase base URL in constant
    .constant('chatDbUrl', 'https://oddeven-mdchat.firebaseio.com/')

    .factory('chatService', function ($firebase, $rootScope, chatDbUrl) {
      var chatRef,
        connected = false;

      // Login service function
      function login() {
        chatRef = new window.Firebase(chatDbUrl + 'chat');
        var firebase = $firebase(chatRef, $rootScope, 'chat');
        firebase.$bind($rootScope, 'chat');
        connected = true;
        $rootScope.$broadcast('connected');
      }

      // Logout function that disconnects all firebase connections and updates the internal state
      function logout() {
        connected = false;
        $rootScope.$broadcast('disconnected');
      }

      function isLoggedIn() {
        return connected;
      }

      return {
        login: login,
        logout: logout,
        isLoggedIn: isLoggedIn
      };
    })

    .controller('ChatCtrl', function ($scope, chatService) {
      // Initialize controller variables
      $scope.messageText = '';
      $scope.credentials = {
        userName: '',
        email: ''
      };

      // Controller login and logout function
      $scope.login = function () {
        chatService.login($scope.credentials);
      };
      $scope.logout = function () {
        // Close any offcanvas first
        $('.off-canvas-wrap').removeClass('move-right');
        chatService.logout();
      };

      // isLoggedIn handling by observing the connected and disconnected events from chatService
      $scope.isLoggedIn = false;
      $scope.$on('connected', function () {
        $scope.isLoggedIn = true;
      });
      $scope.$on('disconnected', function () {
        $scope.isLoggedIn = false;
      });

      // Sending a message
      $scope.sendMessage = function () {
        // If there are no messages yet, we create the messages array
        $scope.chat.messages = $scope.chat.messages || [];

        $scope.chat.messages.push(
          {
            user: $scope.credentials,
            text: $scope.messageText,
            time: new Date()
          }
        );
        // Reset our message value that we use in the input binding
        $scope.messageText = '';
      };
    });

}(window, jQuery));
