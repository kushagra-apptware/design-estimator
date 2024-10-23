export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export const TOTAL_STEPS = 5;

export interface CardDetails {
  name: string;
  imageUrl: string;
}

export const PROJECT_TYPES: CardDetails[] = [
  {
    name: 'SAAS Enterprise',
    imageUrl: 'branding'
  },
  {
    name: 'Mobile App',
    imageUrl: 'mobile-app'
  },
  {
    name: 'Design System',
    imageUrl: 'ux-audit'
  },
  {
    name: 'UI/UX Design',
    imageUrl: 'web-app'
  },
  {
    name: 'MVP Development',
    imageUrl: 'website'
  },
  {
    name: 'Branding',
    imageUrl: 'branding'
  },
  {
    name: 'Website Design',
    imageUrl: 'web-app'
  }
];

export const PROJECT_DOMAINS: CardDetails[] = [
  {
    name: 'Ecommerce',
    imageUrl: 'ai'
  },
  {
    name: 'Healthcare',
    imageUrl: 'healthcare'
  },
  {
    name: 'Fintech',
    imageUrl: 'finance'
  },
  {
    name: 'Lifestyle',
    imageUrl: 'data-analytics'
  },
  {
    name: 'Entertainment',
    imageUrl: 'other'
  },
  {
    name: 'Gaming',
    imageUrl: 'finance'
  },
  {
    name: 'Elearning',
    imageUrl: 'data-analytics'
  },
  {
    name: 'Data Science',
    imageUrl: 'other'
  }
];

export const PROJECT_STAGES: CardDetails[] = [
  {
    name: 'Concept',
    imageUrl: 'concept'
  },
  {
    name: 'Planning',
    imageUrl: 'planning'
  },
  {
    name: 'Enhancement',
    imageUrl: 'imminent'
  },
  {
    name: 'Revamp',
    imageUrl: 'execution'
  }
];

export const ErrorMessages = {
  inputFieldError: 'Please fill out the fields',
  cardError: 'Please select at least one option'
};

export const taskItemTypes = {
  TASK: 'task',
  REVIEW: 'review'
};
