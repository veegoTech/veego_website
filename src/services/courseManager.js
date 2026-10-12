import { supabase, isSupabaseConfigured } from './supabase';

const STORAGE_KEY = 'veego_dynamic_courses';

const DEFAULT_STARTER_COURSE = {
  id: 'custom_fullstack_ai',
  title: 'Full Stack AI & Web Development',
  category: 'Full Stack & AI',
  badge: 'Interactive LMS',
  desc: 'Dynamic LMS course with modular sub-courses, topics, Tamil & English explanations, and live code examples.',
  icon: 'Sparkles',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  modules: [
    {
      id: 'mod_web_fundamentals',
      title: 'Module 1: Web Architecture & Core Fundamentals',
      desc: 'Understand how clients, servers, and APIs communicate in modern web systems.',
      topics: [
        {
          id: 'topic_client_server',
          title: 'Topic 1: How the Modern Web Works (Client-Server Model)',
          duration: '15 mins',
          content: `# Welcome to Modern Web Development 🚀

### 🎯 Learning Objectives / கற்றல் நோக்கங்கள்
In this lesson, you will master the fundamental client-server lifecycle, HTTP request-response flow, and how modern web applications operate.

> 💡 **Core Takeaway**: Every modern digital application is a continuous structured conversation between a Client (Browser/Mobile) and a Server (API & Database).

---

### 🌐 English & தமிழ் Concept Comparison

| Concept (English) | தமிழ் விளக்கம் (Tamil Translation) | Real-world Analogy |
|---|---|---|
| **Client** | உலாவி / பயனர் திரை (Browser UI) | உணவகத்தில் வாடிக்கையாளர் (Customer) |
| **Server** | சேவையகம் (Logic Engine) | உணவக சமையலறை (Kitchen) |
| **API / Endpoint** | தரவு தொடர்பு பாதை | உணவு கொண்டுவரும் சர்வர் (Waiter) |
| **Database** | நிரந்தர தரவகம் | சரக்கு அறை / சேமிப்பகம் (Pantry) |

---

### 💻 Live Code Example
Here is how frontend JavaScript fetches dynamic data from a backend server:

\`\`\`javascript
// Fetch user profile asynchronously
async function fetchUserProfile(userId) {
  try {
    const response = await fetch(\`https://api.example.com/users/\${userId}\`);
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    console.log('User data loaded:', data);
    return data;
  } catch (error) {
    console.error('Fetch error:', error);
  }
}
\`\`\`

---

### 📝 Key Rules to Remember
1. **Frontend never trusts User Input blindly**: Always validate on the server side.
2. **Stateless HTTP**: Every request must carry authentication tokens or session cookies.
3. **Use DevTools**: Press \`F12\` -> Click **Network Tab** to inspect all live HTTP calls!
`
        },
        {
          id: 'topic_three_tier',
          title: 'Topic 2: The 3-Tier Architecture (UI, Logic, DB)',
          duration: '20 mins',
          content: `# Understanding 3-Tier Architecture 🏛️

A scalable software architecture separates concerns into three distinct layers:

### 1. Presentation Tier (Frontend UI)
- Built with HTML, CSS, JavaScript, React, or Vue.
- Responsible for user experience, responsive views, animations, and inputs.

### 2. Application Tier (Backend Logic)
- Built with Node.js, Express, Python, Django, or Go.
- Enforces business rules, authentication, payment processing, and security.

### 3. Data Tier (Database Persistence)
- Built with PostgreSQL, Supabase, MySQL, or MongoDB.
- Stores users, courses, payment logs, and submission records safely.

---

> ⚡ **Quick Self-Check**: When you log into an LMS, which tier checks your password hash against the stored database record? **Answer**: Application Tier (Backend Server)!
`
        }
      ]
    },
    {
      id: 'mod_api_integration',
      title: 'Module 2: RESTful APIs & Data Fetching',
      desc: 'Master GET, POST, PUT, DELETE methods and JSON data handling.',
      topics: [
        {
          id: 'topic_rest_verbs',
          title: 'Topic 1: REST HTTP Verbs Explained',
          duration: '25 mins',
          content: `# REST HTTP Methods & Best Practices 📡

REST (Representational State Transfer) defines standardized verbs for data actions:

| HTTP Verb | Operation | Database CRUD | Safe / Idempotent |
|---|---|---|---|
| **GET** | Read resource | SELECT | Yes |
| **POST** | Create new resource | INSERT | No |
| **PUT / PATCH** | Update resource | UPDATE | Yes / Partial |
| **DELETE** | Remove resource | DELETE | Yes |

---

### 💡 Tamil Explanation (எளிய விளக்கம்)
- **GET**: தகவலை பெற மட்டும் பயன்படும்.
- **POST**: புதிய மாணவர் அல்லது தகவலை சேர்க்க பயன்படும்.
- **PUT**: ஏற்கெனவே உள்ள தகவலை புதுப்பிக்க பயன்படும்.
- **DELETE**: தகவலை நீக்க பயன்படும்.
`
        }
      ]
    }
  ]
};

// Retrieve all dynamic courses
export function getDynamicCourses() {
  if (typeof window === 'undefined') return [DEFAULT_STARTER_COURSE];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      // Seed default course if nothing exists yet
      localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_STARTER_COURSE]));
      return [DEFAULT_STARTER_COURSE];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([DEFAULT_STARTER_COURSE]));
      return [DEFAULT_STARTER_COURSE];
    }
    return parsed;
  } catch (e) {
    console.error('Failed to parse dynamic courses:', e);
    return [DEFAULT_STARTER_COURSE];
  }
}

// Retrieve single course by ID
export function getDynamicCourseById(courseId) {
  const courses = getDynamicCourses();
  return courses.find(c => c.id === courseId) || null;
}

// Save or Update a dynamic course
export async function saveDynamicCourse(courseData) {
  if (!courseData || !courseData.id) throw new Error('Invalid course data: ID required');
  const courses = getDynamicCourses();
  const existingIdx = courses.findIndex(c => c.id === courseData.id);

  const updatedCourse = {
    ...courseData,
    updatedAt: new Date().toISOString()
  };

  let newCourses;
  if (existingIdx >= 0) {
    newCourses = [...courses];
    newCourses[existingIdx] = updatedCourse;
  } else {
    updatedCourse.createdAt = updatedCourse.createdAt || new Date().toISOString();
    newCourses = [updatedCourse, ...courses];
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(newCourses));
  window.dispatchEvent(new CustomEvent('veego_courses_updated', { detail: newCourses }));

  // Optional Supabase cloud synchronization
  if (isSupabaseConfigured) {
    try {
      await supabase.from('dynamic_courses').upsert({
        id: updatedCourse.id,
        title: updatedCourse.title,
        data: updatedCourse,
        updated_at: updatedCourse.updatedAt
      });
    } catch (err) {
      console.warn('Supabase dynamic course sync failed, local copy intact:', err);
    }
  }

  return updatedCourse;
}

// Delete a dynamic course
export async function deleteDynamicCourse(courseId) {
  const courses = getDynamicCourses();
  const filtered = courses.filter(c => c.id !== courseId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  window.dispatchEvent(new CustomEvent('veego_courses_updated', { detail: filtered }));

  if (isSupabaseConfigured) {
    try {
      await supabase.from('dynamic_courses').delete().eq('id', courseId);
    } catch (err) {
      console.warn('Supabase course deletion sync failed:', err);
    }
  }
  return filtered;
}

// Export courses as formatted JSON file
export function exportCoursesToJson() {
  const courses = getDynamicCourses();
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(courses, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `veego_courses_backup_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Import courses from JSON text
export function importCoursesFromJson(jsonString) {
  try {
    const parsed = JSON.parse(jsonString);
    if (!Array.isArray(parsed)) {
      throw new Error('Imported data must be an array of courses');
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    window.dispatchEvent(new CustomEvent('veego_courses_updated', { detail: parsed }));
    return { success: true, count: parsed.length };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
