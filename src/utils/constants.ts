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
    name: 'Branding',
    imageUrl: 'branding'
  },
  {
    name: 'Mobile App',
    imageUrl: 'mobile-app'
  },
  {
    name: 'Ux Audit',
    imageUrl: 'ux-audit'
  },
  {
    name: 'Web App',
    imageUrl: 'web-app'
  },
  {
    name: 'Website',
    imageUrl: 'website'
  }
];

export const PROJECT_DOMAINS: CardDetails[] = [
  {
    name: 'AI',
    imageUrl: 'ai'
  },
  {
    name: 'Data Analytics',
    imageUrl: 'data-analytics'
  },
  {
    name: 'Finance',
    imageUrl: 'finance'
  },
  {
    name: 'Healthcare',
    imageUrl: 'healthcare'
  },
  {
    name: 'Other',
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
    name: 'Imminent',
    imageUrl: 'imminent'
  },
  {
    name: 'Execution',
    imageUrl: 'execution'
  },
  {
    name: 'Review',
    imageUrl: 'review'
  } 
];

export const ErrorMessages = {
  inputFieldError: 'Please fill out the fields',
  cardError: 'Please select at least one option'
}