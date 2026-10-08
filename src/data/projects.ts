import { Project } from '../types';

export const projectsData: Project[] = [
  {
    id: 'stafftrack',
    name: 'StaffTrack',
    category: 'Business Automation',
    filterCategory: 'Business Automation',
    tagline: 'Staff management and daily work automation system',
    shortDescription:
      'Manage team attendance, priority task distribution, and daily operational reports.',
    problem:
      'Lost hours chasing staff updates in WhatsApp groups and resolving conflicting paper logs.',
    whyProblemMatters:
      'When growing businesses rely on fragmented spreadsheets and messaging apps, management spends up to 2-3 hours every day chasing updates instead of serving customers.',
    solution:
      'A centralized web app with GPS check-ins, daily task queues, and automated evening summaries.',
    features: [
      'Digital attendance logging with timestamp verification',
      'Daily task distribution and priority assignment',
      'Automated end-of-day work submission and reporting',
      'Pending task follow-up reminders and schedule notifications',
      'Management analytics dashboard with completion metrics and workload breakdown'
    ],
    technologies: ['React', 'Python / Django', 'PostgreSQL / Database', 'Automation Workflows', 'Operational Analytics'],
    status: 'Live',
    image: '/src/assets/images/project_stafftrack_ui_1790494504851.jpg',
    liveDemoAvailable: true,
    demoType: 'stafftrack',
    workflow: [
      {
        stage: '01',
        title: 'Problem',
        description: 'Scattered daily tasks, missed follow-ups, and manual attendance on spreadsheets.'
      },
      {
        stage: '02',
        title: 'Manual Process',
        description: 'Supervisors spent hours calling staff, consolidating WhatsApp messages, and fixing attendance disputes.'
      },
      {
        stage: '03',
        title: 'Automation',
        description: 'Scheduled task triggers, automated attendance validation, and instant reminder pipelines.'
      },
      {
        stage: '04',
        title: 'Dashboard',
        description: 'Unified operational cockpit showing on-duty headcount, active tasks, and overdue items.'
      },
      {
        stage: '05',
        title: 'Reports',
        description: 'Consolidated end-of-day summary reports generated automatically for leadership.'
      },
      {
        stage: '06',
        title: 'Business Outcome',
        description: 'Eliminated manual status chasing, improved on-time task delivery, and provided verifiable accountability.'
      }
    ],
    architectureNotes:
      'Engineered with a responsive React frontend decoupled from a Django REST backend service. Relational schemas enforce data consistency across staff profiles, attendance logs, and task lifecycle events with scheduled background worker routines.',
    businessOutcome:
      'Reduces administrative overhead by over 70%, guarantees complete visibility into daily staff deliverables, and creates an audit-ready operational record.',
    futureImprovements: [
      'Geo-fenced mobile check-in verification',
      'Multi-department hierarchical approval matrices',
      'Automated payroll export integrations'
    ]
  },
  {
    id: 'billing-software',
    name: 'BIlling Software',
    category: 'Business Management',
    filterCategory: 'Web Applications',
    tagline: 'Business billing and operations management application',
    shortDescription:
      'Fast customer invoicing, automatic GST calculation, and pending dues tracking.',
    problem:
      'Slow manual billing, arithmetic mistakes in Excel, and forgotten payment follow-ups.',
    whyProblemMatters:
      'Manual billing is slow, prone to arithmetic mistakes, and makes tracking outstanding dues difficult. Without clear financial tracking, business operators cannot forecast cash flow efficiently.',
    solution:
      'A dedicated web app that standardizes invoicing, manages item catalogs, and tracks payments.',
    features: [
      'Rapid itemized invoice generation with tax calculation',
      'Customer accounts and transaction history ledger',
      'Payment status tracking (Paid, Pending, Overdue)',
      'PDF receipt generation and instant print-ready outputs',
      'Daily revenue summaries and category-wise sales tracking'
    ],
    technologies: ['Web Application', 'Database', 'Business Automation', 'Tailwind CSS', 'REST Services'],
    status: 'Live',
    image: '/src/assets/images/project_billing_ui_1790494521364.jpg',
    liveDemoAvailable: true,
    demoType: 'billing',
    workflow: [
      {
        stage: '01',
        title: 'Problem',
        description: 'Manual ledger books, duplicate invoice numbering, and untracked outstanding balances.'
      },
      {
        stage: '02',
        title: 'Manual Process',
        description: 'Staff manually typed numbers into Word or Excel, printed physical sheets, and phoned clients manually.'
      },
      {
        stage: '03',
        title: 'Automation',
        description: 'Automated invoice serializing, tax computation, discount logic, and balance reconciliation.'
      },
      {
        stage: '04',
        title: 'Dashboard',
        description: 'Clean financial view displaying daily collection, pending invoices, and top billing clients.'
      },
      {
        stage: '05',
        title: 'Reports',
        description: 'One-click daily, monthly, and tax-ready balance statements.'
      },
      {
        stage: '06',
        title: 'Business Outcome',
        description: 'Instant invoice turnaround, zero arithmetic discrepancies, and structured cash-flow tracking.'
      }
    ],
    architectureNotes:
      'Built with optimized transactional database indexing for fast ledger querying, client-side PDF rendering, and modular calculation engines ensuring strict monetary precision.',
    businessOutcome:
      'Cuts billing time per client from 8 minutes down to 30 seconds, eliminates calculation errors, and gives operators instant clarity on outstanding receivables.',
    futureImprovements: [
      'Direct payment gateway webhook reconciliation',
      'Multi-currency and localized taxation matrices',
      'Automated WhatsApp and SMS payment reminders'
    ]
  },
  {
    id: 'alpha-fly-lms',
    name: 'LMS',
    category: 'Education Technology',
    filterCategory: 'Education',
    tagline: 'Learning management system for students, courses and assessments',
    shortDescription:
      'Structured curriculum modules, automated quiz grading, and student progression analytics.',
    problem:
      'Disorganized course materials over chat, untracked progress, and tedious manual grading.',
    whyProblemMatters:
      'Without an organized learning platform, educators spend excessive time organizing files, while students lose momentum without instant feedback.',
    solution:
      'A structured LMS with modular lesson tracks, automated assessments, and instructor analytics.',
    features: [
      'Multi-tier course curriculum and module management',
      'Student enrollment, cohort tracking, and activity timelines',
      'Automated quiz evaluations and subjective assignment submission pipelines',
      'AI-assisted question generation and learning feedback modules',
      'Instructor gradebook and comprehensive completion certificates'
    ],
    technologies: ['React', 'Python / Django', 'Database', 'AI Features', 'REST APIs'],
    status: 'Live',
    image: '/src/assets/images/project_alphafly_lms_ui_1790494538619.jpg',
    liveDemoAvailable: true,
    demoType: 'alphafly',
    workflow: [
      {
        stage: '01',
        title: 'Problem',
        description: 'Course materials shared over email, student assessments scattered, and unmonitored drop-off rates.'
      },
      {
        stage: '02',
        title: 'Manual Process',
        description: 'Instructors manually graded assignments one by one and kept track of student progress in separate files.'
      },
      {
        stage: '03',
        title: 'Automation',
        description: 'Automated milestone unlocking, quiz grading, and progress trigger alerts for inactive students.'
      },
      {
        stage: '04',
        title: 'Dashboard',
        description: 'Dedicated portals for both students (milestones, lessons) and instructors (cohort performance).'
      },
      {
        stage: '05',
        title: 'Reports',
        description: 'Cohort progression reports, assessment score distributions, and completion analytics.'
      },
      {
        stage: '06',
        title: 'Business Outcome',
        description: 'Scalable course delivery, higher student completion rates, and structured educational management.'
      }
    ],
    architectureNotes:
      'Engineered with modular state management, role-based access control (Student vs Instructor vs Admin), asynchronous media processing, and integrated AI recommendation endpoints.',
    businessOutcome:
      'Allows educational institutes to handle 5x more students per batch without increasing operational staff, while maintaining high course completion and retention rates.',
    futureImprovements: [
      'Interactive coding sandbox embedded inside lessons',
      'AI student tutor for instant concept clarifications',
      'White-label multi-tenant branding for institutional partners'
    ]
  }
];

export const getProjectById = (id: string): Project | undefined => {
  return projectsData.find((p) => p.id === id);
};
