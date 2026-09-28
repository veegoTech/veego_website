export const proTopic2 = {
  "title": "ATS-Friendly Resume Building with Overleaf",
  "phase": 1,
  "images": [
    "assets/img/ats_scan.png",
    "assets/img/overleaf_ui.png"
  ],
  "section1": {
    "title": "Introduction to ATS",
    "description": "What is an Applicant Tracking System and why do companies use it?",
    "points": [
      "ATS software filters resumes before a human sees them.",
      "If your resume doesn't parse correctly, you get rejected automatically.",
      "An ATS-friendly resume ensures maximum keyword match."
    ]
  },
  "section2": {
    "title": "Resume Structure",
    "fields": [
      {
        "name": "Full Name",
        "desc": "Largest text on the page.",
        "mistake": "Using a nickname."
      },
      {
        "name": "Professional Title",
        "desc": "E.g., Software Developer.",
        "mistake": "Missing title."
      },
      {
        "name": "Contact Number",
        "desc": "With country code.",
        "mistake": "Unreachable number."
      },
      {
        "name": "Professional Email",
        "desc": "firstname.lastname@gmail.com",
        "mistake": "coolboy99@gmail.com"
      },
      {
        "name": "LinkedIn Profile",
        "desc": "Customized URL.",
        "mistake": "Not hyperlinked."
      },
      {
        "name": "GitHub Profile",
        "desc": "Link to repositories.",
        "mistake": "Empty GitHub."
      },
      {
        "name": "Portfolio (Optional)",
        "desc": "Personal website.",
        "mistake": "Broken link."
      },
      {
        "name": "Career Objective",
        "desc": "Targeted summary.",
        "mistake": "Too long / generic."
      },
      {
        "name": "Technical Skills",
        "desc": "Languages, frameworks, tools.",
        "mistake": "Progress bars (ATS hates them)."
      },
      {
        "name": "Soft Skills",
        "desc": "Communication, leadership.",
        "mistake": "Listing too many."
      },
      {
        "name": "Education",
        "desc": "Reverse chronological.",
        "mistake": "Missing graduation date."
      },
      {
        "name": "Projects",
        "desc": "Problem, Solution, Impact.",
        "mistake": "No links to live code."
      },
      {
        "name": "Internship Experience",
        "desc": "What you achieved.",
        "mistake": "Listing only daily duties."
      },
      {
        "name": "Work Experience",
        "desc": "Quantified impact.",
        "mistake": "No metrics."
      },
      {
        "name": "Certifications",
        "desc": "Relevant courses.",
        "mistake": "Expired certs."
      },
      {
        "name": "Achievements",
        "desc": "Hackathons, awards.",
        "mistake": "Irrelevant awards."
      },
      {
        "name": "Languages Known",
        "desc": "Proficiency levels.",
        "mistake": "Lying about fluency."
      }
    ]
  },
  "section3": {
    "dos": [
      "One-column layout",
      "Simple fonts (Arial, Calibri, Roboto)",
      "Consistent formatting",
      "Standard headings",
      "Reverse chronological order",
      "Action verbs",
      "Quantifiable achievements",
      "Professional file naming (First_Last_Resume.pdf)"
    ],
    "donts": [
      "Tables or text boxes",
      "Icons and images",
      "Logos and graphics",
      "Excessive colors",
      "Multi-column layouts",
      "Headers/Footers for important information"
    ]
  },
  "section4": {
    "steps": [
      {
        "step": 1,
        "title": "Visit Overleaf",
        "desc": "Go to overleaf.com and sign up."
      },
      {
        "step": 2,
        "title": "New Project",
        "desc": "Click 'New Project' -> 'Blank Project' or search for 'ATS Resume'."
      },
      {
        "step": 3,
        "title": "Understand Interface",
        "desc": "Project Explorer (left), Code Editor (middle), PDF Preview (right)."
      },
      {
        "step": 4,
        "title": "Choose Template",
        "desc": "Find a clean, one-column text-only template like Jake's Resume."
      },
      {
        "step": 5,
        "title": "Contact Details",
        "desc": "Update the top variables with your email, phone, and links."
      },
      {
        "step": 6,
        "title": "Education Section",
        "desc": "Fill in your college, degree, and GPA."
      },
      {
        "step": 7,
        "title": "Skills Section",
        "desc": "Separate languages, frameworks, and developer tools using commas."
      },
      {
        "step": 8,
        "title": "Experience/Projects",
        "desc": "Use \\\\resumeItem{} for bullet points. Start with action verbs."
      },
      {
        "step": 9,
        "title": "Compile",
        "desc": "Click 'Recompile' or press Ctrl+Enter."
      },
      {
        "step": 10,
        "title": "Preview",
        "desc": "Check for formatting issues or overflow in the PDF preview."
      },
      {
        "step": 11,
        "title": "Download",
        "desc": "Click the download button and save as 'YourName_Resume_Role.pdf'."
      }
    ]
  },
  "section5": {
    "actionVerbs": [
      "Developed",
      "Designed",
      "Implemented",
      "Automated",
      "Optimized",
      "Integrated",
      "Analyzed",
      "Collaborated",
      "Delivered",
      "Improved"
    ],
    "weak": "Made a website using React.",
    "strong": "Developed a responsive e-commerce web application using React and Node.js, increasing user engagement by 25%."
  },
  "section6": {
    "tools": [
      {
        "name": "ChatGPT / Gemini",
        "desc": "Best for summarizing and generating action verbs."
      },
      {
        "name": "Teal AI",
        "desc": "Best for building and tracking resumes against job descriptions."
      },
      {
        "name": "Jobscan",
        "desc": "Best for comparing your resume against a specific ATS."
      },
      {
        "name": "Grammarly",
        "desc": "Best for fixing typos and ensuring a professional tone."
      }
    ],
    "workflow": [
      "Identify target job role",
      "Copy job description",
      "Identify keywords with AI",
      "Generate professional summary",
      "Improve project descriptions",
      "Rewrite achievements with action verbs",
      "Optimize technical skills",
      "Check grammar",
      "Compare with Jobscan",
      "Export final PDF"
    ]
  },
  "section7": {
    "roles": [
      {
        "role": "Frontend Developer",
        "keywords": "React, Vue, UI/UX, Responsive, Webpack"
      },
      {
        "role": "Backend Developer",
        "keywords": "Node.js, Python, APIs, SQL, Microservices"
      },
      {
        "role": "Data Analyst",
        "keywords": "Python, Pandas, SQL, Tableau, PowerBI, Statistics"
      }
    ]
  },
  "section8": {
    "mistakes": [
      {
        "wrong": "Skill Level: ■■■■□",
        "right": "Skills: JavaScript, Python, C++"
      },
      {
        "wrong": "Email: sweet_angel23@gmail.com",
        "right": "Email: john.doe@gmail.com"
      },
      {
        "wrong": "2 page resume for fresher",
        "right": "1 page concise resume"
      }
    ]
  },
  "section11": {
    "questions": [
      {
        "q": "What does ATS stand for?",
        "options": [
          "Automated Testing System",
          "Applicant Tracking System",
          "Advanced Tracking Software"
        ],
        "answer": "Applicant Tracking System"
      },
      {
        "q": "Which of these is strictly forbidden in an ATS resume?",
        "options": [
          "Action Verbs",
          "Bullet points",
          "Progress Bar Graphics"
        ],
        "answer": "Progress Bar Graphics"
      }
    ]
  }
};
export default proTopic2;
