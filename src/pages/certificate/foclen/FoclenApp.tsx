import React, { useState, useEffect } from 'react';
import type { FoclenCertificateData } from './types/foclen';
import { getFoclenCertificates, saveFoclenCertificates } from './data/foclenStore';
import { FoclenDashboard } from './components/FoclenDashboard';
import { FoclenEditor } from './components/FoclenEditor';

export const FoclenApp: React.FC = () => {
  const [certificates, setCertificates] = useState<FoclenCertificateData[]>([]);
  const [activeView, setActiveView] = useState<'dashboard' | 'editor'>('dashboard');
  const [editingCert, setEditingCert] = useState<FoclenCertificateData | undefined>(undefined);

  useEffect(() => {
    setCertificates(getFoclenCertificates());
  }, []);

  const handleSave = (savedCert: FoclenCertificateData) => {
    setCertificates((prev) => {
      const exists = prev.some((c) => c.id === savedCert.id);
      let updated: FoclenCertificateData[];
      if (exists) {
        updated = prev.map((c) => (c.id === savedCert.id ? savedCert : c));
      } else {
        updated = [savedCert, ...prev];
      }
      saveFoclenCertificates(updated);
      return updated;
    });
    setActiveView('dashboard');
    setEditingCert(undefined);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this certificate?')) {
      setCertificates((prev) => {
        const updated = prev.filter((c) => c.id !== id);
        saveFoclenCertificates(updated);
        return updated;
      });
    }
  };

  const handleAddNew = () => {
    setEditingCert(undefined);
    setActiveView('editor');
  };

  const handleEdit = (cert: FoclenCertificateData) => {
    setEditingCert(cert);
    setActiveView('editor');
  };

  return (
    <div className="space-y-6">
      {activeView === 'dashboard' ? (
        <FoclenDashboard
          certificates={certificates}
          onAddNew={handleAddNew}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onImportCertificates={(imported) => {
            const updated = [...imported, ...certificates];
            setCertificates(updated);
            saveFoclenCertificates(updated);
          }}
        />
      ) : (
        <FoclenEditor
          initialData={editingCert}
          onSave={handleSave}
          onCancel={() => {
            setActiveView('dashboard');
            setEditingCert(undefined);
          }}
        />
      )}
    </div>
  );
};
