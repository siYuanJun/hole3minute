<template>
  <div class="action-card" @click="handleClick">
    <div class="action-number">{{ index + 1 }}</div>
    <div class="action-content">
      <h4>{{ action.title }}</h4>
      <p>{{ action.desc }}</p>
      <div class="action-time">⏱️ {{ action.time }}</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  action: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['start'])

const handleClick = () => {
  emit('start', props.action.type)
}
</script>

<style scoped lang="scss">
.action-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 18px;
  cursor: pointer;
  transition: all var(--transition);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: flex-start;
  gap: 14px;
  border: 1px solid var(--border);

  &:hover {
    transform: translateX(6px);
    box-shadow: var(--shadow-md);
    border-color: var(--primary-light);
  }
}

.action-number {
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: var(--on-primary);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
}

.action-content {
  flex: 1;

  h4 {
    font-family: 'Lora', serif;
    font-size: 16px;
    font-weight: 600;
    margin-bottom: 6px;
    color: var(--text);
  }

  p {
    font-size: 13px;
    color: var(--text-soft);
    line-height: 1.6;
  }
}

.action-time {
  font-size: 12px;
  color: var(--accent);
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 500;
}
</style>
