import React, { useState } from 'react';
import { BreatherExperience } from '../types';

interface CadenceSchedulerProps {
  onShowToast: (msg: string, icon?: string) => void;
}

export const CadenceScheduler: React.FC<CadenceSchedulerProps> = ({ onShowToast }) => {
  // Buffer protection states
  const [protectedBuffers, setProtectedBuffers] = useState<Record<string, boolean>>({
    'buffer-1': false,
    'buffer-2': false,
  });

  // Selected ambient experience
  const [selectedExperience, setSelectedExperience] = useState<BreatherExperience>('box-breathing');

  // Automatic Protection switch
  const [autoProtection, setAutoProtection] = useState(true);

  // Synchronized state for Google & Outlook
  const [syncState, setSyncState] = useState<'idle' | 'syncing' | 'synced'>('idle');

  // Protect single buffer
  const toggleBuffer = (id: string, label: string) => {
    setProtectedBuffers((prev) => {
      const next = !prev[id];
      if (next) {
        onShowToast(`Protected & Synced: ${label}`, 'check_circle');
      } else {
        onShowToast(`Buffer released: ${label}`, 'close');
      }
      return { ...prev, [id]: next };
    });
  };

  // Protect all buffers
  const handleProtectAll = () => {
    setProtectedBuffers({
      'buffer-1': true,
      'buffer-2': true,
    });
    setSyncState('syncing');
    onShowToast('Locking all pending buffers to calendar stream...', 'shield_with_heart');
    setTimeout(() => {
      setSyncState('synced');
      onShowToast('All buffers locked and synced silently to Google & Outlook', 'done_all');
    }, 800);
  };

  const pendingCount = Object.values(protectedBuffers).filter((v) => !v).length;

  return (
    <div className="w-full relative min-h-[calc(100vh-4rem)] pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-8">
      {/* Ambient Atmospheric Glows */}
      <div className="absolute -top-12 left-1/4 w-96 h-72 bg-[#aacebf]/5 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-48 right-10 w-80 h-80 bg-[#f9bb68]/5 rounded-full blur-[90px] pointer-events-none -z-10" />

      {/* Header Banner */}
      <section className="w-full">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-[#2f3634]/50 pb-6">
          <div className="flex flex-col gap-2 max-w-2xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#aacebf]/10 text-[#aacebf] text-xs font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#aacebf] animate-pulse" />
                Safe Reserve: 76% · Restorative Equilibrium
              </span>
              <span className="text-[#8b928e] text-xs">·</span>
              <span className="text-[#c1c8c3] text-xs flex items-center gap-1">
                <span className="material-symbols-outlined text-[15px] text-[#8cd2d9]">tune</span>
                Adaptive Threshold 60%
              </span>
            </div>

            <h1 className="font-display text-2xl sm:text-3xl font-semibold text-[#dde4e0] tracking-tight">
              Day Cadence & Buffer Protection
            </h1>
            <p className="text-sm text-[#c1c8c3] leading-relaxed">
              Continuous transitions create attention residue. AuraSync reserves gentle breathing space between cognitively demanding sessions.
            </p>
          </div>

          <div className="flex flex-col items-start lg:items-end gap-2 shrink-0">
            <button
              onClick={handleProtectAll}
              disabled={pendingCount === 0}
              className={`px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all duration-300 shadow-md ${
                pendingCount === 0
                  ? 'bg-[#7ea193] text-[#16372d] cursor-default'
                  : 'bg-[#aacebf] hover:bg-[#c6ebdb] text-[#15362c] hover:shadow-[0_0_24px_rgba(170,206,191,0.3)]'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">
                {pendingCount === 0 ? 'done_all' : 'shield_with_heart'}
              </span>
              <span>
                {pendingCount === 0 ? 'All Buffers Protected' : 'Protect All Buffers'}
              </span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider ${
                  pendingCount === 0 ? 'bg-[#16372d]/20 text-[#16372d]' : 'bg-[#15362c]/20 text-[#15362c]'
                }`}
              >
                {pendingCount === 0 ? 'Active' : `${pendingCount} Pending`}
              </span>
            </button>
            <span className="text-xs text-[#8b928e] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#aacebf]">sync</span>
              Syncs silently to Google & Outlook
            </span>
          </div>
        </div>
      </section>

      {/* Main Grid: 8 Cols Timeline / 4 Cols Companion */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Schedule Canvas (8 Cols) */}
        <div className="lg:col-span-8 flex flex-col gap-4">
          {/* Day Subheader Bar */}
          <div className="flex items-center justify-between p-4 rounded-xl bg-[#161d1b] border border-[#2f3634]/50 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#242b29] flex items-center justify-center text-[#aacebf]">
                <span className="material-symbols-outlined text-[22px]">calendar_today</span>
              </div>
              <div>
                <h2 className="font-display text-base font-semibold text-[#dde4e0]">
                  Today, Thursday
                </h2>
                <p className="text-xs text-[#8b928e]">Active Cadence · 9:00 AM – 5:00 PM</p>
              </div>
            </div>

            {/* Timeline Legend */}
            <div className="hidden sm:flex items-center gap-4 text-xs text-[#c1c8c3]">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#2f3634]" /> Scheduled
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#f9bb68]/70" /> Attention Friction
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-sm bg-[#7ea193]" /> Breather Buffer
              </span>
            </div>
          </div>

          {/* Schedule Canvas Timeline */}
          <div className="flex flex-col gap-3">
            {/* TIME BLOCK 1: Sprint Architecture Sync */}
            <div className="flex items-stretch gap-4">
              <div className="w-16 shrink-0 pt-2 text-right">
                <span className="text-xs font-semibold text-[#c1c8c3] block">09:30</span>
                <span className="text-[11px] text-[#8b928e]">10:30 AM</span>
              </div>

              <div className="flex-1 p-4 rounded-xl bg-[#242b29] border border-[#2f3634]/60 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[22px] text-[#8cd2d9] mt-0.5">
                      videocam
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-[#dde4e0]">
                        Eng Architecture Sprint Sync
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-[#8b928e]">Zoom · 8 Attendees</span>
                        <span className="text-[#8b928e]">·</span>
                        <span className="text-[#f9bb68] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">psychology</span>
                          High Context Switch
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Strain Dial */}
                  <div className="flex items-center gap-3 bg-[#09100e]/80 border border-[#2f3634]/60 px-3 py-1.5 rounded-lg shrink-0 sm:self-center">
                    <div className="text-right">
                      <div className="text-[10px] uppercase tracking-wider text-[#8b928e]">
                        Strain
                      </div>
                      <div className="font-display text-sm font-semibold text-[#f9bb68]">
                        78%
                      </div>
                    </div>
                    <div className="w-7 h-7">
                      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                        <path
                          className="text-[#2f3634]"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        />
                        <path
                          className="text-[#f9bb68]"
                          d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          fill="none"
                          stroke="currentColor"
                          strokeDasharray="78, 100"
                          strokeLinecap="round"
                          strokeWidth="3.5"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* COLLISION ZONE / WARNING CALLOUT */}
            <div className="flex items-center gap-4 pl-16">
              <div className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-[#f9bb68]/10 border border-[#f9bb68]/20 text-[#f9bb68] text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px]">warning_amber</span>
                  <span className="font-medium">
                    Attention Residue Risk — Zero Interstitial Buffer
                  </span>
                </div>
                <span className="text-[#c1c8c3] text-[11px] hidden md:inline">
                  Working memory bleed into next deep block: +42%
                </span>
              </div>
            </div>

            {/* BREATHER BLOCK 1: Suggested Restorative Slot */}
            <div className="flex items-stretch gap-4">
              <div className="w-16 shrink-0 pt-2 text-right">
                <span className="text-xs font-semibold text-[#aacebf] block">10:30</span>
                <span className="text-[11px] text-[#aacebf]/70">10:40 AM</span>
              </div>

              <div
                className={`flex-1 p-4 rounded-xl border transition-all duration-300 shadow-md ${
                  protectedBuffers['buffer-1']
                    ? 'bg-[#aacebf]/10 border-[#aacebf]/40'
                    : 'bg-[#242b29] border-[#aacebf]/20'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3 max-w-xl">
                    <div className="w-8 h-8 rounded-lg bg-[#aacebf]/15 text-[#aacebf] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[19px]">self_improvement</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#aacebf]/20 text-[#aacebf] uppercase tracking-wider">
                          AI Suggested Buffer
                        </span>
                        <span className="text-xs font-semibold text-[#dde4e0]">
                          Clear 10 mins to catch your breath?
                        </span>
                      </div>
                      <p className="text-xs text-[#c1c8c3] mt-1 leading-relaxed">
                        Sprint Sync immediately precedes deep compiler work. Decompress working memory before diving in.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => toggleBuffer('buffer-1', '10:30 AM Post-Sync Buffer')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                        protectedBuffers['buffer-1']
                          ? 'bg-[#aacebf]/20 text-[#aacebf] border border-[#aacebf]/30 cursor-pointer'
                          : 'bg-[#aacebf] hover:bg-[#c6ebdb] text-[#15362c] shadow-[0_0_16px_rgba(170,206,191,0.25)]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        {protectedBuffers['buffer-1'] ? 'done_all' : 'check_circle'}
                      </span>
                      <span>{protectedBuffers['buffer-1'] ? 'Protected · Synced' : 'Protect Time'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TIME BLOCK 2: Deep Focus Block */}
            <div className="flex items-stretch gap-4">
              <div className="w-16 shrink-0 pt-2 text-right">
                <span className="text-xs font-semibold text-[#dde4e0] block">10:40</span>
                <span className="text-[11px] text-[#8b928e]">12:40 PM</span>
              </div>

              <div className="flex-1 p-4 rounded-xl bg-[#1a211f] border border-[#2f3634]/50 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[22px] text-[#aacebf] mt-0.5">
                      code
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-display text-sm font-semibold text-[#dde4e0]">
                          Deep Focus: Rust Memory & State Refactor
                        </h3>
                        <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-[#aacebf]/10 text-[#aacebf]">
                          Protected
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs">
                        <span className="text-[#8b928e]">IDE Execution Block</span>
                        <span className="text-[#8b928e]">·</span>
                        <span className="text-[#8cd2d9] flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">notifications_off</span>
                          Slack Muted
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-medium text-[#aacebf] sm:self-center">
                    2h 00m Undisturbed
                  </div>
                </div>
              </div>
            </div>

            {/* TIME BLOCK 3: Mid-Day Walk */}
            <div className="flex items-stretch gap-4">
              <div className="w-16 shrink-0 pt-2 text-right">
                <span className="text-xs font-semibold text-[#c1c8c3] block">12:40</span>
                <span className="text-[11px] text-[#8b928e]">01:15 PM</span>
              </div>

              <div className="flex-1 p-4 rounded-xl bg-[#161d1b] border border-[#2f3634]/40 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-[#8cd2d9]">
                      park
                    </span>
                    <div>
                      <h4 className="font-display text-sm font-semibold text-[#dde4e0]">
                        Mid-Day Restorative Respite & Walk
                      </h4>
                      <p className="text-xs text-[#8b928e]">
                        Auto-preserved · Low cognitive load
                      </p>
                    </div>
                  </div>
                  <span className="px-2 py-1 rounded-md bg-[#8cd2d9]/10 text-[#8cd2d9] text-xs font-medium">
                    35 mins
                  </span>
                </div>
              </div>
            </div>

            {/* TIME BLOCK 4: Design System Review */}
            <div className="flex items-stretch gap-4">
              <div className="w-16 shrink-0 pt-2 text-right">
                <span className="text-xs font-semibold text-[#c1c8c3] block">01:15</span>
                <span className="text-[11px] text-[#8b928e]">02:00 PM</span>
              </div>

              <div className="flex-1 p-4 rounded-xl bg-[#242b29] border border-[#2f3634]/60 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[22px] text-[#f9bb68] mt-0.5">
                      palette
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-[#dde4e0]">
                        Cross-functional Design System Review
                      </h3>
                      <div className="flex items-center gap-2 mt-1 text-xs text-[#8b928e]">
                        <span>Figma / Meet</span>
                        <span>·</span>
                        <span>Medium Load (Strain: 52%)</span>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-[#8b928e]">45 mins</span>
                </div>
              </div>
            </div>

            {/* BREATHER BLOCK 2: 10m Sensory Reset */}
            <div className="flex items-stretch gap-4">
              <div className="w-16 shrink-0 pt-2 text-right">
                <span className="text-xs font-semibold text-[#aacebf] block">02:00</span>
                <span className="text-[11px] text-[#aacebf]/70">02:10 PM</span>
              </div>

              <div
                className={`flex-1 p-4 rounded-xl border transition-all duration-300 shadow-md ${
                  protectedBuffers['buffer-2']
                    ? 'bg-[#aacebf]/10 border-[#aacebf]/40'
                    : 'bg-[#242b29] border-[#aacebf]/20'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-[#aacebf]/15 text-[#aacebf] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[19px]">air</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-[#aacebf]/20 text-[#aacebf] uppercase tracking-wider">
                          Breather Interval
                        </span>
                        <span className="text-xs font-semibold text-[#dde4e0]">
                          10m Sensory Reset
                        </span>
                      </div>
                      <p className="text-xs text-[#c1c8c3] mt-1 leading-relaxed">
                        Allows ocular rest and visual reset after intensive vector inspections.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                    <button
                      onClick={() => toggleBuffer('buffer-2', '02:00 PM Sensory Reset')}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all duration-200 ${
                        protectedBuffers['buffer-2']
                          ? 'bg-[#aacebf]/20 text-[#aacebf] border border-[#aacebf]/30 cursor-pointer'
                          : 'bg-[#aacebf] hover:bg-[#c6ebdb] text-[#15362c] shadow-[0_0_16px_rgba(170,206,191,0.25)]'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[17px]">
                        {protectedBuffers['buffer-2'] ? 'done_all' : 'check_circle'}
                      </span>
                      <span>{protectedBuffers['buffer-2'] ? 'Protected · Synced' : 'Protect Time'}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* TIME BLOCK 5: Telemetry Pipeline RFC */}
            <div className="flex items-stretch gap-4">
              <div className="w-16 shrink-0 pt-2 text-right">
                <span className="text-xs font-semibold text-[#c1c8c3] block">02:10</span>
                <span className="text-[11px] text-[#8b928e]">03:30 PM</span>
              </div>

              <div className="flex-1 p-4 rounded-xl bg-[#242b29] border border-[#2f3634]/60 shadow-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[22px] text-[#8cd2d9]">
                      forum
                    </span>
                    <div>
                      <h3 className="font-display text-sm font-semibold text-[#dde4e0]">
                        Telemetry Pipeline RFC Discussion
                      </h3>
                      <p className="text-xs text-[#8b928e]">
                        Technical Review · Moderated Cadence
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-mono text-[#8b928e]">1h 20m</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Rail: Restorative Companion Panel (4 Cols) */}
        <div className="lg:col-span-4 flex flex-col gap-5">
          {/* Module 1: Breather Experience Selector */}
          <div className="p-5 rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 shadow-md flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#aacebf] text-[20px]">spa</span>
                <h3 className="font-display text-sm font-semibold text-[#dde4e0]">
                  Breather Experience
                </h3>
              </div>
              <span className="text-xs text-[#8b928e]">10m Protocols</span>
            </div>
            <p className="text-xs text-[#c1c8c3] -mt-1">
              Select your ambient environment when an automatic buffer engages.
            </p>

            <div className="flex flex-col gap-2.5">
              {/* Option 1: 4-4-4 Box Breathing */}
              <div
                onClick={() => setSelectedExperience('box-breathing')}
                className={`p-3.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                  selectedExperience === 'box-breathing'
                    ? 'bg-[#1a211f] border-[#aacebf]/40 shadow-sm'
                    : 'bg-[#09100e] border-[#2f3634]/40 hover:border-[#414845]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#aacebf]/15 text-[#aacebf] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[17px]">adjust</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#dde4e0]">
                        4-4-4 Box Breathing
                      </h4>
                      <p className="text-xs text-[#8b928e] mt-0.5">
                        Soft ambient pacing ring with a gentle, non-verbal cadence.
                      </p>
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      selectedExperience === 'box-breathing' ? 'text-[#aacebf]' : 'text-[#8b928e]'
                    }`}
                  >
                    {selectedExperience === 'box-breathing'
                      ? 'radio_button_checked'
                      : 'radio_button_unchecked'}
                  </span>
                </div>
                {selectedExperience === 'box-breathing' && (
                  <div className="mt-2.5 pt-2 border-t border-[#2f3634]/40 flex items-center justify-between text-xs text-[#c1c8c3]">
                    <span className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#aacebf] animate-ping" />
                      Inhale 4s · Hold 4s · Exhale 4s
                    </span>
                    <span className="text-[#aacebf] font-medium">Equilibrium</span>
                  </div>
                )}
              </div>

              {/* Option 2: Somatic Screen Off */}
              <div
                onClick={() => setSelectedExperience('somatic-screen')}
                className={`p-3.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                  selectedExperience === 'somatic-screen'
                    ? 'bg-[#1a211f] border-[#aacebf]/40 shadow-sm'
                    : 'bg-[#09100e] border-[#2f3634]/40 hover:border-[#414845]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#242b29] text-[#c1c8c3] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[17px]">bedtime</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#dde4e0]">
                        Somatic Screen Off
                      </h4>
                      <p className="text-xs text-[#8b928e] mt-0.5">
                        Darkens monitors and plays an organic chime 60 seconds before time expires.
                      </p>
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      selectedExperience === 'somatic-screen' ? 'text-[#aacebf]' : 'text-[#8b928e]'
                    }`}
                  >
                    {selectedExperience === 'somatic-screen'
                      ? 'radio_button_checked'
                      : 'radio_button_unchecked'}
                  </span>
                </div>
              </div>

              {/* Option 3: Sensory Disconnect */}
              <div
                onClick={() => setSelectedExperience('sensory-disconnect')}
                className={`p-3.5 rounded-xl cursor-pointer transition-all duration-200 border ${
                  selectedExperience === 'sensory-disconnect'
                    ? 'bg-[#1a211f] border-[#aacebf]/40 shadow-sm'
                    : 'bg-[#09100e] border-[#2f3634]/40 hover:border-[#414845]'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-7 h-7 rounded-lg bg-[#242b29] text-[#c1c8c3] flex items-center justify-center shrink-0 mt-0.5">
                      <span className="material-symbols-outlined text-[17px]">waves</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#dde4e0]">
                        Sensory Disconnect
                      </h4>
                      <p className="text-xs text-[#8b928e] mt-0.5">
                        Streams a warm 432Hz harmonic soundscape and mutes peripheral alerts.
                      </p>
                    </div>
                  </div>
                  <span
                    className={`material-symbols-outlined text-[18px] ${
                      selectedExperience === 'sensory-disconnect' ? 'text-[#aacebf]' : 'text-[#8b928e]'
                    }`}
                  >
                    {selectedExperience === 'sensory-disconnect'
                      ? 'radio_button_checked'
                      : 'radio_button_unchecked'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Module 2: Cognitive Residue Telemetry */}
          <div className="p-5 rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 shadow-md flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#8cd2d9] text-[20px]">
                  analytics
                </span>
                <h3 className="font-display text-sm font-semibold text-[#dde4e0]">
                  Residue Telemetry
                </h3>
              </div>
              <span className="text-xs text-[#aacebf] font-medium">Live Model</span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-[#09100e] border border-[#2f3634]/40 flex flex-col justify-between">
                <span className="text-[10px] text-[#8b928e] uppercase tracking-wider">
                  Attention Residue
                </span>
                <div className="my-2">
                  <div className="font-display text-2xl font-bold text-[#aacebf] tabular-nums">
                    −41%
                  </div>
                  <span className="text-[11px] text-[#8b928e] mt-0.5 block">
                    When buffers are honored
                  </span>
                </div>
                <div className="w-full bg-[#2f3634] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#aacebf] h-full w-[41%] rounded-full" />
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#09100e] border border-[#2f3634]/40 flex flex-col justify-between">
                <span className="text-[10px] text-[#8b928e] uppercase tracking-wider">
                  Penalty Saved
                </span>
                <div className="my-2">
                  <div className="font-display text-2xl font-bold text-[#8cd2d9] tabular-nums">
                    28m
                  </div>
                  <span className="text-[11px] text-[#8b928e] mt-0.5 block">
                    Context fatigue saved today
                  </span>
                </div>
                <div className="w-full bg-[#2f3634] h-1.5 rounded-full overflow-hidden">
                  <div className="bg-[#8cd2d9] h-full w-[65%] rounded-full" />
                </div>
              </div>
            </div>

            {/* Slack Masking Preview */}
            <div className="p-3 rounded-xl bg-[#09100e] border border-[#2f3634]/40 flex flex-col gap-1">
              <div className="flex items-center justify-between text-[11px]">
                <span className="text-[#8b928e] uppercase tracking-wider">
                  Slack Masking Preview
                </span>
                <span className="w-2 h-2 rounded-full bg-[#8cd2d9]" />
              </div>
              <div className="flex items-center gap-2 mt-1">
                <span className="material-symbols-outlined text-[17px] text-[#aacebf]">
                  coffee
                </span>
                <span className="text-xs text-[#dde4e0] italic">
                  “In restorative transition until 10:40 AM”
                </span>
              </div>
              <span className="text-[11px] text-[#8b928e] mt-0.5">
                Contacts receive gentle bounce-back notices preventing rapid pings.
              </span>
            </div>
          </div>

          {/* Module 3: Automation Toggle */}
          <div className="p-4 rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 shadow-md flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-[#aacebf] text-[22px] mt-0.5">
                auto_mode
              </span>
              <div>
                <h4 className="text-xs font-semibold text-[#dde4e0]">
                  Automatic Protection
                </h4>
                <p className="text-xs text-[#8b928e] mt-0.5">
                  Auto-insert 10m buffer when meeting friction exceeds 60%.
                </p>
              </div>
            </div>

            {/* Interactive Switch */}
            <button
              onClick={() => {
                const next = !autoProtection;
                setAutoProtection(next);
                onShowToast(
                  next
                    ? 'Automatic Protection enabled (60% friction trigger)'
                    : 'Automatic Protection paused',
                  'auto_mode'
                );
              }}
              className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-300 shrink-0 ${
                autoProtection ? 'bg-[#aacebf]' : 'bg-[#2f3634]'
              }`}
            >
              <div
                className={`bg-[#0e1513] w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                  autoProtection ? 'translate-x-6' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Biological Rhythm Prompt Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-[#1a211f] to-[#161d1b] border border-[#aacebf]/15 shadow-sm">
            <span className="text-[10px] uppercase tracking-widest text-[#aacebf] font-semibold">
              Biological Rhythm
            </span>
            <p className="text-xs text-[#c1c8c3] mt-1 leading-relaxed">
              Your ultradian cycle reaches peak receptivity at 10:45 AM. The 10m buffer preserves neural bandwidth so you can sustain focus without forced willpower.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
