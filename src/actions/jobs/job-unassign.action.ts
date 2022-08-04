import { ActionDefinition } from '../action-definition';
import { injectable } from 'tsyringe';
import { JobService } from '../../services';

export interface JobUnassignActionParams {
  jobId: number;
}

@injectable()
export class JobUnassignAction extends ActionDefinition<JobUnassignActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  invoke(params: JobUnassignActionParams): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
  getMenu(): { name: string } {
    return { name: '解除指定' };
  }
}
