<template>
  <div class="message-wall">
    <div class="wall-header">
      <h3>🌳 树洞消息墙</h3>
      <span class="wall-count">{{ messages.length }}条留言</span>
    </div>

    <div class="message-list" ref="messageListRef">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        class="message-card"
        :style="{ animationDelay: index * 50 + 'ms' }"
      >
        <div class="message-emotion" :class="msg.emotion">
          {{ getEmotionEmoji(msg.emotion) }} {{ getEmotionName(msg.emotion) }}
        </div>
        <div class="message-text">{{ msg.text }}</div>
        <div class="message-time">{{ msg.time }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  },
  emotionData: {
    type: Object,
    required: true
  }
})

const messageListRef = ref(null)

// 监听消息变化，自动滚动到顶部
watch(() => props.messages.length, (newLen, oldLen) => {
  if (newLen > oldLen && messageListRef.value) {
    messageListRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
})

const getEmotionEmoji = (emotion) => {
  return props.emotionData[emotion]?.emoji || '💙'
}

const getEmotionName = (emotion) => {
  return props.emotionData[emotion]?.name || '未知'
}
</script>

<style scoped lang="scss">
.message-wall {
  animation: fadeSlideIn 0.4s ease-out;
}

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
