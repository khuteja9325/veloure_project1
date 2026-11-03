import React from 'react';
import { useApp } from '../../context/AppContext';
import { Check, Info, AlertCircle } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 transition-all duration-300">
      <div className="bg-[#151515] border border-[#262626] text-[#F6F1E8] px-5 py-3.5 shadow-2xl flex items-center gap-3 text-sm tracking-wide">
        {toast.type === 'success' && <Check className="w-4 h-4 text-[#C8A96B]" />}
        {toast.type === 'info' && <Info className="w-4 h-4 text-[#AAA49A]" />}
        {toast.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
        <span className="font-light">{toast.message}</span>
      </div>
    </div>
  );
};
