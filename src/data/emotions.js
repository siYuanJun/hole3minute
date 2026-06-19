// 情绪数据
export const emotionData = {
  anxiety: {
    emoji: '💙',
    name: '焦虑',
    color: 'var(--anxiety)',
    description: '心里乱糟糟的，不知道该怎么办',
    actions: [
      { title: '打开窗户深呼吸5次', desc: '4秒吸气，7秒屏息，8秒呼气，配合动画引导', time: '60秒', type: 'breathing' },
      { title: '给1个人发一句真话', desc: '不是"在吗"，而是"我今天有点难过"', time: '30秒', type: 'social' },
      { title: '听一首你高中最爱听的歌', desc: '让回忆带你回到一个美好的时刻', time: '3分钟', type: 'music' }
    ]
  },
  anger: {
    emoji: '💔',
    name: '愤怒',
    color: 'var(--anger)',
    description: '很生气，想发泄但怕伤到别人',
    actions: [
      { title: '喝一杯温水', desc: '慢慢喝，感受水流过喉咙的感觉', time: '60秒', type: 'calm' },
      { title: '写下你现在的感受', desc: '不用管格式，写完撕掉就行', time: '2分钟', type: 'write' },
      { title: '去楼下走一圈', desc: '看看路边的树、天空、行人', time: '5分钟', type: 'move' }
    ]
  },
  lonely: {
    emoji: '🤍',
    name: '孤独',
    color: 'var(--lonely)',
    description: '一个人待着，想找人说说话',
    actions: [
      { title: '给老朋友发个表情包', desc: '不用说话，就发个可爱的表情', time: '30秒', type: 'social' },
      { title: '看一部你喜欢的电影片段', desc: '重温一个让你笑过的场景', time: '3分钟', type: 'music' },
      { title: '抱抱家里的宠物或枕头', desc: '给自己一个拥抱的感觉', time: '30秒', type: 'calm' }
    ]
  },
  low: {
    emoji: '💛',
    name: '低落',
    color: 'var(--low)',
    description: '没什么动力，什么都不想做',
    actions: [
      { title: '躺下来闭眼休息', desc: '什么都不想，就躺着', time: '5分钟', type: 'rest' },
      { title: '吃一点你喜欢的东西', desc: '巧克力、水果、零食都可以', time: '5分钟', type: 'treat' },
      { title: '看窗外发呆', desc: '看看云、看看鸟、看看路', time: '3分钟', type: 'observe' }
    ]
  },
  confused: {
    emoji: '💜',
    name: '迷茫',
    color: 'var(--confused)',
    description: '不知道自己要什么，找不到方向',
    actions: [
      { title: '写下你现在的困惑', desc: '不用找答案，就写下来', time: '3分钟', type: 'write' },
      { title: '看一张你喜欢的照片', desc: '旅行、家人、宠物的照片都可以', time: '1分钟', type: 'memory' },
      { title: '做一件很小的事', desc: '整理桌面、洗个杯子、叠件衣服', time: '2分钟', type: 'action' }
    ]
  }
}

// 树洞消息墙数据
export const messageWallData = [
  { emotion: 'lonely', text: '今天一个人吃完了一整盒外卖，突然不知道自己在干什么。', time: '3分钟前' },
  { emotion: 'anxiety', text: '论文又被导师退回来了，已经是第三次了...', time: '15分钟前' },
  { emotion: 'low', text: '每天醒来都觉得好累，不知道这样的日子还要持续多久。', time: '32分钟前' },
  { emotion: 'confused', text: '24岁了，还是不知道自己想要什么。很迷茫。', time: '1小时前' },
  { emotion: 'anger', text: '为什么总是我加班做最多的事，却拿最少的工资？', time: '2小时前' },
  { emotion: 'lonely', text: '一个人在外地工作，生病了也没人照顾。', time: '3小时前' }
]

// 音乐数据
export const musicData = {
  calm: [
    { title: '雨后森林', artist: '自然音效', cover: '🌲', mood: '平静' },
    { title: '海浪声', artist: '白噪音', cover: '🌊', mood: '平静' },
    { title: '深夜钢琴', artist: '轻音乐', cover: '🎹', mood: '平静' }
  ],
  comfort: [
    { title: '拥抱', artist: '治愈系', cover: '🤗', mood: '治愈' },
    { title: '你在就好', artist: '温暖女声', cover: '💕', mood: '治愈' },
    { title: '给未来的自己', artist: '励志', cover: '🌟', mood: '治愈' }
  ],
  energy: [
    { title: '重新开始', artist: '摇滚', cover: '🔥', mood: '振奋' },
    { title: '追梦赤子心', artist: '热血', cover: '⚡', mood: '振奋' },
    { title: '我相信', artist: '励志', cover: '✊', mood: '振奋' }
  ],
  release: [
    { title: '释放', artist: '电子', cover: '💥', mood: '释放' },
    { title: '大声说再见', artist: '流行', cover: '🎸', mood: '释放' },
    { title: '海阔天空', artist: '摇滚', cover: '🌈', mood: '释放' }
  ]
}

// 情绪日记数据
export const diaryData = {
  weekly: [
    { day: '周一', intensity: 4, emotion: 'anxiety' },
    { day: '周二', intensity: 3, emotion: 'lonely' },
    { day: '周三', intensity: 2, emotion: 'low' },
    { day: '周四', intensity: 3, emotion: 'confused' },
    { day: '周五', intensity: 3, emotion: 'anxiety' },
    { day: '周六', intensity: 2, emotion: 'low' },
    { day: '周日', intensity: 3, emotion: 'lonely' }
  ],
  stats: {
    totalUses: 23,
    streakDays: 5,
    todayEmotion: '💙'
  }
}
