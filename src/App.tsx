/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType } from './types';
import { Header } from './components/Header';
import { CompanionWidget } from './components/CompanionWidget';
import { CadenceScheduler } from './components/CadenceScheduler';
import { FocusShieldView } from './components/FocusShieldView';
import { FocusShieldModal } from './components/FocusShieldModal';
import { TelemetryView } from './components/TelemetryView';
import { MobileNav } from './components/MobileNav';
import { Toast } from './components/Toast';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('companion');
  const [shieldActive, setShieldActive] = useState(false);
  const [focusShieldModalOpen, setFocusShieldModalOpen] = useState(true);

  // Global toast notifications
  const [toast, setToast] = useState<{ message: string; icon?: string } | null>({
    message: 'AuraSync active · Nominal cognitive reserve (76%)',
    icon: 'spa',
  });

  const showToast = (message: string, icon = 'check_circle') => {
    setToast({ message, icon });
  };

  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => {
      setToast(null);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast]);

  const toggleShield = () => {
    setShieldActive((prev) => {
      const next = !prev;
      if (next) {
        showToast('Focus Shield active · Slack notifications muted & status set', 'notifications_paused');
      } else {
        showToast('Focus Shield lowered · Standard alerting resumed', 'notifications');
      }
      return next;
    });
  };

  // Keyboard shortcut listener (Esc to close modal)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setFocusShieldModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#0e1513] text-[#dde4e0] font-sans relative flex flex-col selection:bg-[#7ea193]/30 selection:text-[#aacebf]">
      {/* Global Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        shieldActive={shieldActive}
        onToggleShield={toggleShield}
      />

      {/* Main Tab View Port */}
      <main className="flex-1 w-full pb-16 md:pb-6">
        {activeTab === 'companion' && (
          <CompanionWidget
            onNavigateTab={setActiveTab}
            shieldActive={shieldActive}
            onToggleShield={toggleShield}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'cadence' && (
          <CadenceScheduler onShowToast={showToast} />
        )}

        {activeTab === 'focus-shield' && (
          <FocusShieldView
            modalOpen={focusShieldModalOpen}
            setModalOpen={setFocusShieldModalOpen}
            shieldActive={shieldActive}
            onToggleShield={toggleShield}
            onShowToast={showToast}
          />
        )}

        {activeTab === 'telemetry' && (
          <TelemetryView onShowToast={showToast} />
        )}
      </main>

      {/* Floating Bottom-Right Modal Launcher (Visible on all tabs when modal is closed) */}
      {!focusShieldModalOpen && activeTab !== 'focus-shield' && (
        <button
          onClick={() => {
            setFocusShieldModalOpen(true);
            showToast('Focus Shield pacing modal restored', 'shield');
          }}
          className="fixed bottom-20 md:bottom-6 right-4 sm:right-6 z-40 px-3.5 py-2 rounded-xl bg-[#161d1b]/90 backdrop-blur-xl border border-[#aacebf]/30 shadow-[0_12px_30px_rgba(0,0,0,0.6)] text-xs font-semibold text-[#aacebf] hover:bg-[#1a211f] transition-all flex items-center gap-2 group"
          title="Restore Focus Shield pacing modal"
        >
          <span className="w-2 h-2 rounded-full bg-[#f9bb68] animate-pulse" />
          <span className="material-symbols-outlined text-[17px]">shield</span>
          <span>Focus Shield (94m Load)</span>
        </button>
      )}

      {/* Global Floating Non-Intrusive Focus Shield Modal (When open and not in the dedicated focus-shield view) */}
      {focusShieldModalOpen && activeTab !== 'focus-shield' && (
        <FocusShieldModal
          isOpen={focusShieldModalOpen}
          onClose={() => setFocusShieldModalOpen(false)}
          shieldActive={shieldActive}
          onToggleShield={toggleShield}
          onShowToast={showToast}
        />
      )}

      {/* Mobile Bottom Navigation */}
      <MobileNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global Action Toast */}
      <Toast
        message={toast?.message ?? null}
        icon={toast?.icon}
        onClose={() => setToast(null)}
      />

      {/* Atmospheric Quiet Footer */}
      <footer className="w-full bg-[#09100e]/80 border-t border-[#2f3634]/40 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[#8b928e]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7ea193]" />
            <span>AuraSync Restorative Telemetry · Ambient Workspace Stream</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[#aacebf] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">cloud_download</span>
              Nominal Reserve 76%
            </span>
            <span>Circadian Mode Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
