import 'dotenv/config'; // Loads .env for local dev
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createClient } from '@supabase/supabase-js';
import ws from 'ws';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

// 1. SUPABASE CLOUD DATABASE CONNECTION
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://nziavlzgudaybsieramx.supabase.co';
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im56aWF2bHpndWRheWJzaWVyYW14Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTA1ODMzMTQsImV4cCI6MjEwNjE1OTMxNH0.7rrAnLLRTmwk2qssfkWR8nfkkyux4ULnV25aCThLX5U';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false, autoRefreshToken: false },
  realtime: { transport: ws }
});

console.log('📡 Connected Backend Database to Supabase Cloud:', SUPABASE_URL);

// 2. LOCAL JSON FALLBACK PATHS
const localDbPath = process.env.VERCEL
  ? '/tmp/students.json'
  : path.join(__dirname, 'students.json');

const localStaffDbPath = process.env.VERCEL
  ? '/tmp/staff.json'
  : path.join(__dirname, 'staff.json');

const localInvoiceDbPath = process.env.VERCEL
  ? '/tmp/invoices.json'
  : path.join(__dirname, 'invoices.json');

// Local Storage Helpers
const getLocalStudents = () => {
  if (!fs.existsSync(localDbPath)) {
    fs.writeFileSync(localDbPath, JSON.stringify([]));
  }
  try {
    const data = JSON.parse(fs.readFileSync(localDbPath, 'utf8'));
    return data.map(s => ({
      completedLessons: [],
      tasks: [],
      certificate: null,
      ...s
    }));
  } catch (e) {
    return [];
  }
};

const saveLocalStudents = (data) => {
  fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2));
};

const getLocalStaff = () => {
  if (!fs.existsSync(localStaffDbPath)) {
    fs.writeFileSync(localStaffDbPath, JSON.stringify([]));
  }
  try {
    return JSON.parse(fs.readFileSync(localStaffDbPath, 'utf8'));
  } catch (e) {
    return [];
  }
};

const saveLocalStaff = (data) => {
  fs.writeFileSync(localStaffDbPath, JSON.stringify(data, null, 2));
};

const getLocalInvoices = () => {
  if (!fs.existsSync(localInvoiceDbPath)) {
    fs.writeFileSync(localInvoiceDbPath, JSON.stringify([]));
  }
  try {
    return JSON.parse(fs.readFileSync(localInvoiceDbPath, 'utf8'));
  } catch (e) {
    return [];
  }
};

const saveLocalInvoices = (data) => {
  fs.writeFileSync(localInvoiceDbPath, JSON.stringify(data, null, 2));
};

// 3. SUPABASE CLOUD DATABASE OPERATIONAL HELPERS

const fetchSupabaseStudents = async () => {
  try {
    const { data, error } = await supabase.from('students').select('*');
    if (error || !data) return null;
    return data.map(s => ({
      id: s.id,
      _id: s.id,
      name: s.name,
      enrolledCourse: s.enrolled_course || s.enrolledCourse || 'all',
      accessCode: s.access_code || s.accessCode,
      deviceId: s.device_id || s.deviceId || null,
      completedLessons: typeof s.completed_lessons === 'string' ? JSON.parse(s.completed_lessons) : (s.completed_lessons || []),
      tasks: typeof s.tasks === 'string' ? JSON.parse(s.tasks) : (s.tasks || []),
      certificate: typeof s.certificate === 'string' ? JSON.parse(s.certificate) : (s.certificate || null),
      status: s.status || 'Active',
      createdAt: s.created_at
    }));
  } catch (e) {
    return null;
  }
};

const syncStudentToSupabase = async (student) => {
  try {
    const payload = {
      id: student.id || student._id || 'stu_' + Date.now(),
      name: student.name,
      enrolled_course: student.enrolledCourse,
      access_code: student.accessCode,
      device_id: student.deviceId || null,
      completed_lessons: JSON.stringify(student.completedLessons || []),
      tasks: JSON.stringify(student.tasks || []),
      certificate: JSON.stringify(student.certificate || null),
      status: student.status || 'Active'
    };
    await supabase.from('students').upsert(payload, { onConflict: 'access_code' });
  } catch (e) {
    console.warn('Supabase student sync notice:', e.message);
  }
};

const deleteStudentFromSupabase = async (accessCodeOrId) => {
  try {
    await supabase.from('students').delete().or(`access_code.eq.${accessCodeOrId},id.eq.${accessCodeOrId}`);
  } catch (e) {
    console.warn('Supabase delete student notice:', e.message);
  }
};

// 4. API ROUTES (SUPABASE BACKEND)

// A. Get all students
app.get('/api/students', async (req, res) => {
  try {
    const supabaseStudents = await fetchSupabaseStudents();
    if (supabaseStudents) {
      // Keep local JSON in sync
      saveLocalStudents(supabaseStudents);
      return res.json(supabaseStudents);
    }
    const local = getLocalStudents();
    return res.json(local);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// B. Register/Create a new student
app.post('/api/students', async (req, res) => {
  const { name, enrolledCourse } = req.body;
  if (!name || !enrolledCourse) {
    return res.status(400).json({ error: 'Name and course enrollment are required!' });
  }

  const accessCode = 'STU-' + Math.floor(1000 + Math.random() * 9000);
  const newStudent = {
    id: 'stu_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    _id: 'stu_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    name,
    enrolledCourse,
    accessCode,
    deviceId: null,
    completedLessons: [],
    tasks: [],
    status: 'Active',
    createdAt: new Date().toISOString()
  };

  try {
    const students = getLocalStudents();
    students.push(newStudent);
    saveLocalStudents(students);

    // Sync to Supabase
    await syncStudentToSupabase(newStudent);

    return res.json(newStudent);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// B-2. Authenticate/Sign In Staff and Admin Roles
app.post('/api/auth/login', async (req, res) => {
  const { role, username, password } = req.body;
  if (!role || !username || !password) {
    return res.status(400).json({ error: 'Role, username and password are required!' });
  }

  if (role === 'admin') {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();
    if (trimmedUser === 'admin' && (trimmedPass === 'admin_portal_2026' || trimmedPass === 'admin' || trimmedPass === '123456')) {
      return res.json({
        success: true,
        role: 'admin',
        name: 'Lead Administrator',
        username: 'admin',
        token: 'mock-jwt-admin-token'
      });
    } else {
      return res.status(401).json({ error: 'Invalid admin username or password!' });
    }
  } else if (role === 'staff') {
    const trimmedUser = username.trim();
    const trimmedPass = password.trim();
    if ((trimmedUser === 'staff_tutor' || trimmedUser === 'staff') && (trimmedPass === 'staff_portal_2026' || trimmedPass === 'staff' || trimmedPass === '123456')) {
      return res.json({
        success: true,
        role: 'staff',
        name: 'Staff Instructor',
        username: trimmedUser,
        token: 'mock-jwt-staff-token'
      });
    }

    const staffList = getLocalStaff();
    const staffMem = staffList.find(s => s.username === username.trim());
    if (staffMem && staffMem.password === password.trim()) {
      return res.json({
        success: true,
        role: 'staff',
        name: staffMem.name,
        username: staffMem.username,
        token: 'mock-jwt-staff-token-' + (staffMem.id || staffMem._id)
      });
    }

    return res.status(401).json({ error: 'Invalid staff username or password!' });
  }

  return res.status(400).json({ error: 'Invalid role specified!' });
});

// C. Authenticate/Sign In Student
app.post('/api/students/login', async (req, res) => {
  const { accessCode } = req.body;
  if (!accessCode) {
    return res.status(400).json({ error: 'Access Code is required!' });
  }

  const codeTrimmed = accessCode.trim();

  try {
    const supabaseStudents = await fetchSupabaseStudents();
    const list = supabaseStudents || getLocalStudents();
    const student = list.find(s => s.accessCode === codeTrimmed);

    if (!student) {
      return res.status(404).json({ error: 'Invalid Access Code. Please try again!' });
    }

    return res.json(student);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-2. Reset Student Device Lock
app.post('/api/students/:id/reset-device', async (req, res) => {
  const { id } = req.params;
  try {
    const students = getLocalStudents();
    const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
    if (idx !== -1) {
      students[idx].deviceId = null;
      saveLocalStudents(students);
      await syncStudentToSupabase(students[idx]);
      return res.json(students[idx]);
    }
    return res.status(404).json({ error: 'Student not found!' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-3. Verify Student Device Lock
app.post('/api/students/verify-device', async (req, res) => {
  const { accessCode, deviceId } = req.body;
  if (!accessCode || !deviceId) {
    return res.status(400).json({ error: 'Access Code and Device ID are required!' });
  }
  try {
    const supabaseStudents = await fetchSupabaseStudents();
    const list = supabaseStudents || getLocalStudents();
    const student = list.find(s => s.accessCode === accessCode.trim());

    if (!student) {
      return res.status(404).json({ error: 'Student not found!' });
    }
    if (student.deviceId && student.deviceId !== deviceId) {
      return res.json({ valid: false });
    }
    return res.json({ valid: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-4. Toggle Student Lesson Completion (Progress Tracking)
app.post('/api/students/:id/progress', async (req, res) => {
  const { id } = req.params;
  const { lessonKey, completed } = req.body;
  if (!lessonKey) {
    return res.status(400).json({ error: 'lessonKey is required!' });
  }

  try {
    const students = getLocalStudents();
    const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
    if (idx === -1) return res.status(404).json({ error: 'Student not found!' });

    const student = students[idx];
    if (!student.completedLessons) student.completedLessons = [];

    const index = student.completedLessons.indexOf(lessonKey);
    if (completed) {
      if (index === -1) student.completedLessons.push(lessonKey);
    } else {
      if (index !== -1) student.completedLessons.splice(index, 1);
    }

    saveLocalStudents(students);
    await syncStudentToSupabase(student);

    return res.json(student);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-5. Submit Homework/Project Task Assignment
app.post('/api/students/:id/tasks', async (req, res) => {
  const { id } = req.params;
  const { moduleId, tabId, taskUrl, taskText } = req.body;
  if (!moduleId || !tabId) {
    return res.status(400).json({ error: 'moduleId and tabId are required!' });
  }

  const urlTrimmed = taskUrl ? taskUrl.trim() : '';
  const textTrimmed = taskText ? taskText.trim() : '';

  if (!urlTrimmed && !textTrimmed) {
    return res.status(400).json({ error: 'Please provide either a submission URL or notes/code details for your assignment.' });
  }

  if (urlTrimmed) {
    const urlPattern = /^https?:\/\/\S+$/i;
    if (!urlPattern.test(urlTrimmed)) {
      return res.status(400).json({ error: 'Please enter a valid submission URL starting with http:// or https://' });
    }
  }

  try {
    const students = getLocalStudents();
    const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
    if (idx === -1) return res.status(404).json({ error: 'Student not found!' });

    const student = students[idx];
    if (!student.tasks) student.tasks = [];

    const existingTask = student.tasks.find(t => t.moduleId === moduleId && t.tabId === tabId);
    if (existingTask) {
      existingTask.taskUrl = urlTrimmed;
      existingTask.taskText = textTrimmed;
      existingTask.submittedAt = new Date().toISOString();
      existingTask.status = 'Pending';
      existingTask.feedback = '';
      existingTask.grade = '';
    } else {
      const newTask = {
        _id: 'task-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
        moduleId,
        tabId,
        taskUrl: urlTrimmed,
        taskText: textTrimmed,
        submittedAt: new Date().toISOString(),
        status: 'Pending',
        feedback: '',
        grade: ''
      };
      student.tasks.push(newTask);
    }

    saveLocalStudents(students);
    await syncStudentToSupabase(student);

    return res.json(student);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// C-6. Grade Student Task Assignment (Admin/Staff only)
app.post('/api/students/tasks/:taskId/grade', async (req, res) => {
  const { taskId } = req.params;
  const { studentId, status, feedback, grade } = req.body;
  if (!studentId || !status) {
    return res.status(400).json({ error: 'studentId and status are required!' });
  }

  const statusTrimmed = status ? status.trim() : '';
  const feedbackTrimmed = feedback ? feedback.trim() : '';
  const gradeTrimmed = grade ? grade.trim() : '';

  if (!['Approved', 'Rejected', 'Pending'].includes(statusTrimmed)) {
    return res.status(400).json({ error: 'Invalid review status. Status must be Approved, Rejected, or Pending.' });
  }

  if (statusTrimmed === 'Rejected' && feedbackTrimmed.length < 10) {
    return res.status(400).json({ error: 'Evaluation feedback is required and must be at least 10 characters when rejecting an assignment.' });
  }

  if (statusTrimmed === 'Approved' && !gradeTrimmed) {
    return res.status(400).json({ error: 'A grade or score is required when approving an assignment.' });
  }

  try {
    const students = getLocalStudents();
    const idx = students.findIndex(s => s.id === studentId || s._id === studentId || s.accessCode === studentId.trim());
    if (idx === -1) return res.status(404).json({ error: 'Student not found!' });

    const student = students[idx];
    if (!student.tasks) student.tasks = [];

    const task = student.tasks.find(t => t._id === taskId || t.id === taskId);
    if (!task) return res.status(404).json({ error: 'Task submission not found!' });

    task.status = statusTrimmed;
    task.feedback = feedbackTrimmed;
    task.grade = gradeTrimmed;

    saveLocalStudents(students);
    await syncStudentToSupabase(student);

    return res.json(student);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// D. Delete student
app.delete('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let students = getLocalStudents();
    const target = students.find(s => s.id === id || s._id === id || s.accessCode === id);
    students = students.filter(s => s.id !== id && s._id !== id && s.accessCode !== id);
    saveLocalStudents(students);

    if (target) {
      await deleteStudentFromSupabase(target.accessCode || target.id);
    }
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// D-2. Update student courses
app.put('/api/students/:id', async (req, res) => {
  const { id } = req.params;
  const { enrolledCourse } = req.body;
  if (!enrolledCourse) {
    return res.status(400).json({ error: 'enrolledCourse is required!' });
  }

  try {
    const students = getLocalStudents();
    const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
    if (idx === -1) return res.status(404).json({ error: 'Student not found!' });

    students[idx].enrolledCourse = enrolledCourse;
    saveLocalStudents(students);

    await syncStudentToSupabase(students[idx]);
    return res.json(students[idx]);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// E. Dynamic Staff Management API Routes
app.get('/api/staff', async (req, res) => {
  try {
    return res.json(getLocalStaff());
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.post('/api/staff', async (req, res) => {
  const { name, username, password } = req.body;
  if (!name || !username || !password) {
    return res.status(400).json({ error: 'Name, username and password are required!' });
  }

  try {
    const staffList = getLocalStaff();
    const existing = staffList.find(s => s.username === username.trim());
    if (existing || username.trim() === 'staff_tutor' || username.trim() === 'admin') {
      return res.status(400).json({ error: 'Username is already taken!' });
    }
    const newStaff = { id: 'staff_' + Date.now(), name: name.trim(), username: username.trim(), password: password.trim() };
    staffList.push(newStaff);
    saveLocalStaff(staffList);
    return res.json(newStaff);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.delete('/api/staff/:id', async (req, res) => {
  const { id } = req.params;
  try {
    let staffList = getLocalStaff();
    staffList = staffList.filter(s => s.id !== id);
    saveLocalStaff(staffList);
    return res.json({ success: true });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// F. Certificate Routes
app.post('/api/students/:id/certificate', async (req, res) => {
  const { id } = req.params;
  const { certificateData, filename, mimeType } = req.body;

  if (!certificateData || !certificateData.trim()) {
    return res.status(400).json({ error: 'Certificate data (Base64) is required.' });
  }
  if (!filename || !filename.trim()) {
    return res.status(400).json({ error: 'Certificate filename is required.' });
  }

  const certPayload = {
    data: certificateData.trim(),
    filename: filename.trim(),
    mimeType: mimeType ? mimeType.trim() : 'application/pdf',
    uploadedAt: new Date().toISOString()
  };

  try {
    const students = getLocalStudents();
    const idx = students.findIndex(s => s.id === id || s._id === id || s.accessCode === id.trim());
    if (idx === -1) return res.status(404).json({ error: 'Student not found!' });
    students[idx].certificate = certPayload;
    saveLocalStudents(students);

    await syncStudentToSupabase(students[idx]);
    return res.json({ success: true, student: students[idx] });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.get('/api/students/:id/certificate', async (req, res) => {
  const { id } = req.params;
  try {
    const students = getLocalStudents();
    const student = students.find(s => s.id === id || s._id === id || s.accessCode === id.trim());
    if (!student) return res.status(404).json({ error: 'Student not found!' });
    return res.json(student.certificate || null);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// G. INVOICE ROUTES
app.get('/api/invoices', async (req, res) => {
  try {
    const invoices = getLocalInvoices();
    invoices.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    return res.json(invoices);
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.post('/api/invoices', async (req, res) => {
  const invoiceData = req.body;
  if (!invoiceData || !invoiceData.invoiceNo || !invoiceData.invoiceNo.trim()) {
    return res.status(400).json({ error: 'Invoice number is required.' });
  }

  const invoiceNo = invoiceData.invoiceNo.trim();
  const payload = {
    ...invoiceData,
    invoiceNo,
    updatedAt: new Date().toISOString()
  };

  try {
    const invoices = getLocalInvoices();
    const idx = invoices.findIndex(inv => inv.invoiceNo === invoiceNo);
    if (idx >= 0) {
      invoices[idx] = { ...invoices[idx], ...payload };
    } else {
      invoices.unshift({
        _id: 'inv_' + Math.random().toString(36).substring(2, 11),
        createdAt: new Date().toISOString(),
        ...payload
      });
    }
    saveLocalInvoices(invoices);
    return res.json({ success: true, invoice: idx >= 0 ? invoices[idx] : invoices[0] });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

app.delete('/api/invoices/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const invoices = getLocalInvoices();
    const filtered = invoices.filter(inv => inv._id !== id && inv.id !== id && inv.invoiceNo !== id);
    if (filtered.length === invoices.length) {
      return res.status(404).json({ error: 'Invoice not found!' });
    }
    saveLocalInvoices(filtered);
    return res.json({ success: true, message: 'Invoice deleted successfully.' });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
});

// Start Server locally
if (!process.env.VERCEL) {
  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`🚀 LMS Backend listening live on http://localhost:${PORT}`);
  });
}

export default app;
