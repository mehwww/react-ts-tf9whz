export interface Job {
  id: number;
  name: string;
  status: JobStatus;
  assignerId?: number;
}

export enum JobStatus {
  New = 'New',
  Processing = 'Processing',
  Done = 'Done',
}
