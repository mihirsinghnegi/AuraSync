import React from 'react';
import { TabType } from '../types';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  shieldActive: boolean;
  onToggleShield: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  shieldActive,
  onToggleShield,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#0e1513]/85 backdrop-blur-xl border-b border-[#2f3634]/60 shadow-[0_1px_12px_rgba(4,8,7,0.35)]">
      <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Mark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-8 h-8 rounded-xl bg-[#1a211f] border border-[#aacebf]/20 flex items-center justify-center text-[#aacebf] shadow-[0_0_12px_rgba(170,206,191,0.15)]">
            <span className="material-symbols-outlined text-[19px]">spa</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-semibold text-lg sm:text-xl tracking-tight text-[#dde4e0]">
              AuraSync
            </span>
            <span className="hidden xl:inline text-xs font-mono text-[#8b928e] tracking-wider">
              WORKSPACE RESCUE
            </span>
          </div>
        </div>

        {/* Zone 2: Navigation Links (Single-line, clear active states) */}
        <nav className="hidden md:flex items-center gap-1 sm:gap-2 p-1 bg-[#161d1b]/70 border border-[#2f3634]/50 rounded-xl">
          <button
            onClick={() => setActiveTab('companion')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === 'companion'
                ? 'bg-[#7ea193] text-[#16372d] shadow-sm font-semibold'
                : 'text-[#c1c8c3] hover:text-[#dde4e0] hover:bg-[#242b29]/50'
            }`}
          >
            Companion
          </button>
          <button
            onClick={() => setActiveTab('cadence')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === 'cadence'
                ? 'bg-[#7ea193] text-[#16372d] shadow-sm font-semibold'
                : 'text-[#c1c8c3] hover:text-[#dde4e0] hover:bg-[#242b29]/50'
            }`}
          >
            Cadence
          </button>
          <button
            onClick={() => setActiveTab('focus-shield')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === 'focus-shield'
                ? 'bg-[#7ea193] text-[#16372d] shadow-sm font-semibold'
                : 'text-[#c1c8c3] hover:text-[#dde4e0] hover:bg-[#242b29]/50'
            }`}
          >
            Focus Shield
          </button>
          <button
            onClick={() => setActiveTab('telemetry')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 whitespace-nowrap ${
              activeTab === 'telemetry'
                ? 'bg-[#7ea193] text-[#16372d] shadow-sm font-semibold'
                : 'text-[#c1c8c3] hover:text-[#dde4e0] hover:bg-[#242b29]/50'
            }`}
          >
            Telemetry
          </button>
        </nav>

        {/* Zone 3: Global Actions & Status */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Quick Shield Toggle */}
          <button
            onClick={onToggleShield}
            title={shieldActive ? 'Focus Shield is active (Notifications muted)' : 'Engage Focus Shield'}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-all duration-200 border ${
              shieldActive
                ? 'bg-[#aacebf]/15 text-[#aacebf] border-[#aacebf]/40 shadow-[0_0_12px_rgba(170,206,191,0.2)]'
                : 'bg-[#1a211f] text-[#c1c8c3] border-[#2f3634] hover:text-[#dde4e0] hover:border-[#414845]'
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                shieldActive ? 'bg-[#aacebf] animate-ping' : 'bg-[#8b928e]'
              }`}
            />
            <span className="material-symbols-outlined text-[15px]">
              {shieldActive ? 'notifications_paused' : 'shield'}
            </span>
            <span className="hidden sm:inline">
              {shieldActive ? 'Shield Active' : 'Shield'}
            </span>
          </button>

          {/* User Profile Avatar */}
          <div className="w-8 h-8 rounded-full bg-[#1a211f] border border-[#aacebf]/25 flex items-center justify-center text-[#aacebf]">
            <span className="material-symbols-outlined text-[18px]">person</span>
          </div>
        </div>
      </div>
    </header>
  );
};
