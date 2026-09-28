export const proTopic4 = {
  "title": "Email Etiquette - Part 1 (Interface & Basics)",
  "phase": 2,
  "introduction": {
    "whyImportant": "Understanding the email interface is the first step to professional communication. Knowing how to properly address and attach files prevents embarrassing mistakes.",
    "whereUsed": [
      "Office Communication",
      "Sending Files",
      "CCing Managers"
    ],
    "images": [
      "assets/img/email_etiquette.png"
    ],
    "realLifeSituations": "Sending a weekly report with an attachment and copying your manager.",
    "commonMistakes": [
      "Putting everyone in 'To' instead of 'BCC' for privacy",
      "Forgetting to attach the file before hitting send",
      "Not knowing how to insert a proper hyperlink"
    ]
  },
  "learningObjectives": [
    "Understand To, CC, and BCC",
    "Properly attach files and insert links",
    "Use labels and mark emails as important"
  ],
  "steps": [
    {
      "step": 1,
      "title": "To, CC, and BCC",
      "explain": "To: Main recipient. CC (Carbon Copy): Keep someone informed. BCC (Blind Carbon Copy): Hide recipients for privacy.",
      "example": "To: Client | CC: Manager | BCC: Mailing List",
      "practice": "Identify when to use CC vs BCC.",
      "tip": "Use BCC when emailing a large list of people who don't know each other."
    },
    {
      "step": 2,
      "title": "Send and Schedule Send",
      "explain": "Click 'Send' to dispatch immediately, or 'Schedule Send' for a specific time.",
      "example": "Schedule an email for 9 AM Monday.",
      "practice": "Find the schedule send button in Gmail.",
      "tip": "Scheduling emails is great if you work late but want to look professional."
    },
    {
      "step": 3,
      "title": "Attachments",
      "explain": "Attach files using the paperclip icon.",
      "example": "Attach 'Report.pdf'.",
      "practice": "Attach a test PDF to an email draft.",
      "tip": "Attach the file BEFORE you start writing the email."
    },
    {
      "step": 4,
      "title": "Inserting Links",
      "explain": "Use the link icon or Ctrl+K to insert clean hyperlinks instead of pasting long URLs.",
      "example": "Click [here] to view the document.",
      "practice": "Create a hyperlink with the text 'Project Scope'.",
      "tip": "Never paste raw, ugly 3-line URLs in professional emails."
    },
    {
      "step": 5,
      "title": "Labels and Important",
      "explain": "Organize your inbox with Labels and the Important (Star) marker.",
      "example": "Label an email as 'Urgent'.",
      "practice": "Create a label in your email client.",
      "tip": "A tidy inbox is a productive inbox."
    }
  ],
  "examples": {
    "wrong": "Pasting a raw URL: https://docs.google.com/spreadsheets/d/1234567890abcdefghijklmnopqrstuvwxyz/edit#gid=0",
    "correct": "Using a hyperlink: Click [here] to view the spreadsheet.",
    "professional": "I have attached the Q3 report for your review.",
    "interview": "N/A",
    "office": "CCing your manager when sending deliverables to a client."
  },
  "aiConversation": [
    {
      "role": "Manager",
      "text": "Please send the client the new guidelines and BCC the entire team so they have a copy."
    },
    {
      "role": "Student",
      "text": "Will do. I'll put the client in the 'To' field and the team in the 'BCC' field to protect their privacy."
    }
  ],
  "vocabulary": [
    {
      "word": "BCC",
      "meaning": "Blind Carbon Copy",
      "pronunciation": "bee-cee-cee",
      "example": "BCC the external vendors.",
      "usage": "Privacy",
      "synonyms": "Hidden Copy"
    }
  ],
  "communicationTips": {
    "bodyLanguage": "N/A",
    "eyeContact": "N/A",
    "smile": "N/A",
    "confidence": "Be sure of who you are emailing before hitting send."
  },
  "dosAndDonts": {
    "dos": [
      "Use BCC for large lists",
      "Attach files first",
      "Use clean hyperlinks"
    ],
    "donts": [
      "Don't CC everyone unnecessarily",
      "Don't paste raw URLs"
    ]
  },
  "activities": [
    {
      "type": "Matching",
      "desc": "Match the fields (To, CC, BCC) to their correct use cases."
    }
  ],
  "scenarioPractice": {
    "situation": "You are sending an announcement to 50 employees.",
    "prompt": "Which field do you use for their email addresses?"
  },
  "assignment": "Draft an email with an attachment and a hyperlink.",
  "assessment": {
    "mcq": [
      {
        "q": "When should you use BCC?",
        "options": [
          "To keep someone in the loop",
          "To send an attachment",
          "To hide recipient email addresses for privacy"
        ],
        "answer": "To hide recipient email addresses for privacy"
      }
    ]
  },
  "aiFeedbackCriteria": [
    "Accuracy of field usage",
    "Understanding of attachments"
  ],
  "staffNotes": {
    "teachingFlow": "Open Gmail and physically show the interface. Explain CC vs BCC.",
    "commonMistakes": "Students CCing instead of BCCing large lists."
  }
};
export default proTopic4;
