import React from 'react';
import { Globe } from 'lucide-react';
import { useLanguage, type Language } from '../../context/LanguageContext';

export const LanguageSwitcher = () => {
  const { language, setLanguage } = useLanguage();
  return (
    <label className="flex items-center gap-2 text-[#C8A96B] text-xs shrink-0">
      <Globe className="w-4 h-4" aria-hidden="true" />
      <select aria-label="Language" value={language}
        onChange={(event) => setLanguage(event.target.value as Language)}
        className="bg-[#121212] text-[#F6F1E8] border border-[#444] rounded px-2 py-2 focus:outline-2 focus:outline-[#C8A96B] max-w-28"
        translate="no">
        <option value="en" lang="en">English</option>
        <option value="hi" lang="hi">हिन्दी</option>
      </select>
    </label>
  );
};
