import { createClient } from '@supabase/supabase-js';
import { Customer, CustomerQuery, CustomerFeedback } from '../types/database';

const rawUrl = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL ? String(import.meta.env.VITE_SUPABASE_URL) : '').trim();
const rawKey = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY ? String(import.meta.env.VITE_SUPABASE_ANON_KEY) : '').trim();

export const isSupabaseConfigured = Boolean(
  rawUrl &&
  rawKey &&
  rawUrl.startsWith('http') &&
  !rawUrl.includes('placeholder')
);

// Fallback dummy credentials to prevent Supabase JS client crash if env vars are unset in build/deployment
// ("Uncaught Error: supabaseUrl is required")
const fallbackUrl = 'https://placeholder.supabase.co';
const fallbackKey = 'dummy-anon-key-placeholder';

export const supabase = createClient(
  isSupabaseConfigured ? rawUrl : fallbackUrl,
  isSupabaseConfigured ? rawKey : fallbackKey
);

if (!isSupabaseConfigured && typeof window !== 'undefined') {
  console.warn(
    '⚠️ Supabase environment variables not found or incomplete. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your .env or deployment configuration.'
  );
}

// --- SUPABASE CLOUD SYNC HELPERS ---

export const fetchSupabaseCustomers = async (): Promise<Customer[] | null> => {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetch customers warning:', error.message);
      return null;
    }
    return (data || []).map(row => ({
      id: row.id,
      name: row.name,
      email: row.email,
      phone: row.phone || '',
      organization: row.organization || '',
      tier: row.tier || 'Lead',
      status: row.status || 'Active',
      totalSpend: Number(row.total_spend) || 0,
      tags: row.tags ? (typeof row.tags === 'string' ? row.tags.split(',').map((t: string) => t.trim()) : row.tags) : [],
      createdAt: row.created_at,
      lastActivityAt: row.last_activity_at,
      notes: row.notes || ''
    }));
  } catch (err) {
    console.warn('Supabase network error:', err);
    return null;
  }
};

export const syncCustomerToSupabase = async (customer: Customer) => {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: customer.id,
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
      organization: customer.organization,
      tier: customer.tier,
      status: customer.status,
      total_spend: customer.totalSpend,
      tags: Array.isArray(customer.tags) ? customer.tags.join(', ') : customer.tags,
      notes: customer.notes,
      last_activity_at: customer.lastActivityAt || new Date().toISOString()
    };
    const { error } = await supabase.from('customers').upsert(payload, { onConflict: 'id' });
    if (error) console.warn('Supabase customer upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase sync customer failed:', err);
  }
};

export const fetchSupabaseQueries = async (): Promise<CustomerQuery[] | null> => {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('customer_queries')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetch queries warning:', error.message);
      return null;
    }
    return (data || []).map(row => ({
      id: row.id,
      customerId: row.customer_id,
      name: row.name,
      email: row.email,
      phone: row.phone || '',
      organization: row.organization || '',
      inquiryType: row.inquiry_type,
      category: row.category,
      problemDescription: row.problem_description,
      priority: row.priority || 'Medium',
      status: row.status || 'New',
      submittedAt: row.submitted_at,
      adminNotes: row.admin_notes || '',
      resolvedAt: row.resolved_at
    }));
  } catch (err) {
    console.warn('Supabase network error:', err);
    return null;
  }
};

export const syncQueryToSupabase = async (query: CustomerQuery) => {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: query.id,
      customer_id: query.customerId,
      name: query.name,
      email: query.email,
      phone: query.phone,
      organization: query.organization,
      inquiry_type: query.inquiryType,
      category: query.category,
      problem_description: query.problemDescription,
      priority: query.priority,
      status: query.status,
      admin_notes: query.adminNotes,
      submitted_at: query.submittedAt || new Date().toISOString()
    };
    const { error } = await supabase.from('customer_queries').upsert(payload, { onConflict: 'id' });
    if (error) console.warn('Supabase query upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase sync query failed:', err);
  }
};

export const fetchSupabaseFeedback = async (): Promise<CustomerFeedback[] | null> => {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('customer_feedback')
      .select('*')
      .order('submitted_at', { ascending: false });
    if (error) {
      console.warn('Supabase fetch feedback warning:', error.message);
      return null;
    }
    return (data || []).map(row => ({
      id: row.id,
      customerId: row.customer_id,
      name: row.name,
      email: row.email,
      targetType: row.target_type,
      targetId: row.target_id,
      targetTitle: row.target_title,
      rating: row.rating,
      feedbackType: row.feedback_type,
      comment: row.comment,
      isPublic: row.is_public ?? true,
      status: row.status || 'Approved',
      submittedAt: row.submitted_at
    }));
  } catch (err) {
    console.warn('Supabase network error:', err);
    return null;
  }
};

export const syncFeedbackToSupabase = async (feedback: CustomerFeedback) => {
  if (!isSupabaseConfigured) return;
  try {
    const payload = {
      id: feedback.id,
      customer_id: feedback.customerId,
      name: feedback.name,
      email: feedback.email,
      target_type: feedback.targetType,
      target_id: feedback.targetId,
      target_title: feedback.targetTitle,
      rating: feedback.rating,
      feedback_type: feedback.feedbackType,
      comment: feedback.comment,
      is_public: feedback.isPublic,
      status: feedback.status,
      submitted_at: feedback.submittedAt || new Date().toISOString()
    };
    const { error } = await supabase.from('customer_feedback').upsert(payload, { onConflict: 'id' });
    if (error) console.warn('Supabase feedback upsert error:', error.message);
  } catch (err) {
    console.warn('Supabase sync feedback failed:', err);
  }
};

// --- SUPABASE STUDENT REGISTRATION & AUTH HELPERS ---

export const syncStudentToSupabaseClient = async (studentData: {
  id?: string;
  name: string;
  phone: string;
  dob?: string;
  enrolledCourse?: string;
  isVerified?: boolean;
  email?: string;
}) => {
  if (!isSupabaseConfigured) return null;
  try {
    const studentId = studentData.id || `stu_${studentData.phone || Date.now()}`;
    const studentEmail = studentData.email || `${studentData.phone}@student.veego.in`;
    const payload = {
      id: studentId,
      name: studentData.name,
      email: studentEmail,
      phone: studentData.phone,
      organization: `Enrolled: ${studentData.enrolledCourse || 'all'} | DOB: ${studentData.dob || ''}`,
      tier: 'Sprint Student',
      status: 'Active',
      total_spend: 0,
      tags: `Student, ${studentData.enrolledCourse || 'all'}`,
      notes: `DOB: ${studentData.dob || ''} | Verified: ${studentData.isVerified ? 'Yes' : 'No'}`,
      last_activity_at: new Date().toISOString()
    };
    const { data, error } = await supabase
      .from('customers')
      .upsert(payload, { onConflict: 'id' })
      .select();
    if (error) {
      console.warn('Supabase student insertion warning:', error.message);
    } else {
      console.log('✅ Registered student record stored in Supabase Cloud (customers):', data);
    }

    // Write to students table if exists
    try {
      await supabase.from('students').upsert({
        access_code: studentData.phone,
        name: studentData.name,
        phone: studentData.phone,
        email: studentEmail,
        dob: studentData.dob || '',
        enrolled_course: studentData.enrolledCourse || 'all',
        status: 'Active',
        is_verified: studentData.isVerified ?? true
      }, { onConflict: 'access_code' });
    } catch (_) {}

    return data;
  } catch (err) {
    console.warn('Supabase direct student sync error:', err);
    return null;
  }
};

export const fetchSupabaseStudentsClient = async () => {
  if (!isSupabaseConfigured) return null;
  try {
    const { data, error } = await supabase
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });
    if (!error && data && data.length > 0) {
      return data.map(c => {
        const dobMatch = (c.notes || '').match(/DOB:\s*([^\s|]+)/) || (c.organization || '').match(/DOB:\s*([^\s|]+)/);
        const enrolledMatch = (c.organization || '').match(/Enrolled:\s*([^\s|]+)/) || (c.tags || '').match(/Student,\s*([^\s|]+)/);
        const extractedDob = dobMatch ? dobMatch[1].trim() : '';
        return {
          id: c.id,
          _id: c.id,
          name: c.name,
          phone: c.phone || '',
          dob: extractedDob,
          username: c.phone || '',
          password: extractedDob,
          isVerified: true,
          otpCode: '123456',
          enrolledCourse: enrolledMatch ? enrolledMatch[1].trim() : 'all',
          accessCode: c.phone || '',
          deviceId: null,
          status: c.status || 'Active',
          createdAt: c.created_at
        };
      });
    }
    const { data: sData } = await supabase.from('students').select('*');
    return sData || null;
  } catch (err) {
    console.warn('Supabase fetch students warning:', err);
    return null;
  }
};
