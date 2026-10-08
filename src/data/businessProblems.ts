export interface SignatureProblemItem {
  id: string;
  category: string;
  categoryIcon: string;
  youToldUs: string;
  veegoExplores: string[];
  possibleSolution: string;
  solutionType: string;
  solutionOutcome: string;
  relatedProjectId?: string;
  relatedSolutionId?: string;
}

export const signatureProblemCategories: SignatureProblemItem[] = [
  {
    id: 'prob-staff',
    category: 'Staff',
    categoryIcon: 'Users',
    youToldUs: 'Managing staff work manually is taking too much time.',
    veegoExplores: ['Attendance', 'Tasks', 'Schedules', 'Daily reports', 'Follow-ups'],
    possibleSolution: 'StaffTrack',
    solutionType: 'Centralized Staff & Daily Work Automation System',
    solutionOutcome: 'Automates digital check-ins, tracks task milestones in real time, and compiles end-of-day summary reports for management.',
    relatedProjectId: 'stafftrack',
    relatedSolutionId: 'staff-automation'
  },
  {
    id: 'prob-customers',
    category: 'Customers',
    categoryIcon: 'UserCheck',
    youToldUs: 'Customer records, orders and communication are difficult to track across multiple channels.',
    veegoExplores: ['Customer directory', 'Order history', 'Service status', 'Communication log', 'Account balances'],
    possibleSolution: 'VeeGo Customer Hub',
    solutionType: 'Unified Customer Records & Service Portal',
    solutionOutcome: 'Gives your entire team an instant 360-degree view of customer history, tickets, and open balances in one searchable hub.',
    relatedSolutionId: 'customer-management'
  },
  {
    id: 'prob-sales',
    category: 'Sales',
    categoryIcon: 'TrendingUp',
    youToldUs: 'Sales leads arrive across WhatsApp, calls and forms, but get lost or followed up too late.',
    veegoExplores: ['Lead intake', 'Pipeline stages', 'Deal values', 'Sales rep assignment', 'Conversion metrics'],
    possibleSolution: 'VeeGo Lead Pipeline',
    solutionType: 'Visual Sales Lead & Opportunity Management System',
    solutionOutcome: 'Captures inquiries automatically into an organized stage board, assigning team members and tracking deal progress.',
    relatedSolutionId: 'lead-management'
  },
  {
    id: 'prob-billing',
    category: 'Billing',
    categoryIcon: 'Receipt',
    youToldUs: 'Daily business billing depends on paper receipts, manual calculation and slow customer checkout.',
    veegoExplores: ['Invoice generation', 'Tax computation', 'Payment status', 'Customer ledger', 'PDF receipts'],
    possibleSolution: 'VeeGo Billing Software',
    solutionType: 'Fast Business Invoicing & Financial Operations Engine',
    solutionOutcome: 'Generates itemized tax-ready invoices in 30 seconds, creates print-ready receipts, and tracks outstanding receivables.',
    relatedProjectId: 'billing-software',
    relatedSolutionId: 'billing-operations'
  },
  {
    id: 'prob-reports',
    category: 'Reports',
    categoryIcon: 'BarChart3',
    youToldUs: 'Reports are compiled manually by hand, taking hours every weekend and leaving owners in the dark.',
    veegoExplores: ['Data sources', 'Aggregation logic', 'Key performance metrics', 'Automated charts', 'Executive summaries'],
    possibleSolution: 'VeeGo Operational Cockpit',
    solutionType: 'Real-time Executive Analytics & Scheduled Reporting Engine',
    solutionOutcome: 'Transforms scattered operational numbers into clean, real-time dashboards with automatic daily email briefings.',
    relatedSolutionId: 'reports-analytics'
  },
  {
    id: 'prob-data',
    category: 'Data',
    categoryIcon: 'Database',
    youToldUs: 'Business data is scattered across fragile Excel sheets, personal WhatsApp chats, and local hard drives.',
    veegoExplores: ['Data relationships', 'Spreadsheet audit', 'User permission roles', 'Cloud persistence', 'Search indexing'],
    possibleSolution: 'Custom Relational Database App',
    solutionType: 'Secure Multi-User Cloud Database Application',
    solutionOutcome: 'Replaces crash-prone spreadsheets with an encrypted, role-governed web database with complete audit trails.',
    relatedSolutionId: 'custom-software'
  },
  {
    id: 'prob-inventory',
    category: 'Inventory',
    categoryIcon: 'Package',
    youToldUs: 'Stock records in spreadsheets never match actual shelf counts, causing stockouts and delayed orders.',
    veegoExplores: ['Stock reconciliation', 'Warehouse locations', 'Low-stock thresholds', 'Supplier purchase orders', 'Barcode scanning'],
    possibleSolution: 'VeeGo Inventory & Stock Ledger',
    solutionType: 'Real-Time Multi-Location Inventory & Order Management System',
    solutionOutcome: 'Maintains verified stock balances, alerts team before critical items run out, and streamlines reordering.',
    relatedSolutionId: 'inventory-management'
  },
  {
    id: 'prob-communication',
    category: 'Communication',
    categoryIcon: 'MessageSquare',
    youToldUs: 'Our team repeats identical messages and explanations over and over to clients and colleagues.',
    veegoExplores: ['Repetitive queries', 'Status notifications', 'Customer FAQ triggers', 'Automated templates', 'Channel routing'],
    possibleSolution: 'Automated Messaging Hub',
    solutionType: 'Event-driven Client Notification & Status Broadcast Engine',
    solutionOutcome: 'Sends instant transactional updates and order status links automatically, reducing routine phone calls by 70%.',
    relatedSolutionId: 'business-automation'
  },
  {
    id: 'prob-followups',
    category: 'Follow-ups',
    categoryIcon: 'Clock',
    youToldUs: 'Quotes, proposals and client requests are forgotten because there is no organized follow-up system.',
    veegoExplores: ['Follow-up intervals', 'Reminder alerts', 'Call logs', 'Escalation rules', 'Pending items'],
    possibleSolution: 'Follow-up Automation Engine',
    solutionType: 'Automated Follow-up Scheduler & Alert Pipeline',
    solutionOutcome: 'Triggers timely reminder notifications for team members, guaranteeing zero neglected quotes or client inquiries.',
    relatedSolutionId: 'lead-management'
  },
  {
    id: 'prob-automation',
    category: 'Automation',
    categoryIcon: 'Workflow',
    youToldUs: 'Staff waste hours daily re-typing information between different software tools and web forms.',
    veegoExplores: ['API integration', 'Webhook listeners', 'Data transformation', 'Background queues', 'Failure retry logic'],
    possibleSolution: 'VeeGo Workflow Automation',
    solutionType: 'End-to-End System Integration & Background Worker Pipeline',
    solutionOutcome: 'Synchronizes data between your tools automatically with zero human latency and zero re-keying errors.',
    relatedSolutionId: 'business-automation'
  },
  {
    id: 'prob-ai',
    category: 'AI',
    categoryIcon: 'Cpu',
    youToldUs: 'We want to leverage AI for our business, but generic chatbots do not connect to our actual documents or workflows.',
    veegoExplores: ['Document parsing', 'Proprietary knowledge base', 'Structured extraction', 'Classification logic', 'Human-in-the-loop'],
    possibleSolution: 'Grounded VeeGo AI Engine',
    solutionType: 'Applied Business AI & Document Intelligence Pipeline',
    solutionOutcome: 'Extracts tables from invoices, sorts customer tickets, and drafts contextual answers grounded in company data.',
    relatedSolutionId: 'ai-automation'
  },
  {
    id: 'prob-custom',
    category: 'Custom Requirement',
    categoryIcon: 'Layers',
    youToldUs: 'Our business has a unique operational challenge that doesn’t fit ready-made software.',
    veegoExplores: ['Workflow diagramming', 'Bespoke business rules', 'Tailored user interfaces', 'Role-based access', 'Scalable architecture'],
    possibleSolution: 'Bespoke VeeGo Custom Software',
    solutionType: 'Purpose-Built Software Engineered for Your Exact Workflow',
    solutionOutcome: 'A 100% custom-tailored web system engineered from scratch around your specific team roles and operational checkpoints.',
    relatedSolutionId: 'custom-software'
  }
];

export interface InteractiveProblemItem {
  id: string;
  problem: string;
  symptom: string;
  veegoApproach: string;
  solutionOutcome: string;
  recommendedSystem: string;
  relatedProjectId?: string;
  relatedSolutionId?: string;
}

export const primaryBusinessProblems: InteractiveProblemItem[] = signatureProblemCategories.map((item) => ({
  id: item.id,
  problem: item.youToldUs,
  symptom: `Operational friction in ${item.category}: ${item.veegoExplores.join(', ')}.`,
  veegoApproach: `We explore ${item.veegoExplores.join(', ')} to architect a custom ${item.solutionType}.`,
  solutionOutcome: item.solutionOutcome,
  recommendedSystem: item.possibleSolution,
  relatedProjectId: item.relatedProjectId,
  relatedSolutionId: item.relatedSolutionId
}));

