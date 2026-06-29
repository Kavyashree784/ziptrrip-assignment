// Shared color maps for priority and status badges.
// Used by TodoCard and TodoDetails to ensure visual consistency.

export const PRIORITY_COLORS = {
  low: 'bg-slate-100 text-slate-600 border-slate-200',
  medium: 'bg-amber-50 text-amber-700 border-amber-200',
  high: 'bg-red-50 text-red-700 border-red-200',
};

export const STATUS_COLORS = {
  todo: 'bg-slate-100 text-slate-700 border-slate-200',
  'in-progress': 'bg-blue-50 text-blue-700 border-blue-200',
  done: 'bg-emerald-50 text-emerald-700 border-emerald-200',
};
