import React, { useState, useEffect } from 'react';

interface FocusShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  shieldActive: boolean;
  onToggleShield: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const FocusShieldModal: React.FC<FocusShieldModalProps> = ({
  isOpen,
  onClose,
  shieldActive,
  onToggleShield,
  onShowToast,
}) => {
  const [selectedOption, setSelectedOption] = useState<'somatic' | 'walk' | 'snooze'>('somatic');
  const [breathPhaseIdx, setBreathPhaseIdx] = useState(0);
  const [breathSeconds, setBreathSeconds] = useState(4);
  const [isBreakActive, setIsBreakActive] = useState(false);
  const [breakTimer, setBreakTimer] = useState(180); // 3-minute break countdown

  const phases = [
    { text: 'Inhale Slowly', offset: 20, scale: 'scale-125', bg: 'bg-[#aacebf]/40' },
    { text: 'Hold Breath', offset: 20, scale: 'scale-125', bg: 'bg-[#8cd2d9]/40' },
    { text: 'Exhale Gently', offset: 120, scale: 'scale-90', bg: 'bg-[#7ea193]/20' },
    { text: 'Rest', offset: 65, scale: 'scale-100', bg: 'bg-[#1a211f]' },
  ];

  // Breathing loop timer
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setBreathSeconds((prev) => {
        if (prev <= 1) {
          setBreathPhaseIdx((p) => (p + 1) % 4);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isOpen]);

  // Break countdown timer when break is started
  useEffect(() => {
    if (!isBreakActive) return;
    const timer = setInterval(() => {
      setBreakTimer((prev) => {
        if (prev <= 1) {
          setIsBreakActive(false);
          onShowToast('3-minute micro-break complete. Restorative reserves replenished!', 'spa');
          return 180;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isBreakActive, onShowToast]);

  const handleBeginBreak = () => {
    setIsBreakActive(true);
    if (!shieldActive) {
      onToggleShield();
    }
    if (selectedOption === 'somatic') {
      onShowToast('5-minute acoustic chime started. Relaxing display backlight.', 'spa');
    } else if (selectedOption === 'walk') {
      onShowToast('Deep Air Walk scheduled. Slack notifications paused.', 'park');
    } else {
      onShowToast('Cognitive reminder postponed for 15 minutes.', 'snooze');
      onClose();
    }
  };

  const handleSnooze = () => {
    onShowToast('Focus Shield reminder snoozed for 15 minutes.', 'snooze');
    onClose();
  };

  if (!isOpen) return null;

  const currentPhase = phases[breathPhaseIdx];

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <aside
      aria-label="Restorative Breathing Intervention"
      className="fixed bottom-6 right-4 sm:right-6 z-50 w-[420px] max-w-[calc(100vw-2rem)] rounded-2xl bg-[#161d1b]/95 backdrop-blur-2xl border border-[#aacebf]/25 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.85)] p-5 flex flex-col gap-4 transition-all duration-300"
    >
      {/* Card Top Accents & Status Bar */}
      <div className="flex items-center justify-between gap-3">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#2f3634] text-[#f9bb68] text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#f9bb68] animate-pulse" />
          <span>Pacing Protection · Gentle Intercept</span>
        </div>

        <button
          onClick={onClose}
          className="w-7 h-7 rounded-lg bg-[#1a211f] hover:bg-[#242b29] text-[#8b928e] hover:text-[#dde4e0] flex items-center justify-center transition-colors"
          title="Minimize modal"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>

      {/* Quiet Telemetry Grounding Row */}
      <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#09100e]/80 border border-[#2f3634]/50 text-xs text-[#c1c8c3]">
        <div className="flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[#8b928e] text-[15px]">timeline</span>
          <span>
            Sustained load: <strong className="text-[#dde4e0] font-semibold">94 mins</strong> (Slack & Jira)
          </span>
        </div>
        <span className="text-[#f9bb68] font-medium">Reserve 18%</span>
      </div>

      {/* Empathic Header & Copy Section */}
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-base font-semibold text-[#dde4e0] leading-snug">
          {isBreakActive ? 'Micro-Break in Progress' : 'Time for a brief cognitive breather?'}
        </h2>
        <p className="text-xs text-[#c1c8c3] leading-relaxed">
          {isBreakActive
            ? 'Allow eye muscles and vocal chords to soften. Peripheral alerts are suppressed.'
            : 'Your working memory has been running at maximum bandwidth. A 3-minute somatic pause now prevents afternoon cognitive collapse.'}
        </p>
      </div>

      {/* Integrated Ambient Somatic Breath Ring Module */}
      <div className="p-3.5 rounded-xl bg-[#1a211f] border border-[#2f3634]/60 flex items-center gap-4 relative overflow-hidden">
        {/* Pulsing Somatic Breathing Ring Graphic */}
        <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 64 64">
            <circle
              className="text-[#2f3634]"
              cx="32"
              cy="32"
              fill="none"
              r="26"
              stroke="currentColor"
              strokeWidth="3"
            />
            <circle
              className="text-[#aacebf] transition-all duration-1000 ease-in-out"
              cx="32"
              cy="32"
              fill="none"
              r="26"
              stroke="currentColor"
              strokeDasharray="163.36"
              strokeDashoffset={currentPhase.offset}
              strokeLinecap="round"
              strokeWidth="3.5"
            />
          </svg>
          <div
            className={`absolute w-6 h-6 rounded-full flex items-center justify-center transition-all duration-1000 ${currentPhase.scale} ${currentPhase.bg}`}
          >
            <div className="w-2.5 h-2.5 rounded-full bg-[#aacebf]" />
          </div>
        </div>

        {/* Somatic Breath Cadence Feedback */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <div className="text-xs font-semibold text-[#aacebf] flex items-center gap-1">
            <span className="material-symbols-outlined text-[14px]">air</span>
            <span>{currentPhase.text}</span>
            <span className="font-mono text-[#dde4e0] ml-1">({breathSeconds}s)</span>
          </div>
          <span className="text-xs font-medium text-[#dde4e0]">
            Box Cadence: 4s · 4s · 4s
          </span>
          <span className="text-[11px] text-[#8b928e]">
            {isBreakActive
              ? `Remaining pause: ${formatTime(breakTimer)}`
              : 'Somatic heart rate downshift begins on first cycle'}
          </span>
        </div>
      </div>

      {/* Restorative Options Radio Group */}
      {!isBreakActive && (
        <div className="flex flex-col gap-2">
          <label
            onClick={() => setSelectedOption('somatic')}
            className={`p-2.5 rounded-xl cursor-pointer flex items-start gap-2.5 border transition-all duration-200 ${
              selectedOption === 'somatic'
                ? 'bg-[#242b29] border-[#aacebf]/40'
                : 'bg-[#161d1b] border-[#2f3634]/40 hover:bg-[#1a211f]'
            }`}
          >
            <input
              type="radio"
              name="shield_option"
              checked={selectedOption === 'somatic'}
              onChange={() => setSelectedOption('somatic')}
              className="mt-1 accent-[#7ea193]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#dde4e0]">
                  5-min Somatic Reset
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#aacebf]/20 text-[#aacebf] font-medium">
                  Recommended
                </span>
              </div>
              <p className="text-[11px] text-[#8b928e] mt-0.5">
                Eyes-off-screen & guided acoustic sound chime
              </p>
            </div>
          </label>

          <label
            onClick={() => setSelectedOption('walk')}
            className={`p-2.5 rounded-xl cursor-pointer flex items-start gap-2.5 border transition-all duration-200 ${
              selectedOption === 'walk'
                ? 'bg-[#242b29] border-[#aacebf]/40'
                : 'bg-[#161d1b] border-[#2f3634]/40 hover:bg-[#1a211f]'
            }`}
          >
            <input
              type="radio"
              name="shield_option"
              checked={selectedOption === 'walk'}
              onChange={() => setSelectedOption('walk')}
              className="mt-1 accent-[#7ea193]"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#dde4e0]">
                  10-min Deep Air Walk
                </span>
                <span className="text-[10px] text-[#8cd2d9]">Defers alerts</span>
              </div>
              <p className="text-[11px] text-[#8b928e] mt-0.5">
                Auto-defers non-urgent Slack notifications to draft tray
              </p>
            </div>
          </label>
        </div>
      )}

      {/* Automated Slack Status Notice */}
      <div className="p-2.5 rounded-xl bg-[#aacebf]/10 border border-[#aacebf]/15 flex items-center gap-2.5 text-xs">
        <span className="material-symbols-outlined text-[17px] text-[#aacebf]">
          sync_saved_locally
        </span>
        <div className="flex-1 min-w-0">
          <span className="text-[#8b928e] text-[10px] block">Status automated</span>
          <p className="text-xs text-[#dde4e0] truncate">
            Slack set to:{' '}
            <span className="text-[#aacebf] italic">“Recharging mind (away for 5m)”</span>
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2 pt-1">
        <button
          onClick={handleBeginBreak}
          className="w-full py-2.5 px-4 rounded-xl bg-[#aacebf] hover:bg-[#c6ebdb] text-[#15362c] text-xs font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-md hover:shadow-[0_0_16px_rgba(170,206,191,0.3)] active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-[18px]">spa</span>
          <span>{isBreakActive ? 'Break Active (Resting)' : 'Take a 3-min Breathe Break'}</span>
        </button>

        <div className="flex items-center justify-between px-1 text-xs">
          <button
            onClick={handleSnooze}
            className="text-[#c1c8c3] hover:text-[#dde4e0] transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[14px]">snooze</span>
            <span>Snooze for 15 mins</span>
          </button>
          <span className="text-[11px] text-[#8b928e]">Press Esc to dismiss</span>
        </div>
      </div>
    </aside>
  );
};
