let title = {
  citizen: '人均居民生活用水指标',
  public: '人均城镇用水指标',
  city: '人均城市综合用水指标',
  threeRatio: '三产系数',
  industry: '104规划工业区块的用水量指标'
}
let piecesObj = {
  citizen: [{
    min: 160
  },
  {
    min: 140,
    max: 160
  },
  {
    min: 120,
    max: 140
  },
  {
    min: 100,
    max: 120
  },
  {
    min: 0,
    max: 100
  }
  ],
  public: [{
    min: 140
  },
  {
    min: 120,
    max: 140
  },
  {
    min: 100,
    max: 120
  },
  {
    min: 80,
    max: 100
  },
  {
    min: 60,
    max: 80
  },
  {
    min: 0,
    max: 60
  }
  ],
  city: [{
    min: 350
  },
  {
    min: 320,
    max: 350
  },
  {
    min: 290,
    max: 320
  },
  {
    min: 260,
    max: 290
  },
  {
    min: 0,
    max: 260
  }
  ],
  threeRatio: [{
    min: 1.4
  },
  {
    min: 1.2,
    max: 1.4
  },
  {
    min: 1.0,
    max: 1.2
  },
  {
    min: 0.8,
    max: 1.0
  },
  {
    min: 0.6,
    max: 0.8
  },
  {
    min: 0,
    max: 0.6
  }
  ],
  industry: [{
    min: 8000
  },
  {
    min: 6000,
    max: 8000
  },
  {
    min: 4000,
    max: 6000
  },
  {
    min: 2000,
    max: 4000
  },
  {
    min: 0,
    max: 2000
  }
  ]
}
let range = {
  citizen: [1, 200],
  public: [1, 180],
  city: [1, 300],
  threeRatio: [0.1, 2],
  industry: [1, 10000]
}
export {
  title,
  piecesObj,
  range
}
