window.fbAsyncInit = function() {
  window.FB.init({
    appId: "35390834549",
    cookie: true, // enable cookies to allow the server to access // the session
    xfbml: true, // parse social plugins on this page
    version: "v2.7"
  });
};
(function(d, s, id) {
  var js,
    fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s);
  js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js";
  fjs.parentNode.insertBefore(js, fjs);
})(document, "script", "facebook-jssdk");
