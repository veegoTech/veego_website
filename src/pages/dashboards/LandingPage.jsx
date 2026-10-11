import React, { useState, useEffect } from 'react';

import { Navbar } from '../../components/Navbar';
import { Footer } from '../../components/Footer';
import { BackToTop } from '../../components/BackToTop';
import { LiveDemoModal } from '../../components/LiveDemoModal';
import { AuthModal } from '../../components/AuthModal';

import { HomePage } from '../veego/HomePage';
import { CoursesPage } from '../veego/CoursesPage';
import { ProjectsPage } from '../veego/ProjectsPage';
import { HowItWorksPage } from '../veego/HowItWorksPage';
import { AboutPage } from '../veego/AboutPage';
import { ContactPage } from '../veego/ContactPage';
import { BusinessEnquiryPage } from '../veego/BusinessEnquiryPage';
import { AdminPage } from '../veego/AdminPage';
import { ProjectDetailPage } from '../veego/ProjectDetailPage';

import { getProjectById } from '../../data/projects';

function getCleanPath() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    return hash.startsWith('/') ? hash : `/${hash}`;
  }
  const pathname = window.location.pathname;
  return pathname || '/';
}

export default function LandingPage({ onLoginSuccess }) {
  const [currentPath, setCurrentPath] = useState(getCleanPath());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [activeDemoProject, setActiveDemoProject] = useState(null);

  // Prefilled states for business problem consultation / contact form
  const [enquiryCategory, setEnquiryCategory] = useState('Staff');
  const [enquiryProblemDescription, setEnquiryProblemDescription] = useState('');


  useEffect(() => {
    const handlePopState = () => {
      const path = getCleanPath();
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const navigate = (path) => {
    const cleanPath = path.replace('/#', '/').replace('#', '/');
    const normalized = cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;

    window.history.pushState(null, '', normalized);
    setCurrentPath(normalized);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  // Dynamic SEO Page Titles
  useEffect(() => {
    if (currentPath === '/' || currentPath === '/home') {
      document.title = 'VeeGo | Understand. Build. Grow. — We Go Through Your Problem. We Give You the Solution.';
    } else if (currentPath === '/courses') {
      document.title = 'VeeGo Academy & Courses | Online LMS & Offline Classroom Training';
    } else if (currentPath === '/projects') {
      document.title = 'Built by VeeGo | Production Systems & Case Studies';
    } else if (currentPath === '/how-it-works') {
      document.title = 'How It Works | Understand • Build • Grow — VeeGo';
    } else if (currentPath === '/about') {
      document.title = 'About VeeGo | The Meaning of VeeGo & Philosophy';
    } else if (currentPath === '/contact') {
      document.title = 'Contact VeeGo Engineers | Direct Problem Consultation';
    } else if (currentPath === '/business-enquiry') {
      document.title = 'What Problem Are You Trying to Solve? | VeeGo Consultation';
    } else if (currentPath === '/admin') {
      document.title = 'VeeGo Admin Dashboard | Maintain Projects & Client Enquiries';
    } else if (currentPath.startsWith('/projects/')) {
      const pId = currentPath.replace('/projects/', '');
      const proj = getProjectById(pId);
      document.title = proj ? `${proj.name} Case Study | Built by VeeGo` : 'Built by VeeGo';
    } else {
      document.title = 'VeeGo | Understand. Build. Grow.';
    }
  }, [currentPath]);

  const renderCurrentView = () => {
    // 1. Project Detail View
    if (currentPath.startsWith('/projects/')) {
      const projectId = currentPath.replace('/projects/', '');
      const project = getProjectById(projectId);

      if (project) {
        return (
          <ProjectDetailPage
            project={project}
            onBack={() => navigate('/projects')}
            onOpenLiveDemo={(p) => setActiveDemoProject(p)}
            onDiscussSimilarProblem={(projectName) => {
              setEnquiryCategory(project.category === 'Education Technology' ? 'Education' : 'Staff');
              setEnquiryProblemDescription(`Interested in deploying or tailoring a system like ${projectName} for our company.`);
              navigate('/contact');
            }}
          />
        );
      }
    }

    // 2. Dedicated Courses Page View
    if (currentPath === '/courses') {
      return (
        <CoursesPage
          onNavigate={navigate}
          onOpenLoginModal={() => setIsLoginModalOpen(true)}
        />
      );
    }

    // 3. Dedicated Projects Page View
    if (currentPath === '/projects') {
      return (
        <ProjectsPage
          onNavigate={navigate}
          onOpenLiveDemo={(p) => setActiveDemoProject(p)}
        />
      );
    }

    // 4. Dedicated How It Works Page View
    if (currentPath === '/how-it-works') {
      return <HowItWorksPage onNavigate={navigate} />;
    }

    // 5. Dedicated About Page View
    if (currentPath === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }

    // 7. Dedicated Contact Page View
    if (currentPath === '/contact') {
      return (
        <ContactPage
          initialRequirement={enquiryCategory}
          initialDescription={enquiryProblemDescription}
          onNavigate={navigate}
        />
      );
    }

    // 8. Dedicated Business Consultation Flow
    if (currentPath === '/business-enquiry') {
      return (
        <BusinessEnquiryPage
          initialCategory={enquiryCategory}
          initialProblemDescription={enquiryProblemDescription}
          onNavigate={navigate}
        />
      );
    }

    // 9. Admin Management Dashboard
    if (currentPath === '/admin') {
      return <AdminPage onNavigate={navigate} />;
    }

    // 10. Default: VeeGo Enterprise Home View
    return (
      <HomePage
        onNavigate={navigate}
        onOpenLiveDemo={(p) => setActiveDemoProject(p)}
        onDiscussProblem={(prob) => {
          setEnquiryCategory(
            prob.id.includes('staff')
              ? 'Staff'
              : prob.id.includes('billing')
                ? 'Billing'
                : prob.id.includes('followup')
                  ? 'Sales'
                  : prob.id.includes('report')
                    ? 'Reports'
                    : prob.id.includes('data')
                      ? 'Data'
                      : prob.id.includes('student')
                        ? 'Education'
                        : 'Automation'
          );
          setEnquiryProblemDescription(`Problem: ${prob.problem}\nDaily friction: ${prob.symptom}`);
          navigate('/contact');
        }}
        onExploreSolution={(sol) => {
          setEnquiryCategory(
            sol.id.includes('staff')
              ? 'Staff'
              : sol.id.includes('billing')
                ? 'Billing'
                : sol.id.includes('lead')
                  ? 'Sales'
                  : sol.id.includes('education')
                    ? 'Education'
                    : sol.id.includes('ai')
                      ? 'AI'
                      : 'Automation'
          );
          setEnquiryProblemDescription(`Requesting consultation on: ${sol.title}\nWorkflow challenge: ${sol.problem}`);
          navigate('/contact');
        }}
      />
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900 antialiased selection:bg-blue-600 selection:text-white">
      {/* Clean VeeGo Navbar with LMS Portal Login */}
      <Navbar
        currentPath={currentPath}
        onNavigate={navigate}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
      />

      {/* Main SPA Route View */}
      <main className="flex-1 pt-16 sm:pt-18">{renderCurrentView()}</main>

      {/* Interactive Live Demo Modal */}
      {activeDemoProject && (
        <LiveDemoModal
          project={activeDemoProject}
          onClose={() => setActiveDemoProject(null)}
          onContactClick={() => {
            const name = activeDemoProject.name;
            setActiveDemoProject(null);
            setEnquiryCategory(activeDemoProject.category === 'Education Technology' ? 'Education' : 'Staff');
            setEnquiryProblemDescription(`We tested the live demo for ${name} and would like to discuss implementation for our business.`);
            navigate('/contact');
          }}
        />
      )}

      {/* Floating Back-To-Top Button */}
      <BackToTop />

      {/* Footer */}
      <Footer onNavigate={navigate} />

      {/* 🔐 LMS LOGIN & REGISTRATION MODAL */}
      <AuthModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={onLoginSuccess}
      />
    </div>
  );
}
