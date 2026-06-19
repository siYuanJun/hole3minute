# 技术需求文档：树洞·3分钟情绪急救箱

## 文档信息
- **源文件**: PRD-树洞·3分钟情绪急救箱.md
- **创建时间**: 2026-06-20
- **状态**: 已完成

---

## 1. 功能需求映射

### 1.1 P0 核心功能（必须实现）

| PRD功能点 | 技术实现要点 | 组件/模块 | 优先级 | 状态 |
|----------|------------|----------|--------|------|
| 情绪选择 | 5种情绪卡牌点击选中状态 | EmotionCard.vue | P0 | ✅ 已实现 |
| 情绪程度调节 | 1-5级滑动条，v-model绑定 | IntensitySlider | P0 | ✅ 已实现 |
| 动作推荐 | 根据emotion+intensity计算推荐 | computed: recommendedActions | P0 | ✅ 已实现 |
| 深呼吸引导 | 60秒4-7-8呼吸法动画 | BreathingGuide.vue | P0 | ✅ 已实现 |

### 1.2 P1 重要功能

| PRD功能点 | 技术实现要点 | 组件/模块 | 优先级 | 状态 |
|----------|------------|----------|--------|------|
| 匿名留言 | 留言提交 → 添加到messageWallData数组 | submitNote() | P0 | ⚠️ 待完善 |
| 树洞消息墙 | 展示留言列表，支持实时更新 | MessageWall | P0 | ⚠️ 待完善 |

### 1.3 P2 增强功能

| PRD功能点 | 技术实现要点 | 组件/模块 | 优先级 | 状态 |
|----------|------------|----------|--------|------|
| 情绪日记 | 7天折线图+统计数据展示 | DiaryView | P0 | ⚠️ 待完善 |
| 音乐推荐 | 4种心情歌单，点击播放 | MusicPlayer | P0 | ⚠️ 待完善 |

---

## 2. 技术实现要点

### 2.1 状态管理（Vue 3 Composition API）

```javascript
// 核心状态
const selectedEmotion = ref(null)      // 当前选中情绪
const intensity = ref(3)               // 情绪程度 1-5
const showBreathing = ref(false)       // 呼吸引导显示状态
const noteText = ref('')               // 留言内容
const noteSubmitted = ref(false)        // 留言是否已提交

// 音乐播放状态
const isPlaying = ref(false)           // 是否正在播放
const currentSong = ref(null)           // 当前播放歌曲

// 消息墙状态
const messageWallData = ref([])         // 留言数据列表
```

### 2.2 动作推荐算法

```javascript
const recommendedActions = computed(() => {
  if (!selectedEmotion.value) return []
  
  let actions = [...emotionData[selectedEmotion.value].actions]
  
  // 情绪程度 >= 4 时，优先推荐深呼吸
  if (intensity.value >= 4) {
    actions = [
      { title: '先做深呼吸平复一下', desc: '跟着引导做60秒深呼吸', time: '60秒', type: 'breathing' },
      ...actions
    ]
  }
  
  return actions
})
```

### 2.3 深呼吸动画实现

- 使用 `setInterval` 每秒更新倒计时
- CSS `transform: scale()` 实现圆形呼吸动画
- 4-7-8 呼吸法：吸气4秒 → 屏息7秒 → 呼气8秒 → 休息4秒

### 2.4 匿名留言实现

```javascript
const submitNote = () => {
  if (noteText.value.trim()) {
    // 添加到数组开头
    messageWallData.value.unshift({
      emotion: selectedEmotion.value || 'low',
      text: noteText.value,
      time: '刚刚'
    })
    noteSubmitted.value = true
    
    // 提示用户
    alert('🌱 已收到。愿你今晚好梦。')
  }
}
```

### 2.5 音乐播放实现

```javascript
const playMusic = (song) => {
  // 创建 Audio 对象
  const audio = new Audio(song.url)
  audio.play()
  
  // 更新播放状态
  isPlaying.value = true
  currentSong.value = song
}

// 使用 Web Audio API 或第三方库增强体验
// 推荐：Howler.js 或 Tone.js
```

---

## 3. 组件设计

### 3.1 现有组件

| 组件 | 职责 | 状态 |
|------|------|------|
| EmotionCard.vue | 情绪卡牌展示和选中 | ✅ 完成 |
| ActionCard.vue | 动作卡片展示 | ✅ 完成 |
| BreathingGuide.vue | 深呼吸引导浮层 | ✅ 完成 |

### 3.2 待新增组件

| 组件 | 职责 | 优先级 |
|------|------|--------|
| MessageWall.vue | 树洞消息墙展示 | P1 |
| MessageCard.vue | 单条留言卡片 | P1 |
| MusicPlayer.vue | 音乐播放器组件 | P2 |
| MusicCard.vue | 单首歌卡片 | P2 |
| DiaryChart.vue | 情绪日记图表 | P2 |
| IntensitySlider.vue | 情绪程度滑动条 | P0 |

---

## 4. 数据结构

### 4.1 情绪数据

```javascript
const emotionData = {
  anxiety: {
    emoji: '💙',
    name: '焦虑',
    color: 'var(--anxiety)',
    description: '心里乱糟糟的，不知道该怎么办',
    actions: [
      { title: '打开窗户深呼吸5次', desc: '...', time: '60秒', type: 'breathing' },
      { title: '给1个人发一句真话', desc: '...', time: '30秒', type: 'social' },
      { title: '听一首你高中最爱听的歌', desc: '...', time: '3分钟', type: 'music' }
    ]
  },
  // ... 其他情绪
}
```

### 4.2 留言数据

```javascript
const messageWallData = ref([
  { id: 1, emotion: 'lonely', text: '今天一个人吃完了一整盒外卖...', time: '刚刚' },
  { id: 2, emotion: 'anxiety', text: '论文又被导师退回来了...', time: '15分钟前' }
])
```

### 4.3 音乐数据

```javascript
const musicData = {
  calm: [
    { id: 1, title: '雨后森林', artist: '自然音效', cover: '🌲', duration: '5:30', url: '/music/rain-forest.mp3' },
    // ...
  ],
  // ...
}
```

---

## 5. API 接口设计（预留）

虽然当前版本不涉及后端，但预留接口以便后续扩展：

| 接口 | 方法 | 说明 | 状态 |
|------|------|------|------|
| /api/messages | GET | 获取留言列表 | 预留 |
| /api/messages | POST | 提交留言 | 预留 |
| /api/music | GET | 获取音乐列表 | 预留 |
| /api/diary | GET/POST | 情绪日记 | 预留 |

---

## 6. 性能优化

| 优化点 | 方案 | 优先级 |
|--------|------|--------|
| 懒加载 | 使用 `v-if` 延迟加载非活跃 Tab 内容 | P1 |
| 虚拟滚动 | 消息墙超过100条时启用虚拟滚动 | P2 |
| 音频预加载 | 音乐切换时预加载下一首 | P2 |
| 防抖处理 | 留言提交添加防抖 | P1 |

---

## 7. 测试要点

| 功能 | 测试用例 | 状态 |
|------|---------|------|
| 情绪选择 | 点击不同情绪卡牌，状态正确切换 | ✅ |
| 程度调节 | 滑动条拖动，数值正确更新 | ✅ |
| 动作推荐 | 不同情绪+程度组合，推荐结果正确 | ✅ |
| 深呼吸 | 动画流畅，倒计时准确，完成提示 | ✅ |
| 留言提交 | 提交后显示反馈，消息墙更新 | ⚠️ 待测试 |
| 音乐播放 | 点击播放，音频正常播放 | ⚠️ 待实现 |
| 主题切换 | 两种主题正确切换 | ✅ |

---

## 8. 风险评估

| 风险点 | 影响 | 应对方案 |
|--------|------|----------|
| 音乐版权 | 使用真实音乐可能涉及版权 | 使用免费音乐或模拟数据 |
| 数据持久化 | 刷新页面数据丢失 | 提示用户，或添加 localStorage |
| 音频兼容性 | 不同浏览器音频支持差异 | 使用跨浏览器音频库 |

---

## 9. 后续规划

| 阶段 | 功能 | 说明 |
|------|------|------|
| v1.0 | MVP版本 | 核心情绪急救功能 |
| v1.1 | 音乐播放器 | 真实音频播放 |
| v1.2 | 数据持久化 | localStorage 保存日记 |
| v2.0 | 后端API | 真实留言墙 |
