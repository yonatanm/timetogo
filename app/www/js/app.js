// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform, $http, $rootScope) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }




      document.addEventListener('deviceready', function  () {
          $rootScope.counter = 0;
          // Android customization
          console.log("device is ready");
          cordova.plugins.backgroundMode.setDefaults({ text:'Doing heavy tasks.'});
          // Enable background mode
          cordova.plugins.backgroundMode.enable();

          // Called when background mode has been activated
          cordova.plugins.backgroundMode.onactivate = function () {
              console.log("onActivate");
          }

          setInterval(function () {

              //console.log("after 5sec..");
              $rootScope.counter = $rootScope.counter+1 ;


              //$http.get("https://www.waze.com/il-RoutingManager/routingRequest?to=x%3A34.99047239259299+y%3A32.64564167035331+bd%3Atrue&from=x%3A34.86289375647834+y%3A32.28078826204528+bd%3Atrue+s%3A37001+st_id%3A12604&returnJSON=true&at=0&callback=JSON_CALLBACK")
              $http.get("http://192.168.1.101:8000/time.json")
                  .then(function (data) {
                      console.log("OK: "+JSON.stringify(data.data.time));
                      $rootScope.time = data.data.time;
                  }, function () {
                      console.log("FAIL: arguments "+JSON.stringify(arguments))
                      $rootScope.time = "error";
                  });





              //// Modify the currently displayed notification
              //cordova.plugins.backgroundMode.configure({
              //    text:'Running in background for more than 5s now.'
              //});

          }, 60000);


      }, false);

  });


})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  // Each tab has its own nav history stack:

  .state('tab.dash', {
    url: '/dash',
    views: {
      'tab-dash': {
        templateUrl: 'templates/tab-dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.friends', {
      url: '/friends',
      views: {
        'tab-friends': {
          templateUrl: 'templates/tab-friends.html',
          controller: 'FriendsCtrl'
        }
      }
    })
    .state('tab.friend-detail', {
      url: '/friend/:friendId',
      views: {
        'tab-friends': {
          templateUrl: 'templates/friend-detail.html',
          controller: 'FriendDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });


  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');



});
