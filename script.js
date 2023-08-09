const play = document.getElementById("play");
const music = document.querySelector("audio");
const img = document.querySelector("img");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const prev = document.getElementById("Previous");
const next = document.getElementById("Next");
let progress = document.getElementById("progress");
let Duration = document.getElementById("duration");
let current_Time = document.getElementById("current_time");
const progress_div = document.getElementById("progress_div");
const songs = [
  {
    name: "J-1",
    title: "Lotu lane",
    artist: "the loyalist",
  },
  {
    name: "J-2",
    title: "sappheiros",
    artist: "Aurora",
  },
  {
    name: "J-3",
    title: "Walking firiri",
    artist: "Gorkhali Takma",
  },
];

// console.log(songs[1].name)

let isPlaying = false;

const playMusic = () => {
  isPlaying = true;
  music.play();
  play.classList.replace("fa-play", "fa-pause");
  img.classList.add("anime");
};

const pausemusic = () => {
  isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause", "fa-play");
  img.classList.remove("anime");
};

play.addEventListener("click", () => {
  isPlaying ? pausemusic() : playMusic();
});

// changing the music

Index = 0;

const loadSong = (song) => {
  title.textContent = song.title;
  artist.textContent = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `images/${song.name}.jpg`; // Make sure your image paths are correct
};

const nextSong = () => {
  Index = (Index + 1) % songs.length;
  loadSong(songs[Index]);
  playMusic(); // Play the new song after loading
};

const prevSong = () => {
  Index = (Index - 1 + songs.length) % songs.length; // Handle negative indices correctly
  loadSong(songs[Index]);
  playMusic(); // Play the new song after loading
};

// progress js work

music.addEventListener("timeupdate", (event) => {
  // console.log(event)
  const { currentTime, duration } = event.srcElement;
  let progress_time = (currentTime / duration) * 100;
  progress.style.width = `${progress_time}%`;

  // duration update

  let min_duration = Math.floor(duration / 60);
  let sec_duration = Math.floor(duration % 60);
  let tot_duration = `${min_duration}:${sec_duration}`;
  if (duration) {
    Duration.textContent = `${tot_duration}`;
  }
  //current  duration update

  let min_currentTime = Math.floor(currentTime / 60);
  let sec_currentTime = Math.floor(currentTime % 60);

  if (sec_currentTime < 10) {
    sec_currentTime = `0${sec_currentTime}`;
  }

  let tot_currentTime = `${min_currentTime}:${sec_currentTime}`;
  current_Time.textContent = `${tot_currentTime}`;
});

// progress onclick function
progress_div.addEventListener("click", (event) => {
  console.log(event);
  const { duration } = music;

  let move_progress = (event.offsetX / event.srcElement.clientWidth) * duration;
  console.log(duration);
  console.log(move_progress);

  music.currentTime = move_progress;
});

music.addEventListener("ended", nextSong);
