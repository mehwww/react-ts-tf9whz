import { ActionDefinition } from '../action-definition';
import { injectable } from 'tsyringe';
import { JobService } from '../../services';

export interface JobAssignActionParams {
  jobId: string;
}

@injectable()
export class JobAssignAction extends ActionDefinition<JobAssignActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  invoke(params: JobAssignActionParams): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
  getMenu(): { name: string } {
    return { name: '指定' };
  }
}
