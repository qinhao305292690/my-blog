module.exports = [
  // 添加时间轴导航
  {text: '主页', link: '/', icon: 'reco-home'},
  {
    text: '前端',
    icon: 'reco-api',
    items: [
      {
        text: '基础',
        items: [
          {text: 'CSS', link: '/frontEnd/css/'},
          {text: 'JS', link: '/frontEnd/javascript/'},
        ]
      },

      {
        text: '框架',
        items: [
          {text: 'vue', link: '/frontEnd/VAR/vue/'},
          {text: 'angular', link: '/frontEnd/VAR/angular/'},
          {text: 'react', link: '/frontEnd/VAR/react/'}
        ]
      },
    ]
  },
  {
    text: '后端',
    icon: 'reco-coding',
    items: [
      {
        text: 'Node', items: [
          {text: 'node基础', link: '/backEnd/node/'},
        ]
      },
    ]
  },
  {
    text: '其他',
    icon: 'reco-other',
    items: [
      {text: 'Git', link: '/other/git/'},
      {text: 'HTTP', link: '/其他技术/http/'},
    ]
  },
  // {text: '流月', link: '/timeLine/', icon: 'reco-date'},
];
