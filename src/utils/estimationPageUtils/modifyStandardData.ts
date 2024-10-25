import { taskItemTypes } from '../constants';

const weekDays = ['S', 'S', 'M', 'T', 'W', 'T', 'F'];

const standardDataInHours = {
  DiscoveryPlanning: 40,
  InformationArchitectureWireframing: 46,
  VisualDesignPrototyping: 36,
  TestingHandoff: 24,
  PostHandoffSupportOptimization: 24
};

const colors = {
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
};

export const domainWiseComplexityInPercentage = {
  'Ecommerce': 0,
  'Healthcare': 40,
  'Fintech': 50,
  'Lifestyle': -10,
  'Entertainment': 0,
  'Gaming': 0,
  'Elearning': 0,
  'Data Science': -30
};

export const stageWiseComplexityInHours = {
  Concept: 0,
  Planning: -36,
  Enhancement: -40,
  Revamp: -40
};

const calculateEndDate = (
  startDate: number,
  totalUnits: number,
  unitsPerDay: number
) => {
  const daysRequired = totalUnits / unitsPerDay;
  const endDate = startDate + daysRequired - 1;

  return Math.ceil(endDate);
};

export const modifyStandardData = (
  domains: (keyof typeof domainWiseComplexityInPercentage)[],
  stages: (keyof typeof stageWiseComplexityInHours)[]
) => {
  let finalArray: any = [];
  const domainAmount = domains.reduce(
    (acc, domain) => acc + domainWiseComplexityInPercentage[domain],
    0
  );
  const stageHours = stages.reduce(
    (acc, stage) => acc + stageWiseComplexityInHours[stage],
    0
  );
  let obj = { ...standardDataInHours };
  Object.keys(standardDataInHours).forEach((key) => {
    (obj as any)[key] += ((obj as any)[key] * domainAmount) / 100;
    (obj as any)[key] += stageHours;

    const itemsLength = finalArray.length;
    let currentIndex = itemsLength;
    if (currentIndex > 0) {
      currentIndex = currentIndex - 1;
    }
    const finalSum = (obj as any)[key];
    let startDate = itemsLength ? finalArray[currentIndex].endDate + 1 : 2;
    let endDate = calculateEndDate(startDate, finalSum, 8);

    for (let i = startDate; i <= endDate; i++) {
      if (weekDays[i % 7] === 'S') {
        if (i === startDate) {
          startDate += 1;
        }
        endDate += 1;
      }
    }

    let item = {
      id: (finalArray.length + 1).toString(),
      content: key.replace(/([A-Z])/g, ' $1').trim(),
      key,
      startDate,
      endDate,
      duration: Math.ceil(finalSum / 8),
      type: taskItemTypes.TASK
    };
    if (finalSum > 0) {
      finalArray.push(item);

      let startDate = item.endDate + 1;
      let endDate = calculateEndDate(startDate, 16, 8);

      for (let i = startDate; i <= endDate; i++) {
        if (weekDays[i % 7] === 'S' && i == startDate) {
          startDate += 1;
          endDate += 1;
        }
        if (weekDays[i % 7] === 'S' && i == endDate) {
          endDate += 1;
        }
      }

      const newItem = {
        ...item,
        id: (Number(item.id) + 1).toString(),
        type: taskItemTypes.REVIEW,
        content: `Review ${item.content}`,
        startDate,
        endDate,
        duration: 2
      };
      finalArray.push(newItem);
    }
  });

  finalArray = finalArray.map((each: any) => ({
    ...each,
    icons: [{ type: 'user', content: 'A' }],
    backgroundColor: (colors as any)[each.key].backgroundColor,
    color: (colors as any)[each.key].color
  }));

  const totalDurationInDays = finalArray
    .filter((each: any) => each.type === taskItemTypes.TASK)
    .reduce((acc: any, next: { duration: any }) => acc + next.duration, 0);

  if (totalDurationInDays < 10) {
    const daysToAdd = Math.max(totalDurationInDays, 10 - totalDurationInDays);
    finalArray = finalArray.map((each: any, itemIndex: number) => {
      let durationToAdd = 0;
      if (itemIndex > 0) {
        each.startDate = finalArray[itemIndex - 1].endDate + 1;
        each.endDate = finalArray[itemIndex - 1].endDate + each.duration;
      }
      if (each.type === taskItemTypes.TASK) {
        durationToAdd = Math.floor(
          (each.duration / totalDurationInDays) * daysToAdd
        );
        each.duration += durationToAdd;
        let startDate = each.startDate;
        let endDate = startDate + durationToAdd;

        for (let i = startDate; i <= endDate; i++) {
          if (weekDays[i % 7] === 'S') {
            if (i === startDate) {
              startDate += 1;
            }
            endDate += 1;
          }
        }

        each.startDate = startDate;
        each.endDate = endDate;
      }

      if (each.type === taskItemTypes.REVIEW) {
        let startDate = each.startDate;
        let endDate = each.endDate;

        for (let i = startDate; i <= endDate; i++) {
          if (weekDays[i % 7] === 'S' && i == startDate) {
            startDate += 1;
            endDate += 1;
          }
          if (weekDays[i % 7] === 'S' && i == endDate) {
            endDate += 1;
          }
        }

        each.startDate = startDate;
        each.endDate = endDate;
      }

      return each;
    });
  }

  return finalArray;
};
