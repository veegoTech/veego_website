import { supabase, isSupabaseConfigured } from './supabase';

export interface CertificateRecord {
  id: string; // e.g. VG-AIT-2026-8F4A2C
  studentName: string;
  studentEmail?: string;
  courseTitle: string;
  courseDuration: string;
  issueDate: string;
  status: 'valid' | 'revoked';
  finalScore: number;
  projectSubmitted: boolean;
  lessonsCompleted: number;
  totalLessons: number;
  qrCodeUrl: string;
  revokedAt?: string;
  revocationReason?: string;
}

const LOCAL_STORAGE_KEY = 'veego_certificates_registry';

function getLocalRegistry(): Record<string, CertificateRecord> {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (err) {
    console.warn('Error reading certificate registry from localStorage', err);
    return {};
  }
}

function saveLocalRegistry(registry: Record<string, CertificateRecord>) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(registry));
  } catch (err) {
    console.warn('Error saving certificate registry to localStorage', err);
  }
}

export function generateCertificateId(): string {
  const year = new Date().getFullYear();
  // 6 uppercase alphanumeric characters from cryptographically random values
  const randArray = new Uint8Array(4);
  window.crypto.getRandomValues(randArray);
  const hex = Array.from(randArray).map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase().substring(0, 6);
  return `VG-AIT-${year}-${hex}`;
}

export function generateAndStoreCertificate(studentName: string, studentId?: string, finalScore: number = 95): CertificateRecord {
  const certId = generateCertificateId();
  const issueDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://veegotech.com';
  const qrCodeUrl = `${baseUrl}/verify-certificate?id=${certId}`;

  const certRecord: CertificateRecord = {
    id: certId,
    studentName: (studentName || 'VeeGo Learner').trim(),
    studentEmail: `${studentId || 'student'}@veegotech.com`,
    courseTitle: 'AI Tools for Students & Professionals',
    courseDuration: '4 Hours · 15 Lessons',
    issueDate,
    status: 'valid',
    finalScore: finalScore || 95,
    projectSubmitted: true,
    lessonsCompleted: 15,
    totalLessons: 15,
    qrCodeUrl
  };

  const registry = getLocalRegistry();
  registry[certId] = certRecord;
  saveLocalRegistry(registry);

  if (isSupabaseConfigured && supabase) {
    try {
      supabase.from('certificates').upsert({
        id: certId,
        student_name: certRecord.studentName,
        course_title: certRecord.courseTitle,
        issue_date: issueDate,
        status: 'valid',
        final_score: certRecord.finalScore,
        qr_code_url: qrCodeUrl
      }).then(() => {});
    } catch (_) {}
  }

  return certRecord;
}

export async function issueCertificate(params: {
  studentName: string;
  studentEmail?: string;
  courseTitle?: string;
  courseDuration?: string;
  finalScore: number;
  projectSubmitted: boolean;
  lessonsCompleted: number;
  totalLessons: number;
}): Promise<CertificateRecord> {
  const existingKey = `cert_${params.studentName.trim().toLowerCase()}_aitools`;
  const registry = getLocalRegistry();

  // Prevent duplicate certificates for the same student
  const existing = Object.values(registry).find(
    c => c.studentName.trim().toLowerCase() === params.studentName.trim().toLowerCase() && c.courseTitle.includes('AI Tools') && c.status === 'valid'
  );

  if (existing) {
    return existing;
  }

  const certId = generateCertificateId();
  const issueDate = new Date().toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });

  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://veegotech.com';
  const qrCodeUrl = `${baseUrl}/verify-certificate?id=${certId}`;

  const certRecord: CertificateRecord = {
    id: certId,
    studentName: params.studentName.trim(),
    studentEmail: params.studentEmail,
    courseTitle: params.courseTitle || 'AI Tools for Students & Professionals',
    courseDuration: params.courseDuration || '4 Hours · 15 Lessons',
    issueDate,
    status: 'valid',
    finalScore: params.finalScore,
    projectSubmitted: params.projectSubmitted,
    lessonsCompleted: params.lessonsCompleted,
    totalLessons: params.totalLessons,
    qrCodeUrl
  };

  registry[certId] = certRecord;
  saveLocalRegistry(registry);

  // Attempt database sync if Supabase is active
  if (isSupabaseConfigured && supabase) {
    try {
      await supabase.from('certificates').upsert([
        {
          id: certRecord.id,
          student_name: certRecord.studentName,
          student_email: certRecord.studentEmail,
          course_title: certRecord.courseTitle,
          course_duration: certRecord.courseDuration,
          issue_date: certRecord.issueDate,
          status: certRecord.status,
          final_score: certRecord.finalScore,
          metadata: {
            projectSubmitted: certRecord.projectSubmitted,
            lessonsCompleted: certRecord.lessonsCompleted
          }
        }
      ]);
    } catch (dbErr) {
      console.warn('Supabase certificate sync skipped, record persisted in local storage:', dbErr);
    }
  }

  return certRecord;
}

export async function getCertificateById(id: string): Promise<CertificateRecord | null> {
  const cleanId = id.trim().toUpperCase();

  // 1. Check local registry first
  const registry = getLocalRegistry();
  if (registry[cleanId]) {
    return registry[cleanId];
  }

  // 2. Fallback to Supabase if available
  if (isSupabaseConfigured && supabase) {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .eq('id', cleanId)
        .single();

      if (data && !error) {
        const cert: CertificateRecord = {
          id: data.id,
          studentName: data.student_name,
          studentEmail: data.student_email,
          courseTitle: data.course_title,
          courseDuration: data.course_duration,
          issueDate: data.issue_date,
          status: data.status as 'valid' | 'revoked',
          finalScore: data.final_score || 0,
          projectSubmitted: Boolean(data.metadata?.projectSubmitted),
          lessonsCompleted: data.metadata?.lessonsCompleted || 15,
          totalLessons: 15,
          qrCodeUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify-certificate?id=${data.id}`,
          revocationReason: data.revocation_reason,
          revokedAt: data.revoked_at
        };
        // Cache locally
        registry[cleanId] = cert;
        saveLocalRegistry(registry);
        return cert;
      }
    } catch (err) {
      console.warn('Error fetching certificate from Supabase:', err);
    }
  }

  // Sample fallback demo certificates for immediate testing and verification showcase
  if (cleanId === 'VG-AIT-2026-DEMO01' || cleanId === 'DEMO-VALID') {
    return {
      id: 'VG-AIT-2026-DEMO01',
      studentName: 'Kowsalya Ramanathan',
      courseTitle: 'AI Tools for Students & Professionals',
      courseDuration: '4 Hours · 15 Lessons',
      issueDate: '12 Oct 2026',
      status: 'valid',
      finalScore: 95,
      projectSubmitted: true,
      lessonsCompleted: 15,
      totalLessons: 15,
      qrCodeUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify-certificate?id=VG-AIT-2026-DEMO01`
    };
  }

  if (cleanId === 'VG-AIT-2026-REVOKED' || cleanId === 'DEMO-REVOKED') {
    return {
      id: 'VG-AIT-2026-REVOKED',
      studentName: 'Sample Disqualified Learner',
      courseTitle: 'AI Tools for Students & Professionals',
      courseDuration: '4 Hours · 15 Lessons',
      issueDate: '01 Oct 2026',
      status: 'revoked',
      finalScore: 40,
      projectSubmitted: false,
      lessonsCompleted: 8,
      totalLessons: 15,
      qrCodeUrl: `${typeof window !== 'undefined' ? window.location.origin : ''}/verify-certificate?id=VG-AIT-2026-REVOKED`,
      revocationReason: 'Academic integrity breach: Plagiarized portfolio submission and unverified credentials.'
    };
  }

  return null;
}

export async function setCertificateStatus(
  id: string,
  status: 'valid' | 'revoked',
  reason?: string
): Promise<boolean> {
  const cleanId = id.trim().toUpperCase();
  const registry = getLocalRegistry();

  if (registry[cleanId]) {
    registry[cleanId].status = status;
    if (status === 'revoked') {
      registry[cleanId].revocationReason = reason || 'Revoked by administrator.';
      registry[cleanId].revokedAt = new Date().toISOString();
    } else {
      delete registry[cleanId].revocationReason;
      delete registry[cleanId].revokedAt;
    }
    saveLocalRegistry(registry);
  }

  if (isSupabaseConfigured && supabase) {
    try {
      await supabase
        .from('certificates')
        .update({
          status,
          revocation_reason: reason || null,
          revoked_at: status === 'revoked' ? new Date().toISOString() : null
        })
        .eq('id', cleanId);
    } catch (err) {
      console.warn('Supabase update status failed:', err);
    }
  }

  return true;
}

export function getAllLocalCertificates(): CertificateRecord[] {
  const registry = getLocalRegistry();
  return Object.values(registry);
}
