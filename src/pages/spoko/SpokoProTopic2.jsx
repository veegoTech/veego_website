import React from 'react';
import SpokoProTopic from './SpokoProTopic';

export default function SpokoProTopic2({ activeTab, onNavigate, session, openAITutor }) {
  return <SpokoProTopic topic={2} activeTab={activeTab} onNavigate={onNavigate} session={session} openAITutor={openAITutor} />;
}
