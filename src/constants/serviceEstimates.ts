/** Following rules are followed for reading / modifying each task object */
/** RULE 1: if no reviews key is present or if needsReview is undefined or false, then append reviews: [REVIEW_AND_ITERATION] */
/** RULE 2: if needsReview key is present then use it, do not append reviews as aboin "RULE 1" */
/** RULE 3: if no days key is present, then can safely calculate from durationInHours */

import {
  ReviewsAndIteration,
  ServiceEstimates
} from '../types/serviceEstimates';

export const REVIEW_DURATION_IN_HOURS = 2;
export const REVIEW_AND_ITERATION: ReviewsAndIteration = {
  task: 'Review and Iteration',
  durationInDays: 2
};

export const serviceEstimates: ServiceEstimates[] = [
  {
    phase: 'Discovery & Planning',
    backgroundColor: '#A1C90F',
    color: '#FFFFFF',
    tasks: [
      {
        task: 'Project Kickoff & Stakeholder Interviews',
        durationInHours: 1,
        durationInDays: 1,
        needsReview: false
      },
      {
        task: 'Understanding',
        durationInHours: 16,
        needsReview: false
      },
      {
        task: 'User Research & Persona Development',
        durationInHours: 16,
        needsReview: true
      },
      {
        task: 'Competitive Analysis & Market Research ',
        durationInHours: 16,
        needsReview: true
      }
    ]
  },
  {
    phase: 'Information Architecture & Wireframing',
    backgroundColor: '#E47912',
    color: '#FFFFFF',
    tasks: [
      {
        task: 'Define User Journeys & Flows',
        durationInHours: 16,
        needsReview: true
      },
      {
        task: 'Information Architecture & Sitemap',
        durationInHours: 16,
        needsReview: true
      },
      {
        task: 'Low-Fidelity Wireframe Creation',
        durationInHours: 24,
        needsReview: true
      },
      {
        task: 'Client Review & Feedback',
        durationInHours: 8,
        needsReview: true
      }
    ]
  },
  {
    phase: 'Visual Design & Prototyping',
    backgroundColor: '#729DE7',
    color: '#FFFFFF',
    tasks: [
      {
        task: 'UI Style Guide Development',
        durationInHours: 8,
        needsReview: true
      },
      {
        task: 'High-Fidelity UI Mockups',
        durationInHours: 32,
        needsReview: true
      },
      {
        task: 'Interactive Prototype Creation',
        durationInHours: 8,
        needsReview: true
      },
      {
        task: 'Client Review & Design Revisions',
        durationInHours: 8,
        needsReview: true
      }
    ]
  },
  {
    phase: 'Testing & Handoff',
    backgroundColor: '#1EB7AA',
    color: 'white',
    tasks: [
      {
        task: 'Usability Testing',
        durationInHours: 16,
        needsReview: true
      },
      {
        task: 'Design Iterations Based on Testing',
        durationInHours: 8,
        needsReview: true
      },
      {
        task: 'Design Handoff to Development Team',
        durationInHours: 8,
        needsReview: true,
        backgroundColor: 'brown',
        color: 'white'
      }
    ]
  },
  {
    phase: 'Post-Handoff Support & Optimization',
    backgroundColor: '#FC3A74',
    color: 'white',
    tasks: [
      {
        task: 'Development Support & Clarifications',
        durationInHours: 12,
        needsReview: true
      },
      {
        task: 'Design Optimization & Final Adjustments',
        durationInHours: 12,
        needsReview: true
      }
    ]
  }
];
