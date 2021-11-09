/*

  Follow the instructions for "Calling the Spotify playlist API" and
  "Rendering a playlist visualisation" in the README 

*/

function getAccessToken(){
  const hash = window.location.hash;
  const hashWithoutHash= hash.substring(1);
  
  const params = hashWithoutHash.split("&");
  const keyValues = params.map((param)=> param.split("="));
  
  const accessToken = keyValues[0][1];
  return accessToken;
}
// -H "Accept: application/json" -H "Content-Type: application/json" -H "Authorization: Bearer

function getPlaylist(playlistId){
 const url= `https://api.spotify.com/v1/playlists/${playlistId}`;
 const headers = {
   Accept:"application/json",
   "Content-Type": "application/json",
   Authorization: `Bearer ${getAccessToken()}`
 }; // all keys are strings but can be ignored apart from content-type because of the "-"

 return fetch(url, {headers}).then((response)=> response.json());
}

function renderPlaylist(playlistId){
  // <div class="playlist-item">
  //   <img class="playlist-item-img" src="IMG_URL" />
  //   <div class="playlist-item-title">SONG_TITLE</div>
  // </div>
  const container= document.querySelector("#tracks");
  const audioPlayer = document.querySelector("#player");

  getPlaylist(playlistId).then((playlist)=>{
    
    const tracks= playlist.tracks.items;

    for (let i = 0; i < tracks.length; i++) {
      const track= tracks[i].track;

      const playlistItem = document.createElement("div");
      playlistItem.classList.add("playlist-item");

      const playListItemImg = document.createElement("img");
      playListItemImg.classList.add("playlist-item-img");
      playListItemImg.setAttribute("src", track.album.images[0].url);

      const playListItemTitle= document.createElement("div");
      playListItemTitle.classList.add("playlist-item-title");
      playListItemTitle.innerHTML = track.name;

      playlistItem.addEventListener("click", () =>{
        if (currentlyActive === track.id){
          audioPlayer.pause();
          currentlyActive = null;
          playlistItem.classList.remove("active");
        } else {
          if(currentlyActive){
            document.querySelector(".active").classList.remove(".active");
          }
          currentlyActive = track.id;
          playlistItem.classList.add("active");

          //play preview if available
        if(track.preview_url){
          audioPlayer.setAttribute("src", track.preview_url);
          audioPlayer.play();
        }else {
          audioPlayer.pause();
        }
       }
      });
      
      playlistItem.appendChild(playListItemImg);
      playlistItem.appendChild(playListItemTitle);
      container.appendChild(playlistItem);

    }
  });
}

let currentlyActive;

renderPlaylist("7A6rrCajepSf6ZgFUWgU7D?si=08ed0cd8016c49bd");

