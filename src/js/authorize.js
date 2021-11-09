/*

  Follow the instructions for "Calling the Spotify playlist API" in the README 

*/
const loginButton= document.querySelector("#login-button");

loginButton.addEventListener("click", ()=>{
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = 'http://localhost:8080/playlist.html';

  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(client_id);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);

  window.location.href = url;
  
});



