angular.module('app')
    .config(function($stateProvider, $urlRouterProvider, AccessLevels) {
        $stateProvider
            .state('anon', {
                abstract: true,
                data: {
                    access: AccessLevels.anon
                },
                views: {
                    'navbar@': {
                        templateUrl: 'anon/navbar.html',
                        controller: 'NavbarController'
                    }
                }
            })
            .state('anon.login', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'anon/login.html',
                        controller: 'LoginController'
                    }
                }
            })
            .state('anon.register', {
                url: '/register',
                views: {
                    'content@': {
                        templateUrl: 'anon/register.html',
                        controller: 'RegisterController'
                    }
                }
            });
        $stateProvider
            .state('user', {
                abstract: true,
                url: '/user',
                views: {
                    'navbar@': {
                        templateUrl: 'user/navbar.html',
                        controller: 'NavbarController'
                    }
                },
                data: {
                    access: AccessLevels.user
                }
            })
            .state('user.home', {
                url: '/',
                views: {
                    'content@': {
                        templateUrl: 'user/main.html',
                        controller: 'MainController'
                    }
                }
            })

            .state('user.rank', {
                url: '/rank',
                views: {
                    'content@': {
                        templateUrl: 'user/rank.html',
                        controller: 'RankController'
                    }
                }
            })
            .state('user.dashboard', {
                url: '/dashboard',
                views: {
                    'content@': {
                        templateUrl: 'user/dashboard.html',
                        controller: 'DashboardController'
                    }
                }
            })
            .state('user.profile', {
                url: '/profile',
                views: {
                    'content@': {
                        templateUrl: 'user/profile.html',
                        controller: 'ProfileController'
                    }
                }
            })
            .state('user.search', {
                url: '/search/:query',
                views: {
                    'content@': {
                        templateUrl: 'user/search.html',
                        controller: 'SearchController'
                    }
                }
            })
            .state('user.history', {
                url: '/history',
                views: {
                    'content@': {
                        templateUrl: 'user/history.html',
                        controller: 'HistoryController'
                    }
                }
            });
        $urlRouterProvider.otherwise('/');
    });
