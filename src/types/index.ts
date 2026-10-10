export type ProjectCategory =
  | 'All'
  | 'Business Automation'
  | 'Education'
  | 'AI'
  | 'Web Applications';

export interface WorkflowStep {
  title: string;
  stage: string;
  description: string;
}

export interface Project {
  id: string;
  name: string;
  category: 'Business Automation' | 'Education Technology' | 'Business Management' | 'AI Solutions' | 'Web Applications';
  filterCategory: 'Business Automation' | 'Education' | 'AI' | 'Web Applications';
  tagline: string;
  shortDescription: string;
  problem: string;
  whyProblemMatters: string;
  solution: string;
  features: string[];
  technologies: string[];
  status: 'Live' | 'In Development' | 'Planned';
  image: string;
  liveDemoAvailable: boolean;
  demoType?: 'stafftrack' | 'billing' | 'veegolms' | 'alphafly';
  workflow: WorkflowStep[];
  architectureNotes: string;
  businessOutcome: string;
  futureImprovements: string[];
}

export interface SolutionItem {
  id: string;
  title: string;
  category: string;
  iconName: string;
  shortDescription: string;
  problem: string;
  approach: string;
  solution: string;
  keyFeatures: string[];
  whoItsFor: string;
  technologies: string[];
  implementation: string;
  customization: string;
  relatedProjectId?: string;
}

export interface BusinessEnquiryData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  businessType: string;
  problemCategory: string;
  describeProblem: string;
  currentProcess: string;
  whatToImprove: string;
}

export interface CustomerInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  inquiryType: 'Business Problem' | 'Custom Software' | 'General Inquiry';
  category: string;
  problemDescription: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Closed';
  submittedAt: string;
  adminNotes?: string;
}
