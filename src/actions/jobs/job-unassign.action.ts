import { ActionDefinition } from '../action-definition';
import { singleton } from 'tsyringe';
import { JobService } from '../../services';

export interface JobUnassignActionParams {
  jobId: number;
}

@singleton()
export class JobUnassignAction extends ActionDefinition<JobUnassignActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  invoke(params: JobUnassignActionParams): void | Promise<void> {
    this.jobService.setUser(params.jobId, null);
  }
  getMenu(): { name: string } {
    return { name: '解除指定' };
  }
}
