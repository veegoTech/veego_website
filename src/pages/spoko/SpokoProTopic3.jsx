import React from 'react';
import SpokoProTopic from './SpokoProTopic';

export default function SpokoProTopic3({ activeTab, onNavigate, session, openAITutor }) {
  return <SpokoProTopic topic={3} activeTab={activeTab} onNavigate={onNavigate} session={session} openAITutor={openAITutor} />;
}
