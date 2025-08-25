export interface IRequestStatus {
  name: 'pending' | 'in-progress' | 'completed';
  label: string;
  color: string;
  icon: string;
}

export const REQUEST_STATUSES: Record<string, IRequestStatus> = {
  pending: {
    name: 'pending',
    label: 'בקשה ממתינה',
    color: 'warning',
    icon: '🟡',
  },
  'in-progress': {
    name: 'in-progress',
    label: 'בקשה בטיפול',
    color: 'info',
    icon: '🟢',
  },
  completed: {
    name: 'completed',
    label: 'בקשה סגורה',
    color: 'success',
    icon: '⚫',
  },
};

export const getStatusLabel = (statusName?: string): string => {
  if (!statusName) return REQUEST_STATUSES.pending.label;
  return REQUEST_STATUSES[statusName]?.label || REQUEST_STATUSES.pending.label;
};

export const getStatusColor = (statusName?: string): string => {
  if (!statusName) return REQUEST_STATUSES.pending.color;
  return REQUEST_STATUSES[statusName]?.color || REQUEST_STATUSES.pending.color;
};

export const getStatusIcon = (statusName?: string): string => {
  if (!statusName) return REQUEST_STATUSES.pending.icon;
  return REQUEST_STATUSES[statusName]?.icon || REQUEST_STATUSES.pending.icon;
};
