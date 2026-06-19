<template>
  <div class="intensity-slider">
    <div class="intensity-label">{{ label }}</div>
    <div class="slider-container">
      <input
        type="range"
        class="slider"
        :value="modelValue"
        @input="$emit('update:modelValue', Number($event.target.value))"
        min="1"
        max="5"
        :step="1"
      />
      <div class="slider-track">
        <div
          class="slider-fill"
          :style="{ width: ((modelValue - 1) / 4 * 100) + '%' }"
        ></div>
      </div>
      <div class="slider-markers">
        <span
          v-for="n in 5"
          :key="n"
          class="marker"
          :class="{ active: n <= modelValue }"
          @click="$emit('update:modelValue', n)"
        >
          {{ n }}
        </span>
      </div>
    </div>
    <div class="intensity-hints">
      <span>{{ hints[0] }}</span>
      <span>{{ hints[1] }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: Number,
    required: true,
    default: 3
  },
  label: {
    type: String,
    default: '现在这个情绪有多强烈？'
  },
  hints: {
    type: Array,
    default: () => ['一点点', '非常强烈']
  }
})

defineEmits(['update:modelValue'])
</script>

<style scoped lang="scss">
.intensity-slider {
  margin: 24px 0;
}

.intensity-label {
  font-family: 'Lora', serif;
  font-size: 14px;
  font-weight: 500;
  color: var(--text);
  margin-bottom: 14px;
}

.slider-container {
  position: relative;
  padding: 10px 0 30px;
}

.slider {
  position: relative;
  z-index: 2;
  width: 100%;
  height: 8px;
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    box-shadow: 0 2px 10px rgba(139, 92, 246, 0.4);
    cursor: grab;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.15);
      box-shadow: 0 4px 15px rgba(139, 92, 246, 0.5);
    }

    &:active {
      cursor: grabbing;
      transform: scale(1.1);
    }
  }

  &::-moz-range-thumb {
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    box-shadow: 0 2px 10px rgba(139, 92, 246, 0.4);
    cursor: grab;
    border: none;
  }
}

.slider-track {
  position: absolute;
  top: 10px;
  left: 0;
  right: 0;
  height: 8px;
  background: var(--muted);
  border-radius: 4px;
  z-index: 1;
  overflow: hidden;
}

.slider-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-light), var(--primary));
  border-radius: 4px;
  transition: width 0.15s ease;
}

.slider-markers {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  padding: 0 3px;
}

.marker {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--surface);
  border: 2px solid var(--border);
  font-size: 11px;
  font-weight: 600;
  color: var(--text-muted);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: var(--primary-light);
    color: var(--primary);
    transform: scale(1.1);
  }

  &.active {
    background: var(--primary);
    border-color: var(--primary);
    color: white;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.3);
  }
}

.intensity-hints {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 12px;
  color: var(--text-soft);
}
</style>
