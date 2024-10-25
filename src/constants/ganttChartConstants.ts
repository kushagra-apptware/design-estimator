export const ganttChartConstants = Object.freeze({
  standardDataInHours: {
    DiscoveryPlanning: 40,
    InformationArchitectureWireframing: 46,
    VisualDesignPrototyping: 36,
    TestingHandoff: 24,
    PostHandoffSupportOptimization: 24
  },
  stageWiseComplexityInHours: {
    Concept: 0,
    Planning: -36,
    Enhancement: -40,
    Revamp: -40
  },
  colors: {
    DiscoveryPlanning: {
      backgroundColor: '#BAE813',
      color: 'white'
    },
    InformationArchitectureWireframing: {
      backgroundColor: '#E47912',
      color: 'white'
    },
    VisualDesignPrototyping: {
      backgroundColor: '#729DE7',
      color: 'white'
    },
    TestingHandoff: {
      backgroundColor: '#1EB7AA',
      color: 'white'
    },
    PostHandoffSupportOptimization: {
      backgroundColor: '#FC3A74',
      color: 'white'
    }
  },
  domainWiseComplexityInPercentage: {
    'Ecommerce': 0,
    'Healthcare': 40,
    'Fintech': 50,
    'Lifestyle': -10,
    'Entertainment': 0,
    'Gaming': 0,
    'Elearning': 0,
    'Data Science': -30
  }
});
