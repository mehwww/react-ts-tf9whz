import { ActionDefinition } from '../action-definition';
import { injectable } from 'tsyringe';
import { JobService } from '../../services';
import { JobStatus } from '../../models';

export interface JobStartActionParams {
  jobId: number;
}

@injectable()
export class JobStartAction extends ActionDefinition<JobStartActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  invoke(params: JobStartActionParams): void | Promise<void> {
    this.jobService.setStatus(params.jobId, JobStatus.Processing);
  }
  getMenu(): { name: string } {
    return { name: '开始' };
  }
}
