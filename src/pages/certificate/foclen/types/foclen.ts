export interface FoclenCertificateData {
  id: string;
  certificateNumber: string;
  issueDate: string;
  studentName: string;
  studentPrefix: 'Mr.' | 'Ms.' | 'Mrs.';
  role: string; // e.g. 'full-stack developer'
  periodDescription: string; // e.g. 'three months from Dec 2024 to March 2025'
  proficiencyDescription: string; // e.g. 'both front-end and back-end development'
  contributionsDescription: string; // e.g. 'building intuitive user interfaces, implementing server-side logic, and managing databases to deliver end-to-end solutions'
  signatory1: {
    name: string;
    designation: string;
    signedBy: string;
    signDate: string;
  };
  signatory2: {
    name: string;
    designation: string;
    signedBy: string;
    signDate: string;
  };
  registeredAddress: string;
  createdAt: string;
  updatedAt: string;
}
