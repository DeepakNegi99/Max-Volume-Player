console.log("Welcome to Max Volume Player");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');

// Wait for DOM to load before getting songItems
let songItems;

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg", artist: "Warriyo", genre: "Electronic", year: "2016", duration: "3:50"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg", artist: "Cielo", genre: "House", year: "2017", duration: "3:35"},
    {songName: "DEAF KEV - Invincible [NCS Release]", filePath: "songs/3.mp3", coverPath: "covers/3.jpg", artist: "DEAF KEV", genre: "Electronic", year: "2015", duration: "4:20"},
    {songName: "Different & EH!DE - My Heart", filePath: "songs/4.mp3", coverPath: "covers/4.jpg", artist: "Different & EH!DE", genre: "Electronic", year: "2015", duration: "4:27"},
    {songName: "Janji - Heroes ft. Johnning", filePath: "songs/5.mp3", coverPath: "covers/5.jpg", artist: "Janji", genre: "Electronic", year: "2015", duration: "3:28"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg", artist: "Salam-e-Ishq", genre: "Romance", year: "2017", duration: "4:15"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg", artist: "Salam-e-Ishq", genre: "Romance", year: "2018", duration: "3:45"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg", artist: "Salam-e-Ishq", genre: "Romance", year: "2018", duration: "4:02"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg", artist: "Salam-e-Ishq", genre: "Romance", year: "2017", duration: "3:58"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/10.mp3", coverPath: "covers/10.jpg", artist: "Salam-e-Ishq", genre: "Romance", year: "2017", duration: "4:10"},
]

let allSongs = [...songs]; // Keep original array for filtering
let currentFilter = { artist: 'all', genre: 'all', year: 'all' };

// This will run after DOM loads, see bottom of file
const initializeSongs = () => {
    songItems.forEach((element, i)=>{ 
        if(i < songs.length) {
            element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
            element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
            element.getElementsByClassName("artist")[0].innerText = songs[i].artist;
            element.getElementsByClassName("genre")[0].innerText = songs[i].genre;
            element.getElementsByClassName("year")[0].innerText = songs[i].year;
            element.getElementsByClassName("timestamp")[0].innerHTML = `${songs[i].duration} <i id="${i}" class="far songItemPlay fa-play-circle"></i>`;
        }
    })
}

// Filter functionality
const filterSongs = () => {
    let filteredSongs = allSongs.filter(song => {
        return (currentFilter.artist === 'all' || song.artist === currentFilter.artist) &&
               (currentFilter.genre === 'all' || song.genre === currentFilter.genre) &&
               (currentFilter.year === 'all' || song.year === currentFilter.year);
    });
    
    songs = filteredSongs;
    updateSongDisplay();
}

const updateSongDisplay = () => {
    if(!songItems) return;
    
    songItems.forEach((element, i) => {
        if(i < songs.length) {
            element.style.display = 'flex';
            element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
            element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
            element.getElementsByClassName("artist")[0].innerText = songs[i].artist;
            element.getElementsByClassName("genre")[0].innerText = songs[i].genre;
            element.getElementsByClassName("year")[0].innerText = songs[i].year;
            element.getElementsByClassName("timestamp")[0].innerHTML = `${songs[i].duration} <i id="${i}" class="far songItemPlay fa-play-circle"></i>`;
        } else {
            element.style.display = 'none';
        }
    });
    
    // Re-attach event listeners
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.removeEventListener('click', handleSongClick);
        element.addEventListener('click', handleSongClick);
    });
}

const handleSongClick = (e) => {
    makeAllPlays();
    songIndex = parseInt(e.target.id);
    e.target.classList.remove('fa-play-circle');
    e.target.classList.add('fa-pause-circle');
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
    // Update current playing display
    if(document.getElementById('currentSongImage')) {
        document.getElementById('currentSongImage').src = songs[songIndex].coverPath;
        document.getElementById('currentSongTitle').innerText = songs[songIndex].songName;
        document.getElementById('currentSongArtist').innerText = songs[songIndex].artist;
    }
}
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})

// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// Move event listeners to DOM ready
const attachEventListeners = () => {
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.addEventListener('click', handleSongClick);
    });
}

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=songs.length-1){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
    // Update current playing display
    document.getElementById('currentSongImage').src = songs[songIndex].coverPath;
    document.getElementById('currentSongTitle').innerText = songs[songIndex].songName;
    document.getElementById('currentSongArtist').innerText = songs[songIndex].artist;
})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = songs[songIndex].filePath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    
    // Update current playing display
    document.getElementById('currentSongImage').src = songs[songIndex].coverPath;
    document.getElementById('currentSongTitle').innerText = songs[songIndex].songName;
    document.getElementById('currentSongArtist').innerText = songs[songIndex].artist;
})

const goToHome = () => {
    window.location.href = "index.html";
}

const goToAbout = () => {
    window.location.href = "about.html";
}

// Filter functions
const applyFilters = () => {
    currentFilter.artist = document.getElementById('artistFilter').value;
    currentFilter.genre = document.getElementById('genreFilter').value;
    currentFilter.year = document.getElementById('yearFilter').value;
    filterSongs();
}

// Review submission
const submitReview = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.querySelector('input[type="text"]').value;
    const rating = form.querySelector('select').value;
    const review = form.querySelector('textarea').value;
    
    alert(`Thank you for your review, ${name}! Your ${rating}-star review has been submitted: "${review}"`);
    form.reset();
}

// Initialize the player
document.addEventListener('DOMContentLoaded', () => {
    songItems = Array.from(document.getElementsByClassName('songItem'));
    initializeSongs();
    attachEventListeners();
    
    // Set initial current playing song
    if(document.getElementById('currentSongImage')) {
        document.getElementById('currentSongImage').src = songs[0].coverPath;
        document.getElementById('currentSongTitle').innerText = songs[0].songName;
        document.getElementById('currentSongArtist').innerText = songs[0].artist;
    }
});