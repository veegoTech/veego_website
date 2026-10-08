import * as XLSX from 'xlsx';
import {
  Customer,
  CustomerQuery,
  CustomerFeedback,
  DatabaseBackup,
  CustomerTier,
  InquiryStatus,
  InquiryPriority
} from '../types/database';
import {
  syncCustomerToSupabase,
  syncQueryToSupabase,
  syncFeedbackToSupabase
} from './supabase';

const STORAGE_KEYS = {
  CUSTOMERS: 'veego_db_customers',
  QUERIES: 'veego_db_queries',
  FEEDBACKS: 'veego_db_feedbacks'
};

// --- INITIAL SEED DATA ---

const initialCustomers: Customer[] = [
  {
    id: 'cust-101',
    name: 'Rajesh Kumar',
    email: 'rajesh@srichem.com',
    phone: '+91 98401 23456',
    organization: 'Sri Chem Distributors',
    tier: 'Enterprise Client',
    status: 'Active',
    totalSpend: 15499,
    tags: ['Reconciliation', 'Multi-Store', 'High Value'],
    createdAt: '2026-08-15T09:00:00Z',
    lastActivityAt: '2026-09-27T10:30:00Z',
    notes: 'Managing 4 branches in Coimbatore. Commissioned Custom Multi-Store Reconciliation Engine.'
  },
  {
    id: 'cust-102',
    name: 'Priya Sundaram',
    email: 'priya.s@techdevs.io',
    phone: '+91 98840 56789',
    organization: 'TechDevs Studio',
    tier: 'Partner',
    status: 'Active',
    totalSpend: 12000,
    tags: ['Automation', 'Software Client'],
    createdAt: '2026-09-20T11:20:00Z',
    lastActivityAt: '2026-09-27T14:15:00Z',
    notes: 'Collaborating on automated workflow integrations.'
  },
  {
    id: 'cust-103',
    name: 'Anand Varma',
    email: 'anand@apexlogistics.in',
    phone: '+91 97900 11223',
    organization: 'Apex Logistics Chennai',
    tier: 'Lead',
    status: 'Prospect',
    totalSpend: 0,
    tags: ['StaffTrack', 'Field Operations', 'Demo Scheduled'],
    createdAt: '2026-09-26T17:45:00Z',
    lastActivityAt: '2026-09-26T17:45:00Z',
    notes: 'Needs 45 field delivery supervisor GPS tracking. Demo scheduled for Tuesday.'
  }
];

const initialQueries: CustomerQuery[] = [
  {
    id: 'qry-101',
    customerId: 'cust-101',
    name: 'Rajesh Kumar',
    email: 'rajesh@srichem.com',
    phone: '+91 98401 23456',
    organization: 'Sri Chem Distributors',
    inquiryType: 'Business Problem',
    category: 'Excel Reconciliation',
    problemDescription: 'We manage 4 branch stores in Coimbatore. Every evening our managers email 4 separate Excel workbooks and it takes 2 hours to manually copy paste totals into master ledger. We need automatic reconciliation in 3 seconds.',
    priority: 'High',
    status: 'In Review',
    submittedAt: '2026-09-27T10:30:00Z',
    adminNotes: 'Spoke on phone. Interested in Python + Excel reconciliation pipeline. Follow-up demo planned.'
  },
  {
    id: 'qry-103',
    customerId: 'cust-103',
    name: 'Anand Varma',
    email: 'anand@apexlogistics.in',
    phone: '+91 97900 11223',
    organization: 'Apex Logistics Chennai',
    inquiryType: 'Custom Software',
    category: 'Field Staff Operations',
    problemDescription: 'Looking to deploy a system similar to StaffTrack for 45 field delivery supervisors. Need GPS verified punch-in and WhatsApp alert triggers.',
    priority: 'Urgent',
    status: 'Contacted',
    submittedAt: '2026-09-26T17:45:00Z',
    adminNotes: 'Shared StaffTrack feature comparison doc. Meeting scheduled with operations head.'
  }
];

const initialFeedbacks: CustomerFeedback[] = [
  {
    id: 'fb-102',
    customerId: 'cust-101',
    name: 'Rajesh Kumar',
    email: 'rajesh@srichem.com',
    targetType: 'Service',
    targetTitle: 'Custom Reconciliation Pipeline',
    rating: 5,
    feedbackType: 'Project Quality',
    comment: 'The standalone desktop reconciler runs in 3 seconds across 20 workbooks without opening Excel. Exceptional engineering quality from VeeGo.',
    isPublic: true,
    status: 'Approved',
    submittedAt: '2026-09-25T11:00:00Z'
  }
];

// --- CUSTOMERS CRUD & OPERATIONS ---

export const getCustomers = (): Customer[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.CUSTOMERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(initialCustomers));
      return initialCustomers;
    }
    return JSON.parse(raw);
  } catch {
    return initialCustomers;
  }
};

export const saveCustomers = (customers: Customer[]) => {
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(customers));
};

export const upsertCustomerFromInquiry = (data: {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  tier?: CustomerTier;
  tag?: string;
}): Customer => {
  const all = getCustomers();
  const existingIdx = all.findIndex(c => c.email.toLowerCase() === data.email.toLowerCase());
  
  if (existingIdx >= 0) {
    const existing = all[existingIdx];
    const updated: Customer = {
      ...existing,
      name: data.name || existing.name,
      phone: data.phone || existing.phone,
      organization: data.organization || existing.organization,
      tier: data.tier || existing.tier,
      lastActivityAt: new Date().toISOString(),
      tags: data.tag && !existing.tags.includes(data.tag) ? [...existing.tags, data.tag] : existing.tags
    };
    all[existingIdx] = updated;
    saveCustomers(all);
    syncCustomerToSupabase(updated);
    return updated;
  } else {
    const newCustomer: Customer = {
      id: `cust-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone || '',
      organization: data.organization || '',
      tier: data.tier || 'Lead',
      status: 'Active',
      totalSpend: 0,
      tags: data.tag ? [data.tag] : ['Website Lead'],
      createdAt: new Date().toISOString(),
      lastActivityAt: new Date().toISOString()
    };
    const updated = [newCustomer, ...all];
    saveCustomers(updated);
    syncCustomerToSupabase(newCustomer);
    return newCustomer;
  }
};

export const updateCustomer = (id: string, updates: Partial<Customer>): Customer | null => {
  const all = getCustomers();
  const idx = all.findIndex(c => c.id === id);
  if (idx < 0) return null;
  const updated = { ...all[idx], ...updates, lastActivityAt: new Date().toISOString() };
  all[idx] = updated;
  saveCustomers(all);
  syncCustomerToSupabase(updated);
  return updated;
};

export const deleteCustomer = (id: string): boolean => {
  const all = getCustomers();
  const filtered = all.filter(c => c.id !== id);
  saveCustomers(filtered);
  return true;
};

// --- QUERIES & INQUIRIES CRUD ---

export const getCustomerQueries = (): CustomerQuery[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.QUERIES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.QUERIES, JSON.stringify(initialQueries));
      return initialQueries;
    }
    return JSON.parse(raw);
  } catch {
    return initialQueries;
  }
};

export const saveCustomerQueries = (queries: CustomerQuery[]) => {
  localStorage.setItem(STORAGE_KEYS.QUERIES, JSON.stringify(queries));
};

export const addCustomerQuery = (query: {
  name: string;
  email: string;
  phone: string;
  organization?: string;
  inquiryType: CustomerQuery['inquiryType'];
  category: string;
  problemDescription: string;
  priority?: InquiryPriority;
  adminNotes?: string;
}): CustomerQuery => {
  const customer = upsertCustomerFromInquiry({
    name: query.name,
    email: query.email,
    phone: query.phone,
    organization: query.organization,
    tier: 'Lead',
    tag: query.category
  });

  const all = getCustomerQueries();
  const newQuery: CustomerQuery = {
    id: `qry-${Date.now()}`,
    customerId: customer.id,
    name: query.name,
    email: query.email,
    phone: query.phone,
    organization: query.organization,
    inquiryType: query.inquiryType,
    category: query.category,
    problemDescription: query.problemDescription,
    priority: query.priority || 'Medium',
    status: 'New',
    submittedAt: new Date().toISOString(),
    adminNotes: query.adminNotes || ''
  };

  const updated = [newQuery, ...all];
  saveCustomerQueries(updated);
  syncQueryToSupabase(newQuery);
  return newQuery;
};

export const updateQueryStatus = (id: string, status: InquiryStatus, adminNotes?: string): CustomerQuery | null => {
  const all = getCustomerQueries();
  const idx = all.findIndex(q => q.id === id);
  if (idx < 0) return null;
  const updated: CustomerQuery = {
    ...all[idx],
    status,
    ...(adminNotes !== undefined ? { adminNotes } : {}),
    ...(status === 'Closed' || status === 'Converted' ? { resolvedAt: new Date().toISOString() } : {})
  };
  all[idx] = updated;
  saveCustomerQueries(all);
  syncQueryToSupabase(updated);
  return updated;
};

// --- FEEDBACK & REVIEWS CRUD ---

export const getCustomerFeedbacks = (): CustomerFeedback[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(initialFeedbacks));
      return initialFeedbacks;
    }
    return JSON.parse(raw);
  } catch {
    return initialFeedbacks;
  }
};

export const saveCustomerFeedbacks = (feedbacks: CustomerFeedback[]) => {
  localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(feedbacks));
};

export const addCustomerFeedback = (feedback: {
  name: string;
  email: string;
  targetType: CustomerFeedback['targetType'];
  targetId?: string;
  targetTitle: string;
  rating: number;
  feedbackType: CustomerFeedback['feedbackType'];
  comment: string;
  isPublic?: boolean;
}): CustomerFeedback => {
  const customer = upsertCustomerFromInquiry({
    name: feedback.name,
    email: feedback.email,
    phone: '',
    tag: 'Provided Feedback'
  });

  const all = getCustomerFeedbacks();
  const newFeedback: CustomerFeedback = {
    id: `fb-${Date.now()}`,
    customerId: customer.id,
    name: feedback.name,
    email: feedback.email,
    targetType: feedback.targetType,
    targetId: feedback.targetId,
    targetTitle: feedback.targetTitle,
    rating: Math.max(1, Math.min(5, feedback.rating)),
    feedbackType: feedback.feedbackType,
    comment: feedback.comment,
    isPublic: feedback.isPublic ?? true,
    status: 'Approved',
    submittedAt: new Date().toISOString()
  };

  const updated = [newFeedback, ...all];
  saveCustomerFeedbacks(updated);
  syncFeedbackToSupabase(newFeedback);
  return newFeedback;
};

export const toggleFeedbackPublic = (id: string): CustomerFeedback | null => {
  const all = getCustomerFeedbacks();
  const idx = all.findIndex(f => f.id === id);
  if (idx < 0) return null;
  all[idx].isPublic = !all[idx].isPublic;
  saveCustomerFeedbacks(all);
  syncFeedbackToSupabase(all[idx]);
  return all[idx];
};

export const deleteFeedback = (id: string): boolean => {
  const all = getCustomerFeedbacks();
  saveCustomerFeedbacks(all.filter(f => f.id !== id));
  return true;
};

// --- SYNC ALL LOCAL SEEDS TO SUPABASE ---
export const syncAllLocalDataToSupabase = async (): Promise<{ success: boolean; message: string }> => {
  try {
    const customers = getCustomers();
    const queries = getCustomerQueries();
    const feedbacks = getCustomerFeedbacks();

    await Promise.all([
      ...customers.map(c => syncCustomerToSupabase(c)),
      ...queries.map(q => syncQueryToSupabase(q)),
      ...feedbacks.map(f => syncFeedbackToSupabase(f))
    ]);

    return { success: true, message: 'All local data synced to live Supabase database!' };
  } catch (err: any) {
    return { success: false, message: err?.message || 'Sync failed' };
  }
};

// --- DATABASE METRICS & EXPORTS ---

export const getDatabaseStats = () => {
  const customers = getCustomers();
  const queries = getCustomerQueries();
  const feedbacks = getCustomerFeedbacks();

  const avgRating =
    feedbacks.length > 0
      ? (feedbacks.reduce((sum, f) => sum + f.rating, 0) / feedbacks.length).toFixed(1)
      : '5.0';

  const newQueriesCount = queries.filter(q => q.status === 'New').length;

  return {
    totalCustomers: customers.length,
    tierCounts: {
      leads: customers.filter(c => c.tier === 'Lead').length,
      enterprise: customers.filter(c => c.tier === 'Enterprise Client').length,
      partner: customers.filter(c => c.tier === 'Partner').length,
      vip: customers.filter(c => c.tier === 'VIP / Client').length
    },
    totalQueries: queries.length,
    newQueries: newQueriesCount,
    totalFeedbacks: feedbacks.length,
    avgRating
  };
};

export const exportDatabaseToJSON = (): string => {
  const backup: DatabaseBackup = {
    version: '1.0.0',
    exportedAt: new Date().toISOString(),
    customers: getCustomers(),
    queries: getCustomerQueries(),
    feedbacks: getCustomerFeedbacks()
  };
  return JSON.stringify(backup, null, 2);
};

export const exportDatabaseToExcel = () => {
  const customers = getCustomers();
  const queries = getCustomerQueries();
  const feedbacks = getCustomerFeedbacks();

  const wb = XLSX.utils.book_new();

  const wsCustomers = XLSX.utils.json_to_sheet(customers);
  XLSX.utils.book_append_sheet(wb, wsCustomers, 'All Customers');

  const wsQueries = XLSX.utils.json_to_sheet(queries);
  XLSX.utils.book_append_sheet(wb, wsQueries, 'Queries & Inquiries');

  const wsFeedbacks = XLSX.utils.json_to_sheet(feedbacks);
  XLSX.utils.book_append_sheet(wb, wsFeedbacks, 'Feedback & Reviews');

  XLSX.writeFile(wb, `VeeGo_Database_Export_${new Date().toISOString().slice(0, 10)}.xlsx`);
};

export const importDatabaseFromJSON = (jsonString: string): boolean => {
  try {
    const data: DatabaseBackup = JSON.parse(jsonString);
    if (data.customers) saveCustomers(data.customers);
    if (data.queries) saveCustomerQueries(data.queries);
    if (data.feedbacks) saveCustomerFeedbacks(data.feedbacks);
    return true;
  } catch {
    return false;
  }
};

export const resetDatabaseToDefaults = () => {
  localStorage.setItem(STORAGE_KEYS.CUSTOMERS, JSON.stringify(initialCustomers));
  localStorage.setItem(STORAGE_KEYS.QUERIES, JSON.stringify(initialQueries));
  localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(initialFeedbacks));
};
