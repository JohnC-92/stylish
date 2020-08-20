window.fbAsyncInit = function() {
  FB.init({
    appId: '2594196780898171',
    cookie: true,
    xfbml: true,
    version: 'v8.0',
  });
  FB.AppEvents.logPageView();
  // FB.getLoginStatus(function(response) {
  //   // statusChangeCallback(response);
  //   console.log(response);
  // });
};

/**
 * FaceBook SDK JS CODE
 */
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) {
    return;
  }
  js = d.createElement(s); js.id = id;
  js.src = 'https://connect.facebook.net/en_US/sdk.js';
  fjs.parentNode.insertBefore(js, fjs);
} (document, 'script', 'facebook-jssdk'));

/**
 * Check login status after clicking facebook button
 */
function checkLoginState() {
  FB.getLoginStatus(async function(response) {
    if (response.status === 'connected') {
      try {
        data = {
          provider: 'facebook',
          token: response.authResponse.accessToken,
        };
        await fetch('/user/signin', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((res) => {
          if (res.status === 403) {
            alert('Invalid User/Password!');
          }
          return res.json();
        }).then((res) => {
          console.log(res);
          getUser(res.data.user);
          alert(`Signed in Successful`);
          window.location.reload();
        });
      } catch (err) {
        console.log(err);
      }
    }
  });
}
