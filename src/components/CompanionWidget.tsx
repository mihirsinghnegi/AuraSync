import React, { useState, useEffect } from 'react';
import { TabType } from '../types';

interface CompanionWidgetProps {
  onNavigateTab: (tab: TabType) => void;
  shieldActive: boolean;
  onToggleShield: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const CompanionWidget: React.FC<CompanionWidgetProps> = ({
  onNavigateTab,
  shieldActive,
  onToggleShield,
  onShowToast,
}) => {
  // Resonance load (default 42%)
  const [resonanceLoad, setResonanceLoad] = useState<number>(42);
  const [isCalibrating, setIsCalibrating] = useState(false);

  // Buffer button state in collision node
  const [collisionBuffered, setCollisionBuffered] = useState(false);
  const [collisionDismissed, setCollisionDismissed] = useState(false);

  // Breathing exercise overlay state
  const [breatherOpen, setBreatherOpen] = useState(false);
  const [breathPhaseIdx, setBreathPhaseIdx] = useState(0);
  const [breathSeconds, setBreathSeconds] = useState(4);

  // View style toggle: Desktop HUD vs Mobile View
  const [viewMode, setViewMode] = useState<'desktop-hud' | 'mobile-aura'>('desktop-hud');

  // Breathing phases
  const phases = [
    { text: 'Inhale', scale: 'scale-125', ringColor: 'text-[#aacebf]', bg: 'bg-[#aacebf]/30' },
    { text: 'Hold', scale: 'scale-125', ringColor: 'text-[#8cd2d9]', bg: 'bg-[#8cd2d9]/30' },
    { text: 'Exhale', scale: 'scale-90', ringColor: 'text-[#7ea193]', bg: 'bg-[#7ea193]/20' },
    { text: 'Rest', scale: 'scale-100', ringColor: 'text-[#8b928e]', bg: 'bg-[#1a211f]' },
  ];

  useEffect(() => {
    if (!breatherOpen) return;
    const timer = setInterval(() => {
      setBreathSeconds((prev) => {
        if (prev <= 1) {
          setBreathPhaseIdx((p) => (p + 1) % 4);
          return 4;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [breatherOpen]);

  // Recalibrate resonance handler
  const handleRecalibrate = () => {
    setIsCalibrating(true);
    const newLoad = Math.floor(Math.random() * (46 - 36 + 1)) + 36;
    setTimeout(() => {
      setResonanceLoad(newLoad);
      setIsCalibrating(false);
      onShowToast(`Resonance recalibrated: ${newLoad}% • Cognitive stream balanced`, 'tune');
    }, 400);
  };

  const handleApplyBuffer = () => {
    setCollisionBuffered(true);
    onShowToast('10m Restorative Buffer inserted before Deep Refactor', 'more_time');
  };

  const currentPhase = phases[breathPhaseIdx];

  // SVG dash offset calculation for 42%
  const radius = 22;
  const circumference = 2 * Math.PI * radius; // ~138.23
  const strokeDashoffset = circumference - (circumference * resonanceLoad) / 100;

  return (
    <div className="w-full relative min-h-[calc(100vh-4rem)] pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      {/* View Switcher Bar */}
      <div className="flex items-center justify-between border-b border-[#2f3634]/50 pb-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#aacebf] animate-pulse" />
          <span className="font-display font-medium text-sm text-[#dde4e0]">
            Peripheral Workstream Overlay
          </span>
          <span className="text-xs text-[#8b928e] hidden sm:inline">
            · Low-luminance companion HUD
          </span>
        </div>

        <div className="flex items-center gap-1 bg-[#161d1b] p-1 rounded-xl border border-[#2f3634]/60 text-xs">
          <button
            onClick={() => setViewMode('desktop-hud')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              viewMode === 'desktop-hud'
                ? 'bg-[#7ea193] text-[#16372d] font-semibold'
                : 'text-[#c1c8c3] hover:text-[#dde4e0]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">desktop_windows</span>
            <span>Desktop HUD</span>
          </button>
          <button
            onClick={() => setViewMode('mobile-aura')}
            className={`px-3 py-1 rounded-lg transition-colors flex items-center gap-1.5 ${
              viewMode === 'mobile-aura'
                ? 'bg-[#7ea193] text-[#16372d] font-semibold'
                : 'text-[#c1c8c3] hover:text-[#dde4e0]'
            }`}
          >
            <span className="material-symbols-outlined text-[15px]">smartphone</span>
            <span>Mobile Companion</span>
          </button>
        </div>
      </div>

      {viewMode === 'desktop-hud' ? (
        /* ================= DESKTOP HUD MODE ================= */
        <div className="w-full relative rounded-2xl bg-[#09100e] border border-[#2f3634]/50 overflow-hidden shadow-2xl p-4 sm:p-6 lg:p-8">
          {/* Subtle Ambient Glows behind workspace */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="w-[500px] h-[500px] rounded-full bg-[#aacebf]/5 blur-[120px] absolute -top-12 left-1/4 -translate-x-1/2" />
            <div className="w-[400px] h-[400px] rounded-full bg-[#8cd2d9]/5 blur-[140px] absolute -bottom-10 right-1/4" />
          </div>

          {/* Mock IDE Window Header */}
          <div className="relative flex items-center justify-between pb-4 border-b border-[#2f3634]/30 select-none">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#333b38]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#333b38]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#333b38]" />
              <span className="font-mono text-xs text-[#c1c8c3] ml-2 tracking-wide">
                workspace / aurasync-kernel · neural-cadence.rs
              </span>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-[#8b928e]">
              <span className="flex items-center gap-1 text-[#aacebf]">
                <span className="material-symbols-outlined text-[14px]">terminal</span>
                cargo check: passed (1.4s)
              </span>
              <span className="hidden sm:inline">UTF-8 · Rust 1.78</span>
            </div>
          </div>

          {/* Ghost IDE Canvas Layer */}
          <div className="grid grid-cols-12 gap-6 opacity-35 select-none pointer-events-none my-6 font-mono text-xs">
            {/* File Tree Minimalist */}
            <div className="hidden md:block col-span-3 space-y-1 text-[#8b928e]">
              <div className="text-[#aacebf]/80 font-semibold mb-2">SOURCES</div>
              <div className="pl-1 text-[#dde4e0]">telemetry_daemon.rs</div>
              <div className="pl-1">cadence_mesh.rs</div>
              <div className="pl-1">vagal_stream.rs</div>
              <div className="pl-1">ambient_bridge.rs</div>
            </div>
            {/* Code Body Simulation */}
            <div className="col-span-12 md:col-span-9 space-y-1 text-[#8b928e] leading-relaxed">
              <p>
                <span className="text-[#8cd2d9]">pub async fn</span>{' '}
                <span className="text-[#aacebf]">evaluate_cognitive_resonance</span>(
                stream: &BioTelemetry
                ) -&gt; Result&lt;ResonanceState&gt; {'{'}
              </p>
              <p className="pl-4">
                <span className="text-[#8cd2d9]">let</span> vagal_delta = stream.hrv_vagal_ms.moving_average(Duration::from_mins(12));
              </p>
              <p className="pl-4">
                <span className="text-[#8cd2d9]">let</span> friction_quotient = stream.keystroke_entropy * stream.context_switch_frequency;
              </p>
              <p className="pl-4">
                <span className="text-[#f9bb68]">if</span> friction_quotient.exceeds_gentle_threshold() {'{'}
              </p>
              <p className="pl-8 text-[#aacebf]">
                AuraBridge::request_attenuated_buffer(Duration::from_mins(10)).await?;
              </p>
              <p className="pl-4">{'}'}</p>
              <p className="pl-4">
                <span className="text-[#8cd2d9]">Ok</span>(ResonanceState::NominalFlow {'{'} reserve_ratio: 0.84 {'}'})
              </p>
              <p>{'}'}</p>
            </div>
          </div>

          {/* MAIN FLOATING COMPANION DOCK HUD */}
          <div className="relative max-w-4xl mx-auto z-20 my-2">
            {/* Glow Underlay */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#aacebf]/15 via-[#8cd2d9]/20 to-[#f9bb68]/15 rounded-2xl blur-xl opacity-75" />

            {/* Persistent Companion Capsule Card */}
            <div className="relative rounded-2xl bg-[#161d1b]/95 backdrop-blur-2xl border border-[#aacebf]/20 shadow-[0_24px_50px_-12px_rgba(0,0,0,0.65)] p-4 sm:p-5 flex flex-col gap-4 transition-all duration-300">
              {/* Top Horizon: Core Cognitive Resonance & Telemetry */}
              <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-[#1a211f]/80 border border-[#2f3634]/60 rounded-xl p-3 sm:p-4">
                {/* Resonance Dial */}
                <div
                  onClick={handleRecalibrate}
                  className="flex items-center gap-4 w-full lg:w-auto cursor-pointer group"
                  title="Click to recalibrate sensor telemetry"
                >
                  <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
                    <svg className="w-14 h-14 -rotate-90 transform" viewBox="0 0 56 56">
                      <circle
                        className="text-[#2f3634]"
                        cx="28"
                        cy="28"
                        fill="transparent"
                        r={radius}
                        stroke="currentColor"
                        strokeWidth="3.5"
                      />
                      <circle
                        className={`text-[#aacebf] transition-all duration-700 ${
                          isCalibrating ? 'animate-spin' : ''
                        }`}
                        cx="28"
                        cy="28"
                        fill="transparent"
                        r={radius}
                        stroke="currentColor"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        strokeWidth="4"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3.5 h-3.5 rounded-full bg-[#aacebf]/20 flex items-center justify-center animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#aacebf]" />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display text-2xl font-semibold text-[#dde4e0] tabular-nums">
                        {resonanceLoad}%
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#2f3634] text-xs font-medium text-[#aacebf] flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#aacebf] animate-ping" />
                        Optimal Flow
                      </span>
                    </div>
                    <span className="text-xs text-[#c1c8c3] mt-0.5 group-hover:text-[#dde4e0] transition-colors flex items-center gap-1">
                      Cognitive Resonance · Active Work Stream
                      <span className="material-symbols-outlined text-[13px] opacity-60">refresh</span>
                    </span>
                  </div>
                </div>

                {/* Micro Glanceable Telemetry Ribbon */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 w-full lg:w-auto">
                  <div className="bg-[#09100e]/80 border border-[#2f3634]/40 rounded-xl px-3 py-2 flex flex-col min-w-[110px]">
                    <span className="text-xs text-[#8b928e] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#8cd2d9]">alt_route</span>
                      Switches
                    </span>
                    <span className="text-sm font-semibold text-[#dde4e0] mt-0.5 tabular-nums">
                      4<span className="text-[#8b928e] text-xs font-normal">/hr</span>
                    </span>
                    <span className="text-[11px] text-[#aacebf]">Low Friction</span>
                  </div>

                  <div className="bg-[#09100e]/80 border border-[#2f3634]/40 rounded-xl px-3 py-2 flex flex-col min-w-[110px]">
                    <span className="text-xs text-[#8b928e] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#aacebf]">videocam</span>
                      Session
                    </span>
                    <span className="text-sm font-semibold text-[#dde4e0] mt-0.5 tabular-nums">
                      22<span className="text-[#8b928e] text-xs font-normal">m</span>
                    </span>
                    <span className="text-[11px] text-[#8cd2d9]">Safe Zone</span>
                  </div>

                  <div className="bg-[#09100e]/80 border border-[#2f3634]/40 rounded-xl px-3 py-2 flex flex-col min-w-[110px]">
                    <span className="text-xs text-[#8b928e] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#8cd2d9]">keyboard</span>
                      Cadence
                    </span>
                    <span className="text-sm font-semibold text-[#dde4e0] mt-0.5">
                      Fluid
                    </span>
                    <span className="text-[11px] text-[#aacebf]">Consistent</span>
                  </div>

                  <div className="bg-[#09100e]/80 border border-[#2f3634]/40 rounded-xl px-3 py-2 flex flex-col min-w-[110px]">
                    <span className="text-xs text-[#8b928e] flex items-center gap-1">
                      <span className="material-symbols-outlined text-[13px] text-[#f9bb68]">ecg_heart</span>
                      HRV
                    </span>
                    <span className="text-sm font-semibold text-[#dde4e0] mt-0.5 tabular-nums">
                      68<span className="text-[#8b928e] text-xs font-normal">ms</span>
                    </span>
                    <span className="text-[11px] text-[#7ea193]">Stable</span>
                  </div>
                </div>
              </div>

              {/* Middle Horizon: Context Collision Node */}
              {!collisionDismissed && (
                <div
                  className={`rounded-xl px-4 py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-300 border ${
                    collisionBuffered
                      ? 'bg-[#1a211f]/50 border-[#aacebf]/25 opacity-75'
                      : 'bg-[#242b29] border-[#f9bb68]/25'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-lg bg-[#f9bb68]/15 text-[#f9bb68] flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[18px]">stream</span>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-semibold text-[#f9bb68]">
                          Upcoming Collision Risk
                        </span>
                        <span className="text-xs text-[#8b928e]">· in 30m</span>
                      </div>
                      <p className="text-xs text-[#c1c8c3] leading-snug break-words">
                        Zoom Sync collides with deep Rust refactor.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={handleApplyBuffer}
                      disabled={collisionBuffered}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-all duration-200 ${
                        collisionBuffered
                          ? 'bg-[#aacebf]/20 text-[#aacebf] cursor-default'
                          : 'bg-[#c68f41]/25 hover:bg-[#c68f41]/40 text-[#ffddb5] border border-[#f9bb68]/30 shadow-sm'
                      }`}
                    >
                      <span className="material-symbols-outlined text-[15px]">
                        {collisionBuffered ? 'done_all' : 'more_time'}
                      </span>
                      <span>{collisionBuffered ? 'Buffered (+10m Applied)' : 'Auto-Buffer (+10m)'}</span>
                    </button>

                    <button
                      onClick={() => setCollisionDismissed(true)}
                      className="p-1.5 rounded-lg text-[#8b928e] hover:text-[#dde4e0] hover:bg-[#2f3634] transition-colors"
                      title="Dismiss notice"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Lower Horizon: Low-Friction Interoception Interventions */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <button
                    onClick={() => setBreatherOpen(!breatherOpen)}
                    className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all duration-200 border ${
                      breatherOpen
                        ? 'bg-[#aacebf] text-[#15362c] border-[#aacebf] font-semibold'
                        : 'bg-[#2f3634] hover:bg-[#333b38] text-[#dde4e0] border-[#414845]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">self_improvement</span>
                    <span>Box Breather (4-4-4)</span>
                  </button>

                  <button
                    onClick={onToggleShield}
                    className={`px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2 transition-all duration-200 border ${
                      shieldActive
                        ? 'bg-[#aacebf]/20 text-[#aacebf] border-[#aacebf]/40'
                        : 'bg-[#2f3634] hover:bg-[#333b38] text-[#dde4e0] border-[#414845]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[17px]">
                      {shieldActive ? 'notifications_paused' : 'do_not_disturb_on'}
                    </span>
                    <span>{shieldActive ? 'Shield Active (Slack Muted)' : 'Focus Shield (Mute Slack)'}</span>
                  </button>
                </div>

                <button
                  onClick={() => onNavigateTab('cadence')}
                  className="text-xs font-medium text-[#aacebf] hover:text-[#c6ebdb] flex items-center gap-1 self-end sm:self-center transition-colors group"
                >
                  <span>Day Cadence Mesh</span>
                  <span className="material-symbols-outlined text-[16px] group-hover:translate-x-0.5 transition-transform">
                    chevron_right
                  </span>
                </button>
              </div>

              {/* Guided Micro-Breathing Overlay (Expanded on demand) */}
              {breatherOpen && (
                <div className="bg-[#09100e]/95 border border-[#aacebf]/30 rounded-xl p-4 sm:p-5 transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#aacebf] animate-ping" />
                      <span className="text-xs font-medium text-[#aacebf]">
                        Cadence Micro-Interval · Guided Interoception
                      </span>
                    </div>
                    <button
                      onClick={() => setBreatherOpen(false)}
                      className="text-[#8b928e] hover:text-[#dde4e0] p-1 rounded-lg hover:bg-[#242b29]"
                    >
                      <span className="material-symbols-outlined text-[16px]">close</span>
                    </button>
                  </div>

                  <div className="flex flex-col items-center justify-center py-4">
                    {/* Pulsing breathing circle */}
                    <div
                      className={`w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all duration-1000 ease-in-out border border-[#aacebf]/40 ${currentPhase.scale} ${currentPhase.bg} shadow-[0_0_30px_rgba(170,206,191,0.2)]`}
                    >
                      <span className="text-sm font-semibold text-[#dde4e0]">
                        {currentPhase.text}
                      </span>
                      <span className="text-xs font-mono text-[#aacebf] mt-0.5">
                        {breathSeconds}s
                      </span>
                    </div>
                    <p className="text-xs text-[#c1c8c3] mt-4 text-center max-w-sm">
                      Gently align diaphragm tension with ambient rhythm (Inhale 4s · Hold 4s · Exhale 4s · Rest 4s)
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Subtle Footer Tag */}
            <div className="flex justify-between items-center px-4 pt-2 text-xs text-[#8b928e]">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8cd2d9]" />
                Dock Pinned · Peripheral Awareness Stream
              </span>
              <span>Press Cmd+Shift+Space to stow</span>
            </div>
          </div>

          {/* Supplementary Work Context Details */}
          <div className="mt-8 pt-6 border-t border-[#2f3634]/30 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="bg-[#161d1b]/60 border border-[#2f3634]/40 p-4 rounded-xl space-y-2">
              <span className="text-[#c1c8c3] font-medium">Cognitive Velocity Trend</span>
              <div className="h-10 flex items-end gap-1.5 pt-2">
                <div className="w-full bg-[#aacebf]/20 h-4 rounded-sm" />
                <div className="w-full bg-[#aacebf]/40 h-6 rounded-sm" />
                <div className="w-full bg-[#aacebf]/60 h-8 rounded-sm" />
                <div className="w-full bg-[#aacebf] h-7 rounded-sm" />
                <div className="w-full bg-[#aacebf]/80 h-5 rounded-sm" />
                <div className="w-full bg-[#aacebf]/40 h-9 rounded-sm" />
              </div>
            </div>

            <div className="bg-[#161d1b]/60 border border-[#2f3634]/40 p-4 rounded-xl space-y-2">
              <span className="text-[#c1c8c3] font-medium">Heart Rate Coherence</span>
              <div className="h-10 flex items-center justify-between font-mono text-xs pt-2">
                <span className="text-[#8b928e]">08:00</span>
                <span className="text-[#8cd2d9] font-semibold">72 bpm steady</span>
                <span className="text-[#8b928e]">11:30</span>
              </div>
            </div>

            <div className="bg-[#161d1b]/60 border border-[#2f3634]/40 p-4 rounded-xl space-y-2">
              <span className="text-[#c1c8c3] font-medium">Protected Interstitial Buffer</span>
              <div className="flex items-center gap-2 pt-2">
                <span className="px-2 py-1 rounded bg-[#2f3634] text-[#aacebf] text-[11px]">
                  15m at 14:00
                </span>
                <span className="px-2 py-1 rounded bg-[#2f3634] text-[#8cd2d9] text-[11px]">
                  10m at 16:30
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ================= MOBILE AURA COMPANION VIEW ================= */
        <div className="w-full max-w-md mx-auto flex flex-col gap-4">
          {/* Ambient Bio-Atmosphere Glowing Ring Card */}
          <div className="relative overflow-hidden rounded-2xl bg-[#161d1b] border border-[#2f3634]/60 p-5 shadow-xl">
            <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#aacebf]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-[#8cd2d9]/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#aacebf] animate-ping" />
                <span className="text-xs font-semibold text-[#aacebf] tracking-wide uppercase">
                  Resonance Sensor Active
                </span>
              </div>
              <span className="text-xs text-[#c1c8c3] bg-[#242b29] px-2 py-0.5 rounded-md border border-[#2f3634]">
                Live Stream
              </span>
            </div>

            {/* Interactive Pulsing Aura Ring Component */}
            <div className="flex flex-col items-center justify-center py-4">
              <div
                onClick={handleRecalibrate}
                className="relative flex items-center justify-center w-52 h-52 cursor-pointer group"
                title="Tap to calibrate resonance"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#8cd2d9]/15 via-[#aacebf]/20 to-transparent animate-pulse blur-xl scale-110" />

                <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    className="text-[#2f3634]/40"
                    cx="60"
                    cy="60"
                    fill="none"
                    r="50"
                    stroke="currentColor"
                    strokeWidth="5"
                  />
                  <circle
                    className={`transition-all duration-1000 ease-out ${
                      isCalibrating ? 'animate-spin' : ''
                    }`}
                    cx="60"
                    cy="60"
                    fill="none"
                    r="50"
                    stroke="#aacebf"
                    strokeDasharray="314.15"
                    strokeDashoffset={314.15 - (314.15 * resonanceLoad) / 100}
                    strokeLinecap="round"
                    strokeWidth="6"
                  />
                  <circle
                    className="text-[#aacebf]/20 animate-spin"
                    cx="60"
                    cy="60"
                    fill="none"
                    r="41"
                    stroke="currentColor"
                    strokeDasharray="4 6"
                    strokeWidth="2"
                    style={{ animationDuration: '28s' }}
                  />
                </svg>

                <div className="absolute flex flex-col items-center text-center px-4">
                  <span className="text-xs text-[#8cd2d9] tracking-widest uppercase mb-0.5">
                    Cognitive Load
                  </span>
                  <div className="flex items-baseline gap-0.5">
                    <span className="font-display text-4xl font-semibold text-[#dde4e0] tracking-tight tabular-nums">
                      {resonanceLoad}
                    </span>
                    <span className="text-lg font-semibold text-[#aacebf]">%</span>
                  </div>
                  <span className="text-xs text-[#aacebf] bg-[#aacebf]/10 px-2.5 py-0.5 rounded-full mt-1 font-medium">
                    Optimal Flow
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-2 text-center max-w-xs text-xs text-[#c1c8c3]">
                <span className="material-symbols-outlined text-[#aacebf] text-[18px]">spa</span>
                <span>Attention residue is minimal across IDE & Slack. Tap to recalibrate.</span>
              </div>
            </div>
          </div>

          {/* Telemetry Pills 2x2 Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-3 p-3 bg-[#161d1b] border border-[#2f3634]/60 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1a211f] flex items-center justify-center text-[#8cd2d9]">
                <span className="material-symbols-outlined text-[20px]">swap_horiz</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#c1c8c3] truncate">Context Shifts</p>
                <p className="text-sm font-semibold text-[#dde4e0]">
                  4/hr <span className="text-xs text-[#aacebf] font-normal">(Low)</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#161d1b] border border-[#2f3634]/60 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1a211f] flex items-center justify-center text-[#f9bb68]">
                <span className="material-symbols-outlined text-[20px]">timelapse</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#c1c8c3] truncate">Meeting Strain</p>
                <p className="text-sm font-semibold text-[#dde4e0]">22m</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#161d1b] border border-[#2f3634]/60 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1a211f] flex items-center justify-center text-[#aacebf]">
                <span className="material-symbols-outlined text-[20px]">keyboard_alt</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#c1c8c3] truncate">Key Rhythm</p>
                <p className="text-sm font-semibold text-[#aacebf]">Fluid</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-[#161d1b] border border-[#2f3634]/60 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-[#1a211f] flex items-center justify-center text-[#8cd2d9]">
                <span className="material-symbols-outlined text-[20px]">ecg_heart</span>
              </div>
              <div className="min-w-0">
                <p className="text-xs text-[#c1c8c3] truncate">HRV Index</p>
                <p className="text-sm font-semibold text-[#dde4e0]">
                  68 ms <span className="text-xs text-[#8cd2d9] font-normal">(Stable)</span>
                </p>
              </div>
            </div>
          </div>

          {/* Upcoming Collision Risk Card */}
          <div className="relative overflow-hidden rounded-xl bg-[#1a211f] border border-[#f9bb68]/30 p-3.5 shadow-sm flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#f9bb68]/15 text-[#f9bb68] flex items-center justify-center shrink-0 mt-0.5">
              <span className="material-symbols-outlined text-[18px]">stream</span>
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="text-xs font-semibold text-[#f9bb68]">
                  Upcoming Collision Risk
                </span>
                <span className="text-[10px] text-[#f9bb68] bg-[#f9bb68]/10 px-2 py-0.5 rounded border border-[#f9bb68]/20 font-mono">
                  in 30m
                </span>
              </div>
              <p className="text-xs text-[#dde4e0] leading-snug break-words">
                Zoom Sync collides with deep Rust refactor.
              </p>
              <div className="pt-1 flex items-center gap-1.5 text-[11px] text-[#8b928e]">
                <span className="material-symbols-outlined text-[#aacebf] text-[14px]">auto_fix_high</span>
                <span>Suggestion: Auto-insert 10m recovery buffer</span>
              </div>
            </div>
          </div>

          {/* Action Triggers */}
          <div className="space-y-2">
            <button
              onClick={() => {
                setBreatherOpen(true);
                setViewMode('desktop-hud');
              }}
              className="w-full p-3 bg-[#161d1b] hover:bg-[#1a211f] border border-[#2f3634]/60 rounded-xl flex items-center justify-between text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#aacebf]/10 text-[#aacebf] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">air</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#dde4e0] block">
                    Start Micro-Breathing
                  </span>
                  <span className="text-xs text-[#8b928e]">4-4-4 guided box method</span>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#8b928e] text-[20px]">chevron_right</span>
            </button>

            <button
              onClick={onToggleShield}
              className="w-full p-3 bg-[#161d1b] hover:bg-[#1a211f] border border-[#2f3634]/60 rounded-xl flex items-center justify-between text-left transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#8cd2d9]/10 text-[#8cd2d9] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[20px]">do_not_disturb_on</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-[#dde4e0] block">
                    Focus Shield
                  </span>
                  <span className="text-xs text-[#8b928e]">Silence incoming Slack alerts</span>
                </div>
              </div>
              <span
                className={`text-xs px-2 py-0.5 rounded font-medium ${
                  shieldActive ? 'bg-[#aacebf] text-[#15362c]' : 'bg-[#242b29] text-[#8cd2d9]'
                }`}
              >
                {shieldActive ? 'Active' : 'Ready'}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
