var successURL = 'https://www.facebook.com/connect/login_success.html';
function onFacebookLogin() {
  var ac=""
                if (!localStorage.accessToken) {
                    browser.tabs.query({},(tabs)=>{

                    // chrome.tabs.getAllInWindow(null, function(tabs) {
                        for (var i = 0; i < tabs.length; i++) {
                            if (tabs[i].url.indexOf(successURL) == 0) {
                                var params = tabs[i].url.split('#')[1];
																access = params.split('&')[0]
																acc=access.slice(13,)
                                console.log(acc);

                                localStorage.accessToken = acc;
                                if (localStorage.accessToken){
                                  ac=window.localStorage.getItem('accessToken');
                                  console.log("this is token",ac);
                                  data={
                                    "provider":"facebook",
                                    "access_token":`${ac}`
                                  }
                                  dat=JSON.stringify(data);
                                  console.log(dat);

                                  $.ajax({
                                	  type: "POST",
                                    contentType: "application/json",


                                	  url: "http://scrapsh.herokuapp.com/a/",
                                	  data: dat,
                                    error: function(e) {
                                    console.log(e);
                                    },
                                        success: function (msg) {
                                          utoken=msg.token
                                          localStorage.token=utoken
                                          console.log(localStorage.token)
                                        }

                                	});


                                }



                                // browser.tabs.onUpdated.removeListener(onFacebookLogin);
                                return;
                            }
                        }
                    });
                }
            }
            browser.tabs.onUpdated.addListener(onFacebookLogin);
            // chrome.tabs.onUpdated.addListener(onFacebookLogin);



function doPost(data, cb, cbr,tok)
{
  tok=window.localStorage.getItem('token');

  console.log("JWT " + tok)
  $.ajax({
    type: "POST",
    contentType: 'application/json; charset=utf-8',
    dataType: "json",
    beforeSend: function(request) {
      request.setRequestHeader("Authorization", "JWT " + tok );
      //request.setRequestHeader("Accept", "application/json");
      // request.setRequestHeader("csrfmiddlewaretoken", "application/json");

      // csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val()
    },


    url: "http://scrapsh.herokuapp.com/api/post/",
    data: JSON.stringify(data),

    success: cb,
    error: function(xhr){
      cbr(JSON.parse(xhr.responseText));
      // if (!tok){
      //   cbr("signin");
      // }

    }
  });
}




// var successURL = 'https://www.facebook.com/connect/login_success.html';
// function onFacebookLogin() {
//   var ac=""
//                 if (!localStorage.accessToken) {
//                   browser.tabs.query({},(tabs)=>{
//                     console.log(tabs);
//                     // chrome.tabs.getAllInWindow(null, function(tabs) {
//                         for (var i = 0; i < tabs.length; i++) {
//
//                             if (tabs[i].url.indexOf(successURL) == 0) {
//                                 var params = tabs[i].url.split('#')[1];
// 																access = params.split('&')[0]
// 																acc=access.slice(13,)
//                                 console.log(acc);
//
//                                 localStorage.accessToken = acc;
//                                 if (localStorage.accessToken){
//                                   ac=window.localStorage.getItem('accessToken');
//                                   console.log("this is token",ac);
//                                   data={
//                                     "provider":"facebook",
//                                     "access_token":`${ac}`
//                                   }
//                                   dat=JSON.stringify(data);
//                                   console.log(dat);
//
//                                   var request = new XMLHttpRequest();
//                                   request.open("POST", "http://scrapsh.herokuapp.com/a/");
//                                   request.setRequestHeader("Content-Type", "application/json");
//                                   request.overrideMimeType("text/plain");
//                                   request.onload = function()
//                                   {
//                                     alert("Response received: " + request.responseText);
//                                     // alert("data":dat)
//                                   };
//                                   request.send(dat);
//                                   // handleSubmit(e) {
//                                    // e.preventDefault();
//                                   // $.ajax({
//                                 	//   type: "POST",
//                                   //   async: true,
//                                   //
//                                   //   // async:'true',
//                                   //   contentType: "application/json",
//                                 	//   url: "http://scrapsh.herokuapp.com/a/",
//                                 	//   data: dat,
//                                   //   error: function(e) {
//                                   //   console.log(e);
//                                   //   },
//                                   //       success: function (msg) {
//                                   //         utoken=msg.token
//                                   //         localStorage.token=utoken
//                                   //         console.log(localStorage.token)
//                                   //       }
//                                   //     // }
//                                   //
//                                 	// });
//                                 }
//
//                                 }
//
//
//
//                                 // chrome.tabs.onUpdated.removeListener(onFacebookLogin);
//                                 return;
//                             }
//                         }
//                     });
//                 }
//             }
//             chrome.tabs.onUpdated.addListener(onFacebookLogin);
//
//
//
// function doPost(data, cb, cbr,tok)
// {
//   tok=window.localStorage.getItem('token');
//
//   console.log("JWT " + tok)
// 	$.ajax({
// 	  type: "POST",
// 	  beforeSend: function(request) {
// 	    request.setRequestHeader("Authorization", "JWT " + tok );
// 	    request.setRequestHeader("Accept", "application/json");
//
// 	  },
//
//
// 	  url: "http://scrapsh.herokuapp.com/api/post/",
// 	  data: data,
//
// 	  success: cb,
// 	  error: function(xhr){
// 	  	cbr(JSON.parse(xhr.responseText));
//
// 	  }
// 	});
// }
