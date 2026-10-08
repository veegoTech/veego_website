import { Project, CustomerInquiry } from '../types';
import { projectsData as initialProjects } from '../data/projects';

const STORAGE_KEYS = {
  PROJECTS: 'veego_admin_projects',
  INQUIRIES: 'veego_admin_inquiries'
};

const initialSampleInquiries: CustomerInquiry[] = [
  {
    id: 'inq-101',
    name: 'Rajesh Kumar',
    email: 'rajesh@srichem.com',
    phone: '+91 98401 23456',
    organization: 'Sri Chem Distributors',
    inquiryType: 'Business Problem',
    category: 'Billing',
    problemDescription: 'We manage 4 branch stores in Coimbatore. Every evening our managers email 4 separate Excel workbooks and it takes 2 hours to manually copy paste totals into master ledger. We need automatic reconciliation.',
    status: 'In Review',
    submittedAt: '2026-09-27T10:30:00Z',
    adminNotes: 'Spoke on phone. Very interested in Python + Excel reconciliation pipeline. Follow-up demo planned for Tuesday 11 AM.'
  },
  {
    id: 'inq-103',
    name: 'Anand Varma',
    email: 'anand@apexlogistics.in',
    phone: '+91 97900 11223',
    organization: 'Apex Logistics Chennai',
    inquiryType: 'Custom Software',
    category: 'Staff',
    problemDescription: 'Looking to deploy a system similar to StaffTrack for 45 field delivery supervisors. Need GPS verified punch-in and WhatsApp alert triggers.',
    status: 'Contacted',
    submittedAt: '2026-09-26T17:45:00Z',
    adminNotes: 'Shared StaffTrack feature comparison doc. Meeting scheduled with their operations head.'
  }
];

// --- Projects ---
export const getStoredProjects = (): Project[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
      return initialProjects;
    }
    return JSON.parse(raw);
  } catch {
    return initialProjects;
  }
};

export const saveStoredProjects = (projects: Project[]) => {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
};

// --- Inquiries & Leads ---
export const getStoredInquiries = (): CustomerInquiry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(initialSampleInquiries));
      return initialSampleInquiries;
    }
    return JSON.parse(raw);
  } catch {
    return initialSampleInquiries;
  }
};

export const saveStoredInquiries = (inquiries: CustomerInquiry[]) => {
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
};

export const addCustomerInquiry = (inquiry: Omit<CustomerInquiry, 'id' | 'status' | 'submittedAt'>): CustomerInquiry => {
  const all = getStoredInquiries();
  const newInq: CustomerInquiry = {
    ...inquiry,
    id: `inq-${Date.now()}`,
    status: 'New',
    submittedAt: new Date().toISOString()
  };
  const updated = [newInq, ...all];
  saveStoredInquiries(updated);

  // Sync with unified database engine
  try {
    const rawCustomers = localStorage.getItem('veego_db_customers');
    const customers = rawCustomers ? JSON.parse(rawCustomers) : [];
    const existingIdx = customers.findIndex((c: any) => c.email.toLowerCase() === inquiry.email.toLowerCase());
    
    if (existingIdx >= 0) {
      customers[existingIdx].lastActivityAt = new Date().toISOString();
      customers[existingIdx].phone = inquiry.phone || customers[existingIdx].phone;
      customers[existingIdx].organization = inquiry.organization || customers[existingIdx].organization;
    } else {
      customers.unshift({
        id: `cust-${Date.now()}`,
        name: inquiry.name,
        email: inquiry.email,
        phone: inquiry.phone || '',
        organization: inquiry.organization || '',
        tier: 'Lead',
        status: 'Active',
        totalSpend: 0,
        tags: [inquiry.category || 'Website Query'],
        createdAt: new Date().toISOString(),
        lastActivityAt: new Date().toISOString()
      });
    }
    localStorage.setItem('veego_db_customers', JSON.stringify(customers));

    const rawQueries = localStorage.getItem('veego_db_queries');
    const queries = rawQueries ? JSON.parse(rawQueries) : [];
    queries.unshift({
      id: `qry-${Date.now()}`,
      customerId: existingIdx >= 0 ? customers[existingIdx].id : customers[0]?.id,
      name: inquiry.name,
      email: inquiry.email,
      phone: inquiry.phone,
      organization: inquiry.organization,
      inquiryType: inquiry.inquiryType,
      category: inquiry.category,
      problemDescription: inquiry.problemDescription,
      priority: 'Medium',
      status: 'New',
      submittedAt: new Date().toISOString(),
      adminNotes: inquiry.adminNotes || ''
    });
    localStorage.setItem('veego_db_queries', JSON.stringify(queries));
  } catch (e) {
    console.error('Error syncing inquiry to database engine', e);
  }

  return newInq;
};

// --- Reset to default factory data ---
export const resetToFactoryDefaults = () => {
  localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
  localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(initialSampleInquiries));
};
