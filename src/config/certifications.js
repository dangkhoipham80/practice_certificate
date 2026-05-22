import { gh300Questions } from '../data/gh300Questions';

export const certifications = [
  {
    id: 'gh-300',
    name: 'GitHub Copilot',
    exam: 'GH-300',
    provider: 'GitHub',
    level: 'Professional',
    questions: gh300Questions.length,
    status: 'Ready'
  },
  {
    id: 'az-900',
    name: 'Azure Fundamentals',
    exam: 'AZ-900',
    provider: 'Microsoft',
    level: 'Fundamentals',
    questions: 0,
    status: 'Coming next'
  },
  {
    id: 'aws-clf',
    name: 'AWS Cloud Practitioner',
    exam: 'CLF-C02',
    provider: 'AWS',
    level: 'Foundational',
    questions: 0,
    status: 'Template'
  }
];
