import React from 'react';
import { TabType } from '../types';

interface MobileNavProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#09100e]/95 backdrop-blur-xl border-t border-[#2f3634]/60 pb-[env(safe-area-inset-bottom,0px)] shadow-[0_-8px_24px_rgba(4,8,7,0.4)]">
      <div className="flex justify-around items-center h-16 px-2">
        <button
          onClick={() => setActiveTab('companion')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[4rem] h-11 rounded-xl transition-all duration-200 ${
            activeTab === 'companion'
              ? 'text-[#aacebf] bg-[#1a211f]/60'
              : 'text-[#8b928e] hover:text-[#dde4e0]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">
            nest_clock_farsight_analog
          </span>
          <span className="text-[10px] font-medium tracking-tight">Status</span>
        </button>

        <button
          onClick={() => setActiveTab('cadence')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[4rem] h-11 rounded-xl transition-all duration-200 ${
            activeTab === 'cadence'
              ? 'text-[#aacebf] bg-[#1a211f]/60'
              : 'text-[#8b928e] hover:text-[#dde4e0]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">calendar_today</span>
          <span className="text-[10px] font-medium tracking-tight">Schedule</span>
        </button>

        <button
          onClick={() => setActiveTab('focus-shield')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[4rem] h-11 rounded-xl transition-all duration-200 ${
            activeTab === 'focus-shield'
              ? 'text-[#aacebf] bg-[#1a211f]/60'
              : 'text-[#8b928e] hover:text-[#dde4e0]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">shield</span>
          <span className="text-[10px] font-medium tracking-tight">Focus</span>
        </button>

        <button
          onClick={() => setActiveTab('telemetry')}
          className={`flex flex-col items-center justify-center gap-1 min-w-[4rem] h-11 rounded-xl transition-all duration-200 ${
            activeTab === 'telemetry'
              ? 'text-[#aacebf] bg-[#1a211f]/60'
              : 'text-[#8b928e] hover:text-[#dde4e0]'
          }`}
        >
          <span className="material-symbols-outlined text-[20px]">insights</span>
          <span className="text-[10px] font-medium tracking-tight">Telemetry</span>
        </button>
      </div>
    </nav>
  );
};
