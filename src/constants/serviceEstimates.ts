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
        durationInHours: 8,
        needsReview: true
      },
      {
        task: 'Client Review & Feedback',
        durationInHours: 6,
        needsReview: true
      }
    ]
  },
  {
    phase: 'Visual Design & Prototyping',
    tasks: [
      {
        task: 'UI Style Guide Development',
        durationInHours: 8,
        needsReview: true
      },
      {
        task: 'High-Fidelity UI Mockups',
        durationInHours: 12,
        needsReview: true
      },
      {
        task: 'Interactive Prototype Creation',
        durationInHours: 8,
        needsReview: true
      },
      {
        task: 'Client Review & Design Revisions',
        durationInHours: 6,
        needsReview: true
      }
    ]
  },
  {
    phase: 'Testing & Handoff',
    tasks: [
      {
        task: 'Usability Testing',
        durationInHours: 8,
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
        needsReview: true
      }
    ]
  },
  {
    phase: 'Post-Handoff Support & Optimization',
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
