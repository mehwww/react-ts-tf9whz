import { User } from "./user.model";

export interface Job {
  id: number;
  name: string;
  status: JobStatus;
  assigner?: User;
}

export enum JobStatus {
  New = "New",
  Processing = "Processing",
  Done = "Done",
}
