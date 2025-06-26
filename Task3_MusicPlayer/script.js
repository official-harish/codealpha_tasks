const songs = [
  {
    title: "Dreamscape",
    artist: "NoCopyright",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    cover: "https://picsum.photos/id/1011/300/200"
  },
  {
    title: "Skyline",
    artist: "BeatCloud",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    cover: "https://picsum.photos/id/1012/300/200"
  },
  {
    title: "Golden Hour",
    artist: "Chillwave",
    src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    cover: "https://picsum.photos/id/1013/300/200"
  }
];

let currentSong = 0;
const audio = document.getElementById('audio');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const cover = document.getElementById('cover');
const playBtn = document.getElementById('play');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const current = document.getElementById('current');
const duration = document.getElementById('duration');
const volumeSlider = document.getElementById('volume');

function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
  cover.src = song.cover;
}

function playSong() {
  audio.play();
  playBtn.textContent = '⏸';
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = '▶️';
}

function togglePlayPause() {
  if (audio.paused) {
    playSong();
  } else {
    pauseSong();
  }
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  playSong();
}

audio.addEventListener('timeupdate', () => {
  const { duration: dur, currentTime } = audio;
  if (!isNaN(dur) && isFinite(dur)) {
    const percent = (currentTime / dur) * 100;
    progress.style.width = percent + '%';
    current.textContent = formatTime(currentTime);
    duration.textContent = formatTime(dur);
  } else {
    progress.style.width = '0%';
    current.textContent = '0:00';
    duration.textContent = '0:00';
  }
});

progressContainer.addEventListener('click', (e) => {
  const width = progressContainer.clientWidth;
  const clickX = e.offsetX;
  const dur = audio.duration;
  if (!isNaN(dur) && isFinite(dur)) {
    audio.currentTime = (clickX / width) * dur;
  }
});

volumeSlider.addEventListener('input', () => {
  audio.volume = volumeSlider.value;
});

function formatTime(t) {
  const min = Math.floor(t / 60);
  const sec = Math.floor(t % 60).toString().padStart(2, '0');
  return `${min}:${sec}`;
}

audio.addEventListener('ended', nextSong); // autoplay next
loadSong(songs[currentSong]);
