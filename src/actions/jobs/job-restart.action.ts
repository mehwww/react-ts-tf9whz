import { ActionDefinition } from '../action-definition';
import { singleton } from 'tsyringe';
import { JobService } from '../../services';
import { JobStatus } from '../../models';

export interface JobRestartActionParams {
  jobId: number;
}

@singleton()
export class JobRestartAction extends ActionDefinition<JobRestartActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  invoke(params: JobRestartActionParams): void | Promise<void> {
    this.jobService.setStatus(params.jobId, JobStatus.New);
  }
  getMenu(): { name: string } {
    return { name: '重新开始' };
  }
}
