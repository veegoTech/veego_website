const pg = require('pg');

const connectionString = 'postgresql://postgres:Veego_website@1234@db.gwnvporjhybkcojeloti.supabase.co:5432/postgres';

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false }
});

const schemaSql = `
-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Customers Table
CREATE TABLE IF NOT EXISTS customers (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  organization VARCHAR(255),
  tier VARCHAR(50) DEFAULT 'Lead',
  status VARCHAR(50) DEFAULT 'Active',
  total_spend NUMERIC DEFAULT 0,
  tags TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  last_activity_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Customer Queries Table
CREATE TABLE IF NOT EXISTS customer_queries (
  id VARCHAR(255) PRIMARY KEY,
  customer_id VARCHAR(255) REFERENCES customers(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  organization VARCHAR(255),
  inquiry_type VARCHAR(100),
  category VARCHAR(100),
  problem_description TEXT,
  priority VARCHAR(50) DEFAULT 'Medium',
  status VARCHAR(50) DEFAULT 'New',
  admin_notes TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- 4. Customer Feedback Table
CREATE TABLE IF NOT EXISTS customer_feedback (
  id VARCHAR(255) PRIMARY KEY,
  customer_id VARCHAR(255) REFERENCES customers(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  target_type VARCHAR(100),
  target_id VARCHAR(100),
  target_title VARCHAR(255),
  rating INT DEFAULT 5,
  feedback_type VARCHAR(100),
  comment TEXT,
  is_public BOOLEAN DEFAULT TRUE,
  status VARCHAR(50) DEFAULT 'Approved',
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Students Table (LMS)
CREATE TABLE IF NOT EXISTS students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  access_code VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255),
  phone VARCHAR(50),
  enrolled_course VARCHAR(100) DEFAULT 'all',
  device_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'Active',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Student Progress Table (LMS)
CREATE TABLE IF NOT EXISTS student_progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id VARCHAR(100) NOT NULL,
  lesson_id VARCHAR(100) NOT NULL,
  completed BOOLEAN DEFAULT TRUE,
  completed_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT unique_student_lesson UNIQUE (student_id, course_id, lesson_id)
);

-- 7. Student Submissions Table (LMS)
CREATE TABLE IF NOT EXISTS student_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  course_id VARCHAR(100) NOT NULL,
  task_id VARCHAR(100) NOT NULL,
  submission_content TEXT,
  score INT,
  status VARCHAR(50) DEFAULT 'Submitted',
  submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. Enable Row Level Security (RLS) & Public Read/Insert Policies
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_queries ENABLE ROW LEVEL SECURITY;
ALTER TABLE customer_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous & public read/write access via Supabase client API
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Allow All Customers') THEN
    CREATE POLICY "Public Allow All Customers" ON customers FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Allow All Queries') THEN
    CREATE POLICY "Public Allow All Queries" ON customer_queries FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Allow All Feedback') THEN
    CREATE POLICY "Public Allow All Feedback" ON customer_feedback FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Allow All Students') THEN
    CREATE POLICY "Public Allow All Students" ON students FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Allow All Progress') THEN
    CREATE POLICY "Public Allow All Progress" ON student_progress FOR ALL USING (true) WITH CHECK (true);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE policyname = 'Public Allow All Submissions') THEN
    CREATE POLICY "Public Allow All Submissions" ON student_submissions FOR ALL USING (true) WITH CHECK (true);
  END IF;
END $$;

-- 9. Seed Sample Student & Customer Data
INSERT INTO students (access_code, name, enrolled_course)
VALUES ('STU-DEMO', 'Demo Student', 'all')
ON CONFLICT (access_code) DO NOTHING;

INSERT INTO customers (id, name, email, organization, tier, status)
VALUES ('CUST-001', 'VeeGo Admin', 'veego.support@gmail.com', 'VeeGo Technologies', 'Enterprise', 'Active')
ON CONFLICT (id) DO NOTHING;
`;

async function run() {
  console.log('Connecting to Supabase PostgreSQL...');
  try {
    await client.connect();
    console.log('Connected! Executing schema creation SQL...');
    await client.query(schemaSql);
    console.log('SUCCESS: All tables, policies, and seed data created in Supabase database!');
  } catch (err) {
    console.error('Error executing schema:', err);
  } finally {
    await client.end();
  }
}

run();
