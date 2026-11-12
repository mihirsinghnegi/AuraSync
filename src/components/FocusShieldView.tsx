import React from 'react';
import { FocusShieldModal } from './FocusShieldModal';

interface FocusShieldViewProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  shieldActive: boolean;
  onToggleShield: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const FocusShieldView: React.FC<FocusShieldViewProps> = ({
  modalOpen,
  setModalOpen,
  shieldActive,
  onToggleShield,
  onShowToast,
}) => {
  return (
    <div className="w-full relative min-h-[calc(100vh-4rem)] pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col gap-6">
      {/* Top System Telemetry HUD Bar */}
      <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-[#161d1b] border border-[#2f3634]/60 rounded-xl shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-[#c1c8c3]">
            <span className="material-symbols-outlined text-[17px] text-[#aacebf]">terminal</span>
            <span className="font-semibold text-[#dde4e0]">telemetry_engine.rs</span>
            <span className="text-[#8b928e]">WORKSPACE // CRATE::CORE</span>
          </div>
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-0.5 rounded bg-[#242b29] text-xs text-[#c1c8c3] border border-[#2f3634]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8cd2d9]" />
            <span>Buffer Active</span>
          </div>
        </div>

        {/* Cognitive Strain Threshold Tag */}
        <div className="flex items-center gap-3 shrink-0 flex-wrap">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#2f3634] border border-[#f9bb68]/30">
            <span className="w-2 h-2 rounded-full bg-[#f9bb68] animate-pulse" />
            <div className="flex items-center gap-1.5 text-xs">
              <span className="text-[#f9bb68] font-semibold tracking-wide uppercase">
                Cognitive Threshold
              </span>
              <span className="text-[#c1c8c3]">82% Strain (Sustained 94 mins)</span>
            </div>
          </div>

          {!modalOpen && (
            <button
              onClick={() => {
                setModalOpen(true);
                onShowToast('Focus Shield intervention summoned', 'shield');
              }}
              className="px-3 py-1.5 rounded-lg bg-[#aacebf] hover:bg-[#c6ebdb] text-[#15362c] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Open Focus Shield</span>
            </button>
          )}
        </div>
      </div>

      {/* Dimmed Realistic IDE Canvas */}
      <div className="w-full grid grid-cols-12 gap-6 opacity-60 hover:opacity-85 transition-opacity duration-500">
        {/* File Tree Sidebar */}
        <div className="hidden md:flex md:col-span-3 flex-col gap-3 p-4 bg-[#09100e] border border-[#2f3634]/50 rounded-xl">
          <div className="text-xs font-mono text-[#8b928e] uppercase tracking-wider pb-1 border-b border-[#2f3634]/30">
            Project Navigation
          </div>
          <div className="flex flex-col gap-1 text-xs text-[#c1c8c3]">
            <div className="flex items-center gap-2 px-2 py-1 rounded bg-[#242b29] text-[#aacebf]">
              <span className="material-symbols-outlined text-[16px]">folder_open</span>
              <span>src/engine</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded text-[#aacebf] pl-6 font-mono">
              <span className="material-symbols-outlined text-[14px]">data_object</span>
              <span>telemetry_engine.rs</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded text-[#8b928e] pl-6 font-mono">
              <span className="material-symbols-outlined text-[14px]">code</span>
              <span>neural_reserve.rs</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded text-[#8b928e] pl-6 font-mono">
              <span className="material-symbols-outlined text-[14px]">code</span>
              <span>somatic_cadence.rs</span>
            </div>
            <div className="flex items-center gap-2 px-2 py-1 rounded text-[#8b928e]">
              <span className="material-symbols-outlined text-[16px]">folder</span>
              <span>benches/strain_test</span>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-[#2f3634]/30 flex flex-col gap-2">
            <span className="text-[11px] font-mono text-[#8b928e] uppercase tracking-wider">
              Context Streams
            </span>
            <div className="flex items-center justify-between text-xs text-[#c1c8c3] p-2 rounded bg-[#161d1b]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#f9bb68]">chat</span>
                Slack
              </span>
              <span className="text-[#8b928e]">18 channels active</span>
            </div>
            <div className="flex items-center justify-between text-xs text-[#c1c8c3] p-2 rounded bg-[#161d1b]">
              <span className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[14px] text-[#8cd2d9]">task_alt</span>
                Jira Sprint
              </span>
              <span className="text-[#8b928e]">3 WIP items</span>
            </div>
          </div>
        </div>

        {/* IDE Code View */}
        <div className="col-span-12 md:col-span-9 bg-[#09100e] border border-[#2f3634]/50 rounded-xl p-5 font-mono text-xs leading-relaxed overflow-x-auto">
          <div className="flex items-center justify-between pb-3 text-xs text-[#8b928e] border-b border-[#2f3634]/30">
            <span>fn evaluate_cognitive_envelope(&self, stream: ContextTelemetry) -&gt; RestorativeIntent</span>
            <span>UTF-8 · Rust 1.78</span>
          </div>

          <div className="space-y-1.5 pt-4 text-[#8b928e]">
            <p>
              <span className="text-[#8cd2d9]">use</span> crate::telemetry::{'{'}BiometricResonance, ContextStrain, NeuralPacing{'}'};
            </p>
            <p>
              <span className="text-[#8cd2d9]">use</span> std::sync::atomic::{'{'}AtomicU64, Ordering{'}'};
            </p>
            <p className="py-1 text-[#8b928e]/70">
              // Atmospheric focus guard evaluates high sustained task-switching velocity
            </p>
            <p>
              <span className="text-[#aacebf] font-medium">pub async fn</span>{' '}
              <span className="text-[#f9bb68]">monitor_cognitive_load</span>(stream: &TaskVelocity) -&gt; Option&lt;RestorativeIntervention&gt; {'{'}
            </p>
            <p className="pl-6">
              <span className="text-[#8cd2d9]">let</span> elapsed_minutes = stream.unbroken_continuous_focus().<span className="text-[#aacebf]">as_mins</span>();
            </p>
            <p className="pl-6">
              <span className="text-[#8cd2d9]">let</span> strain_index = stream.calculate_entropy_envelope().<span className="text-[#aacebf]">await</span>;
            </p>
            <p className="pl-6 text-[#8b928e]/70">
              // High threshold triggered at sustained 90m boundary: 82% neural strain observed
            </p>
            <p className="pl-6">
              <span className="text-[#8cd2d9]">if</span> elapsed_minutes &gt;= 90 &amp;&amp; strain_index &gt; 0.80 {'{'}
            </p>
            <p className="pl-12 text-[#f9bb68]">
              tracing::warn!("Continuous sensory fatigue threshold reached across dev &amp; messaging");
            </p>
            <p className="pl-12">
              <span className="text-[#aacebf] font-medium">return</span> <span className="text-[#7ea193] font-semibold">Some</span>(RestorativeIntervention::GentleIntercept {'{'}
            </p>
            <p className="pl-16">duration_seconds: <span className="text-[#f9bb68]">180</span>,</p>
            <p className="pl-16">neural_reserve_floor: <span className="text-[#f9bb68]">0.18</span>,</p>
            <p className="pl-16">modality: SomaticBreathwork::BoxPattern444,</p>
            <p className="pl-12">{'}'});</p>
            <p className="pl-6">{'}'}</p>
            <p className="pl-6">NeuralPacing::continue_uninhibited_buffer()</p>
            <p>{'}'}</p>
          </div>

          {/* Terminal Trace */}
          <div className="mt-6 p-4 bg-[#161d1b] border border-[#2f3634]/50 rounded-lg text-[11px] text-[#8b928e] flex flex-col gap-1">
            <div className="flex items-center justify-between text-[#c1c8c3] mb-1">
              <span className="text-[#aacebf] flex items-center gap-1.5 font-semibold">
                <span className="material-symbols-outlined text-[14px]">memory</span>
                aura-daemon runtime
              </span>
              <span className="text-xs">telemetry: online</span>
            </div>
            <div>[09:42:12] INFO  Slack API real-time presence stream hook established</div>
            <div>[10:16:04] INFO  Context-switch count: 48 operations across code &amp; sprint boards</div>
            <div className="text-[#f9bb68]">
              [11:00:22] WARN  Neural envelope reserve dropped below 20% safe zone (actual: 18%)
            </div>
          </div>
        </div>
      </div>

      {/* Floating Focus Shield Modal (Anchored in the bottom right corner) */}
      <FocusShieldModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        shieldActive={shieldActive}
        onToggleShield={onToggleShield}
        onShowToast={onShowToast}
      />
    </div>
  );
};
