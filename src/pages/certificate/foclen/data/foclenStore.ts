import type { FoclenCertificateData } from '../types/foclen';

const STORAGE_KEY = 'foclen_internship_certificates_v1';

export const initialFoclenCertificates: FoclenCertificateData[] = [
  {
    id: 'FOC-2025-001',
    certificateNumber: 'FOCLEN/INT/2025/089',
    issueDate: '17.03.2025',
    studentName: 'Sri Prakash. S',
    studentPrefix: 'Mr.',
    role: 'full-stack developer',
    periodDescription: 'three months from Dec 2024 to March 2025',
    proficiencyDescription: 'both front-end and back-end development',
    contributionsDescription: 'building intuitive user interfaces, implementing server-side logic, and managing databases to deliver end-to-end solutions',
    signatory1: {
      name: 'VEERALAKSHMI V',
      designation: 'Project Manager',
      signedBy: 'Veeralakshmi.V',
      signDate: '15/03/2025 14:52:24',
    },
    signatory2: {
      name: 'VIVEKANANDAN V',
      designation: 'HR Manager',
      signedBy: 'Vivekanandan.V',
      signDate: '15/03/2025 14:52:24',
    },
    registeredAddress: 'NO- 2/91 SCHOOL STREET, SRIRENGAPURAM, THENI, TAMILNADU 625534, India',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'FOC-2025-002',
    certificateNumber: 'FOCLEN/INT/2025/090',
    issueDate: '18.03.2025',
    studentName: 'AARTHI R',
    studentPrefix: 'Ms.',
    role: 'Python Full-Stack Developer',
    periodDescription: 'three months from Jan 2025 to March 2025',
    proficiencyDescription: 'modern web technologies and cloud backend services',
    contributionsDescription: 'developing responsive web interfaces, architecting RESTful APIs, and optimizing database workflows',
    signatory1: {
      name: 'VEERALAKSHMI V',
      designation: 'Project Manager',
      signedBy: 'Veeralakshmi.V',
      signDate: '17/03/2025 11:30:15',
    },
    signatory2: {
      name: 'VIVEKANANDAN V',
      designation: 'HR Manager',
      signedBy: 'Vivekanandan.V',
      signDate: '17/03/2025 11:30:15',
    },
    registeredAddress: 'NO- 2/91 SCHOOL STREET, SRIRENGAPURAM, THENI, TAMILNADU 625534, India',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export const getFoclenCertificates = (): FoclenCertificateData[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.error('Failed to load Foclen certificates from storage:', e);
  }
  return initialFoclenCertificates;
};

export const saveFoclenCertificates = (certs: FoclenCertificateData[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(certs));
  } catch (e) {
    console.error('Failed to save Foclen certificates:', e);
  }
};
