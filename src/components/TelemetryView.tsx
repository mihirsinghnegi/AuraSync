import React, { useState } from 'react';
import { soundscape } from '../utils/audio';

interface TelemetryViewProps {
  onShowToast: (msg: string, icon?: string) => void;
}

export const TelemetryView: React.FC<TelemetryViewProps> = ({ onShowToast }) => {
  const [timeframe, setTimeframe] = useState<'7d' | '30d'>('7d');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeSplinePoint, setActiveSplinePoint] = useState<number | null>(6); // Default on "Today"

  const splinePoints = [
    { day: 'Mon', value: 76, drain: '-12%', x: 10, y: 110 },
    { day: 'Tue', value: 71, drain: '-18%', x: 65, y: 92 },
    { day: 'Wed', value: 65, drain: '-24%', x: 120, y: 65 },
    { day: 'Thu', value: 58, drain: '-28%', x: 175, y: 52 },
    { day: 'Fri', value: 48, drain: '-32%', x: 230, y: 35 },
    { day: 'Sat', value: 38, drain: '-36%', x: 285, y: 22 },
    { day: 'Today', value: 34, drain: '-41%', x: 340, y: 16 },
  ];

  const handleToggleAudio = () => {
    if (isPlayingAudio) {
      soundscape.stop();
      setIsPlayingAudio(false);
      onShowToast('Forest Rain 432Hz acoustic shield paused', 'pause');
    } else {
      soundscape.start(0.25);
      setIsPlayingAudio(true);
      onShowToast('Forest Rain 432Hz soundscape active · Alpha tone stream', 'graphic_eq');
    }
  };

  return (
    <div className="w-full relative min-h-[calc(100vh-4rem)] pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Top Header Card */}
      <div className="relative overflow-hidden rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 p-5 shadow-sm">
        <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[#aacebf]/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-[#8cd2d9]/10 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-[#aacebf] tracking-wider uppercase block">
              Telemetry Stream
            </span>
            <h1 className="font-display text-xl sm:text-2xl font-semibold text-[#dde4e0] mt-0.5">
              Cognitive Load Balance
            </h1>
          </div>

          <div className="flex bg-[#242b29] p-1 rounded-xl border border-[#2f3634]">
            <button
              onClick={() => {
                setTimeframe('7d');
                onShowToast('Timeframe: 7-Day Moving Trend', 'calendar_today');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                timeframe === '7d'
                  ? 'bg-[#7ea193] text-[#16372d] font-semibold shadow-sm'
                  : 'text-[#c1c8c3] hover:text-[#dde4e0]'
              }`}
            >
              7D
            </button>
            <button
              onClick={() => {
                setTimeframe('30d');
                onShowToast('Timeframe: 30-Day Long-term Aggregate', 'calendar_month');
              }}
              className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                timeframe === '30d'
                  ? 'bg-[#7ea193] text-[#16372d] font-semibold shadow-sm'
                  : 'text-[#c1c8c3] hover:text-[#dde4e0]'
              }`}
            >
              30D
            </button>
          </div>
        </div>
      </div>

      {/* Dual Stat Row: Interoception & Breather Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Recovery Gauge */}
        <div className="relative flex flex-col justify-between p-5 rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#c1c8c3]">Interoception Score</span>
            <span className="flex items-center gap-1 text-xs text-[#aacebf] bg-[#aacebf]/10 border border-[#aacebf]/20 px-2.5 py-0.5 rounded-md font-medium">
              <span className="material-symbols-outlined text-[14px]">spa</span>
              Calm
            </span>
          </div>

          <div className="my-4 flex items-baseline gap-1">
            <span className="font-display text-4xl font-semibold text-[#aacebf] tracking-tight tabular-nums">
              88
            </span>
            <span className="text-sm text-[#8b928e] font-mono">/100</span>
          </div>

          <div className="space-y-1.5">
            <div className="w-full bg-[#242b29] h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#8cd2d9] to-[#aacebf] h-full rounded-full transition-all duration-700"
                style={{ width: '88%' }}
              />
            </div>
            <p className="text-xs text-[#8b928e]">Peak neural restorative zone (Stable vagal HRV)</p>
          </div>
        </div>

        {/* Buffer Compliance Arc */}
        <div className="relative flex flex-col justify-between p-5 rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#c1c8c3]">Breathers Taken</span>
            <span className="flex items-center gap-1 text-xs text-[#8cd2d9] bg-[#8cd2d9]/10 border border-[#8cd2d9]/20 px-2.5 py-0.5 rounded-md font-medium">
              <span className="material-symbols-outlined text-[14px]">waves</span>
              Sync
            </span>
          </div>

          <div className="my-4 flex items-baseline gap-1">
            <span className="font-display text-4xl font-semibold text-[#8cd2d9] tracking-tight tabular-nums">
              85%
            </span>
            <span className="text-sm text-[#8b928e]">compliance rate</span>
          </div>

          <div className="space-y-1.5">
            <div className="w-full bg-[#242b29] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#8cd2d9] h-full rounded-full transition-all duration-700"
                style={{ width: '85%' }}
              />
            </div>
            <p className="text-xs text-[#8b928e]">11 of 13 suggested buffers utilized today</p>
          </div>
        </div>
      </div>

      {/* Main Grid: Cognitive Spline + Transition Penalty Matrix */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Cognitive Fatigue Spline Chart (7 Cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 shadow-sm flex flex-col justify-between gap-4">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#aacebf]" />
                <h3 className="font-display text-base font-semibold text-[#dde4e0]">
                  Cognitive Fatigue Spline
                </h3>
              </div>
              <p className="text-xs text-[#8b928e] mt-0.5">
                Energy decay rate post AuraSync induction
              </p>
            </div>

            <div className="flex flex-col items-end">
              <span className="text-xs font-semibold text-[#aacebf] bg-[#aacebf]/10 px-2 py-0.5 rounded border border-[#aacebf]/20">
                −34% Drain
              </span>
              <span className="text-[11px] text-[#8b928e] mt-0.5">vs baseline</span>
            </div>
          </div>

          {/* Interactive Spline SVG Canvas */}
          <div className="relative w-full h-44 pt-2">
            <svg
              className="w-full h-full overflow-visible"
              fill="none"
              preserveAspectRatio="none"
              viewBox="0 0 350 140"
            >
              <defs>
                <linearGradient id="splineGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#aacebf" stopOpacity="0.32" />
                  <stop offset="100%" stopColor="#aacebf" stopOpacity="0.0" />
                </linearGradient>
                <linearGradient id="strokeGradient" x1="0" x2="1" y1="0" y2="0">
                  <stop offset="0%" stopColor="#8cd2d9" />
                  <stop offset="100%" stopColor="#aacebf" />
                </linearGradient>
              </defs>

              {/* Gridlines */}
              <line stroke="#2f3634" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="350" y1="20" y2="20" />
              <line stroke="#2f3634" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="350" y1="70" y2="70" />
              <line stroke="#2f3634" strokeDasharray="3 3" strokeWidth="1" x1="0" x2="350" y1="120" y2="120" />

              {/* Area Under Curve */}
              <path
                d="M10,110 C60,105 80,82 120,65 C170,45 200,55 250,32 C295,15 320,20 340,16 L340,140 L10,140 Z"
                fill="url(#splineGradient)"
              />

              {/* Ambient Smooth Spline Curve */}
              <path
                d="M10,110 C60,105 80,82 120,65 C170,45 200,55 250,32 C295,15 320,20 340,16"
                stroke="url(#strokeGradient)"
                strokeLinecap="round"
                strokeWidth="3.5"
              />

              {/* Interactive Points */}
              {splinePoints.map((pt, idx) => (
                <g key={pt.day} className="cursor-pointer" onClick={() => setActiveSplinePoint(idx)}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={activeSplinePoint === idx ? 6 : 4}
                    className={`${
                      activeSplinePoint === idx
                        ? 'fill-[#aacebf] stroke-[#0e1513] stroke-2 shadow-lg'
                        : 'fill-[#1a211f] stroke-[#8cd2d9] stroke-2 hover:fill-[#aacebf]'
                    } transition-all duration-200`}
                  />
                  {activeSplinePoint === idx && (
                    <circle cx={pt.x} cy={pt.y} r={12} className="fill-[#aacebf]/20 animate-ping" />
                  )}
                </g>
              ))}
            </svg>
          </div>

          {/* Day Markers */}
          <div className="flex justify-between text-xs text-[#8b928e] px-2 font-mono">
            {splinePoints.map((pt, idx) => (
              <button
                key={pt.day}
                onClick={() => setActiveSplinePoint(idx)}
                className={`transition-colors ${
                  activeSplinePoint === idx
                    ? 'text-[#aacebf] font-semibold underline underline-offset-4'
                    : 'hover:text-[#dde4e0]'
                }`}
              >
                {pt.day}
              </button>
            ))}
          </div>

          {/* Active Day Detail Callout */}
          {activeSplinePoint !== null && (
            <div className="p-3 rounded-xl bg-[#09100e] border border-[#2f3634]/50 flex items-center justify-between text-xs">
              <span className="text-[#c1c8c3]">
                {splinePoints[activeSplinePoint].day}: Estimated Cognitive Load Index
              </span>
              <span className="text-[#aacebf] font-semibold font-mono">
                {splinePoints[activeSplinePoint].value}% ({splinePoints[activeSplinePoint].drain} fatigue)
              </span>
            </div>
          )}
        </div>

        {/* Right Column: Attention Residue Penalty Matrix (5 Cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 shadow-sm flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-semibold text-[#dde4e0]">
                Attention Residue
              </h3>
              <p className="text-xs text-[#8b928e]">Costliest app-switch cognitive friction</p>
            </div>
            <span className="material-symbols-outlined text-[#8b928e]">swap_calls</span>
          </div>

          {/* Pair 1: Zoom to Jira */}
          <div className="p-3.5 rounded-xl bg-[#242b29] border border-[#2f3634]/60 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[#f9bb68]/20 flex items-center justify-center text-[#f9bb68]">
                  <span className="material-symbols-outlined text-[17px]">videocam</span>
                </div>
                <span className="text-xs text-[#8b928e]">→</span>
                <div className="w-7 h-7 rounded-md bg-[#8cd2d9]/20 flex items-center justify-center text-[#8cd2d9]">
                  <span className="material-symbols-outlined text-[17px]">view_kanban</span>
                </div>
                <span className="text-xs font-semibold text-[#dde4e0] ml-1">Zoom to Jira</span>
              </div>
              <div className="flex items-center gap-1 text-[#f9bb68] text-xs font-medium font-mono">
                <span className="material-symbols-outlined text-[15px]">timelapse</span>
                <span>18 min</span>
              </div>
            </div>

            <div className="w-full bg-[#09100e] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#f9bb68] h-full rounded-full" style={{ width: '78%' }} />
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#8b928e]">
              <span>High Context Switch</span>
              <span className="text-[#f9bb68] font-medium">Overload potential</span>
            </div>
          </div>

          {/* Pair 2: Slack to VS Code */}
          <div className="p-3.5 rounded-xl bg-[#242b29] border border-[#2f3634]/60 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[#8cd2d9]/20 flex items-center justify-center text-[#8cd2d9]">
                  <span className="material-symbols-outlined text-[17px]">forum</span>
                </div>
                <span className="text-xs text-[#8b928e]">→</span>
                <div className="w-7 h-7 rounded-md bg-[#aacebf]/20 flex items-center justify-center text-[#aacebf]">
                  <span className="material-symbols-outlined text-[17px]">terminal</span>
                </div>
                <span className="text-xs font-semibold text-[#dde4e0] ml-1">Slack to VS Code</span>
              </div>
              <div className="flex items-center gap-1 text-[#aacebf] text-xs font-medium font-mono">
                <span className="material-symbols-outlined text-[15px]">timelapse</span>
                <span>12 min</span>
              </div>
            </div>

            <div className="w-full bg-[#09100e] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#aacebf] h-full rounded-full" style={{ width: '52%' }} />
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#8b928e]">
              <span>Moderate Context Switch</span>
              <span className="text-[#aacebf] font-medium">Shield active</span>
            </div>
          </div>

          {/* Pair 3: Mail to Notion */}
          <div className="p-3.5 rounded-xl bg-[#242b29] border border-[#2f3634]/60 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-[#1a211f] flex items-center justify-center text-[#8b928e]">
                  <span className="material-symbols-outlined text-[17px]">mail</span>
                </div>
                <span className="text-xs text-[#8b928e]">→</span>
                <div className="w-7 h-7 rounded-md bg-[#1a211f] flex items-center justify-center text-[#8b928e]">
                  <span className="material-symbols-outlined text-[17px]">edit_note</span>
                </div>
                <span className="text-xs font-semibold text-[#dde4e0] ml-1">Mail to Notion</span>
              </div>
              <div className="flex items-center gap-1 text-[#c1c8c3] text-xs font-medium font-mono">
                <span className="material-symbols-outlined text-[15px]">timelapse</span>
                <span>5 min</span>
              </div>
            </div>

            <div className="w-full bg-[#09100e] h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#7ea193] h-full rounded-full" style={{ width: '24%' }} />
            </div>

            <div className="flex justify-between items-center text-[11px] text-[#8b928e]">
              <span>Low Context Switch</span>
              <span className="text-[#c1c8c3]">Synchronized</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ambient Soundscape & Frequency Bio-Tuning Module */}
      <div className="relative overflow-hidden p-5 rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 shadow-sm flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#aacebf]/10 flex items-center justify-center text-[#aacebf]">
              <span className="material-symbols-outlined text-[20px]">graphic_eq</span>
            </div>
            <div>
              <span className="text-[11px] font-semibold text-[#aacebf] uppercase tracking-wider block">
                Acoustic Shield
              </span>
              <h4 className="font-display text-sm font-semibold text-[#dde4e0]">
                Forest Rain 432Hz
              </h4>
            </div>
          </div>

          <button
            onClick={handleToggleAudio}
            className={`w-11 h-11 rounded-full flex items-center justify-center shadow-lg transition-all duration-200 active:scale-95 ${
              isPlayingAudio
                ? 'bg-[#aacebf] text-[#15362c] shadow-[0_0_20px_rgba(170,206,191,0.35)]'
                : 'bg-[#2f3634] hover:bg-[#333b38] text-[#aacebf]'
            }`}
            title={isPlayingAudio ? 'Pause Soundscape' : 'Play Ambient Rain & 432Hz Tone'}
          >
            <span className="material-symbols-outlined text-[24px]">
              {isPlayingAudio ? 'pause' : 'play_arrow'}
            </span>
          </button>
        </div>

        {/* Acoustic Artwork with overlay */}
        <div className="relative h-36 w-full rounded-xl overflow-hidden bg-[#09100e] border border-[#2f3634]/40">
          <img
            src="/src/assets/images/forest_rain_acoustic_1794488146014.jpg"
            alt="Forest Rain Acoustic Shield"
            className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105"
            onError={(e) => {
              // Resilient fallback styling if image load has any issue
              (e.currentTarget as HTMLElement).style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161d1b] via-[#161d1b]/40 to-transparent flex items-end p-4 justify-between">
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  isPlayingAudio ? 'bg-[#aacebf] animate-pulse' : 'bg-[#8b928e]'
                }`}
              />
              <span className="text-xs text-[#dde4e0] font-medium">
                Frequency paired to alpha brainwave restoration (432Hz Harmonic)
              </span>
            </div>
            <span className="text-xs text-[#8cd2d9] bg-[#09100e]/80 border border-[#2f3634] px-2.5 py-0.5 rounded backdrop-blur">
              {isPlayingAudio ? 'Synthesizing...' : 'Adaptive Loop'}
            </span>
          </div>
        </div>

        {/* Environmental Sensors Footer */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <div className="p-3 rounded-xl bg-[#242b29] border border-[#2f3634]/40 flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#aacebf] text-[20px]">air</span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-[#8b928e] truncate">Ventilation</p>
              <p className="text-xs font-semibold text-[#dde4e0]">Circadian Crisp (480ppm)</p>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-[#242b29] border border-[#2f3634]/40 flex items-center gap-2.5">
            <span className="material-symbols-outlined text-[#8cd2d9] text-[20px]">light_mode</span>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] text-[#8b928e] truncate">Luminance</p>
              <p className="text-xs font-semibold text-[#dde4e0]">2200K Ambient</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
