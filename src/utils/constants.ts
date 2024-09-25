export enum ButtonTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary'
}

export const TOTAL_STEPS = 5;

export interface ProjectInfoInterface {
  name: string;
  imageUrl: string;
}

export const PROJECT_TYPES: ProjectInfoInterface[] = [
  {
    name: 'Branding',
    imageUrl: 'Branding'
  },
  {
    name: 'Mobile App',
    imageUrl: 'MobileApp'
  },
  {
    name: 'Ux Audit',
    imageUrl: 'UxAudit'
  },
  {
    name: 'Web App',
    imageUrl: 'WebApp'
  },
  {
    name: 'Website',
    imageUrl: 'Website'
  }
];

export const PROJECT_DOMAIN: ProjectInfoInterface[] = [
  {
    name: 'AI',
    imageUrl: 'AI'
  },
  {
    name: 'Data Analytics',
    imageUrl: 'DataAnalytics'
  },
  {
    name: 'Finance',
    imageUrl: 'Finance'
  },
  {
    name: 'Healthcare',
    imageUrl: 'Healthcare'
  },
  {
    name: 'Other',
    imageUrl: 'Other'
  }
];

export const PROJECT_STAGE: ProjectInfoInterface[] = [
  {
    name: 'Concept',
    imageUrl: 'Concept'
  },
  {
    name: 'Planning',
    imageUrl: 'Planning'
  },
  {
    name: 'Imminent',
    imageUrl: 'Imminent'
  },
  {
    name: 'Execution',
    imageUrl: 'Execution'
  },
  {
    name: 'Review',
    imageUrl: 'Review'
  } 
];

export const ErrorMessages = {
  inputFieldError: 'Please fill out the fields',
  cardError: 'Please select at least one option'
}