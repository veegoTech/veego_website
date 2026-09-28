// Weekly Assessments Data for Alpha Fly SPOKO Level 1
window.assessmentsData = [
    {
        id: "a1",
        dayTrigger: 5,
        title: "Assessment 1: Basics & Introductions",
        topics: ["Greetings", "Self Introduction", "Alphabet & Sounds", "Numbers", "Days & Months", "Pronouns", "Be Verbs"],
        learningOutcomes: ["Can introduce oneself confidently", "Recognizes alphabet sounds", "Can count and use days/months", "Understands basic pronouns and 'be' verbs"],
        duration: "15 Mins",
        totalMarks: 50,
        passingMarks: 35,
        questions: [
            // Vocabulary & Grammar (MCQ & Fill in Blanks)
            { type: "mcq", category: "Grammar", q: "Choose the correct verb: 'I ___ a student.'", options: ["is", "are", "am"], answer: "am", marks: 5 },
            { type: "mcq", category: "Grammar", q: "Which pronoun is used for a boy?", options: ["She", "He", "It"], answer: "He", marks: 5 },
            { type: "fill", category: "Vocabulary", q: "The day after Monday is ________.", answer: "Tuesday", marks: 5 },
            { type: "mcq", category: "Vocabulary", q: "What is the correct greeting for 8:00 AM?", options: ["Good Evening", "Good Morning", "Good Night"], answer: "Good Morning", marks: 5 },
            
            // Listening Activity
            { type: "listening", category: "Listening", script: "Hello, my name is Raj. I am 10 years old. Today is Monday.", q: "What day is it in the audio?", options: ["Sunday", "Monday", "Tuesday"], answer: "Monday", marks: 10 },
            
            // Speaking Activity (Microphone)
            { type: "speaking", category: "Speaking", prompt: "Introduce yourself in 2 sentences. Mention your name and age.", expectedKeywords: ["name is", "i am", "years old"], marks: 10 },
            
            // Highlight Reading / Read Aloud
            { type: "read_aloud", category: "Reading", passage: "Good morning. My name is Raj. I am a student.", expectedKeywords: ["good", "morning", "name", "raj", "student"], marks: 10 }
        ],
        staffGuide: {
            answerKey: "1. am, 2. He, 3. Tuesday, 4. Good Morning, 5. Monday",
            rubrics: {
                speaking: "20 Marks: Fluent and clear. 15 Marks: Minor pronunciation errors. 10 Marks: Hesitant but understandable. 5 Marks: Struggled to form sentences."
            },
            commonMistakes: "Students often use 'I is' instead of 'I am'. They may mispronounce 'Tuesday'.",
            remedial: "Review Day 2 (Self Introduction) and Day 4 (Days & Months) for struggling students."
        }
    },
    {
        id: "a2",
        dayTrigger: 10,
        title: "Assessment 2: Family & Environment",
        topics: ["Family", "Home", "Colours", "Shapes", "Fruits", "Vegetables", "Articles", "This/That", "Singular/Plural"],
        learningOutcomes: ["Can describe family members", "Identifies objects around home", "Understands basic articles and plurals"],
        duration: "20 Mins",
        totalMarks: 60,
        passingMarks: 40,
        questions: [
            { type: "mcq", category: "Grammar", q: "Choose the correct article: 'I have ___ apple.'", options: ["a", "an", "the"], answer: "an", marks: 5 },
            { type: "fill", category: "Grammar", q: "Plural of 'Box' is ________.", answer: "boxes", marks: 5 },
            { type: "mcq", category: "Vocabulary", q: "Your mother's brother is your ___.", options: ["Uncle", "Aunt", "Cousin"], answer: "Uncle", marks: 5 },
            { type: "mcq", category: "Grammar", q: "___ is a pen (pointing to something far away).", options: ["This", "That", "These"], answer: "That", marks: 5 },
            
            // Listening Activity
            { type: "listening", category: "Listening", script: "My house is big. It has three bedrooms and a red door.", q: "What color is the door?", options: ["Blue", "Red", "Green"], answer: "Red", marks: 10 },
            
            // Picture / Speaking Activity
            { type: "speaking", category: "Speaking", prompt: "Describe your family in 3 sentences.", expectedKeywords: ["mother", "father", "brother", "sister", "family"], marks: 20 },
            
            // Reading Activity
            { type: "reading", category: "Reading", passage: "Ravi likes fruits. His favorite fruit is mango. He eats a mango every day.", q: "What is Ravi's favorite fruit?", options: ["Apple", "Banana", "Mango"], answer: "Mango", marks: 10 }
        ],
        staffGuide: {
            answerKey: "1. an, 2. Boxes, 3. Uncle, 4. That, 5. Red, 7. Mango",
            rubrics: {
                speaking: "20 Marks: Fluent and clear. 15 Marks: Minor grammar errors. 10 Marks: Hesitant. 5 Marks: Very poor fluency."
            },
            commonMistakes: "Confusing 'This' and 'That'. Using 'a' before vowels.",
            remedial: "Practice pointing to objects in the classroom with 'This/That'."
        }
    },
    // Placeholders for Assessments 3-9
    { id: "a3", dayTrigger: 15, title: "Assessment 3: Food & Daily Objects", topics: ["Food", "Classroom"], learningOutcomes: ["Can describe food"], duration: "20 Mins", totalMarks: 50, passingMarks: 35, questions: [], staffGuide: {} },
    { id: "a4", dayTrigger: 20, title: "Assessment 4: Daily Routine & Time", topics: ["Routine", "Time"], learningOutcomes: ["Can tell time"], duration: "20 Mins", totalMarks: 50, passingMarks: 35, questions: [], staffGuide: {} },
    { id: "a5", dayTrigger: 25, title: "Assessment 5: Plans & Future", topics: ["Friends", "Future"], learningOutcomes: ["Can discuss plans"], duration: "20 Mins", totalMarks: 50, passingMarks: 35, questions: [], staffGuide: {} },
    { id: "a6", dayTrigger: 30, title: "Assessment 6: Navigation & Shopping", topics: ["Shopping", "Directions"], learningOutcomes: ["Can give directions"], duration: "20 Mins", totalMarks: 50, passingMarks: 35, questions: [], staffGuide: {} },
    { id: "a7", dayTrigger: 35, title: "Assessment 7: Descriptions", topics: ["City", "People"], learningOutcomes: ["Can describe places"], duration: "20 Mins", totalMarks: 50, passingMarks: 35, questions: [], staffGuide: {} },
    { id: "a8", dayTrigger: 40, title: "Assessment 8: Stories & Travel", topics: ["Travel", "Festivals"], learningOutcomes: ["Can tell stories"], duration: "20 Mins", totalMarks: 50, passingMarks: 35, questions: [], staffGuide: {} },
    { id: "a9", dayTrigger: 45, title: "Final Assessment", topics: ["All Topics"], learningOutcomes: ["Full Level 1 Mastery"], duration: "45 Mins", totalMarks: 100, passingMarks: 70, questions: [], staffGuide: {} }
];
