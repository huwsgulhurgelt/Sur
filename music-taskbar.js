(function () {
  if (window.erdemFoxTaskbarInitialized) return;
  window.erdemFoxTaskbarInitialized = true;

  let playlist = [];
  let currentIndex = 0;
  let audio = new Audio();
  let isMinimized = false;

  // Create UI Container
  const taskbar = document.createElement('div');
  taskbar.id = 'erdemfox-music-taskbar';
  taskbar.innerHTML = `
    <div class="taskbar-header" id="taskbar-drag-handle">
      <span class="taskbar-title">🎵 ErdemFox Player</span>
      <div class="taskbar-actions">
        <button class="taskbar-btn" id="tb-file-btn" title="Select Audio Files">📂</button>
        <button class="taskbar-btn" id="tb-min-btn" title="Minimize">_</button>
        <button class="taskbar-btn" id="tb-close-btn" title="Close">×</button>
      </div>
    </div>
    <div class="taskbar-body">
      <div class="track-info" id="tb-track-title">No music selected</div>
      <div class="taskbar-progress-container">
        <span id="tb-current-time">0:00</span>
        <input type="range" class="taskbar-progress" id="tb-progress" value="0" min="0" max="100">
        <span id="tb-duration">0:00</span>
      </div>
      <div class="taskbar-controls-row">
        <div class="transport-controls">
          <button class="control-btn" id="tb-prev" title="Previous">⏮</button>
          <button class="control-btn" id="tb-play" title="Play/Pause">▶</button>
          <button class="control-btn" id="tb-next" title="Next">⏭</button>
        </div>
        <div class="volume-container">
          <span>🔊</span>
          <input type="range" class="volume-slider" id="tb-volume" min="0" max="1" step="0.05" value="1">
        </div>
      </div>
    </div>
    <input type="file" id="tb-hidden-file-input" accept="audio/*" multiple style="display: none;">
  `;

  document.body.appendChild(taskbar);

  // DOM Elements
  const header = document.getElementById('taskbar-drag-handle');
  const titleEl = document.getElementById('tb-track-title');
  const playBtn = document.getElementById('tb-play');
  const prevBtn = document.getElementById('tb-prev');
  const nextBtn = document.getElementById('tb-next');
  const progressEl = document.getElementById('tb-progress');
  const currentTimeEl = document.getElementById('tb-current-time');
  const durationEl = document.getElementById('tb-duration');
  const volumeEl = document.getElementById('tb-volume');
  const fileBtn = document.getElementById('tb-file-btn');
  const hiddenFileInput = document.getElementById('tb-hidden-file-input');
  const minBtn = document.getElementById('tb-min-btn');
  const closeBtn = document.getElementById('tb-close-btn');

  // Draggable behavior
  let isDragging = false, startX, startY, initialX, initialY;
  header.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    const rect = taskbar.getBoundingClientRect();
    initialX = rect.left;
    initialY = rect.top;
    taskbar.style.bottom = 'auto';
    taskbar.style.right = 'auto';
    taskbar.style.left = `${initialX}px`;
    taskbar.style.top = `${initialY}px`;
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    taskbar.style.left = `${initialX + dx}px`;
    taskbar.style.top = `${initialY + dy}px`;
  });

  document.addEventListener('mouseup', () => { isDragging = false; });

  // File Selection
  fileBtn.addEventListener('click', () => hiddenFileInput.click());
  hiddenFileInput.addEventListener('change', (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;

    // Clean up old object URLs to prevent memory leaks
    playlist.forEach(item => URL.revokeObjectURL(item.url));

    playlist = files.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file)
    }));

    currentIndex = 0;
    loadTrack(currentIndex);
    audio.play();
    playBtn.textContent = '⏸';
  });

  function loadTrack(index) {
    if (playlist.length === 0) return;
    const track = playlist[index];
    audio.src = track.url;
    titleEl.textContent = `${index + 1}. ${track.name}`;
  }

  // Audio Control Events
  playBtn.addEventListener('click', () => {
    if (playlist.length === 0) {
      hiddenFileInput.click();
      return;
    }
    if (audio.paused) {
      audio.play();
      playBtn.textContent = '⏸';
    } else {
      audio.pause();
      playBtn.textContent = '▶';
    }
  });

  prevBtn.addEventListener('click', () => {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    loadTrack(currentIndex);
    audio.play();
    playBtn.textContent = '⏸';
  });

  nextBtn.addEventListener('click', () => {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex + 1) % playlist.length;
    loadTrack(currentIndex);
    audio.play();
    playBtn.textContent = '⏸';
  });

  audio.addEventListener('ended', () => {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex + 1) % playlist.length;
    loadTrack(currentIndex);
    audio.play();
  });

  // Progress and Seek
  audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
      progressEl.value = (audio.currentTime / audio.duration) * 100;
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  progressEl.addEventListener('input', () => {
    if (audio.duration) {
      audio.currentTime = (progressEl.value / 100) * audio.duration;
    }
  });

  volumeEl.addEventListener('input', () => {
    audio.volume = volumeEl.value;
  });

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Minimize & Close
  minBtn.addEventListener('click', () => {
    isMinimized = !isMinimized;
    taskbar.classList.toggle('minimized', isMinimized);
    minBtn.textContent = isMinimized ? '□' : '_';
  });

  closeBtn.addEventListener('click', () => {
    audio.pause();
    playlist.forEach(item => URL.revokeObjectURL(item.url));
    taskbar.remove();
    window.erdemFoxTaskbarInitialized = false;
  });

  // Lifecycle Cleanup when exiting page
  window.addEventListener('beforeunload', () => {
    audio.pause();
    playlist.forEach(item => URL.revokeObjectURL(item.url));
  });
})();
