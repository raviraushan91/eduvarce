document.addEventListener("DOMContentLoaded", () => {
  const apiKey = "AIzaSyCr6wOynZ5JYl6KuUJN2PlxPsvqqVh2qAc"; // Replace this with your real API key
  const audioPlayer = document.getElementById("audio-player");
  const coverArt = document.getElementById("cover-art");
  const playlist = document.querySelectorAll("#playlist li");
  const musicGrid = document.getElementById("music-results");
  const suggestedContainer = document.getElementById("suggested-music");

  const tracks = [
    {
      name: "Dil Le Gaya Pardesi",
      file: "assets/music/Dil Pardesi Ho Gaya(MyMp3Song).mp3",
      cover: "assets/covers/dil-le-gaya-pardesi.jpg",
    },
    {
      name: "Aa Jaana Aa",
      file: "assets/music/aa-jaana-aa-]Subhash Download Rafiganj  (13).mp3",
      cover: "assets/covers/aa-jaana-aa.jpg",
    },
    {
      name: "Chori Chori",
      file: "assets/music/Chori Chori(MyMp3Song).mp3",
      cover: "assets/covers/chori-chori.jpg",
    },
    {
      name: "College Ki Ladkiyan",
      file: "assets/music/College Ki Ladkiyan.mp3",
      cover: "assets/covers/college-ki-ladkiyan.jpg",
    },
    {
      name: "Dheere Dheere",
      file: "assets/music/dheere-dheere.mp3",
      cover: "assets/covers/dheere-dheere.jpg",
    },
    {
      name: "Dil Ki Kalam Se",
      file: "assets/music/dil-ki-kalam-se.mp3",
      cover: "assets/covers/dil-ki-kalam-se.jpg",
    },
    {
      name: "Dil Pardesi Ho Gaya",
      file: "assets/music/Dil Pardesi Ho Gaya(MyMp3Song).mp3",
      cover: "assets/covers/dil-pardesi-ho-gaya.jpg",
    },
  ];

  let currentIndex = 0;

  function searchMusic() {
    const query = document.getElementById("music-search").value.trim();
    if (!query) return;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}+music&type=video&key=${apiKey}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        musicGrid.innerHTML = "";

        data.items.forEach((item) => {
          const { videoId } = item.id;
          const { title, thumbnails } = item.snippet;

          const card = document.createElement("div");
          card.className = "music-card";
          card.innerHTML = `
            <img src="${thumbnails.high.url}" alt="${title}">
            <h3>${title}</h3>
            <a href="https://www.youtube.com/watch?v=${videoId}" class="view-btn" target="_blank">Play</a>
          `;
          musicGrid.appendChild(card);
        });
      })
      .catch((err) => {
        console.error("Failed to fetch music:", err);
        musicGrid.innerHTML =
          "<p>Something went wrong. Please try again later.</p>";
      });
  }

  window.searchMusic = searchMusic; // Allow usage in HTML

  const suggested = [
    { title: "Night Changes", videoId: "syFZfO_wfMQ" },
    { title: "Perfect", videoId: "2Vv-BfVoq4g" },
    { title: "Let Me Down Slowly", videoId: "50VNCymT-Cs" },
  ];

  function loadSuggested() {
    suggested.forEach((track) => {
      const card = document.createElement("div");
      card.className = "music-card";
      card.innerHTML = `
        <h3>${track.title}</h3>
        <a href="https://www.youtube.com/watch?v=${track.videoId}" class="view-btn" target="_blank">Play</a>
      `;
      suggestedContainer.appendChild(card);
    });
  }

  function loadTrack(index) {
    if (index < 0 || index >= tracks.length) {
      alert("Track not found!");
      return;
    }

    currentIndex = index;
    audioPlayer.src = tracks[index].file;
    coverArt.src = tracks[index].cover;
    audioPlayer
      .play()
      .then(() => console.log("Playing:", tracks[index].name))
      .catch((err) => {
        console.error("Play failed:", err);
        alert("Music play नहीं हो रहा: " + err.message);
      });

    playlist.forEach((el, i) => {
      el.classList.toggle("active", i === index);
    });

    animateCover();
  }

  function nextTrack() {
    console.log("Next clicked");
    currentIndex = (currentIndex + 1) % tracks.length;
    loadTrack(currentIndex);
  }

  function prevTrack() {
    console.log("Prev clicked");
    currentIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    loadTrack(currentIndex);
  }

  function animateCover() {
    coverArt.style.opacity = 0;
    setTimeout(() => {
      coverArt.style.opacity = 1;
    }, 200);
  }

  // Pulse animation
  audioPlayer.addEventListener("play", () => {
    audioPlayer.classList.add("pulse");
  });

  audioPlayer.addEventListener("pause", () => {
    audioPlayer.classList.remove("pulse");
  });

  // Dark mode toggle
  document.getElementById("toggle-dark-mode").addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Playlist click
  playlist.forEach((item, index) => {
    item.addEventListener("click", () => loadTrack(index));
  });

  // Attach buttons globally
  window.nextTrack = nextTrack;
  window.prevTrack = prevTrack;

  // Initial load
  loadTrack(0);
  loadSuggested();
});
const card = document.createElement("div");
card.className = "music-card";
card.innerHTML = `
  <img src="${thumbnails.high.url}" alt="${title}">
  <h3>${title}</h3>
  <iframe width="100%" height="200" 
    src="https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0"
    frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen></iframe>
`;
musicGrid.appendChild(card);

