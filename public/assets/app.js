angular.module('App', ['ngRoute', 'ngResource'])
	.config(function($routeProvider, $locationProvider){
		$routeProvider
			.when('/', {
				action: 'home',
				controller: 'Home',
				templateUrl: 'templates/home.html'
			})
			.when('/contact', {
				action: 'contact',
				controller: 'Contact',
				templateUrl: 'templates/contact.html'
			})
			.when('/login', {
				action: 'login',
				controller: 'Login',
				templateUrl: 'templates/login.html'
			})
			.when('/signup', {
				action: 'signup',
				controller: 'Signup',
				templateUrl: 'templates/signup.html'
			})
			.when('/account', {
				action: 'account',
				controller: 'Account',
				templateUrl: 'templates/account.html'
			})
			.when('/forgot', {
				action: 'forgot',
				controller: 'Forgot',
				templateUrl: 'templates/forgot.html'
			})
			.otherwise({
				redirectTo: '/'
			});

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});
	})

	.run(function($rootScope, $location, $route, Auth) {
		$rootScope.$on('$routeChangeSuccess', function ($event, $currentRoute, $previousRoute) {
			$rootScope.route = $route.current.action;
		});
		$rootScope.title = function(title) {
			document.title = title ? title + ' | ' + 'Hackathon Starter' : 'Hackathon Starter';
		};

		// to specify a specific color, change random to something like RdYlBu or RdBu
		// see http://colorbrewer2.org/ and http://qrohlf.com/trianglify/ for more info
		var p = Trianglify({variance: '0.77', seed: null, x_colors: 'random', y_colors: 'match_x', cell_size: 30});
		$rootScope.triangles = p.svg({includeNamespace: true});
		$rootScope.triangles = '<svg style="-webkit-filter: brightness(.5) contrast(200%)" xmlns="http://www.w3.org/2000/svg" width="600" height="400">' + $rootScope.triangles.innerHTML + '</svg>';

		$rootScope.user = Auth.user();
	})

	.service('Auth', function($resource, User) {
		return {
			user: function() {
				return User.get();
			}
		};
	})

	.service('User', function($resource) {
		 return $resource('/api/user', {}, {
			'get': { 'method': 'GET', params : {}},
			'save': { 'method': 'POST', params : {}}
		});
	})

	.controller('Home', function ($rootScope) {
		$rootScope.title();
		$('.splash').css('background-image', 'url(\'data:image/svg+xml;utf8,'+$rootScope.triangles+'\')');
	})

	.controller('Contact', function ($rootScope) {
		$rootScope.title('Contact');
	})

	.controller('Account', function ($rootScope, $scope, User) {
		$rootScope.title('Account');
		$scope.save = function() {
			User.save($rootScope.user, function(user) {
				$rootScope.user = user;
			});
		};
	});


$(window).scroll(function() {
	if ($(document).scrollTop() > 100) {
		$('.navbar').addClass('shrink');
	} else {
		$('.navbar').removeClass('shrink');
	}
});
