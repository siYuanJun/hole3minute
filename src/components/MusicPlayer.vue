<template>
  <div class="music-player">
    <div class="music-header">
      <h3>🎵 心情音乐</h3>
      <p>根据你的情绪推荐适合的音乐</p>
    </div>

    <div class="mood-selector">
      <button
        v-for="mood in moodOptions"
        :key="mood.id"
        class="mood-btn"
        :class="{ active: selectedMood === mood.id }"
        @click="selectMood(mood.id)"
      >
        {{ mood.name }}
      </button>
    </div>

    <div class="music-list">
      <div
        v-for="(song, index) in currentPlaylist"
        :key="index"
        class="music-card"
        :class="{ playing: isPlaying && currentSong?.title === song.title }"
        @click="playSong(song)"
      >
        <div class="music-cover">
          <span v-if="isPlaying && currentSong?.title === song.title" class="playing-icon">🎵</span>
          <span v-else>{{ song.cover }}</span>
        </div>
        <div class="music-info">
          <h4>{{ song.title }}</h4>
          <p>{{ song.artist }} · {{ song.mood }}</p>
        </div>
        <button class="music-play" @click.stop="togglePlay(song)">
          <span v-if="isPlaying && currentSong?.title === song.title">⏸</span>
          <span v-else>▶</span>
        </button>
      </div>
    </div>

    <!-- 播放进度条 -->
    <div v-if="isPlaying" class="player-progress">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <div class="progress-time">
        <span>{{ formatTime(currentTime) }}</span>
        <span>{{ formatTime(duration) }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  musicData: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['play'])

const moodOptions = [
  { id: 'calm', name: '平静' },
  { id: 'comfort', name: '治愈' },
  { id: 'energy', name: '振奋' },
  { id: 'release', name: '释放' }
]

const selectedMood = ref('calm')
const isPlaying = ref(false)
const currentSong = ref(null)
const currentTime = ref(0)
const duration = ref(0)
const progress = computed(() => duration.value > 0 ? (currentTime.value / duration.value) * 100 : 0)

const currentPlaylist = computed(() => {
  return props.musicData[selectedMood.value] || props.musicData.calm || []
})

const selectMood = (mood) => {
  selectedMood.value = mood
  // 切换心情时停止当前播放
  stopPlay()
}

const playSong = (song) => {
  currentSong.value = song
  isPlaying.value = true
  duration.value = 180 // 假设每首歌3分钟
  currentTime.value = 0
  emit('play', song)
  
  // 模拟播放进度
  startProgressTimer()
}

const togglePlay = (song) => {
  if (currentSong.value?.title === song.title) {
    if (isPlaying.value) {
      stopPlay()
    } else {
      isPlaying.value = true
      startProgressTimer()
    }
  } else {
    playSong(song)
  }
}

const stopPlay = () => {
  isPlaying.value = false
  currentSong.value = null
  currentTime.value = 0
  duration.value = 0
}

let progressTimer = null

const startProgressTimer = () => {
  if (progressTimer) clearInterval(progressTimer)
  progressTimer = setInterval(() => {
    if (currentTime.value < duration.value) {
      currentTime.value++
    } else {
      // 播放完成
      stopPlay()
    }
  }, 1000)
}

const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins}:${secs.toString().padStart(2, '0')}`
}
</script>

<style scoped lang="scss">
.music-player {
  animation: fadeSlideIn 0.4s ease-out;
}

.music-header {
  text-align: center;
  margin-bottom: 24px;

  h3 {
    font-family: 'Lora', serif;
    font-size: 20px;
    font-weight: 600;
    margin-bottom: 6px;
    color: var(--foreground);
  }

  p {
    font-size: 13px;
    color: var(--text-soft);
  }
}

.mood-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 24px;
}

.mood-btn {
  padding: 10px 20px;
  border: 2px solid var(--border);
  background: var(--surface);
  border-radius: var(--radius-full);
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
  color: var(--text-soft);

  &:hover {
    border-color: var(--primary-light);
    background: var(--secondary-light);
  }

  &.active {
    border-color: var(--primary);
    background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
    color: var(--primary);
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.2);
  }
}

.music-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.music-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 14px;
  box-shadow: var(--shadow-sm);
  cursor: pointer;
  transition: all var(--transition);
  border: 1px solid var(--border);

  &:hover {
    transform: translateX(6px);
    box-shadow: var(--shadow-md);
    border-color: var(--primary-light);
  }

  &.playing {
    border-color: var(--primary);
    background: linear-gradient(135deg, var(--secondary-light), var(--surface));
  }
}

.music-cover {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  flex-shrink: 0;
  background: linear-gradient(135deg, var(--primary-light), var(--secondary-light));
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.15);
}

.playing-icon {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.2); }
}

.music-info {
  flex: 1;
  min-width: 0;

  h4 {
    font-family: 'Lora', serif;
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 12px;
    color: var(--text-soft);
  }
}

.music-play {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border: none;
  font-size: 14px;
  cursor: pointer;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
  transition: all var(--transition);

  &:hover {
    transform: scale(1.1);
  }
}

.player-progress {
  margin-top: 20px;
  padding: 16px;
  background: var(--surface);
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
}

.progress-bar {
  height: 6px;
  background: var(--muted);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary), var(--accent));
  border-radius: 3px;
  transition: width 0.3s linear;
}

.progress-time {
  display: flex;
  justify-content: space-between;
  font-size: 11px;
  color: var(--text-muted);
}

@keyframes fadeSlideIn {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
