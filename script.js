"use strict";

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let muteButton = document.querySelector(".mute");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement("audio");

let playList = document.querySelector(".playlist");
let playListItem = document.querySelector(".playList");
let closeList = document.querySelector(".close");

let items = document.querySelector(".items");
let playtrack_name = document.querySelector(".play-track-name");
let playtrack_artist = document.querySelector(".play-track-artist");

//array of tracks------------------------------------------------------

let track_list = [
  {
    name: "Choo lo",
    artist: "The Local Train",
    cover: "Choo_lo",
    src: "Choo lo",
  },
  {
    name: "Kesariya",
    artist: "Arijit Singh",
    cover: "kesariya",
    src: "kesariya",
  },
  {
    name: "Bella Ciao",
    artist: "Marco Calliari",
    cover: "Bella_Ciao",
    src: "Bella Ciao",
  },
  {
    name: "Akhiyaan",
    artist: "Mitraz",
    cover: "Akhiyaan",
    src: "Akhiyaan",
  },
  {
    name: "At My Worst",
    artist: "Pink Sweat$",
    cover: "At_My_Worst",
    src: "At My Worst",
  },
  {
    name: "Der Lagi Lekin",
    artist: "Shankar Mahadevan",
    cover: "Der_Lagi_Lekin",
    src: "Der Lagi Lekin",
  },
  {
    name: "Dil deewana",
    artist: "Sagar Kalra",
    cover: "Dil_deewana",
    src: "Dil deewana",
  },
  {
    name: "Pehla Nasha Pehla khumar",
    artist: "Sadhana Sargam and Udit Narayan",
    cover: "Pehla_Nasha_Pehla_khumar",
    src: "Pehla Nasha Pehla khumar",
  },
  {
    name: "Until I Found You",
    artist: "Stephen Sanchez Ft. Em Beihold",
    cover: "Until_I_Found_You",
    src: "Until I Found You",
  },
  {
    name: "Yeh Raaten Yeh Mausam",
    artist: "Stephen Sanchez Ft. Em Beihold",
    cover: "Yeh_Raaten_Yeh_Mausam",
    src: "Yeh Raaten Yeh Mausam",
  },
  {
    name: "Yeh Vaada Raha",
    artist: "Stephen Sanchez Ft. Em Beihold",
    cover: "Yeh_Vaada_Raha",
    src: "Yeh Vaada Raha",
  },
];

//loading of the tracks--------------------------------------------------

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = `assets/music/${track_list[track_index].src}.mp3`;
  curr_track.load();
  track_art.style.backgroundImage = `url(assets/img/${track_list[track_index].cover}.jpg)`;
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
}

loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

//onclick playPause ---------------------------------------------------

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}

//keypress playpause------------------------------------------------------

function playPause(e) {
  if (e.keyCode !== 32) {
    return;
  }
  if (curr_track.paused) {
    curr_track.play();
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
  } else {
    curr_track.pause();
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
  }
}
document.addEventListener("keypress", playPause);

//next button -----------------------------------------------------------

function nextTrack() {
  if (track_index < track_list.length - 1) track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

//prev button ------------------------------------------------------------

function prevTrack() {
  if (track_index > 0) track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

//scroll volume ------------------------------------------------------------

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

//mute-unmute --------------------------------------------------------

var flag = true;
function mute() {
  if (flag == true) {
    curr_track.volume = 0;
    muteButton.innerHTML =
      '<i class="fa-solid fa-volume-xmark" onclick="mute()"></i>';
    flag = false;
  } else {
    curr_track.volume = 1;
    muteButton.innerHTML =
      '<i class="fa-solid fa-volume-high" onclick="mute()"></i>';
    flag = true;
  }
}

//seek track --------------------------------------------------------------

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

//timer update --------------------------------------------------------

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(
      curr_track.currentTime - currentMinutes * 60
    );
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(
      curr_track.duration - durationMinutes * 60
    );

    if (currentSeconds < 10) {
      currentSeconds = "0" + currentSeconds;
    }
    if (durationSeconds < 10) {
      durationSeconds = "0" + durationSeconds;
    }
    if (currentMinutes < 10) {
      currentMinutes = "0" + currentMinutes;
    }
    if (durationMinutes < 10) {
      durationMinutes = "0" + durationMinutes;
    }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}

//timer reset -------------------------------------------------------------

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

//creating song array--------------------------------------------------------

let playlist = [];
function addplaylist(){
  playlist.push(track_list[track_index]);
}

//hidding playlist------------------------------------------------------------

var pclick = true;
function closelist(){
  playListItem.style.visibility = "hidden";
  pclick = true;
}

//displaying the playlist------------------------------------------------------

function playlistDisplay() {
  if (pclick) {
    pclick = false;
    playListItem.style.visibility = "visible";
  }

  let playlistFilter = [...new Set(playlist)]; // removing duplicates----------
  let List = "";
  playlistFilter.map(function(song){
    List += `<div class="play-track-name">${playtrack_name.textContent = song.name}</div>
            <div class="play-track-artist">${playtrack_artist.textContent = song.artist}</div>
            <hr>`
    items.innerHTML = List;
  });
}   