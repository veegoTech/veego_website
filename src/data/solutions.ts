import { SolutionItem } from '../types';

export const solutionsData: SolutionItem[] = [
  {
    id: 'staff-automation',
    title: 'Staff & Workforce Operations',
    category: 'Operations & Workforce',
    iconName: 'Users',
    shortDescription: 'Track attendance, task queues, and daily team deliverables without WhatsApp confusion.',
    problem: 'Staff work and attendance are scattered across WhatsApp chats and paper sheets.',
    approach: 'Centralize check-ins, tasks, and daily reports into a single dashboard.',
    solution: 'A simple web portal with daily check-ins, assigned task boards, and automated status summaries.',
    keyFeatures: [
      'Digital attendance logging with timestamp audit trails',
      'Daily priority task distribution and assignment',
      'Mandatory end-of-day work submission forms',
      'Operational health dashboards for managers and business owners'
    ],
    whoItsFor:
      'Companies with 5 to 200+ employees, field teams, retail staff, and project-driven organizations.',
    technologies: ['React', 'Django REST Framework', 'PostgreSQL', 'Operational Dashboards'],
    implementation: 'Phased rollout with role-based access setup and 1-day staff orientation.',
    customization: 'Custom shift schedules, specialized field report fields, and management hierarchies.',
    relatedProjectId: 'stafftrack'
  },
  {
    id: 'billing-operations',
    title: 'Billing, Invoicing & Receivables',
    category: 'Finance & Billing',
    iconName: 'Receipt',
    shortDescription: 'Fast invoice generation, automatic tax calculation, and payment follow-ups.',
    problem: 'Manual Excel billing causes delayed invoices, wrong tax math, and forgotten payment reminders.',
    approach: 'Build a fast 1-click billing engine with automated tax calculation and payment alerts.',
    solution: 'A dedicated web app that creates instant PDF invoices, tracks client balances, and sends payment reminders.',
    keyFeatures: [
      'Sub-30-second invoice generation with itemized line items',
      'Real-time customer account balances and pending dues tracking',
      'Instant PDF receipt downloads and print formatting',
      'Daily, weekly, and monthly revenue reconciliation summaries'
    ],
    whoItsFor:
      'Wholesalers, retailers, professional service agencies, contractors, and commercial suppliers.',
    technologies: ['Web Application', 'High-Integrity Databases', 'PDF Generation Engines', 'REST APIs'],
    implementation: 'Rapid database setup, catalog import, and cashier/accountant training.',
    customization: 'Configurable tax rules, regional currency settings, custom invoice formats, and barcode support.',
    relatedProjectId: 'billing-software'
  },
  {
    id: 'customer-lead-management',
    title: 'Customer & Lead Pipeline',
    category: 'Sales & CRM',
    iconName: 'Target',
    shortDescription: 'Organize inbound customer inquiries, follow-up alerts, and conversion tracking.',
    problem: 'Leads from website, calls, and referrals get lost in personal notebooks and spreadsheets.',
    approach: 'Capture every lead into a single board with automated follow-up reminders for sales reps.',
    solution: 'A tailored lead workspace that captures inquiries, assigns sales staff, and tracks conversion stages.',
    keyFeatures: [
      'Centralized lead intake from websites, landing pages, and messaging',
      'Visual pipeline stages (New, Contacted, Proposal, Won, Archived)',
      'Scheduled follow-up reminder alerts for sales reps',
      'Conversion tracking and activity history logs'
    ],
    whoItsFor:
      'B2B service providers, consultancy firms, real estate agencies, distributors, and sales-focused businesses.',
    technologies: ['React', 'Python / Django', 'Real-time Notifications', 'Analytics Engine'],
    implementation: 'Integration with existing intake forms and staff training on pipeline hygiene.',
    customization: 'Configurable pipeline stages, custom qualification fields, and automated alerts.'
  },
  {
    id: 'inventory-management',
    title: 'Inventory & Stock Management',
    category: 'Stock & Logistics',
    iconName: 'Package',
    shortDescription: 'Real-time stock counts, multi-branch tracking, purchase orders, and low-stock alerts.',
    problem: 'Spreadsheet stock counts never match actual warehouse shelves, causing unexpected stockouts.',
    approach: 'Maintain an auto-updating stock ledger with low-stock alerts and supplier purchase orders.',
    solution: 'A real-time inventory system with barcode scanning, multi-location stock, and instant reorder alerts.',
    keyFeatures: [
      'Real-time stock balance tracking with SKU and barcode support',
      'Automated low-stock threshold warnings and reorder alerts',
      'Vendor purchase order creation and delivery reconciliation',
      'Multi-location, branch, or warehouse stock visibility'
    ],
    whoItsFor:
      'Wholesalers, distributors, retail outlets, manufacturing workshops, and multi-branch businesses.',
    technologies: ['React', 'Python / FastAPI', 'PostgreSQL', 'Barcode Integration'],
    implementation: 'Product catalog import, stock count audit, and staff scanner orientation.',
    customization: 'Location hierarchies, custom SKU formats, supplier ledgers, and unit conversions.'
  },
  {
    id: 'business-management',
    title: 'Spreadsheet & Workflow Digitization',
    category: 'Automation & APIs',
    iconName: 'Workflow',
    shortDescription: 'Replace error-prone spreadsheets with secure, multi-user internal tools.',
    problem: 'Business operations depend on messy spreadsheets prone to lost data and accidental overwrites.',
    approach: 'Map out your daily routines and build simple, secure web tools that staff can use easily.',
    solution: 'A multi-user web dashboard that replaces spreadsheets with searchable, tamper-proof company databases.',
    keyFeatures: [
      'Multi-user operational dashboards tailored to business roles',
      'Structured request and approval pipelines',
      'Searchable audit trail of all company activities',
      'Role-based permissions ensuring sensitive data remains private'
    ],
    whoItsFor:
      'SMBs, service providers, contractors, and agencies transitioning away from spreadsheets.',
    technologies: ['React', 'Python', 'Relational Databases', 'Tailwind CSS'],
    implementation: '2 to 3 weeks including data migration from existing spreadsheets.',
    customization: '100% matched to your business terminology and operational checkpoints.'
  },
  {
    id: 'workflow-automation',
    title: 'Systems Integration & Automation',
    category: 'Automation & APIs',
    iconName: 'Zap',
    shortDescription: 'Connect software tools, automate webhooks, and eliminate manual copy-pasting.',
    problem: 'Staff waste hours daily re-typing information between payments, invoices, emails, and sheets.',
    approach: 'Deploy automated background workers that sync data instantly across tools as events happen.',
    solution: 'An automated background pipeline that connects your apps and sends instant WhatsApp/email alerts.',
    keyFeatures: [
      'Instant webhook listeners for payment gateways, form builders, and CRMs',
      'Automated WhatsApp, SMS, and transactional email alerts',
      'Idempotent data processing preventing duplicate records',
      'Scheduled background cron syncs and reconciliation reports'
    ],
    whoItsFor:
      'Businesses running multiple software tools seeking automated data synchronization without manual copy-pasting.',
    technologies: ['Python', 'FastAPI', 'Webhooks', 'Redis / Background Queues', 'REST APIs'],
    implementation: 'API key setup, webhook event testing, error alerts, and live deployment in 7-10 days.',
    customization: 'Custom event triggers, notification templates, and fallback retry policies.'
  },
  {
    id: 'ai-automation',
    title: 'AI Document & Data Extraction',
    category: 'Applied Intelligence',
    iconName: 'Cpu',
    shortDescription: 'Extract structured data from invoices, summarize reports, and route support inquiries.',
    problem: 'Staff spend hours reading documents, classifying customer requests, and keying in PDF data.',
    approach: 'Deploy practical AI models that extract clean data from invoices and PDFs directly to database.',
    solution: 'Targeted AI pipelines that automate document reading and data entry with 100% precision.',
    keyFeatures: [
      'Document parsing and structured table extraction from PDFs and scans',
      'Intelligent inquiry routing and priority categorization',
      'Automated draft summaries for customer support and reports',
      'Domain-specific knowledge retrieval for internal procedures'
    ],
    whoItsFor:
      'Businesses managing high volumes of text documents, customer tickets, contracts, or compliance checklists.',
    technologies: ['Python', 'Modern LLM Interfaces', 'Embeddings / Vector Indexing', 'API Middleware'],
    implementation: 'Secure private data handling, prompt engineering, validation benchmarks, and UI integration.',
    customization: 'Tuned specifically on your proprietary business guidelines and workflows.'
  },
  {
    id: 'custom-software',
    title: 'Custom Business Software',
    category: 'Custom Software',
    iconName: 'Layers',
    shortDescription: 'Bespoke web applications designed around your exact team workflow.',
    problem: 'Ready-made software is either too bloated, expensive, or missing the exact features you need.',
    approach: 'Analyze your daily team workflow and engineer purpose-built software with zero bloat.',
    solution: 'A custom web system built from scratch around your specific business logic and team roles.',
    keyFeatures: [
      'Purpose-built database architecture matching your exact data relationships',
      'Clean, distraction-free interfaces your team will actually enjoy using',
      'Full ownership of data with no recurring per-seat SaaS lock-in',
      'Direct technical support and continuous evolutionary updates'
    ],
    whoItsFor:
      'Founders, business owners, and operations directors whose core workflows do not fit standard software.',
    technologies: ['React', 'Python', 'PostgreSQL', 'Docker', 'Modern Cloud Platforms'],
    implementation: 'Requirements deep-dive, wireframing, sprint-based delivery, and handover.',
    customization: '100% bespoke from data structures to UI presentation.'
  }
];

export const getSolutionById = (id: string): SolutionItem | undefined => {
  return solutionsData.find((s) => s.id === id);
};
