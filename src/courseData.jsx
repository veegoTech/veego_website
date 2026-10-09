import React from 'react';
import {
  BookOpen, LayoutTemplate, Type, Box, Image as ImageIcon, FileText,
  Code, CheckCircle, LayoutGrid, Layers, MonitorPlay, MousePointerClick,
  Video, Edit3, Palette, Layout, Brush, FileCode2, Target, Type as TypeIcon,
  Wand2, FastForward, Move3d, Clapperboard, Smartphone, Database, Table, Columns, List, Terminal, ShieldAlert, PenTool, Settings, PieChart, Link, Activity, Store,
  Briefcase, Map, Zap, Brain, Bot, Cpu, GitBranch, Rocket, Eye, Sliders, Filter, Trophy, Shield, FileSpreadsheet, Music, RefreshCw, Sparkles, Hash, Globe, Wifi, AlertTriangle, AlertCircle, Award, Send, Home, Compass, User, Lock, ShoppingCart, Folder, Server, Trash2, Plus, LogIn, LogOut, UserPlus, Users, UserCheck, BarChart2, GitMerge, Radio, Key, Copy, CheckSquare, Play, Percent, MessageCircle, Presentation, MessageSquare, Scale, Clock
} from 'lucide-react';



export const sqlCourseData = [
  {
    id: 'sql_module1',
    title: 'Day 1 - AI-Powered Intro to Databases & SQL',
    items: [
      { id: 'data_db', label: 'Data & Databases', icon: <Database size={18} /> },
      { id: 'dbms_rdbms', label: 'DBMS vs RDBMS', icon: <Columns size={18} /> },
      { id: 'table_structure', label: 'Tables & Structure', icon: <Table size={18} /> },
      { id: 'install_sql', label: 'Install MySQL & Workbench', icon: <Terminal size={18} /> },
      { id: 'ai_workbench', label: 'AI in SQL Workbench', icon: <Cpu size={18} /> },
    ]
  },
  {
    id: 'sql_module2',
    title: 'Day 2 - AI-Assisted DB Creation & Table Design',
    items: [
      { id: 'db_commands', label: 'Database Commands', icon: <Database size={18} /> },
      { id: 'data_types', label: 'Data Types', icon: <TypeIcon size={18} /> },
    ]
  },
  {
    id: 'sql_module3',
    title: 'Day 3 - SQL Categories & DDL with AI',
    items: [
      { id: 'sql_categories', label: 'SQL Categories', icon: <List size={18} /> },
      { id: 'theory_ddl', label: 'Theory: DDL', icon: <BookOpen size={18} /> },
      { id: 'constraints', label: 'Constraints', icon: <ShieldAlert size={18} /> },
      { id: 'practical_tables', label: 'Practical: Create Tables', icon: <Table size={18} /> },
      { id: 'practical_ddl', label: 'Practical: Modify Tables', icon: <Table size={18} /> },
      { id: 'mini_project', label: 'Library Project', icon: <MousePointerClick size={18} /> },
    ]
  },
  {
    id: 'sql_module4',
    title: 'Day 4 - AI-Powered DML & DQL',
    items: [
      { id: 'dml_theory', label: 'DML Commands', icon: <Edit3 size={18} /> },
      { id: 'dql_theory', label: 'DQL (SELECT)', icon: <List size={18} /> },
      { id: 'practical', label: 'Practical', icon: <Table size={18} /> },
    ]
  },
  {
    id: 'sql_module5',
    title: 'Day 5 - AI-Enhanced Filtering & Sorting',
    items: [
      { id: 'where_clause', label: 'WHERE & Operators', icon: <Code size={18} /> },
      { id: 'sorting', label: 'Sorting (ORDER BY)', icon: <List size={18} /> },
      { id: 'practical_filtering', label: 'Practical: Search', icon: <Table size={18} /> },
    ]
  },
  {
    id: 'sql_module6',
    title: 'Day 6 - AI-Assisted SQL Functions',
    items: [
      { id: 'aggregate_functions', label: 'Aggregate Functions', icon: <Code size={18} /> },
      { id: 'grouping', label: 'GROUP BY & HAVING', icon: <List size={18} /> },
      { id: 'practical', label: 'Practical: Reports', icon: <Table size={18} /> },
    ]
  },
  {
    id: 'sql_module7',
    title: 'Day 7 - ER Model & Joins with AI',
    items: [
      { id: 'er_model', label: 'The ER Model', icon: <Code size={18} /> },
      { id: 'relationships', label: 'Relationships', icon: <List size={18} /> },
      { id: 'joins', label: 'SQL Joins', icon: <Table size={18} /> },
      { id: 'practical', label: 'Practical: Joins', icon: <Table size={18} /> },
    ]
  },
  {
    id: 'sql_module8',
    title: 'Day 8 - AI-Powered Advanced SQL',
    items: [
      { id: 'subqueries', label: 'Subqueries', icon: <Code size={18} /> },
      { id: 'views', label: 'Views', icon: <List size={18} /> },
      { id: 'indexes', label: 'Indexes', icon: <List size={18} /> },
      { id: 'practical', label: 'Practical: Advanced', icon: <Table size={18} /> },
    ]
  },
  {
    id: 'sql_module9',
    title: 'Day 9 - AI-Assisted Professional SQL Concepts',
    items: [
      { id: 'dcl', label: 'DCL & Security', icon: <Code size={18} /> },
      { id: 'tcl', label: 'TCL & Transactions', icon: <List size={18} /> },
      { id: 'procedures', label: 'Stored Procedures', icon: <List size={18} /> },
      { id: 'triggers', label: 'Triggers', icon: <Table size={18} /> },
    ]
  },
  {
    id: 'sql_final_project',
    title: 'Day 10 - AI-Powered Final Project',
    items: [
      { id: 'overview', label: 'Project Overview', icon: <Code size={18} /> },
      { id: 'requirements', label: 'Requirements', icon: <List size={18} /> },
      { id: 'submission', label: 'Submission', icon: <Table size={18} /> },
    ]
  }
];

export const summerSqlCourseData = sqlCourseData.slice(0, 7);



export const agenticAiCourseData = [
  {
    id: 'agentic_ai_foundation',
    title: 'Module 1 - Agentic AI Foundation',
    items: [
      { id: 'day1', label: 'Day 1: Intro to Agentic AI', icon: <Bot size={18} /> },
      { id: 'day2', label: 'Day 2: Agentic AI Architecture', icon: <Cpu size={18} /> },
      { id: 'day3', label: 'Day 3: Prompt Engineering', icon: <Code size={18} /> },
      { id: 'day4', label: 'Day 4: Agent Reasoning & Loops', icon: <RefreshCw size={18} /> },
      { id: 'day5', label: 'Day 5: Building an Agent Flow', icon: <GitBranch size={18} /> },
    ]
  },
  {
    id: 'agentic_ai_module2',
    title: 'Module 2 - Prompting & Tool Calling',
    items: [
      { id: 'day6', label: 'Day 6: Agent Instructions & System Prompts', icon: <Code size={18} /> },
      { id: 'day7', label: 'Day 7: Function Calling & Tool Calling', icon: <Zap size={18} /> },
      { id: 'day8', label: 'Day 8: Connecting Agents with APIs', icon: <Layers size={18} /> },
      { id: 'day9', label: 'Day 9: Structured Outputs', icon: <Sliders size={18} /> },
      { id: 'day10', label: 'Day 10: Real-Time Agent Project', icon: <Trophy size={18} /> },
      { id: 'module2_project', label: 'Final Project: AI Agent Workspace', icon: <Trophy size={18} /> },
    ]
  },
  {
    id: 'agentic_ai_module3',
    title: 'Module 3 - AI Automation with n8n',
    items: [
      { id: 'day11', label: 'Day 11: Intro to n8n & Workflows', icon: <GitBranch size={18} /> },
      { id: 'day12', label: 'Day 12: Triggers, Actions & APIs', icon: <Cpu size={18} /> },
      { id: 'day13', label: 'Day 13: AI Automation in n8n', icon: <Bot size={18} /> },
      { id: 'day14', label: 'Day 14: Business App Automation', icon: <Briefcase size={18} /> },
      { id: 'day15', label: 'Day 15: Capstone: n8n AI Admission System', icon: <Trophy size={18} /> },
      { id: 'module3_project', label: 'Final Project: Student Admission System', icon: <Trophy size={18} /> },
    ]
  },
  {
    id: 'agentic_ai_module4',
    title: 'Module 4 - Flowise & Visual AI Agents',
    items: [
      { id: 'day16', label: 'Day 16: Intro to Flowise & Visual Agents', icon: <Eye size={18} /> },
      { id: 'day17', label: 'Day 17: RAG & Document QA in Flowise', icon: <Database size={18} /> },
      { id: 'day18', label: 'Day 18: Tool-Calling Agents in Flowise', icon: <Zap size={18} /> },
      { id: 'day19', label: 'Day 19: Deploying Flowise — Embed & API', icon: <Rocket size={18} /> },
      { id: 'day20', label: 'Day 20: Capstone: Enterprise AI Agent System', icon: <Trophy size={18} /> },
      { id: 'module4_project', label: 'Final Project: Master AI Agent Platform', icon: <Trophy size={18} /> },
    ]
  },
  {
    id: 'agentic_ai_module5',
    title: 'Module 5 - LangChain & Agent Development',
    items: [
      { id: 'day21', label: 'Day 21: Intro to LangChain & Chains', icon: <Link size={18} /> },
      { id: 'day22', label: 'Day 22: LCEL & Advanced Prompt Templates', icon: <Sliders size={18} /> },
      { id: 'day23', label: 'Day 23: LangChain Memory & Chat History', icon: <Database size={18} /> },
      { id: 'day24', label: 'Day 24: LangChain Agents & Custom Tools', icon: <Bot size={18} /> },
      { id: 'day25', label: 'Day 25: Capstone: LangChain Orchestrator', icon: <Trophy size={18} /> },
      { id: 'module5_project', label: 'Final Project: LangChain Orchestrator', icon: <Trophy size={18} /> },
    ]
  },
  {
    id: 'agentic_ai_module6',
    title: 'Module 6 - LangGraph & Stateful Agents',
    items: [
      { id: 'day26', label: 'Day 26: Intro to LangGraph & State', icon: <GitBranch size={18} /> },
      { id: 'day27', label: 'Day 27: Nodes, Edges & State Updates', icon: <Cpu size={18} /> },
      { id: 'day28', label: 'Day 28: Conditional Edges & Routing', icon: <GitBranch size={18} /> },
      { id: 'day29', label: 'Day 29: LangGraph Persistence & Memory', icon: <Database size={18} /> },
      { id: 'day30', label: 'Day 30: Capstone: LangGraph Agent', icon: <Trophy size={18} /> },
      { id: 'module6_project', label: 'Final Project: LangGraph Agent', icon: <Trophy size={18} /> },
    ]
  },
  {
    id: 'agentic_ai_module7',
    title: 'Module 7 - CrewAI Multi-Agent Systems',
    items: [
      { id: 'day31', label: 'Day 31: Intro to CrewAI: Agents & Tasks', icon: <Bot size={18} /> },
      { id: 'day32', label: 'Day 32: CrewAI Tools & Custom Tools', icon: <Cpu size={18} /> },
      { id: 'day33', label: 'Day 33: Memory & Context Collaboration', icon: <Database size={18} /> },
      { id: 'day34', label: 'Day 34: Sequential vs Hierarchical Crews', icon: <GitBranch size={18} /> },
      { id: 'day35', label: 'Day 35: Capstone: Multi-Agent Crew', icon: <Trophy size={18} /> },
      { id: 'module7_project', label: 'Final Project: CrewAI System', icon: <Trophy size={18} /> },
    ]
  },
  {
    id: 'agentic_ai_module8',
    title: 'Module 8 - Agno AI & Advanced Agent Development',
    items: [
      { id: 'day36', label: 'Day 36: Intro to Agno & Agno Agents', icon: <Bot size={18} /> },
      { id: 'day37', label: 'Day 37: Agno Tools & Custom Toolkits', icon: <Cpu size={18} /> },
      { id: 'day38', label: 'Day 38: Agno Knowledge Bases & Vector DBs', icon: <Database size={18} /> },
      { id: 'day39', label: 'Day 39: Agno Teams & Agent Collaboration', icon: <GitBranch size={18} /> },
      { id: 'day40', label: 'Day 40: Capstone: Production Agent with Agno', icon: <Trophy size={18} /> },
      { id: 'module8_project', label: 'Final Project: Agno AI System', icon: <Trophy size={18} /> },
    ]
  }
];


export const pythonCourseData = [
  {
    id: 'python_day1',
    title: 'Day 1 - Introduction to Python',
    items: [
      { id: 'intro', label: 'What is Python?', icon: <BookOpen size={18} /> },
      { id: 'install', label: 'Installation & Setup', icon: <Cpu size={18} /> },
      { id: 'variables', label: 'Variables & Data Types', icon: <Database size={18} /> },
      { id: 'print_input', label: 'print() & input()', icon: <Terminal size={18} /> },
      { id: 'type_casting', label: 'Type Casting', icon: <Filter size={18} /> },
      { id: 'ai_superpowers', label: 'AI Python Superpowers', icon: <Zap size={18} /> },
      { id: 'playground', label: 'Live Python Playground', icon: <Code size={18} /> },
    ]
  },
  {
    id: 'python_day2',
    title: 'Day 2 - Operators',
    items: [
      { id: 'intro', label: 'What are Operators?', icon: <BookOpen size={18} /> },
      { id: 'arithmetic', label: 'Arithmetic Operators', icon: <Cpu size={18} /> },
      { id: 'relational', label: 'Relational Operators', icon: <Filter size={18} /> },
      { id: 'logical', label: 'Logical Operators', icon: <Zap size={18} /> },
      { id: 'assignment_ops', label: 'Assignment Operators', icon: <Database size={18} /> },
      { id: 'membership_identity', label: 'Membership & Identity', icon: <Terminal size={18} /> },
      { id: 'practice', label: '🌡️ Temperature Converter', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day3',
    title: 'Day 3 - Conditional Statements',
    items: [
      { id: 'intro', label: 'What are Conditionals?', icon: <BookOpen size={18} /> },
      { id: 'if_statement', label: 'if Statement', icon: <Cpu size={18} /> },
      { id: 'if_else', label: 'if / else Statement', icon: <Filter size={18} /> },
      { id: 'elif_statement', label: 'elif Statement', icon: <Zap size={18} /> },
      { id: 'elif_ladder', label: 'elif Ladder', icon: <Database size={18} /> },
      { id: 'nested_if', label: 'Nested if', icon: <Terminal size={18} /> },
      { id: 'practice', label: 'Student Grade System', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day4',
    title: 'Day 4 - Loops',
    items: [
      { id: 'intro', label: 'What is a Loop?', icon: <BookOpen size={18} /> },
      { id: 'for_loop', label: 'for loop', icon: <Cpu size={18} /> },
      { id: 'while_loop', label: 'while loop', icon: <Filter size={18} /> },
      { id: 'nested_loops', label: 'Nested Loops', icon: <Terminal size={18} /> },
      { id: 'loop_control', label: 'Loop Control', icon: <Zap size={18} /> },
      { id: 'pattern_printing', label: 'Pattern Printing', icon: <Database size={18} /> },
      { id: 'practice', label: '🎲 Number Guessing Game', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_games',
    title: 'Text-Based Game Projects',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'rock_paper_scissor', label: '✊ Rock Paper Scissors', icon: <Code size={18} /> },
      { id: 'number_guessing', label: '🎯 Number Guessing', icon: <Code size={18} /> },
      { id: 'memory_game', label: 'Memory Game', icon: <Code size={18} /> },
      { id: 'reaction_time', label: '⚡ Reaction Time Test', icon: <Code size={18} /> },
      { id: 'police_thief', label: '👮 Police & Thief', icon: <Code size={18} /> },
    ]
  },
  {
    id: 'python_day5',
    title: 'Day 5 - Data Structures',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'list_tab', label: 'Lists', icon: <Cpu size={18} /> },
      { id: 'tuple_tab', label: 'Tuples', icon: <Filter size={18} /> },
      { id: 'set_tab', label: 'Sets', icon: <Terminal size={18} /> },
      { id: 'dict_tab', label: 'Dictionaries', icon: <Zap size={18} /> },
      { id: 'practice', label: '📞 Phonebook App', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day6',
    title: 'Day 6 - Functions',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'builtin', label: 'Built-in Functions', icon: <Cpu size={18} /> },
      { id: 'user_defined', label: 'User-Defined Functions', icon: <Filter size={18} /> },
      { id: 'lambda_tab', label: 'Lambda Functions', icon: <Terminal size={18} /> },
      { id: 'recursion', label: 'Recursive Functions', icon: <Zap size={18} /> },
      { id: 'args_kwargs', label: '*args & **kwargs', icon: <Database size={18} /> },
      { id: 'practice', label: '💼 Expense Tracker', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day7',
    title: 'Day 7 - String & RegEx',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'manipulation', label: 'String Slicing & Methods', icon: <Cpu size={18} /> },
      { id: 'regex_basics', label: 'RegEx Patterns', icon: <Filter size={18} /> },
      { id: 'regex_functions', label: 're Module Functions', icon: <Terminal size={18} /> },
      { id: 'practice', label: '🤖 Chatbot Application', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_apps',
    title: 'Application Projects',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'password_gen', label: '🔑 Password Generator', icon: <Code size={18} /> },
      { id: 'quiz_app', label: 'Quiz App', icon: <Code size={18} /> },
      { id: 'url_shortener', label: '🔗 URL Shortener', icon: <Code size={18} /> },
      { id: 'chat_app', label: '💬 Chat Application', icon: <Code size={18} /> },
      { id: 'countdown_timer', label: '⏱️ Countdown Timer', icon: <Code size={18} /> },
    ]
  },
  {
    id: 'python_day8',
    title: 'Day 8 - Comprehensive File & Exception Handling',
    items: [
      { id: 'intro', label: 'Overview & Storage', icon: <BookOpen size={18} /> },
      { id: 'file_modes', label: 'Opening Modes & Encoding', icon: <Cpu size={18} /> },
      { id: 'file_reading', label: 'Reading Files & Iteration', icon: <FileText size={18} /> },
      { id: 'file_writing', label: 'Writing, Appending & Flush', icon: <Terminal size={18} /> },
      { id: 'file_copying', label: 'Copying Files (File to File)', icon: <Copy size={18} /> },
      { id: 'context_managers', label: 'Context Managers (with)', icon: <Sliders size={18} /> },
      { id: 'structured_data', label: 'JSON, CSV & Pickle', icon: <Database size={18} /> },
      { id: 'exception_handling', label: 'Exception Handling Safety', icon: <ShieldAlert size={18} /> },
      { id: 'practice', label: '💾 Log & File Capstone', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (15 Questions)', icon: <Zap size={18} /> },
    ]
  },
  {
    id: 'python_day9',
    title: 'Day 9 - Modules & APIs',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'modules_basics', label: 'Module Basics', icon: <Layers size={18} /> },
      { id: 'stdlib', label: 'Standard Library', icon: <Cpu size={18} /> },
      { id: 'custom_modules', label: 'Custom Modules', icon: <Code size={18} /> },
      { id: 'db_connection', label: 'Database (SQL) Connection', icon: <Database size={18} /> },
      { id: 'what_is_api', label: 'What is an API?', icon: <Link size={18} /> },
      { id: 'http_methods', label: 'HTTP Methods', icon: <Terminal size={18} /> },
      { id: 'api_steps', label: 'API Connection Steps', icon: <Sliders size={18} /> },
      { id: 'api_practice', label: 'Practice API Calls', icon: <Zap size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_day10',
    title: 'Day 10 - Intro to OOPs',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'class_objects', label: 'Classes & Objects', icon: <Cpu size={18} /> },
      { id: 'self_init', label: 'self & __init__', icon: <Terminal size={18} /> },
      { id: 'constructor_destructor', label: 'Constructors & Destructors', icon: <Filter size={18} /> },
      { id: 'capstone', label: '📚 Library Management', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_day11',
    title: 'Day 11 - Inheritance',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'single', label: 'Single Inheritance', icon: <Terminal size={18} /> },
      { id: 'multiple', label: 'Multiple Inheritance', icon: <Link size={18} /> },
      { id: 'multilevel', label: 'Multilevel Inheritance', icon: <Sliders size={18} /> },
      { id: 'hierarchical', label: 'Hierarchical Inheritance', icon: <Filter size={18} /> },
      { id: 'hybrid', label: 'Hybrid Inheritance', icon: <Cpu size={18} /> },
      { id: 'overriding', label: 'Method Overriding', icon: <Zap size={18} /> },
      { id: 'capstone', label: '📚 Library Capstone', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_day12',
    title: 'Day 12 - Encapsulation',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'specifiers', label: 'Access Specifiers', icon: <ShieldAlert size={18} /> },
      { id: 'mangling', label: 'Private & Mangling', icon: <Cpu size={18} /> },
      { id: 'getters_setters', label: 'Getters & Setters', icon: <Sliders size={18} /> },
      { id: 'capstone', label: '📚 Secure Library', icon: <Code size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_day13',
    title: 'Day 13 - Abstraction & Projects',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'abstraction', label: 'Data Abstraction', icon: <Filter size={18} /> },
      { id: 'polymorphism', label: 'Polymorphism', icon: <Zap size={18} /> },
      { id: 'capstone', label: '🚙 Vehicle Capstone', icon: <Code size={18} /> },
      { id: 'project1', label: '💳 Payment Project', icon: <Sliders size={18} /> },
      { id: 'project2', label: '🏠 Smart Home Project', icon: <Cpu size={18} /> },
      { id: 'project3', label: '🏫 School DB Project', icon: <Link size={18} /> },
      { id: 'assignment_work', label: '📝 Assignment (10 Tasks)', icon: <BookOpen size={18} /> },
      { id: 'quiz', label: 'Quiz (12 Questions)', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_final_projects',
    title: 'Final Demo Projects',
    items: [
      { id: 'intro', label: 'Overview', icon: <BookOpen size={18} /> },
      { id: 'project1', label: '🤖 AI Chat Assistant', icon: <Cpu size={18} /> },
      { id: 'project2', label: '🗄️ Database Manager', icon: <Database size={18} /> },
      { id: 'project3', label: '📊 API Data Dashboard', icon: <Sliders size={18} /> },
      { id: 'tasks', label: '📝 3 Final Project Tasks', icon: <CheckCircle size={18} /> },
    ]
  },
  {
    id: 'python_ai_module',
    title: '🤖 AI Power Tools for Python',
    items: [
      { id: 'ai_code_review', label: '🔍 AI Code Reviewer', icon: <Eye size={18} /> },
      { id: 'ai_debugging', label: '🐛 AI Debugging', icon: <Bot size={18} /> },
      { id: 'ai_component', label: '🧩 AI Component Dev', icon: <Layers size={18} /> },
      { id: 'ai_prompt_eng', label: '💬 AI Prompt Engineering', icon: <Sparkles size={18} /> },
      { id: 'ai_productivity', label: '⚡ AI Productivity Tools', icon: <Zap size={18} /> },
    ]
  }
];


export const generativeAiCourseData = [
  {
    id: 'genai_module1',
    title: 'Module 1 - AI Foundations',
    items: [
      { id: 'day1', label: 'Day 1: Intro to Gen AI', icon: <BookOpen size={18} /> },
      { id: 'day2', label: 'Day 2: History & Transformers', icon: <Map size={18} /> },
      { id: 'day3', label: 'Day 3: LLMs, Tokens & Context', icon: <Layers size={18} /> },
      { id: 'day4', label: 'Day 4: Popular AI Models', icon: <Zap size={18} /> },
      { id: 'day5', label: 'Day 5: AI Ethics & Best Practices', icon: <Shield size={18} /> },
      { id: 'mini_project', label: 'Mini Project: AI Prompt Library', icon: <Sliders size={18} /> },
    ]
  },
  {
    id: 'genai_module2',
    title: 'Module 2 - Prompt Engineering',
    items: [
      { id: 'day6', label: 'Day 6: Prompt Engineering', icon: <Code size={18} /> },
      { id: 'day7', label: 'Day 7: Advanced Prompting', icon: <Zap size={18} /> },
      { id: 'day8', label: 'Day 8: Reasoning & Grounding', icon: <Layers size={18} /> },
      { id: 'day9', label: 'Day 9: Structured Outputs', icon: <Sliders size={18} /> },
      { id: 'day10', label: 'Day 10: Reusable Templates', icon: <LayoutTemplate size={18} /> },
      { id: 'module2_project', label: 'Final Project: AI Agent Workspace', icon: <Trophy size={18} /> },
    ]
  },
  {
    id: 'genai_module3',
    title: 'Module 3 - AI Productivity & Creation',
    items: [
      { id: 'day11', label: 'Day 11: Writing & Document Editing', icon: <FileText size={18} /> },
      { id: 'day12', label: 'Day 12: Careers, Resumes & Socials', icon: <Briefcase size={18} /> },
      { id: 'day13', label: 'Day 13: Spreadsheets & Research', icon: <FileSpreadsheet size={18} /> },
      { id: 'day14', label: 'Day 14: Slide Decks & Presentations', icon: <MonitorPlay size={18} /> },
      { id: 'day15', label: 'Day 15: Video Scripts & Podcasts', icon: <Music size={18} /> },
    ]
  },
  {
    id: 'genai_module4',
    title: 'Module 4 - AI APIs & Knowledge Retrieval',
    items: [
      { id: 'day16', label: 'Day 16: Intro to AI APIs & Keys', icon: <Shield size={18} /> },
      { id: 'day17', label: 'Day 17: RAG & Knowledge Retrieval', icon: <Database size={18} /> },
      { id: 'day18', label: 'Day 18: RAG Implementation & SDKs', icon: <Terminal size={18} /> },
      { id: 'day19', label: 'Day 19: Capstone Projects Chooser', icon: <Wand2 size={18} /> },
      { id: 'day20', label: 'Day 20: Submission & Graduation', icon: <Trophy size={18} /> },
    ]
  }
];





export const htmlCourseData = [];
export const daSqlCourseData = [];
export const powerBiCourseData = [];
export const tallyCourseData = [];
export const inductionCourseData = [];
export const pythonFullStackCourseData = [];
export const pythonDaCourseData = [];
export const reactCourseData = [];
export const gitCourseData = [];
export const jsonCourseData = [];
export const djangoCourseData = [];
export const devopsCourseData = [];
export const statsCourseData = [];
export const numpyCourseData = [];
export const coreJsCourseData = [];
export const pandasCourseData = [];
export const matplotlibCourseData = [];
export const seabornCourseData = [];
export const webDesignCourseData = [];
export const spokoStoryCourseData = [];
export const spokoProCourseData = [];
