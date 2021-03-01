import { DataFrame, Field, Vector } from '@grafana/data';

export interface PanelOptions {
  timezone: string;
  open_hour: number;
  close_hour: number;
}

export const defaults: PanelOptions = {
  timezone: 'Europe/Berlin',
  open_hour: 9,
  close_hour: 20,
};

interface Buffer extends Vector {
  buffer: any;
}

export interface FieldBuffer extends Field<any, Vector> {
  values: Buffer;
}

export interface Frame extends DataFrame {
  fields: FieldBuffer[];
}

export interface DayObj {
  date: string;
  [key: string]: any;
}

export type DayOfWeek = 'Sun' | 'Sat' | 'Fri' | 'Thu' | 'Wed' | 'Tue' | 'Mon';
