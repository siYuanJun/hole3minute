<template>
  <div class="breathing-overlay" :class="{ show: isVisible }">
    <button class="breathing-close" @click="closeBreathing">×</button>
    <div class="breathing-circle-container">
      <div class="breathing-circle" :style="{ transform: circleScale }">
        <span class="breathing-text-inside">{{ currentPhase.text }}</span>
      </div>
    </div>
    <div class="breathing-guide">{{ currentPhase.guide }}</div>
    <div class="breathing-timer">{{ countdown }}</div>
    <div class="breathing-progress">
      <div class="breathing-progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <div class="breathing-tip">找一个舒适的姿势坐着<br>闭上眼睛，跟随引导呼吸</div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const breathPattern = [
  { text: '吸气', guide: '慢慢吸气...', duration: 4 },
  { text: '屏息', guide: '保持住...', duration: 7 },
  { text: '呼气', guide: '慢慢呼出...', duration: 8 },
  { text: '休息', guide: '自然呼吸...', duration: 4 }
]

const totalDuration = 60
const elapsed = ref(0)
const phaseIndex = ref(0)
const phaseElapsed = ref(0)
const countdown = ref(4)
const progress = ref(0)
const circleScale = ref('scale(1)')

let interval = null

const currentPhase = computed(() => breathPattern[phaseIndex.value])

const isVisible = computed(() => props.visible)

watch(() => props.visible, (newVal) => {
  if (newVal) {
    startBreathing()
  } else {
    stopBreathing()
  }
})

const startBreathing = () => {
  elapsed.value = 0
  phaseIndex.value = 0
  phaseElapsed.value = 0
  progress.value = 0

  interval = setInterval(updateBreathing, 1000)
}

const stopBreathing = () => {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
}

const updateBreathing = () => {
  phaseElapsed.value++
  elapsed.value++

  countdown.value = currentPhase.value.duration - phaseElapsed.value
  progress.value = (elapsed.value / totalDuration) * 100

  // Update circle scale based on breathing phase
  const phase = currentPhase.value.text
  if (phase === '吸气') {
    const scale = 0.75 + 0.25 * (phaseElapsed.value / currentPhase.value.duration)
    circleScale.value = `scale(${scale})`
  } else if (phase === '呼气') {
    const scale = 1 - 0.25 * (phaseElapsed.value / currentPhase.value.duration)
    circleScale.value = `scale(${scale})`
  } else {
    const scale = 0.75 + 0.25 * (phaseElapsed.value / currentPhase.value.duration) * 0.3
    circleScale.value = `scale(${scale})`
  }

  if (phaseElapsed.value >= currentPhase.value.duration) {
    phaseElapsed.value = 0
    phaseIndex.value = (phaseIndex.value + 1) % breathPattern.length
  }

  if (elapsed.value >= totalDuration) {
    finishBreathing()
  }
}

const finishBreathing = () => {
  stopBreathing()
  alert('✨ 完成！你做得很好。\n\n现在感觉怎么样？')
  closeBreathing()
}

const closeBreathing = () => {
  stopBreathing()
  circleScale.value = 'scale(1)'
  progress.value = 0
  emit('close')
}
</script>

<style scoped lang="scss">
.breathing-overlay {
  display: none;
  position: fixed;
  inset: 0;
  background: linear-gradient(180deg, var(--background) 0%, #F5F3FF 100%);
  z-index: 100;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;

  &.show {
    display: flex;
    animation: fadeIn 0.4s ease-out;
  }
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.breathing-circle-container {
  position: relative;
  width: 220px;
  height: 220px;
  margin-bottom: 40px;
}

.breathing-circle {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg), 0 0 80px rgba(139, 92, 246, 0.3);
  transition: transform 4s cubic-bezier(0.4, 0, 0.6, 1);
}

.breathing-text-inside {
  font-family: 'Lora', serif;
  font-size: 22px;
  color: white;
  font-weight: 500;
}

.breathing-guide {
  font-family: 'Lora', serif;
  font-size: 26px;
  color: var(--foreground);
  margin-bottom: 8px;
  font-weight: 500;
}

.breathing-timer {
  font-family: 'Lora', serif;
  font-size: 56px;
  font-weight: 300;
  color: var(--primary);
  margin-bottom: 32px;
  letter-spacing: -2px;
}

.breathing-progress {
  width: 240px;
  height: 6px;
  background: var(--muted);
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 28px;

  &-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--primary), var(--accent));
    border-radius: 3px;
    transition: width 1s linear;
  }
}

.breathing-tip {
  font-size: 14px;
  color: var(--text-soft);
  text-align: center;
  max-width: 280px;
  line-height: 1.7;
}

.breathing-close {
  position: absolute;
  top: 24px;
  right: 24px;
  width: 44px;
  height: 44px;
  border: none;
  background: var(--surface);
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  box-shadow: var(--shadow);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-soft);
  transition: all var(--transition);

  &:hover {
    background: var(--muted);
    transform: scale(1.1);
  }
}
</style>
