import React from 'react';
import SpokoProTopic from './SpokoProTopic';

export default function SpokoProTopic1({ activeTab, onNavigate, session, openAITutor }) {
  return <SpokoProTopic topic={1} activeTab={activeTab} onNavigate={onNavigate} session={session} openAITutor={openAITutor} />;
}
