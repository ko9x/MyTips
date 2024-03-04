export interface ResDataObj {
  cash: number;
  credit: number;
  hourly_rate: number;
  id: number;
  job: string;
  note: string;
  section: string;
  time: number;
  tip_in: number;
  tip_out: number;
  total_sales: number;
}

export interface TipDataObj {
  date: string;
  job: string;
  time: number;
  cash: number;
  credit: number;
  tip_in: number;
  tip_out: number;
  total_sales: number;
  hourly_rate: number;
  note: string;
  section: string;
}
