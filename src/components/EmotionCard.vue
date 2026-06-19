<template>
  <div
    class="emotion-card"
    :class="[emotion, { selected: isSelected }]"
    :style="{ '--emotion-color': color }"
    @click="handleClick"
  >
    <div class="emotion-icon">{{ emoji }}</div>
    <div class="emotion-info">
      <h3>{{ name }}</h3>
      <p>{{ description }}</p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  emotion: {
    type: String,
    required: true
  },
  emoji: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  color: {
    type: String,
    required: true
  },
  isSelected: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['select'])

const handleClick = () => {
  emit('select')
}
</script>

<style scoped lang="scss">
.emotion-card {
  background: var(--surface);
  border-radius: var(--radius);
  padding: 18px;
  cursor: pointer;
  transition: all var(--transition);
  box-shadow: var(--shadow-sm);
  display: flex;
  align-items: center;
  gap: 16px;
  border: 2px solid transparent;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--emotion-color);
    opacity: 0;
    transition: opacity var(--transition);
  }

  &:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: var(--emotion-color);

    &::before {
      opacity: 1;
    }
  }

  &:active {
    transform: scale(0.98);
  }

  &.selected {
    border-color: var(--emotion-color);
    background: var(--surface);

    &::before {
      opacity: 1;
    }
  }
}

.emotion-icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  flex-shrink: 0;
  background: var(--emotion-color);
  transition: transform var(--transition);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

  .emotion-card:hover & {
    transform: scale(1.08);
  }
}

.emotion-info {
  h3 {
    font-family: 'Lora', serif;
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 4px;
    color: var(--text);
  }

  p {
    font-size: 13px;
    color: var(--text-soft);
    line-height: 1.5;
  }
}
</style>
