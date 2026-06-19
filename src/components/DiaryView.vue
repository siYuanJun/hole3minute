<template>
  <div class="diary-view">
    <div class="diary-chart">
      <div class="chart-header">
        <h3>📈 情绪趋势</h3>
        <span class="chart-period">最近7天</span>
      </div>
      <div class="chart-visual">
        <div class="chart-wave"></div>
        <div class="chart-dots">
          <div
            v-for="(day, index) in weeklyData"
            :key="index"
            class="chart-dot"
            :style="{
              height: (day.intensity / 5 * 100) + 'px',
              background: getEmotionColor(day.emotion)
            }"
          >
            <span class="chart-day-label">{{ day.day }}</span>
          </div>
        </div>
      </div>
      <div class="chart-legend">
        <div
          v-for="(data, key) in emotionData"
          :key="key"
          class="legend-item"
        >
          <div class="legend-dot" :style="{ background: data.color }"></div>
          {{ data.name }}
        </div>
      </div>
    </div>

    <div class="diary-stats">
      <div class="stat-card">
        <div class="stat-value">{{ stats.totalUses }}</div>
        <div class="stat-label">使用次数</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats.streakDays }}</div>
        <div class="stat-label">连续天数</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ stats.todayEmotion }}</div>
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
</template>

<script setup>
defineProps({
  weeklyData: {
    type: Array,
    required: true
  },
  stats: {
    type: Object,
    required: true
  },
  emotionData: {
    type: Object,
    required: true
  }
})

const getEmotionColor = (emotion) => {
  // 动态获取颜色
  const colors = {
    anxiety: 'var(--anxiety)',
    anger: 'var(--anger)',
    lonely: 'var(--lonely)',
    low: 'var(--low)',
    confused: 'var(--confused)'
  }
  return colors[emotion] || 'var(--primary)'
}
</script>

<style scoped lang="scss">
.diary-view {
  animation: fadeSlideIn 0.4s ease-out;
}

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
  height: 120px;
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
  padding: 10px 15px 25px;
}

.chart-dot {
  width: 10px;
  border-radius: 5px 5px 0 0;
  box-shadow: 0 0 8px rgba(139, 92, 246, 0.4);
  position: relative;
  transition: all 0.3s ease;
}

.chart-day-label {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 10px;
  color: var(--text-muted);
  white-space: nowrap;
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
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
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

@media (max-width: 360px) {
  .diary-stats {
    grid-template-columns: 1fr;
  }
}
</style>
