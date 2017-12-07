let title = {
  '用水量': {
    '3': '日均售水量',
    '4': '日均工业用水量',
    '5': '日均城镇公共用水量',
    '6': '日均居民生活用水量'
  },
  '用水量指标': {
    avgCitizenUseIndicator: '人均居民生活用水指标',
    avgCityUseIndicator: '人均城镇公共用水指标',
    avgUseIndicator: '人均城市综合用水指标',
    threeIndicator: '三产系数',
    avgIndustryUseIndicator: '104规划工业区块单位工业用地用水指标'
  }
}
let piecesObj = {
  '用水量': {
    '3': [{
      min: 2
    },
    {
      min: 1.5,
      max: 2,
      label: '1.5 -2'
    },
    {
      min: 1,
      max: 1.5,
      label: '1 -1.5'
    },
    {
      min: 0.5,
      max: 1,
      label: '0.5 -1'
    },
    {
      min: 0,
      max: 0.5,
      label: '< 0.5 '
    }
    ],
    '4': [{
      min: 2
    },
    {
      min: 1.5,
      max: 2,
      label: '1.5 -2'
    },
    {
      min: 1,
      max: 1.5,
      label: '1 -1.5'
    },
    {
      min: 0.5,
      max: 1,
      label: '0.5 -1'
    },
    {
      min: 0,
      max: 0.5,
      label: '< 0.5 '
    }
    ],
    '5': [{
      min: 2
    },
    {
      min: 1.5,
      max: 2,
      label: '1.5 -2'
    },
    {
      min: 1,
      max: 1.5,
      label: '1 -1.5'
    },
    {
      min: 0.5,
      max: 1,
      label: '0.5 -1'
    },
    {
      min: 0,
      max: 0.5,
      label: '< 0.5 '
    }
    ],
    '6': [{
      min: 2
    },
    {
      min: 1.5,
      max: 2,
      label: '1.5 -2'
    },
    {
      min: 1,
      max: 1.5,
      label: '1 -1.5'
    },
    {
      min: 0.5,
      max: 1,
      label: '0.5 -1'
    },
    {
      min: 0,
      max: 0.5,
      label: '< 0.5 '
    }
    ]
  },
  '用水量指标': {
    avgCitizenUseIndicator: [{
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
    avgCityUseIndicator: [{
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
    avgUseIndicator: [{
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
    threeIndicator: [{
      min: 1.4,
      label: '>1.4'
    },
    {
      min: 1.2,
      max: 1.4,
      label: '1.2-1.4'
    },
    {
      min: 1.0,
      max: 1.2,
      label: '1.0-1.2'
    },
    {
      min: 0.8,
      max: 1.0,
      label: '0.8-1.0'
    },
    {
      min: 0.6,
      max: 0.8,
      label: '0.6-0.8'
    },
    {
      min: 0,
      max: 0.6,
      label: '<0.6'
    }
    ],
    avgIndustryUseIndicator: [{
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
}

export {
  title,
  piecesObj
}
