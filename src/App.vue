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

      <!-- Home Section: 情绪选择 -->
      <div v-show="activeTab === 'home'" class="section">
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
        <div v-show="selectedEmotion" class="intensity-section">
          <IntensitySlider v-model="intensity" />
          <button class="action-btn" @click="showActions">给我推荐动作</button>
        </div>
      </div>

      <!-- Actions Section: 动作推荐 -->
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
          <div v-show="noteSubmitted" class="note-feedback">
            <div class="note-feedback-icon">🌱</div>
            <div class="note-feedback-text">已收到。愿你今晚好梦。</div>
          </div>
        </div>
      </div>

      <!-- Wall Section: 树洞消息墙 -->
      <div v-show="activeTab === 'wall'" class="section">
        <MessageWall :messages="messages" :emotion-data="emotionData" />
      </div>

      <!-- Diary Section: 情绪日记 -->
      <div v-show="activeTab === 'diary'" class="section">
        <DiaryView
          :weekly-data="diaryData.weekly"
          :stats="diaryData.stats"
          :emotion-data="emotionData"
        />
      </div>

      <!-- Music Section: 音乐推荐 -->
      <div v-show="activeTab === 'music'" class="section">
        <MusicPlayer :music-data="musicData" @play="onMusicPlay" />
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
import IntensitySlider from './components/IntensitySlider.vue'
import MessageWall from './components/MessageWall.vue'
import DiaryView from './components/DiaryView.vue'
import MusicPlayer from './components/MusicPlayer.vue'
import { emotionData, messageWallData as originalMessages, musicData, diaryData } from './data/emotions.js'

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

// Note & Message Wall - 使用 ref 包装使其响应式
const noteText = ref('')
const noteSubmitted = ref(false)
const messages = ref([...originalMessages])

const submitNote = () => {
  if (noteText.value.trim()) {
    // 添加到消息列表开头
    messages.value.unshift({
      emotion: selectedEmotion.value || 'low',
      text: noteText.value,
      time: '刚刚'
    })
    noteSubmitted.value = true
    noteText.value = ''
  } else {
    alert('写点什么再提交吧～')
  }
}

// Music
const onMusicPlay = (song) => {
  console.log('Playing:', song.title)
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
  animation: fadeSlideIn 0.4s ease-out;
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
  animation: fadeSlideIn 0.3s ease-out;
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
  text-align: center;
  padding: 28px;
  animation: fadeSlideIn 0.5s ease-out;
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
  .tree-icon { width: 72px; height: 72px; font-size: 36px; }
  .theme-toggle { width: 48px; height: 48px; font-size: 18px; top: 16px; right: 16px; }
}
</style>
