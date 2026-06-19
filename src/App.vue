<template>
  <div class="app">
    <!-- Theme Toggle Button -->
    <button class="theme-toggle" :class="themeClass" @click="toggleTheme">
      <span class="theme-tooltip">{{ themeTooltip }}</span>
      🎨
    </button>

    <div class="container">
      <!-- Header -->
      <header>
        <div class="tree-icon">🌳</div>
        <h1>树洞·情绪急救箱</h1>
        <p class="subtitle">选一个情绪，给你3个30秒能做完的具体动作<br>先止痛，再谈长程</p>
      </header>

      <!-- Navigation Tabs -->
      <div class="nav-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="nav-tab"
          :class="{ active: activeTab === tab.id }"
          @click="switchTab(tab.id)"
        >
          <span>{{ tab.name }}</span>
        </button>
      </div>

      <!-- Home Section -->
      <div v-show="activeTab === 'home'" class="section active">
        <div class="emotion-section-title">你现在是什么感觉？</div>

        <div class="emotion-grid">
          <EmotionCard
            v-for="(data, key) in emotionData"
            :key="key"
            :emotion="key"
            :emoji="data.emoji"
            :name="data.name"
            :description="data.description"
            :color="data.color"
            :is-selected="selectedEmotion === key"
            @select="selectEmotion(key)"
          />
        </div>

        <!-- Intensity Slider -->
        <div v-show="selectedEmotion" class="intensity-section show">
          <div class="intensity-label">现在这个情绪有多强烈？</div>
          <input
            type="range"
            class="intensity-slider"
            v-model="intensity"
            min="1"
            max="5"
          />
          <div class="intensity-hints">
            <span>一点点</span>
            <span>非常强烈</span>
          </div>
          <button class="action-btn" @click="showActions">给我推荐动作</button>
        </div>
      </div>

      <!-- Actions Section -->
      <div v-show="activeTab === 'actions'" class="section">
        <div class="back-header">
          <button class="back-btn" @click="goBack">←</button>
          <h2>推荐动作</h2>
        </div>

        <div class="selected-emotion-badge" :class="selectedEmotion">
          <span>{{ currentEmotionData?.emoji }}</span>
          <span>{{ currentEmotionData?.name }}</span>
        </div>

        <div class="actions-intro">根据你的情绪程度，我们为你推荐这3个动作：</div>

        <div class="action-list">
          <ActionCard
            v-for="(action, index) in recommendedActions"
            :key="index"
            :action="action"
            :index="index"
            @start="startAction"
          />
        </div>

        <!-- Note Section -->
        <div class="note-section">
          <div class="note-title">你想留一句话吗？（匿名，绝对不留任何记录）</div>
          <textarea
            class="note-input"
            v-model="noteText"
            placeholder="写点什么..."
          ></textarea>
          <button class="note-submit" @click="submitNote">提交</button>
          <div v-show="noteSubmitted" class="note-feedback show">
            <div class="note-feedback-icon">🌱</div>
            <div class="note-feedback-text">已收到。愿你今晚好梦。</div>
          </div>
        </div>
      </div>

      <!-- Wall Section -->
      <div v-show="activeTab === 'wall'" class="section">
        <div class="wall-header">
          <h3>🌳 树洞消息墙</h3>
          <span class="wall-count">{{ messageWallData.length + 1 }}条留言</span>
        </div>

        <div class="message-list">
          <div v-for="(msg, index) in displayedMessages" :key="index" class="message-card">
            <div class="message-emotion" :class="msg.emotion">
              {{ emotionData[msg.emotion].emoji }} {{ emotionData[msg.emotion].name }}
            </div>
            <div class="message-text">{{ msg.text }}</div>
            <div class="message-time">{{ msg.time }}</div>
          </div>
        </div>
      </div>

      <!-- Diary Section -->
      <div v-show="activeTab === 'diary'" class="section">
        <div class="diary-chart">
          <div class="chart-header">
            <h3>📈 情绪趋势</h3>
            <span class="chart-period">最近7天</span>
          </div>
          <div class="chart-visual">
            <div class="chart-wave"></div>
            <div class="chart-dots">
              <div
                v-for="(day, index) in diaryData.weekly"
                :key="index"
                class="chart-dot"
                :style="{
                  height: (day.intensity / 5 * 100) + 'px',
                  background: emotionData[day.emotion]?.color
                }"
              ></div>
            </div>
          </div>
          <div class="chart-legend">
            <div v-for="(data, key) in emotionData" :key="key" class="legend-item">
              <div class="legend-dot" :style="{ background: data.color }"></div>
              {{ data.name }}
            </div>
          </div>
        </div>

        <div class="diary-stats">
          <div class="stat-card">
            <div class="stat-value">{{ diaryData.stats.totalUses }}</div>
            <div class="stat-label">使用次数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ diaryData.stats.streakDays }}</div>
            <div class="stat-label">连续天数</div>
          </div>
          <div class="stat-card">
            <div class="stat-value">{{ diaryData.stats.todayEmotion }}</div>
            <div class="stat-label">今日情绪</div>
          </div>
        </div>

        <div class="diary-tips">
          <h4>💡 情绪管理小贴士</h4>
          <div class="tip-item">
            <span class="tip-icon">✨</span>
            <span>每天记录情绪变化，能帮助你更好地了解自己</span>
          </div>
          <div class="tip-item">
            <span class="tip-icon">🌙</span>
            <span>睡前进行深呼吸练习，有助于改善睡眠质量</span>
          </div>
          <div class="tip-item">
            <span class="tip-icon">📞</span>
            <span>如果情绪持续低落超过2周，建议寻求专业帮助</span>
          </div>
        </div>
      </div>

      <!-- Music Section -->
      <div v-show="activeTab === 'music'" class="section">
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
            v-for="(song, index) in currentMusicList"
            :key="index"
            class="music-card"
            @click="playMusic(song.title)"
          >
            <div class="music-cover">{{ song.cover }}</div>
            <div class="music-info">
              <h4>{{ song.title }}</h4>
              <p>{{ song.artist }} · {{ song.mood }}</p>
            </div>
            <button class="music-play">▶</button>
          </div>
        </div>
      </div>

      <footer>
        <p>本工具不存储任何个人信息</p>
        <p>如有持续情绪困扰，建议寻求专业心理咨询</p>
      </footer>
    </div>

    <!-- Breathing Guide -->
    <BreathingGuide :visible="showBreathing" @close="showBreathing = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import EmotionCard from './components/EmotionCard.vue'
import ActionCard from './components/ActionCard.vue'
import BreathingGuide from './components/BreathingGuide.vue'
import { emotionData, messageWallData, musicData, diaryData } from './data/emotions.js'

// Theme
const theme = ref('lavender')
const themeClass = computed(() => theme.value)
const themeTooltip = computed(() =>
  theme.value === 'lavender' ? '切换到莫兰迪治愈系' : '切换到薰衣草治愈系'
)

const toggleTheme = () => {
  theme.value = theme.value === 'lavender' ? 'morandi' : 'lavender'
  document.documentElement.className = theme.value === 'morandi' ? 'morandi' : ''
}

// Tabs
const tabs = [
  { id: 'home', name: '急救' },
  { id: 'wall', name: '树洞' },
  { id: 'diary', name: '日记' },
  { id: 'music', name: '音乐' }
]
const activeTab = ref('home')

const switchTab = (tab) => {
  activeTab.value = tab
  if (tab === 'wall') {
    renderMessageWall()
  } else if (tab === 'music') {
    selectedMood.value = 'calm'
  }
}

// Emotion Selection
const selectedEmotion = ref(null)
const intensity = ref(3)
const currentEmotionData = computed(() =>
  selectedEmotion.value ? emotionData[selectedEmotion.value] : null
)

const selectEmotion = (emotion) => {
  selectedEmotion.value = emotion
}

const recommendedActions = computed(() => {
  if (!selectedEmotion.value) return []
  let actions = [...currentEmotionData.value.actions]
  if (intensity.value >= 4) {
    actions = [
      { title: '先做深呼吸平复一下', desc: '跟着引导做60秒深呼吸', time: '60秒', type: 'breathing' },
      ...actions
    ]
  }
  return actions
})

// Actions
const showActions = () => {
  if (!selectedEmotion.value) return
  activeTab.value = 'actions'
}

const goBack = () => {
  activeTab.value = 'home'
  noteText.value = ''
  noteSubmitted.value = false
}

const startAction = (type) => {
  if (type === 'breathing') {
    showBreathing.value = true
  } else {
    alert('这个动作需要你在现实中完成哦～\n\n试着按照描述去做，完成后回来继续探索其他功能。')
  }
}

// Breathing
const showBreathing = ref(false)

// Note
const noteText = ref('')
const noteSubmitted = ref(false)

const submitNote = () => {
  if (noteText.value.trim()) {
    messageWallData.unshift({
      emotion: selectedEmotion.value || 'low',
      text: noteText.value,
      time: '刚刚'
    })
    noteSubmitted.value = true
  } else {
    alert('写点什么再提交吧～')
  }
}

// Message Wall
const displayedMessages = ref([])

const renderMessageWall = () => {
  displayedMessages.value = messageWallData.slice(0, 6)
}

// Music
const moodOptions = [
  { id: 'calm', name: '平静' },
  { id: 'comfort', name: '治愈' },
  { id: 'energy', name: '振奋' },
  { id: 'release', name: '释放' }
]
const selectedMood = ref('calm')

const currentMusicList = computed(() =>
  musicData[selectedMood.value] || musicData.calm
)

const selectMood = (mood) => {
  selectedMood.value = mood
}

const playMusic = (title) => {
  alert(`正在播放：${title}\n\n（音乐播放功能需要接入真实音乐API）`)
}
</script>

<style scoped lang="scss">
.app {
  position: relative;
}

/* Header */
header {
  text-align: center;
  padding: 32px 16px 28px;
  margin-bottom: 24px;
}

.tree-icon {
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 40px;
  box-shadow: var(--shadow-md), 0 0 60px rgba(139, 92, 246, 0.25);
  animation: breatheGlow 4s ease-in-out infinite;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: -8px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary-light), var(--accent-light));
    opacity: 0.3;
    z-index: -1;
    filter: blur(12px);
    animation: pulseGlow 4s ease-in-out infinite;
  }
}

@keyframes breatheGlow {
  0%, 100% {
    transform: scale(1);
    box-shadow: var(--shadow-md), 0 0 40px rgba(139, 92, 246, 0.2);
  }
  50% {
    transform: scale(1.05);
    box-shadow: var(--shadow-lg), 0 0 60px rgba(139, 92, 246, 0.3);
  }
}

@keyframes pulseGlow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.1); }
}

header h1 {
  font-family: 'Lora', serif;
  font-size: 26px;
  font-weight: 600;
  color: var(--foreground);
  margin-bottom: 10px;
  letter-spacing: 0.5px;
}

.subtitle {
  font-size: 14px;
  color: var(--text-soft);
  line-height: 1.7;
  max-width: 320px;
  margin: 0 auto;
}

/* Nav Tabs */
.nav-tabs {
  display: flex;
  gap: 6px;
  margin-bottom: 24px;
  background: var(--surface);
  padding: 6px;
  border-radius: var(--radius);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

.nav-tab {
  flex: 1;
  padding: 12px 8px;
  border: none;
  background: transparent;
  border-radius: var(--radius-sm);
  font-family: 'Raleway', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: var(--text-soft);
  cursor: pointer;
  transition: all var(--transition);
  position: relative;
  overflow: hidden;

  &.active {
    color: var(--primary);
    background: var(--secondary-light);
  }

  &:not(.active):hover {
    color: var(--primary);
    background: var(--muted);
  }
}

/* Sections */
.section {
  display: none;
  animation: fadeSlideIn 0.4s ease-out;

  &.active {
    display: block;
  }
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

.emotion-section-title {
  font-family: 'Lora', serif;
  font-size: 15px;
  color: var(--text-soft);
  text-align: center;
  margin-bottom: 16px;
  font-weight: 500;
}

.emotion-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

/* Intensity Section */
.intensity-section {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 24px 20px;
  margin-top: 20px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  display: none;

  &.show {
    display: block;
    animation: fadeSlideIn 0.3s ease-out;
  }
}

.intensity-label {
  font-family: 'Lora', serif;
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 16px;
  text-align: center;
  color: var(--text);
}

.intensity-slider {
  width: 100%;
  height: 8px;
  border-radius: 4px;
  background: linear-gradient(90deg, var(--primary-light), var(--accent));
  -webkit-appearance: none;
  outline: none;
  margin-bottom: 12px;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
    transition: transform var(--transition);

    &:hover {
      transform: scale(1.1);
    }

    &:active {
      transform: scale(0.95);
    }
  }
}

.intensity-hints {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: var(--text-muted);
}

.action-btn {
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
  color: var(--on-primary);
  border: none;
  border-radius: var(--radius-sm);
  font-family: 'Raleway', sans-serif;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 20px;
  transition: all var(--transition);
  box-shadow: 0 4px 16px rgba(139, 92, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(139, 92, 246, 0.4);
  }

  &:active {
    transform: scale(0.98);
  }
}

/* Actions Section */
.back-header {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 0;
  margin-bottom: 20px;
}

.back-btn {
  width: 40px;
  height: 40px;
  border: none;
  background: var(--surface);
  border-radius: 12px;
  font-size: 20px;
  cursor: pointer;
  box-shadow: var(--shadow-sm);
  transition: all var(--transition);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-soft);

  &:hover {
    background: var(--muted);
    transform: scale(1.05);
  }
}

.back-header h2 {
  font-family: 'Lora', serif;
  font-size: 20px;
  font-weight: 600;
  color: var(--foreground);
}

.selected-emotion-badge {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  border-radius: var(--radius-full);
  font-size: 14px;
  margin-bottom: 20px;
  font-weight: 500;
  transition: all var(--transition);

  &.anxiety { background: var(--anxiety-light); color: #1E40AF; }
  &.anger { background: var(--anger-light); color: #991B1B; }
  &.lonely { background: var(--lonely-light); color: #075985; }
  &.low { background: var(--low-light); color: #92400E; }
  &.confused { background: var(--confused-light); color: #5B21B6; }
}

.actions-intro {
  font-size: 14px;
  color: var(--text-soft);
  margin-bottom: 16px;
  text-align: center;
}

.action-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

/* Note Section */
.note-section {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  margin-top: 24px;
  border: 1px solid var(--border);
}

.note-title {
  font-family: 'Lora', serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--text-soft);
  margin-bottom: 14px;
  text-align: center;
}

.note-input {
  width: 100%;
  min-height: 90px;
  padding: 14px;
  border: 2px solid var(--border);
  border-radius: var(--radius-sm);
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  resize: none;
  transition: border-color var(--transition);
  background: var(--background);

  &:focus {
    outline: none;
    border-color: var(--primary);
    background: var(--surface);
  }
}

.note-submit {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--accent) 0%, #047857 100%);
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-family: 'Raleway', sans-serif;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  margin-top: 12px;
  transition: all var(--transition);
  box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(5, 150, 105, 0.4);
  }
}

.note-feedback {
  display: none;
  text-align: center;
  padding: 28px;

  &.show {
    display: block;
    animation: fadeSlideIn 0.5s ease-out;
  }
}

.note-feedback-icon {
  font-size: 56px;
  margin-bottom: 16px;
  animation: bounceIn 0.6s ease-out;
}

@keyframes bounceIn {
  0% { transform: scale(0); opacity: 0; }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); opacity: 1; }
}

.note-feedback-text {
  font-family: 'Lora', serif;
  font-size: 17px;
  color: var(--accent);
  font-weight: 500;
}

/* Wall Section */
.wall-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-family: 'Lora', serif;
    font-size: 18px;
    font-weight: 600;
    color: var(--foreground);
  }
}

.wall-count {
  font-size: 12px;
  color: var(--text-muted);
  background: var(--muted);
  padding: 6px 12px;
  border-radius: var(--radius-full);
}

.message-list {
  display: flex;
  flex-direction: column;
  gap: 14px;
}

.message-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 18px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
  animation: fadeSlideIn 0.4s ease-out backwards;

  @for $i from 1 through 6 {
    &:nth-child(#{$i}) {
      animation-delay: #{($i - 1) * 50}ms;
    }
  }
}

.message-emotion {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border-radius: var(--radius-full);
  font-size: 12px;
  margin-bottom: 10px;
  font-weight: 500;

  &.anxiety { background: var(--anxiety-light); color: #1E40AF; }
  &.anger { background: var(--anger-light); color: #991B1B; }
  &.lonely { background: var(--lonely-light); color: #075985; }
  &.low { background: var(--low-light); color: #92400E; }
  &.confused { background: var(--confused-light); color: #5B21B6; }
}

.message-text {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text);
}

.message-time {
  font-size: 12px;
  color: var(--text-muted);
  margin-top: 10px;
}

/* Diary Section */
.diary-chart {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 22px;
  box-shadow: var(--shadow-sm);
  margin-bottom: 16px;
  border: 1px solid var(--border);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h3 {
    font-family: 'Lora', serif;
    font-size: 16px;
    font-weight: 600;
    color: var(--foreground);
  }
}

.chart-period {
  font-size: 12px;
  color: var(--text-muted);
}

.chart-visual {
  height: 100px;
  background: var(--muted);
  border-radius: var(--radius-sm);
  position: relative;
  overflow: hidden;
  margin-bottom: 16px;
}

.chart-wave {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60%;
  background: linear-gradient(180deg, transparent, rgba(139, 92, 246, 0.1));
}

.chart-dots {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  padding: 0 20px 10px;
}

.chart-dot {
  width: 10px;
  border-radius: 50%;
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.4);
}

.chart-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  color: var(--text-soft);
}

.legend-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}

.diary-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-bottom: 16px;
}

.stat-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 18px 12px;
  text-align: center;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);
}

.stat-value {
  font-family: 'Lora', serif;
  font-size: 28px;
  font-weight: 700;
  color: var(--primary);
  line-height: 1;
}

.stat-label {
  font-size: 11px;
  color: var(--text-muted);
  margin-top: 6px;
}

.diary-tips {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 18px;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--border);

  h4 {
    font-family: 'Lora', serif;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 14px;
    color: var(--accent);
    display: flex;
    align-items: center;
    gap: 8px;
  }
}

.tip-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 10px;
  font-size: 13px;
  color: var(--text-soft);
  line-height: 1.6;

  &:last-child {
    margin-bottom: 0;
  }
}

.tip-icon {
  font-size: 16px;
  flex-shrink: 0;
}

/* Music Section */
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

/* Footer */
footer {
  text-align: center;
  padding: 40px 16px 24px;
  color: var(--text-muted);
  font-size: 12px;

  p {
    margin-bottom: 6px;
  }
}

/* Theme Toggle */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: var(--surface);
  border: 2px solid var(--border);
  box-shadow: var(--shadow);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  transition: all var(--transition);
  z-index: 50;

  &:hover {
    transform: scale(1.1);
    box-shadow: var(--shadow-md);
  }

  &:active {
    transform: scale(0.95);
  }

  &.lavender {
    background: linear-gradient(135deg, #EDE9FE, #FAF5FF);
    border-color: #C4B5FD;
  }

  &.morandi {
    background: linear-gradient(135deg, #E8EDE0, #F5F3F0);
    border-color: #C5CEB5;
  }
}

.theme-tooltip {
  position: absolute;
  right: 64px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--surface);
  padding: 8px 14px;
  border-radius: var(--radius-xs);
  font-size: 12px;
  font-weight: 500;
  color: var(--text);
  box-shadow: var(--shadow);
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition);
  white-space: nowrap;
  border: 1px solid var(--border);

  .theme-toggle:hover & {
    opacity: 1;
    visibility: visible;
  }
}

/* Responsive */
@media (max-width: 360px) {
  .container { padding: 16px 12px 32px; }
  header h1 { font-size: 22px; }
  .diary-stats { grid-template-columns: 1fr; }
  .tree-icon { width: 72px; height: 72px; font-size: 36px; }
  .theme-toggle { width: 48px; height: 48px; font-size: 18px; top: 16px; right: 16px; }
}
</style>
