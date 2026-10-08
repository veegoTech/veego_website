export type CustomerTier =
  | 'Lead'
  | 'Enterprise Client'
  | 'Partner'
  | 'VIP / Client';

export type CustomerStatus = 'Active' | 'Prospect' | 'Inactive';

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  tier: CustomerTier;
  status: CustomerStatus;
  totalSpend: number;
  tags: string[];
  createdAt: string;
  lastActivityAt: string;
  notes?: string;
}

export type InquiryType =
  | 'Business Problem'
  | 'Custom Software'
  | 'Support Query'
  | 'Feedback'
  | 'Partnership';

export type InquiryPriority = 'Low' | 'Medium' | 'High' | 'Urgent';

export type InquiryStatus = 'New' | 'In Review' | 'Contacted' | 'Converted' | 'Closed';

export interface CustomerQuery {
  id: string;
  customerId?: string;
  name: string;
  email: string;
  phone: string;
  organization?: string;
  inquiryType: InquiryType;
  category: string;
  problemDescription: string;
  priority: InquiryPriority;
  status: InquiryStatus;
  submittedAt: string;
  adminNotes?: string;
  resolvedAt?: string;
  convertedToOrderId?: string;
}

export type FeedbackType =
  | 'Project Quality'
  | 'Platform UX'
  | 'General Suggestion';

export interface CustomerFeedback {
  id: string;
  customerId?: string;
  name: string;
  email: string;
  targetType: 'Project' | 'Service' | 'Platform';
  targetId?: string;
  targetTitle: string;
  rating: number; // 1 to 5
  feedbackType: FeedbackType;
  comment: string;
  isPublic: boolean;
  status: 'Pending' | 'Approved' | 'Archived';
  submittedAt: string;
}

export interface DatabaseBackup {
  version: string;
  exportedAt: string;
  customers: Customer[];
  queries: CustomerQuery[];
  feedbacks: CustomerFeedback[];
}
