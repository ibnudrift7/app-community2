routes = [{
    path: '/',
    url: './index.html',
  },
  {
    path: '/info/',
    url: './pages/info.html',
  },
  {
    path: '/home/',
    url: './pages/home.html',
  },
  {
    path: '/market/',
    url: './pages/market.html',
  },
  {
    path: '/alltransaction/',
    url: './pages/alltransaction.html',
  },
  {
    path: '/detail/',
    url: './pages/detail.html',
  },
  {
    path: '/event/',
    url: './pages/event.html',
  },
  {
    path: '/facility/',
    url: './pages/fasilitas.html',
  },
  {
    path: '/promo/',
    url: './pages/promo.html',
  },
  {
    path: '/penawaran/',
    url: './pages/penawaran.html',
  },

  {
    path: '/profile/',
    url: './pages/profile.html',
  },


  {
    path: '/about/',
    url: './pages/about.html',
  },
  {
    path: '/form/',
    url: './pages/form.html',
  },
  // Page Loaders & Router
  {
    path: '/page-loader-template7/:user/:userId/:posts/:postId/',
    templateUrl: './pages/page-loader-template7.html',
  },
  {
    path: '/page-loader-component/:user/:userId/:posts/:postId/',
    componentUrl: './pages/page-loader-component.html',
  },
  {
    path: '/request-and-load/user/:userId/',
    async: function (routeTo, routeFrom, resolve, reject) {
      // Router instance
      var router = this;

      // App instance
      var app = router.app;

      // Show Preloader
      app.preloader.show();

      // User ID from request
      var userId = routeTo.params.userId;

      // Simulate Ajax Request
      setTimeout(function () {
        // We got user data from request
        var user = {
          firstName: 'Vladimir',
          lastName: 'Kharlampidi',
          about: 'Hello, i am creator of Framework7! Hope you like it!',
          links: [{
              title: 'Framework7 Website',
              url: 'http://framework7.io',
            },
            {
              title: 'Framework7 Forum',
              url: 'http://forum.framework7.io',
            },
          ]
        };
        // Hide Preloader
        app.preloader.hide();

        // Resolve route to load page
        resolve({
          componentUrl: './pages/request-and-load.html',
        }, {
          context: {
            user: user,
          }
        });
      }, 1000);
    },
  },
  // Default route (404 page). MUST BE THE LAST
  {
    path: '(.*)',
    url: './pages/404.html',
  },
];
