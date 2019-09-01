// Dom7
var $$ = Dom7;

// Framework7 App main instance
var app = new Framework7({
  root: '#app', // App root element
  id: 'io.framework7.testapp', // App bundle ID
  name: 'Framework7', // App name
  theme: 'auto', // Automatic theme detection
  // App root data
  data: function () {
    return {
      user: {
        firstName: 'John',
        lastName: 'Doe',
      },
    };
  },
  // App root methods
  methods: {
    helloWorld: function () {
      app.dialog.alert('Hello World!');
    },
  },
  dialog: {
    title: 'Stayco',
  },
  // App routes
  routes: routes,
});

// Init/Create main view
var mainView = app.views.create('.view-main', {
  url: '/',
  domCache: true //enable inline pages
});

var searchbar = app.searchbar.create({
  el: '.searchbar',
  on: {
    enable: function () {
      console.log('Searchbar enabled')
    }
  }
})
var smartSelect = app.smartSelect.create({
  on: {
    opened: function () {
      console.log('Smart select opened')
    }
  }
})

// Login Screen Demo
$('#my-login-screen .login-button').on('click', function () {
  username = $('#my-login-screen [name="username"]').val();
  password = $('#my-login-screen [name="password"]').val();

  $.ajax({
    type: "post",
    url: "http://localhost/backend-community/restapi/login",
    data: {
      login_username: username,
      login_password: password
    },
    dataType: 'json',
    success: function (data) {
      if (data.auth_message == 'success') {

          localStorage.setItem("LoginFlag", true);
          localStorage.setItem("Session_data", JSON.stringify(data.login_data) );
          
          mainView.router.load({
            url: './pages/home.html',
          });
      } else {
        app.dialog.alert('username or password wrong');
      }
    },
    error: function () {
      app.dialog.alert('error occured');
    }
  });

});

$$(document).on('page:init', '.page[data-name="home"]', function (e) {

  session_data = JSON.parse( localStorage.getItem("Session_data") );
  $("p.greetings").text("Hello, " + session_data['first_name'] + ' ' + session_data['last_name']);

  // logout
  $('.button-logout-data').on('click', function (e) {
    e.preventDefault();
    localStorage.removeItem('LoginFlag');
    localStorage.removeItem('Session_data');

    // app.dialog.alert("You are now logged out.");
    mainView.router.load({
      url:'./index.html', 
      ignoreCache:true, 
      reload:true 
    })
  });

});

$$(document).on('page:init', '.page[data-name="profile"]', function (e) {

  session_data = JSON.parse( localStorage.getItem("Session_data") );
  
  $('.pageform-profile #profile_user_id').val( session_data.id );
  $('.pageform-profile #profile_name').val( session_data.first_name + ' ' + session_data.last_name );
  $('.pageform-profile #profile_email').val( session_data.email );
  $('.pageform-profile #profile_hp').val( session_data.hp );
  $('.pageform-profile #profile_no_ktp').val( session_data.no_ktp );
  $('.pageform-profile #profile_jenis_kelamin').val( session_data.jenis_kelamin );
  $('.pageform-profile #profile_tanggal_lahir').val( session_data.tanggal_lahir );
  $('.pageform-profile #profile_perusahaan').val( session_data.perusahaan );
  $('.pageform-profile #profile_bidang_usaha').val( session_data.bidang_usaha );

  $('.button-save-profile').on('click', function () {

    // Api edit profile
    $.ajax({
      type: "post",
      url: "http://localhost/backend-community/restapi/editprofile",
      data: {
        user_id: $('.pageform-profile #profile_user_id').val(),
        name: $('.pageform-profile #profile_name').val(),
        email: $('.pageform-profile #profile_email').val(),
        hp: $('.pageform-profile #profile_hp').val(),
        no_ktp: $('.pageform-profile #profile_no_ktp').val(),
        jenis_kelamin: $('.pageform-profile #profile_jenis_kelamin').val(),
        tanggal_lahir: $('.pageform-profile #profile_tanggal_lahir').val(),
        perusahaan: $('.pageform-profile #profile_perusahaan').val(),
        bidang_usaha: $('.pageform-profile #profile_bidang_usaha').val(),
      },
      dataType: 'json',
      success: function (data) {
        if (data.auth_message == 'success') {
            app.dialog.alert('Edit Profile Done');   

            view.router.navigate(view.router.currentRoute.url, {
              ignoreCache: true,
              reloadCurrent: true
            });
        }
      },
      error: function () {
        app.dialog.alert('error occured');
      }
    });

  });

});

$$(document).on('page:init', '.page[data-name="marketanda"]', function (e) {

  var users_id;
  session_data = JSON.parse( localStorage.getItem("Session_data") );
  users_id = session_data.id;
  var placemarket = $('.list.media-list.no-margin');
  
  showMarketbyUser();

   function showMarketbyUser() {
    $.ajax({
      type: "post",
      url: "http://localhost/backend-community/restapi/showmarketby",
      cache: false,
      data: {
        user_id: users_id,
      },
      dataType: 'json',
      success: function (data) {
        if (data.auth_message == 'success') {
            $(placemarket).html(data.data);
        } else {
          app.dialog.alert('username or password wrong');
        }
      },
      error: function () {
        app.dialog.alert('error occured');
      }
    });
  }

});

$$(document).on('page:init', '.page[data-name="tambahmarket"]', function (e) {

  session_data = JSON.parse( localStorage.getItem("Session_data") );

  $('#my-form-market [name="user_post_id"]').val( session_data.id );

  $('.submit-form-to-data').on('click', function(){
    var formData = app.form.convertToData('#my-form-market');

    $.ajax({
        type: "post",
        url: "http://localhost/backend-community/restapi/saveMarket",
        // data: JSON.stringify(formData),
        data: (formData),
        dataType: 'json',
        success: function (data) {
          if (data.auth_message == 'success') {
              app.dialog.alert('Market Success Input');   

              setTimeout(function(){ 
               mainView.router.load({
                  url: './pages/marketanda.html',
                });
              }, 2000);
          }
        },
        error: function () {
          app.dialog.alert('error occured');
        }
      });
  });

});

$$(document).on('page:init', '.page[data-name="penawaran"]', function (e) {
  
  $('.btn-deal').on('click', function(){
    app.dialog.alert('penawaran berhasil');
  })

});

$$(document).on('page:init', '.page[data-name="market"]', function (e) {

  var users_id;
  session_data = JSON.parse( localStorage.getItem("Session_data") );
  users_id = session_data.id;
  var placemarket = $('.list.media-list.lists_of_market');
  
  showMarket();

   function showMarket() {
    $.ajax({
      type: "post",
      url: "http://localhost/backend-community/restapi/showmarket",
      cache: false,
      dataType: 'json',
      success: function (data) {
        if (data.auth_message == 'success') {
            $(placemarket).html(data.data);
        } else {
          app.dialog.alert('username or password wrong');
        }
      },
      error: function () {
        app.dialog.alert('error occured');
      }
    });
  }

});


// app.on('pageInit', function (page) {
//   if (page.name === 'index') {
//     localStorage.getItem('LoginFlag').then(function(value) {
//         // This code runs once the value has been loaded
//         // from the offline store.
//         if(!value){
//           mainView.router.load({
//             url: './index.html',
//           });
//         }else{
//           mainView.router.load({
//             url: './pages/home.html',
//           });
//         }
//     }).catch(function(err) {
//         console.log(err);
//     });
//   }
// });