import { DocumentTheme } from '../types';

export interface ThemeConfig {
  id: DocumentTheme;
  name: string;
  subtitle: string;
  swatchHex: string;
  primary: string; // Tailwind color or hex
  accentText: string;
  badgeBg: string;
  badgeText: string;
  borderClass: string;
  highlightBg: string;
  headerBarBg: string;
  tagline: string;
}

export const DOCUMENT_THEMES: Record<DocumentTheme, ThemeConfig> = {
  classic_amber: {
    id: 'classic_amber',
    name: 'Europass Classic',
    subtitle: 'Warm Amber & Slate • Official EU Consular Look',
    swatchHex: '#d97706',
    primary: 'amber-700',
    accentText: 'text-amber-800',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-900',
    borderClass: 'border-amber-500/40',
    highlightBg: 'bg-amber-50/70',
    headerBarBg: 'bg-amber-800 text-white',
    tagline: 'Authentic European Union standard formatting with high legibility.',
  },
  modern_navy: {
    id: 'modern_navy',
    name: 'Executive Navy',
    subtitle: 'Deep Navy & Slate Blue • Corporate Management',
    swatchHex: '#1e3a8a',
    primary: 'blue-900',
    accentText: 'text-blue-900',
    badgeBg: 'bg-blue-100',
    badgeText: 'text-blue-900',
    borderClass: 'border-blue-900/40',
    highlightBg: 'bg-blue-50/70',
    headerBarBg: 'bg-blue-900 text-white',
    tagline: 'High-contrast executive blue favored by multinational logistics employers.',
  },
  emerald_gcc: {
    id: 'emerald_gcc',
    name: 'Emerald GCC',
    subtitle: 'Rich Emerald & Forest • Gulf & Middle East Standard',
    swatchHex: '#047857',
    primary: 'emerald-700',
    accentText: 'text-emerald-800',
    badgeBg: 'bg-emerald-100',
    badgeText: 'text-emerald-900',
    borderClass: 'border-emerald-600/40',
    highlightBg: 'bg-emerald-50/70',
    headerBarBg: 'bg-emerald-800 text-white',
    tagline: 'Distinguished green theme matching GCC visa and embassy application norms.',
  },
  monochrome: {
    id: 'monochrome',
    name: 'Monochrome Minimalist',
    subtitle: 'Sharp Charcoal & Pure Black • 100% Universal ATS',
    swatchHex: '#18181b',
    primary: 'stone-900',
    accentText: 'text-stone-900',
    badgeBg: 'bg-stone-200',
    badgeText: 'text-stone-900',
    borderClass: 'border-stone-800/40',
    highlightBg: 'bg-stone-100',
    headerBarBg: 'bg-stone-900 text-white',
    tagline: 'Ultra-clean, zero-distraction layout optimized for automated ATS machine parsers.',
  },
  burgundy: {
    id: 'burgundy',
    name: 'Bordeaux Burgundy',
    subtitle: 'Deep Wine & Warm Gray • Prestige & Senior Trades',
    swatchHex: '#881337',
    primary: 'rose-900',
    accentText: 'text-rose-900',
    badgeBg: 'bg-rose-100',
    badgeText: 'text-rose-950',
    borderClass: 'border-rose-900/40',
    highlightBg: 'bg-rose-50/70',
    headerBarBg: 'bg-rose-900 text-white',
    tagline: 'Elegant and authoritative palette ideal for supervisors, specialists, and operators.',
  },
  nordic_slate: {
    id: 'nordic_slate',
    name: 'Nordic Slate',
    subtitle: 'Graphite & Cool Steel • Scandinavian Standard',
    swatchHex: '#334155',
    primary: 'slate-800',
    accentText: 'text-slate-800',
    badgeBg: 'bg-slate-200',
    badgeText: 'text-slate-900',
    borderClass: 'border-slate-700/40',
    highlightBg: 'bg-slate-100/70',
    headerBarBg: 'bg-slate-800 text-white',
    tagline: 'Modern, balanced steel aesthetic for Northern and Central European applications.',
  },
};
