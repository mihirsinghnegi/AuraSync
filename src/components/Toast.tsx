import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 max-w-md w-[calc(100%-2rem)] px-4 py-3 rounded-xl bg-[#242b29]/95 backdrop-blur-xl border border-[#aacebf]/30 shadow-[0_12px_36px_rgba(4,8,7,0.7)] flex items-center justify-between gap-3 text-xs text-[#dde4e0] animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="flex items-center gap-2.5 min-w-0">
        <span className="material-symbols-outlined text-[#aacebf] text-[18px] shrink-0">
          {icon}
        </span>
        <span className="truncate">{message}</span>
      </div>
      <button
        onClick={onClose}
        className="text-[#8b928e] hover:text-[#dde4e0] p-1 rounded-lg transition-colors shrink-0"
      >
        <span className="material-symbols-outlined text-[15px]">close</span>
      </button>
    </div>
  );
};
