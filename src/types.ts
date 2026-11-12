export type TabType = 'companion' | 'cadence' | 'focus-shield' | 'telemetry';

export type BreatherExperience = 'box-breathing' | 'somatic-screen' | 'sensory-disconnect';

export interface ScheduleEvent {
  id: string;
  timeStart: string;
  timeEnd: string;
  title: string;
  type: 'event' | 'buffer' | 'respite';
  strain?: number;
  subtitle?: string;
  isProtected?: boolean;
  isSuggested?: boolean;
  appContext?: string;
}

export interface TelemetryMetric {
  label: string;
  value: string;
  unit?: string;
  status: string;
  statusColor?: string;
  icon: string;
}
